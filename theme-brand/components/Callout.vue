<template>
  <div class="callout" :class="`callout--${type}`">
    <span class="callout__label">{{ label || labels[type] || type }}</span>
    <div class="callout__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/* A boxed aside on the code surface. Types differ by label and weight,
   not by colour: red belongs to the knot and the marker only. */
defineProps({
  type: { type: String, default: 'note' }, // note | tip | warning | danger
  label: { type: String, default: '' },
})

const labels: Record<string, string> = {
  note: 'note',
  tip: 'tip',
  warning: 'warning',
  danger: 'danger',
}
</script>

<style scoped>
.callout {
  display: flex;
  gap: 20px;
  align-items: baseline;
  padding: 16px 22px;
  margin: 14px 0;
  background: var(--di-surface);
  border: 1px solid var(--di-border);
}

.callout__label {
  flex-shrink: 0;
  min-width: 96px;
  font-family: var(--di-font-family-mono);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--di-fg-subtle);
}

.callout__body {
  flex: 1;
  font-size: 24px;
  line-height: 1.4;
  color: var(--di-fg-body);
}

.callout__body :deep(p) {
  font-size: inherit;
  margin: 0;
}

/* tip: same box, ink label */
.callout--tip .callout__label {
  color: var(--di-fg);
}

/* warning: ink border, ink label */
.callout--warning {
  border-color: var(--di-fg);
}

.callout--warning .callout__label {
  color: var(--di-fg);
  font-weight: 600;
}

/* danger: inverted label chip, heavier border, ink text */
.callout--danger {
  border: 2px solid var(--di-fg);
}

.callout--danger .callout__label {
  align-self: flex-start;
  min-width: 0;
  background: var(--di-fg);
  color: var(--di-bg);
  font-weight: 600;
  padding: 2px 8px;
  margin-right: 12px;
}

.callout--danger .callout__body {
  color: var(--di-fg);
}
</style>
