<template>
  <div class="live-run">
    <div v-if="state === 'fallback'" class="live-run__fallback">
      <slot />
    </div>
    <pre v-else class="live-run__out" @click="run"><template v-for="(line, i) in lines" :key="i"><span :class="{ 'live-run__mark': marked(line) }">{{ line }}<slot v-if="i === firstMark" name="mark" /></span>{{ i < lines.length - 1 ? '\n' : '' }}</template><span v-if="state !== 'done'" class="live-run__cursor">▍</span></pre>
  </div>
</template>

<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { computed, ref, unref, watch } from 'vue'

/* Runs a whitelisted command (see vite.config.ts) and streams its output
   into the slide. Starts on the slide's first click, or by clicking the
   window. Until then it shows a blinking cursor, like a terminal waiting.
   Without the dev server (static build, export) or on any error it shows
   the slot instead: put the recorded output there. Lines matching `mark`
   (a regular expression) show in the accent color: the one line that matters.
   The `mark` slot is placed on the first of them, so an annotation drawn
   there follows the line wherever the output puts it. */
const props = defineProps({
  id: { type: String, required: true },
  mark: { type: String, default: '' },
})

const state = ref<'idle' | 'running' | 'done' | 'fallback'>('idle')
const output = ref('')
const lines = computed(() => output.value.split('\n'))
const markRe = computed(() => props.mark ? new RegExp(props.mark) : null)

const firstMark = computed(() => lines.value.findIndex(marked))

function marked(line: string) {
  return markRe.value?.test(line) ?? false
}

const { isPresenter, isPrintMode } = useNav()
const { $clicks } = useSlideContext()

// The presenter view renders the same slide: only the audience window runs.
if (unref(isPresenter) || unref(isPrintMode))
  state.value = 'fallback'

watch(() => unref($clicks), (clicks) => {
  if (clicks >= 1 && state.value === 'idle')
    run()
})

async function run() {
  if (state.value !== 'idle')
    return
  state.value = 'running'
  output.value = ''
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
    state.value = 'fallback'
  }
}
</script>

<style scoped>
.live-run {
  min-height: 120px;
}

.live-run__out {
  margin: 0;
  padding: 16px 28px;
  font-family: var(--di-font-family-mono);
  font-size: 22px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  background: transparent;
}

.live-run__mark {
  position: relative;
  color: var(--di-accent);
  font-weight: 700;
}

.live-run__cursor {
  animation: live-run-blink 1s steps(1) infinite;
}

@keyframes live-run-blink {
  50% {
    opacity: 0;
  }
}
</style>
