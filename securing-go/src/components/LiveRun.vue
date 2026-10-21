<template>
  <div class="live-run">
    <div v-if="state === 'fallback'" class="live-run__fallback">
      <slot />
    </div>
    <pre v-else class="live-run__out" @click="run">{{ output }}<span v-if="state !== 'done'" class="live-run__cursor">▍</span></pre>
  </div>
</template>

<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
import { ref, unref, watch } from 'vue'

/* Runs a whitelisted command (see vite.config.ts) and streams its output
   into the slide. Starts on the slide's first click, or by clicking the
   window. Until then it shows a blinking cursor, like a terminal waiting.
   Without the dev server (static build, export) or on any error it shows
   the slot instead: put the recorded output there. */
const props = defineProps({
  id: { type: String, required: true },
})

const state = ref<'idle' | 'running' | 'done' | 'fallback'>('idle')
const output = ref('')

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

.live-run__cursor {
  animation: live-run-blink 1s steps(1) infinite;
}

@keyframes live-run-blink {
  50% {
    opacity: 0;
  }
}
</style>
