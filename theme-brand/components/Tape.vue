<template>
  <span class="di-tape" :style="{ transform: `rotate(${angle}deg)` }"><slot /></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tapeTilt } from '../logic/deck'

/* Label-maker tape: flat ink, paper letters, never red.
   The tilt alternates (-1deg, 1deg, -0.5deg): pass `n` to pick the step,
   or `tilt` to force an angle. Never stack two tapes on one block. */
const props = defineProps({
  n: { type: Number, default: 0 },
  tilt: { type: Number, default: undefined },
  size: { type: Number, default: 18 },
})

const angle = computed(() => props.tilt ?? tapeTilt(props.n))
</script>

<style scoped>
.di-tape {
  display: inline-block;
  align-self: flex-start;
  background: var(--di-tape-bg);
  color: var(--di-tape-fg);
  border-radius: var(--di-tape-radius);
  padding: var(--di-tape-padding-y) var(--di-tape-padding-x);
  font-family: var(--di-font-family-label);
  font-weight: 700;
  font-size: v-bind('`${size}px`');
  line-height: 1;
  letter-spacing: var(--di-type-label-tracking);
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
