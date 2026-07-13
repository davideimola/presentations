<template>
  <div class="callout" :class="`callout--${type}`">
    <span class="callout__icon">{{ icons[type] }}</span>
    <div class="callout__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: { type: String, default: 'note' }, // note | tip | warning | danger
})

const icons: Record<string, string> = {
  note:    '//',
  tip:     '→',
  warning: '⚠',
  danger:  '!',
}
</script>

<style scoped>
.callout {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 18px;
  border-radius: 4px;
  border-left: 2px solid;
  margin: 12px 0;
  font-family: 'IBM Plex Sans', sans-serif;
}

.callout__icon {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
}

.callout__body {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.6;
}

.callout__body :deep(p) {
  margin: 0;
  font-size: inherit;
}

/* note */
.callout--note {
  background: var(--bg-card);
  border-color: #4a4540;
  .callout__icon { color: var(--text-2); }
  .callout__body { color: #b5aea6; }
}

/* tip */
.callout--tip {
  background: rgba(74, 158, 110, 0.08);
  border-color: rgba(74, 158, 110, 0.6);
  .callout__icon { color: #4a9e6e; }
  .callout__body { color: var(--text-1); }
}

/* warning */
.callout--warning {
  background: rgba(212, 149, 15, 0.08);
  border-color: rgba(212, 149, 15, 0.6);
  .callout__icon { color: #d4950f; }
  .callout__body { color: var(--text-1); }
}

/* danger */
.callout--danger {
  background: rgba(201, 31, 55, 0.06);
  border-color: var(--accent);
  .callout__icon { color: var(--accent-text); }
  .callout__body { color: var(--text-1); }
}
</style>
