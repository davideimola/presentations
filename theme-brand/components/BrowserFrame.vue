<template>
  <div class="browser-frame">
    <div class="browser-bar">
      <span class="browser-dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="browser-url">{{ url }}</span>
    </div>
    <div class="browser-body" :style="{ background: bodyBg }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/* A screenshot frame with presence: 2px ink border, hard offset shadow,
   a linen title bar with three ink-outlined dots (no colour) and the url
   in a white field. Images inside fill the body edge to edge. */
defineProps({
  url: { type: String, default: 'davideimola.dev' },
  bodyBg: { type: String, default: 'var(--di-surface)' },
})
</script>

<style scoped>
.browser-frame {
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  border: 2px solid var(--di-fg);
  box-shadow: 8px 8px 0 rgba(28, 34, 51, 0.14);
  background: var(--di-surface);
  text-align: left;
}

.browser-bar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  height: 44px;
  box-sizing: border-box;
  padding: 0 14px;
  background: var(--di-surface-inline);
  border-bottom: 2px solid var(--di-fg);
}

.browser-dots {
  display: flex;
  gap: 7px;
  flex-shrink: 0;
}

.browser-dots i {
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  border: 2px solid var(--di-fg);
  border-radius: 50%;
}

.browser-url {
  flex: 1;
  min-width: 0;
  /* Optical centring: balance the dots on the left. */
  margin-right: 62px;
  padding: 2px 12px;
  background: var(--di-surface);
  border: 1px solid var(--di-fg);
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  line-height: 1.4;
  color: var(--di-slide-meta);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser-body {
  min-height: 0;
  overflow: hidden;
  line-height: 0;
}

.browser-body > :deep(*) {
  line-height: normal;
}

/* Screenshots fill the body edge to edge. */
.browser-body :deep(img),
.browser-body :deep(video),
.browser-body :deep(p:only-child > img:only-child) {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
}

.browser-body :deep(p:has(> img:only-child)) {
  margin: 0;
}
</style>
