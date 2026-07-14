<template>
  <div class="rungs">
    <span class="rungs__prefix">// rung</span>
    <template v-for="n in total" :key="n">
      <span v-if="n > 1" class="rungs__link" />
      <span
        class="rungs__step"
        :class="{ 'rungs__step--active': n === active }"
      >{{ String(n).padStart(2, '0') }}</span>
    </template>
    <span v-if="label" class="rungs__label">· {{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  active: { type: Number, required: true },
  total:  { type: Number, default: 4 },
  label:  { type: String },
})
</script>

<style scoped>
.rungs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.rungs__prefix {
  color: var(--accent-text);
  font-weight: 600;
  margin-right: 4px;
}

.rungs__step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 22px;
  padding: 0 4px;
  border: 1px solid var(--border-mid);
  border-radius: 3px;
  color: var(--text-3);
  letter-spacing: 0.04em;
}

.rungs__step--active {
  color: var(--accent-text);
  border-color: rgba(201, 31, 55, 0.3);
  background: rgba(201, 31, 55, 0.08);
  font-weight: 600;
}

.rungs__link {
  width: 10px;
  height: 1px;
  background: var(--border-mid);
  flex-shrink: 0;
}

.rungs__label {
  color: var(--text-3);
  margin-left: 4px;
}
</style>
