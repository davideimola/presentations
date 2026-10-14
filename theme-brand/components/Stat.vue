<template>
  <div class="stat">
    <div class="stat__value">{{ value }}</div>
    <div class="stat__desc"><slot /></div>
    <div v-if="source" class="stat__source">{{ source }}</div>
  </div>
</template>

<script setup lang="ts">
/* A big number in ink, its meaning, and an optional source in mono. */
defineProps({
  value: { type: String, required: true },
  source: { type: String },
})
</script>

<style scoped>
.stat {
  padding-top: 18px;
  border-top: 1px solid var(--di-fg);
}

.stat__value {
  font-size: 96px;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.055em;
  color: var(--di-fg);
}

.stat__desc {
  margin-top: 14px;
  font-size: var(--di-slide-body);
  line-height: 1.35;
  color: var(--di-fg-body);
}

.stat__source {
  margin-top: 10px;
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
}
</style>
