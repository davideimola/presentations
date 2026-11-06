import type { Plugin } from 'vite'
import { execFileSync, spawn } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/* Live run: lets a slide run one whitelisted command on the presenter's
   machine and stream its output into the slide, so the demo never leaves
   the deck. Dev server only: the static build has no endpoint and
   <LiveRun> falls back to the recorded output. Same as securing-go. */

interface Command {
  cwd: string
  cmd: string
  args: () => string[]
}

const demo = fileURLToPath(new URL('../demo', import.meta.url))
const leash = fileURLToPath(new URL('../demo/leash', import.meta.url))

const commands: Record<string, Command> = {
  // Resets the demo repo to its start, then asks Claude Code for the component.
  'ai-build': { cwd: demo, cmd: process.execPath, args: () => ['ai.mjs', 'build'] },
  'ai-green': { cwd: demo, cmd: process.execPath, args: () => ['ai.mjs', 'green'] },
  'ai-push': { cwd: demo, cmd: process.execPath, args: () => ['ai.mjs', 'push'] },
  'gate': { cwd: leash, cmd: process.execPath, args: () => ['scripts/check-brand.mjs'] },
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

        running = true
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')

        const child = spawn(command.cmd, command.args(), { cwd: command.cwd, env: process.env })
        child.stdout.on('data', chunk => res.write(chunk))
        child.stderr.on('data', () => {})
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


/* Brand preview (demo 3a): the token editor on the slide sends the edited
   token here. It is written into demo/brand-scratch, a clone of the brand repo
   at the commit the deck installs (demo/brand/setup.sh), the brand's own
   scripts/build.mjs runs there, and the palette variables that changed in the
   generated tokens.css go back to the slide, which applies them in memory.
   The clone is restored right after every build, and the deck's dependency is
   never touched. Dev server only: a build or an export never sees any of it. */

const scratch = fileURLToPath(new URL('../demo/brand-scratch', import.meta.url))

const git = (...args: string[]) => execFileSync('git', ['-C', scratch, ...args], { encoding: 'utf8' })

// The token's entry in tokens.json, one line per field, as the slide shows it.
function tokenSnippet(name: string) {
  const tokens = JSON.parse(git('show', 'HEAD:tokens/tokens.json'))
  const entry = tokens.color.palette[name]
  if (!entry)
    throw new Error(`no palette token ${name}`)
  return `"${name}": {\n  "$value": ${JSON.stringify(entry.$value)},\n  "$description": ${JSON.stringify(entry.$description)}\n}`
}

// The --di-color-* declarations of the first :root block of a tokens.css.
function paletteVars(css: string) {
  const block = css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {')))
  return Object.fromEntries([...block.matchAll(/(--di-color-[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]))
}

function buildToken(name: string, snippet: string) {
  const edited = JSON.parse(`{${snippet}}`)[name]
  if (!edited || !/^#[0-9a-fA-F]{6}$/.test(edited.$value ?? ''))
    throw new Error('the $value must be a hex colour like #C91F37')

  const original = git('show', 'HEAD:tokens/tokens.json')
  const line = new RegExp(`^(\\s*)"${name}": \\{.*?\\}(,?)$`, 'm')
  if (!line.test(original))
    throw new Error(`no line for ${name} in tokens.json`)
  const next = original.replace(line, (_, indent, comma) =>
    `${indent}"${name}": { "$value": ${JSON.stringify(edited.$value)}, "$description": ${JSON.stringify(edited.$description ?? '')} }${comma}`)

  const started = Date.now()
  try {
    writeFileSync(join(scratch, 'tokens/tokens.json'), next)
    execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: scratch, stdio: 'ignore' })
    const before = paletteVars(git('show', 'HEAD:dist/css/tokens.css'))
    const after = paletteVars(readFileSync(join(scratch, 'dist/css/tokens.css'), 'utf8'))
    const vars = Object.fromEntries(Object.entries(after).filter(([k, v]) => before[k] !== v))
    return { ms: Date.now() - started, vars }
  }
  finally {
    git('checkout', '--quiet', '--', '.')
  }
}

function brandPreview(): Plugin {
  return {
    name: 'brand-preview',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__brand/', (req, res) => {
        const origin = req.headers.origin
        if (origin && new URL(origin).host !== req.headers.host) {
          res.statusCode = 403
          res.end()
          return
        }
        const url = new URL(req.url ?? '/', 'http://deck')
        const name = url.searchParams.get('token') ?? 'akane'
        const reply = (status: number, body: unknown) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }
        if (!existsSync(join(scratch, '.git'))) {
          reply(503, { error: 'run demo/brand/setup.sh first' })
          return
        }
        try {
          if (req.method === 'GET' && url.pathname === '/token') {
            reply(200, { snippet: tokenSnippet(name) })
            return
          }
          if (req.method === 'POST' && url.pathname === '/build') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try {
                reply(200, buildToken(name, body))
              }
              catch (err) {
                reply(400, { error: (err as Error).message })
              }
            })
            return
          }
          reply(404, {})
        }
        catch (err) {
          reply(500, { error: (err as Error).message })
        }
      })
    },
  }
}

export default {
  plugins: [liveRun(), brandPreview()],
}
