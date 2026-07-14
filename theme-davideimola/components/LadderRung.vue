<template>
  <div class="ladder-rung">
    <span class="ladder-rung__marker">{{ String(n).padStart(2, '0') }}</span>
    <div class="ladder-rung__body">
      <div class="ladder-rung__title">{{ title }}</div>
      <div class="ladder-rung__desc"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  n:     { type: Number, required: true },
  title: { type: String, required: true },
})
</script>

<style scoped>
/* Same visual language as <Rungs>: numbered marker boxes, one per rung,
   connected by a vertical line — the ladder, drawn. */
.ladder-rung {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.ladder-rung:not(:last-child) {
  padding-bottom: 14px;
}

/* Vertical connector from this marker down to the next one */
.ladder-rung:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 28px;
  bottom: 3px;
  width: 1px;
  background: var(--border-mid);
}

.ladder-rung__marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 24px;
  padding: 0 4px;
  border: 1px solid rgba(201, 31, 55, 0.3);
  border-radius: 3px;
  background: rgba(201, 31, 55, 0.08);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--accent-text);
  flex-shrink: 0;
}

.ladder-rung__title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px; /* aligns baseline with the marker box */
  color: var(--text-1);
}

.ladder-rung__desc {
  margin-top: 1px;
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-2);
}
</style>
