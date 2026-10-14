<template>
  <span class="badge" :class="`badge--${type}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
/* Small mono label for versions, status, tech. Not a tape: tape is for
   sections and content types. `accent` is filled ink, never red. */
defineProps({
  type: { type: String, default: 'default' }, // default | accent | success | warning
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--di-font-family-mono);
  font-size: 0.6em;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.5;
  padding: 0.1em 0.55em;
  border: 1px solid var(--di-border);
  border-radius: var(--di-radius-sm);
  color: var(--di-fg-muted);
  background: var(--di-surface);
  vertical-align: middle;
}

.badge--accent {
  background: var(--di-fg);
  border-color: var(--di-fg);
  color: var(--di-bg);
}

.badge--success {
  border-color: var(--di-fg);
  color: var(--di-fg);
}

.badge--success::before {
  content: '✓';
  margin-right: 0.4em;
}

.badge--warning {
  border-color: var(--di-fg);
  border-style: dashed;
  color: var(--di-fg);
}
</style>
