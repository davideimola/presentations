<template>
  <div class="rungs">
    <span class="rungs__prefix">step</span>
    <span
      v-for="n in total"
      :key="n"
      class="rungs__step"
      :class="{ 'rungs__step--active': n === active, 'rungs__step--done': n < active }"
    >{{ String(n).padStart(2, '0') }}</span>
    <span v-if="label" class="rungs__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
/* Step indicator for a multi-step section. The active step is filled ink;
   no connectors, no rings: the graph lives in the mark and the footer. */
defineProps({
  active: { type: Number, required: true },
  total: { type: Number, default: 4 },
  label: { type: String },
})
</script>

<style scoped>
.rungs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.rungs__prefix {
  color: var(--di-slide-meta);
  margin-right: 6px;
}

.rungs__step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 28px;
  padding: 0 6px;
  border: 1px solid var(--di-border);
  border-radius: var(--di-radius-sm);
  color: var(--di-slide-meta);
}

.rungs__step--done {
  color: var(--di-fg);
  border-color: var(--di-slide-meta);
}

.rungs__step--active {
  background: var(--di-fg);
  border-color: var(--di-fg);
  color: var(--di-bg);
  font-weight: 600;
}

.rungs__label {
  color: var(--di-slide-meta);
  margin-left: 8px;
}
</style>
