<template>
  <div class="browser-frame">
    <div class="browser-titlebar">
      <div class="browser-dots">
        <span class="dot dot--close" />
        <span class="dot dot--minimize" />
        <span class="dot dot--expand" />
      </div>
      <span class="browser-url">{{ url }}</span>
    </div>
    <div class="browser-body" :style="{ background: bodyBg }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  url:    { type: String, default: 'davideimola.dev' },
  bodyBg: { type: String, default: 'var(--bg)' },
})
</script>

<style scoped>
.browser-frame {
  display: inline-block;
  max-width: 100%;
  border: 1px solid var(--border-mid);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  text-align: left;
}

.browser-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
}

.browser-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot--close    { background: var(--accent); }
.dot--minimize { background: #3a3530; }
.dot--expand   { background: #3a3530; }

.browser-url {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-3);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 2px 14px;
  flex: 1;
  text-align: center;
  margin-right: 52px; /* bilancia i dots */
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
