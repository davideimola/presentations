<template>
  <div class="browser-frame">
    <div class="browser-bar">
      <span class="browser-url">{{ url }}</span>
    </div>
    <div class="browser-body" :style="{ background: bodyBg }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/* A screenshot frame: white surface, hairline border, the url in mono.
   No traffic lights, no shadow. */
defineProps({
  url: { type: String, default: 'davideimola.dev' },
  bodyBg: { type: String, default: 'var(--di-surface)' },
})
</script>

<style scoped>
.browser-frame {
  display: inline-block;
  max-width: 100%;
  background: var(--di-surface);
  border: 1px solid var(--di-border);
  text-align: left;
}

.browser-bar {
  padding: 10px 16px;
  border-bottom: 1px solid var(--di-border);
}

.browser-url {
  display: block;
  font-family: var(--di-font-family-mono);
  font-size: 15px;
  color: var(--di-fg-subtle);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser-body {
  padding: 14px;
}

.browser-body :deep(img) {
  display: block;
  margin: 0;
}
</style>
