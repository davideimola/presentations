<template>
  <div class="ledger-row">
    <div class="ledger-row__value">{{ value }}</div>
    <div class="ledger-row__body">
      <div class="ledger-row__desc"><slot /></div>
      <Tape v-if="source" class="ledger-row__source" :n="n" :size="14">{{ source }}</Tape>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tape from './Tape.vue'

/* One row of a <Ledger>: the number in ink, its meaning beside it, the
   source on a small tape. `n` picks the tape's tilt step: alternate it
   from row to row. */
defineProps({
  value: { type: String, required: true },
  source: { type: String, default: '' },
  n: { type: Number, default: 0 },
})
</script>

<style scoped>
.ledger-row {
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 24px 0;
  border-bottom: 1px solid var(--di-fg);
}

/* Every row closes itself and the first one also opens the ledger: with
   v-click rows, each rule shows together with its row, never alone. */
.ledger-row:first-child {
  border-top: 1px solid var(--di-fg);
}

.ledger-row__value {
  flex-shrink: 0;
  width: var(--ledger-value-width, 440px);
  font-size: 120px;
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.055em;
  color: var(--di-fg);
}

.ledger-row__desc {
  font-size: var(--di-slide-body);
  line-height: 1.35;
  color: var(--di-fg-body);
}

.ledger-row__source {
  margin-top: 12px;
}
</style>
