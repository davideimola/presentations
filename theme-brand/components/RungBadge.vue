<template>
  <span class="rung-badge">{{ String(n).padStart(2, '0') }}</span>
</template>

<script setup lang="ts">
/* Inline step number, same language as <Rungs>. Em-based, scales with text. */
defineProps({
  n: { type: Number, required: true },
})
</script>

<style scoped>
.rung-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.9em;
  padding: 0.05em 0.25em;
  border-radius: var(--di-radius-sm);
  background: var(--di-fg);
  color: var(--di-bg);
  font-family: var(--di-font-family-mono);
  font-size: 0.7em;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5;
  vertical-align: middle;
}
</style>
