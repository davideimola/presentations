<template>
  <BrowserFrame :url="`localhost:6006 · ${title}`" class="w-full">
    <div class="story-frame" :style="{ height: `${height}px` }">
      <iframe
        v-if="live"
        :src="`http://localhost:6006/iframe.html?id=${id}&viewMode=story`"
        :style="{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})` }"
        :title="title"
      />
      <img v-else :src="fallback" :alt="alt">
    </div>
  </BrowserFrame>
</template>

<script setup lang="ts">
import { useNav } from '@slidev/client'
import { onMounted, ref, unref } from 'vue'

/* A Storybook story, live, inside a browser frame: whatever the AI just
   wrote shows up here. Without Storybook running (or in an export) it shows
   `fallback`, a screenshot taken during the rehearsal. */
const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  fallback: { type: String, required: true },
  alt: { type: String, default: '' },
  height: { type: Number, default: 300 },
  scale: { type: Number, default: 1.6 },
})

const live = ref(false)
const { isPrintMode } = useNav()

onMounted(async () => {
  if (unref(isPrintMode))
    return
  try {
    // no-cors: an opaque answer is enough to know Storybook is up.
    await fetch('http://localhost:6006/index.json', { mode: 'no-cors', cache: 'no-store' })
    live.value = true
  }
  catch {
    live.value = false
  }
})
</script>

<style scoped>
.story-frame {
  position: relative;
  overflow: hidden;
  background: var(--di-bg);
}

.story-frame iframe {
  border: 0;
  transform-origin: 0 0;
}

.story-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0 0;
}
</style>
