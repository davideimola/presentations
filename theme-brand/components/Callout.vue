<template>
  <div class="callout" :class="`callout--${type}`">
    <Tape class="callout__tape" :n="tilt" :inverse="type === 'danger'">{{ label || type }}</Tape>
    <div class="callout__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tape from './Tape.vue'

/* A block that stands out, like the cards on the site: white surface,
   2px ink border, a flat ink tape overlapping the top-left edge.
   Types differ by weight and fill, never by red:
   note    white block
   tip     linen fill
   warning 3px ink border
   danger  inverted: ink block, paper text, paper tape */
const props = defineProps({
  type: { type: String, default: 'note' }, // note | tip | warning | danger
  label: { type: String, default: '' },
})

// Each type gets its own tilt step, so stacked callouts never tilt alike.
const tilt = computed(() => ['note', 'tip', 'warning', 'danger'].indexOf(props.type) % 3)
</script>

<style scoped>
.callout {
  position: relative;
  margin: 30px 0 18px;
  padding: 26px 26px 18px;
  background: var(--di-surface);
  border: 2px solid var(--di-fg);
  color: var(--di-fg);
}

.callout__tape {
  position: absolute;
  top: -15px;
  left: 18px;
}

.callout__body {
  font-size: var(--di-slide-body);
  font-weight: var(--di-slide-body-weight);
  line-height: 1.4;
  color: inherit;
}

.callout__body :deep(p) {
  font-size: inherit;
  color: inherit;
  margin: 0;
}

.callout__body :deep(strong) {
  color: inherit;
}

.callout--tip {
  background: var(--di-surface-inline);
}

.callout--warning {
  border-width: 3px;
}

.callout--danger {
  background: var(--di-fg);
  color: var(--di-bg);
}

.callout--danger .callout__body :deep(code) {
  background: rgba(247, 245, 240, 0.16);
  color: var(--di-bg);
}
</style>
