<template>
  <div class="ledger" :style="{ '--ledger-value-width': `${valueWidth}px` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
/* Rows of big numbers, each with its meaning and source, between ink
   rules: a ledger. Put one <LedgerRow> per number; add v-click to a row to
   reveal it. `valueWidth` keeps the meanings aligned in one column. */
defineProps({
  valueWidth: { type: Number, default: 440 },
})
</script>
