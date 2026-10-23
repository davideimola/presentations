<template>
  <div class="timeline">
    <div class="timeline__events">
      <slot />
    </div>
    <div class="timeline__axis">
      <span
        v-for="[at, label] in ticks"
        :key="at"
        class="timeline__tick"
        :style="{ left: pos(at) }"
      ><span class="timeline__tick-label">{{ label }}</span></span>
    </div>
    <div class="timeline__spans">
      <slot name="spans" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

/* A horizontal timeline: an ink axis from `from` to `to` (any unit, e.g.
   minutes), labelled `ticks` as [at, label] pairs, <TimelineEvent>s above
   it and <TimelineSpan>s in the `spans` slot below it. Add v-click to an
   event or a span to reveal it. No red: the key event is a filled dot. */
const props = defineProps({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  ticks: { type: Array as () => [number, string][], default: () => [] },
})

function pos(at: number) {
  const ratio = (at - props.from) / (props.to - props.from)
  return `${(Math.min(1, Math.max(0, ratio)) * 100).toFixed(3)}%`
}

provide('timelinePos', pos)
</script>

<style scoped>
.timeline {
  position: relative;
  padding-top: 8px;
}

.timeline__events {
  position: relative;
  height: 150px;
}

.timeline__axis {
  position: relative;
  height: 4px;
  background: var(--di-fg);
  border-radius: 2px;
}

.timeline__tick {
  position: absolute;
  top: -8px;
  width: 2px;
  height: 20px;
  margin-left: -1px;
  background: var(--di-fg);
}

.timeline__tick-label {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--di-font-family-mono);
  font-size: var(--di-slide-meta-size);
  color: var(--di-slide-meta);
  white-space: nowrap;
}

.timeline__spans {
  position: relative;
  margin-top: 64px;
  min-height: 80px;
}
</style>
