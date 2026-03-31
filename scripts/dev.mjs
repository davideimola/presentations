#!/usr/bin/env node
import { search } from '@inquirer/prompts'
import { readdirSync, existsSync } from 'fs'
import { spawn } from 'child_process'

const talks = readdirSync('.')
  .filter(d => existsSync(`${d}/src/slides.md`))
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

const child = spawn('pnpm', ['--filter', `talk-${talk}`, 'dev'], {
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code) => process.exit(code ?? 0))
