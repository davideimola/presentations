<template>
  <span class="rung-badge">{{ String(n).padStart(2, '0') }}</span>
</template>

<script setup lang="ts">
defineProps({
  n: { type: Number, required: true },
})
</script>

<style scoped>
/* Inline rung marker, same visual language as <Rungs>/<LadderRung>.
   Em-based so it scales with the surrounding text (works in h1 too). */
.rung-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.9em;
  padding: 0.05em 0.25em;
  border: 1px solid rgba(201, 31, 55, 0.3);
  border-radius: 3px;
  background: rgba(201, 31, 55, 0.08);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5;
  color: var(--accent-text);
  vertical-align: middle;
}
</style>
