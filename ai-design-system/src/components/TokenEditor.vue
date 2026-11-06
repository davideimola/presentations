<template>
  <div class="token-editor">
    <textarea
      v-model="snippet"
      class="token-editor__code"
      :readonly="!live"
      :rows="rows"
      spellcheck="false"
      autocomplete="off"
      aria-label="tokens.json, the token being edited"
      @keydown.stop="onKey"
    />
    <div class="token-editor__status">
      <span v-if="state === 'building'" class="token-editor__dot" />{{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, onMounted, ref, unref } from 'vue'

/* Demo 3a: one token of the brand, editable on the slide. ⌘S (Ctrl+S) sends
   it to the dev server, which writes it into a clone of the brand repo, runs
   the brand's own build and returns the palette variables that changed. They
   are applied in memory to every window of the deck (audience and presenter),
   so the marker and the knot change colour. Nothing on disk changes for the
   deck: putting the original value back, or reloading, restores the brand.
   Without the dev server (build, export) it is a plain code block. */
const props = defineProps({
  token: { type: String, default: 'akane' },
  fallback: {
    type: String,
    default: '"akane": {\n  "$value": "#C91F37",\n  "$description": "Akane red: the knot and the marker, nothing else"\n}',
  },
})

const snippet = ref(props.fallback)
const live = ref(false)
const state = ref<'idle' | 'building' | 'done' | 'error'>('idle')
const status = ref('⌘S builds the brand')
const rows = computed(() => snippet.value.split('\n').length)

const { isPrintMode } = useNav()

onMounted(async () => {
  if (unref(isPrintMode))
    return
  try {
    const res = await fetch(`/__brand/token?token=${props.token}`)
    const body = await res.json()
    if (!res.ok)
      throw new Error(body.error)
    snippet.value = body.snippet
    live.value = true
  }
  catch (err) {
    status.value = (err as Error).message || 'live editing needs pnpm dev'
  }
})

function onKey(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault()
    build()
  }
}

async function build() {
  if (!live.value || state.value === 'building')
    return
  state.value = 'building'
  status.value = 'node scripts/build.mjs'
  try {
    const res = await fetch(`/__brand/build?token=${props.token}`, { method: 'POST', body: snippet.value })
    const body = await res.json()
    if (!res.ok)
      throw new Error(body.error)
    applyBrand(body.vars)
    broadcast(body.vars)
    const changed = Object.entries(body.vars as Record<string, string>).map(([k, v]) => `${k} → ${v}`)
    status.value = `build.mjs · ${(body.ms / 1000).toFixed(1)}s · ${changed.length ? changed.join(', ') : 'back to the brand'}`
    state.value = 'done'
  }
  catch (err) {
    status.value = (err as Error).message
    state.value = 'error'
  }
}
</script>

<script lang="ts">
/* Shared by every instance and every window of the deck on this origin. */
const STYLE_ID = 'brand-live'
const channel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel('brand-live')

function applyBrand(vars: Record<string, string>) {
  document.getElementById(STYLE_ID)?.remove()
  const decls = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join(' ')
  if (!decls)
    return
  const style = document.createElement('style')
  style.id = STYLE_ID
  // Doubled :root so it outranks the brand's own :root, whatever the order.
  style.textContent = `:root:root { ${decls} }`
  document.head.appendChild(style)
}

function broadcast(vars: Record<string, string>) {
  channel?.postMessage(vars)
}

channel?.addEventListener('message', event => applyBrand(event.data))
</script>

<style scoped>
.token-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.token-editor__code {
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 24px 28px;
  font-family: var(--di-font-family-mono);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--di-fg);
  background: var(--di-surface);
  border: 1px solid var(--di-border);
  border-radius: 0;
  outline: none;
  caret-color: var(--di-fg);
}

.token-editor__code:focus {
  border-color: var(--di-fg);
}

.token-editor__status {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 24px;
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
}

.token-editor__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--di-fg);
  animation: token-editor-pulse 1s ease-in-out infinite;
}

@keyframes token-editor-pulse {
  50% { opacity: 0.2; }
}
</style>
