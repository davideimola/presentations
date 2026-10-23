<template>
  <div class="timeline-span" :style="{ left: pos(from), width: width }">
    <span class="timeline-span__bracket" />
    <div class="timeline-span__label"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

/* A stretch of a <Timeline>, bracketed under its axis from `from` to `to`
   with a label below. Goes in the timeline's `spans` slot. */
const props = defineProps({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
})

const pos = inject<(at: number) => string>('timelinePos', () => '0%')
const width = computed(() => `calc(${pos(props.to)} - ${pos(props.from)})`)
</script>

<style scoped>
.timeline-span {
  position: absolute;
  top: 0;
}

.timeline-span__bracket {
  display: block;
  height: 18px;
  border: 3px solid var(--di-fg);
  border-top: none;
}

.timeline-span__label {
  margin-top: 10px;
  text-align: center;
  font-family: var(--di-font-family-mono);
  font-size: 20px;
  color: var(--di-fg);
  white-space: nowrap;
}
</style>
