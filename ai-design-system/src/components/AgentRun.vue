<template>
  <div class="agent-run">
    <ChatBubble user>{{ prompt }}</ChatBubble>

    <div v-if="state !== 'idle'" class="agent-run__work">
      <TransitionGroup name="agent-step" tag="div" class="agent-run__steps">
        <span
          v-for="(step, i) in parsed.steps"
          :key="i"
          class="agent-step"
          :class="`agent-step--${step.kind}`"
        ><span class="agent-step__verb">{{ step.verb }}</span>{{ step.target }}</span>
      </TransitionGroup>
      <div class="agent-run__status">
        <span v-if="state === 'running'" class="agent-run__dot" />{{ status }}
      </div>
    </div>

    <Transition name="agent-reply">
      <ChatBubble v-if="parsed.reply && state !== 'running'">{{ parsed.reply }}</ChatBubble>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, onUnmounted, ref, unref, watch } from 'vue'
import ChatBubble from '../../../theme-brand/components/ChatBubble.vue'

/* A Claude Code run told as a chat: the prompt in an ink bubble, then what
   the agent touches as small labels (read: outlined, write: filled ink, so
   reuse shows before the code does), a ticking "working" line, and its
   answer in a white bubble. Runs a whitelisted command through the live-run
   endpoint (see vite.config.ts) on the slide's first click; the presenter
   view, the export and any error replay `recorded` instead, the output of
   the last rehearsal. The command prints one line per step (demo/ai.mjs). */
const props = defineProps({
  id: { type: String, required: true },
  prompt: { type: String, required: true },
  recorded: { type: String, required: true },
})

type Step = { kind: 'read' | 'write' | 'look', verb: string, target: string }

const state = ref<'idle' | 'running' | 'done'>('idle')
const output = ref('')
const elapsed = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const name = (path: string) => path.split('/').pop() ?? path

const parsed = computed(() => {
  const steps: Step[] = []
  const reply: string[] = []
  let done = ''
  for (const line of output.value.split('\n')) {
    const text = line.trim()
    if (!text)
      continue
    const action = text.match(/^● (read|write|edit|look for|search) (.+)$/)
    if (action) {
      const [, verb, target] = action
      if (verb === 'read')
        steps.push({ kind: 'read', verb: 'read', target: name(target) })
      else if (verb === 'write' || verb === 'edit')
        steps.push({ kind: 'write', verb, target: name(target) })
      else
        steps.push({ kind: 'look', verb: 'look around', target: '' })
    }
    else if (/^(done|exit \d+) in \d+s$/.test(text)) {
      done = text
    }
    else if (!text.startsWith('●')) {
      reply.push(text)
    }
  }
  return { steps, reply: reply.join(' '), done }
})

const status = computed(() => {
  if (state.value === 'running')
    return `working ${elapsed.value}s`
  return parsed.value.done || 'done'
})

const { isPresenter, isPrintMode } = useNav()
const { $clicks } = useSlideContext()

async function replay() {
  const res = await fetch(props.recorded)
  output.value = await res.text()
  state.value = 'done'
}

// The presenter view renders the same slide: only the audience window runs.
if (unref(isPresenter) || unref(isPrintMode))
  replay()

watch(() => unref($clicks), (clicks) => {
  if (clicks >= 1 && state.value === 'idle')
    run()
})

async function run() {
  state.value = 'running'
  output.value = ''
  elapsed.value = 0
  timer = setInterval(() => elapsed.value++, 1000)
  try {
    const res = await fetch(`/__live-run/${props.id}`, { method: 'POST' })
    if (!res.ok || !res.body)
      throw new Error(`live run: ${res.status}`)
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done)
        break
      output.value += decoder.decode(value, { stream: true })
    }
    state.value = 'done'
  }
  catch {
    await replay()
  }
  finally {
    clearInterval(timer)
  }
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.agent-run {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 8px;
}

.agent-run__work {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.agent-run__steps {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.agent-step {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5em;
  font-family: var(--di-font-family-mono);
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  padding: 7px 12px;
  border: 1px solid var(--di-border);
  border-radius: var(--di-radius-sm);
  background: var(--di-surface);
  color: var(--di-fg);
}

.agent-step__verb {
  color: var(--di-slide-meta);
  font-size: 18px;
}

.agent-step--look {
  border-style: dashed;
}

.agent-step--write {
  background: var(--di-fg);
  border-color: var(--di-fg);
  color: var(--di-bg);
}

.agent-step--write .agent-step__verb {
  color: var(--di-bg);
  opacity: 0.75;
}

.agent-run__status {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
  font-variant-numeric: tabular-nums;
}

.agent-run__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--di-fg);
  animation: agent-pulse 1s ease-in-out infinite;
}

@keyframes agent-pulse {
  50% { opacity: 0.2; }
}

.agent-step-enter-active,
.agent-reply-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.agent-step-enter-from,
.agent-reply-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
</style>
