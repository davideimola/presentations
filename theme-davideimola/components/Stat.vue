<template>
  <div class="stat">
    <div class="stat__value">{{ value }}</div>
    <div class="stat__desc"><slot /></div>
    <div v-if="source" class="stat__source">{{ source }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value:  { type: String, required: true },
  source: { type: String },
})
</script>

<style scoped>
.stat__value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 60px;
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
}

.stat__desc {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-2);
}

.stat__source {
  margin-top: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-3);
}
</style>
