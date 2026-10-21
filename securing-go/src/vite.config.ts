import type { Plugin } from 'vite'
import { spawn } from 'node:child_process'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/* Live run: lets a slide run one whitelisted command on the presenter's
   machine and stream its output into the slide, so a live demo never
   leaves the deck. Dev server only: the static build has no endpoint and
   <LiveRun> falls back to the recorded output. */

interface Command {
  cwd: string
  cmd: string
  args: string[]
  // Paths under cwd removed before every run, so each run starts clean.
  clean?: string[]
}

const demo = fileURLToPath(new URL('../demo/authz', import.meta.url))

const commands: Record<string, Command> = {
  'fuzz-authz': {
    cwd: demo,
    cmd: 'go',
    args: ['test', '-run=^$', '-fuzz=FuzzCanManageOrg', '-fuzztime=30s', '.'],
    // A failing input left in testdata/ would replay instantly and skip the fuzzing.
    clean: ['testdata/fuzz'],
  },
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

        const child = spawn(command.cmd, command.args, { cwd: command.cwd })
        child.stdout.pipe(res, { end: false })
        child.stderr.pipe(res, { end: false })
        child.on('error', (err) => {
          running = false
          res.end(`\n${err.message}\n`)
        })
        child.on('close', () => {
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
