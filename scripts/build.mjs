#!/usr/bin/env node
import { readdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import { spawn } from 'child_process'

const root = new URL('..', import.meta.url).pathname
const talks = readdirSync(root)
  .filter(d => existsSync(`${root}/${d}/src/slides.md`))
  .sort()

if (talks.length === 0) {
  console.error('No talks found.')
  process.exit(1)
}

console.log(`Building ${talks.length} talk(s): ${talks.join(', ')}\n`)

for (const talk of talks) {
  const outDir = resolve(root, 'dist', talk)
  console.log(`▶ Building ${talk}...`)

  await run('pnpm', [
    '--filter', `talk-${talk}`,
    'exec', 'slidev', 'build', 'slides.md',
    '--base', `/${talk}/`,
    '--out', outDir,
  ])

  console.log(`✓ ${talk} → dist/${talk}/\n`)
}

console.log('All talks built successfully.')

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true, cwd: root })
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`)))
  })
}
