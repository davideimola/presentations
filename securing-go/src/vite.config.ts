import type { Plugin } from 'vite'
import { spawn } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/* Live run: lets a slide run one whitelisted command on the presenter's
   machine and stream its output into the slide, so a live demo never
   leaves the deck. Dev server only: the static build has no endpoint and
   <LiveRun> falls back to the recorded output. */

interface Command {
  cwd: string
  cmd: string
  // Computed at each run, so a flag can depend on what is on disk then.
  args: () => string[]
  env?: Record<string, string>
  // Paths under cwd removed before every run, so each run starts clean.
  clean?: string[]
  // Output lines to leave out, the same cuts a slide makes by hand.
  drop?: RegExp[]
}

const authz = fileURLToPath(new URL('../demo/authz', import.meta.url))
const unzip = fileURLToPath(new URL('../demo/unzip', import.meta.url))
// Filled by demo/fetch-vulndb.sh before the talk: govulncheck reads it from
// disk, so the demo does not depend on the conference Wi-Fi.
const vulndb = fileURLToPath(new URL('../demo/vulndb', import.meta.url))

const commands: Record<string, Command> = {
  'fuzz-authz': {
    cwd: authz,
    cmd: 'go',
    args: () => ['test', '-run=^$', '-fuzz=FuzzCanManageOrg', '-fuzztime=30s', '.'],
    // A failing input left in testdata/ would replay instantly and skip the fuzzing.
    clean: ['testdata/fuzz'],
    drop: [
      /^fuzz: elapsed: .*gathering baseline coverage/,
      /^fuzz: elapsed: \d+s, minimizing$/,
      /^\s+To re-run:$/,
      /^\s+go test -run=/,
      /^exit status \d+$/,
      /^FAIL\s+\S+\s+[\d.]+s$/,
    ],
  },
  'govulncheck-unzip': {
    cwd: unzip,
    cmd: 'govulncheck',
    args: () => existsSync(join(vulndb, 'index')) ? ['-db', `file://${vulndb}`, './...'] : ['./...'],
    // The vulnerable Go release the demo is about.
    env: { GOTOOLCHAIN: 'go1.25.5+auto' },
    drop: [
      /^=== Symbol Results ===$/,
      /^\s+More info:/,
      /^\s+Standard library$/,
      /^This scan also found/,
      /^vulnerabilities in modules you require/,
      /^these vulnerabilities\.$/,
      /^Use '-show verbose'/,
    ],
  },
}

// Passes the output through line by line, leaving out the dropped lines
// and any blank line before the first one kept.
function filterLines(drop: RegExp[], write: (text: string) => void) {
  let rest = ''
  let started = false
  return {
    push(chunk: Buffer) {
      const lines = (rest + chunk.toString()).split('\n')
      rest = lines.pop() ?? ''
      for (const line of lines) {
        if (drop.some(re => re.test(line)) || (!started && line.trim() === ''))
          continue
        started = true
        write(`${line}\n`)
      }
    },
    flush() {
      if (rest && !drop.some(re => re.test(rest)))
        write(rest)
    },
  }
}

function liveRun(): Plugin {
  let running = false

  return {
    name: 'live-run',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__live-run/', (req, res) => {
        const id = (req.url ?? '').replace(/^\//, '').split('?')[0]
        const command = commands[id]
        if (req.method !== 'POST' || !command) {
          res.statusCode = 404
          res.end()
          return
        }
        // Only the deck itself may trigger a run, never another site in the browser.
        const origin = req.headers.origin
        if (origin && new URL(origin).host !== req.headers.host) {
          res.statusCode = 403
          res.end()
          return
        }
        if (running) {
          res.statusCode = 409
          res.end()
          return
        }

        for (const path of command.clean ?? [])
          rmSync(join(command.cwd, path), { recursive: true, force: true })

        running = true
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')

        const child = spawn(command.cmd, command.args(), {
          cwd: command.cwd,
          env: { ...process.env, ...command.env },
        })
        const out = filterLines(command.drop ?? [], text => res.write(text))
        child.stdout.on('data', out.push)
        child.stderr.on('data', out.push)
        child.on('error', (err) => {
          running = false
          res.end(`\n${err.message}\n`)
        })
        child.on('close', () => {
          out.flush()
          running = false
          res.end()
        })
        req.on('close', () => child.kill())
      })
    },
  }
}

export default {
  plugins: [liveRun()],
}
