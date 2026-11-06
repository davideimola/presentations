#!/usr/bin/env node
import { search } from '@inquirer/prompts'
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

const talk = await search({
  message: 'Select a talk to start',
  source: (input) => {
    const q = (input ?? '').toLowerCase()
    return talks
      .filter(t => t.includes(q))
      .map(t => ({ name: t, value: t }))
  },
})

const talkDir = resolve(root, talk, 'src')

// The talk's own dev script: a talk with live demos prepares them there.
const child = spawn('pnpm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: talkDir,
})

child.on('exit', (code) => process.exit(code ?? 0))
