<template>
  <div class="timeline-event" :class="[`timeline-event--${align}`, { 'timeline-event--key': mark }]" :style="{ left: pos(at) }">
    <div class="timeline-event__label">
      <div v-if="time" class="timeline-event__time">{{ time }}</div>
      <div class="timeline-event__title">{{ title }}</div>
      <div class="timeline-event__desc"><slot /></div>
    </div>
    <span class="timeline-event__stem" />
    <span class="timeline-event__dot" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

/* One event of a <Timeline>, placed at `at` on its axis: a stem down to a
   dot on the axis, the label above. The label starts at the event and
   runs right; `align="end"` makes it end there, for events near the end.
   `mark` fills the dot for the event that matters. */
defineProps({
  at: { type: Number, required: true },
  time: { type: String, default: '' },
  title: { type: String, required: true },
  align: { type: String as () => 'start' | 'end', default: 'start' },
  mark: { type: Boolean, default: false },
})

const pos = inject<(at: number) => string>('timelinePos', () => '0%')
</script>

<style scoped>
.timeline-event {
  position: absolute;
  bottom: -14px;
  width: 0;
  height: 100%;
}

.timeline-event__label {
  position: absolute;
  bottom: 54px;
  left: -2px;
  white-space: nowrap;
}

.timeline-event--end .timeline-event__label {
  left: auto;
  right: -2px;
  text-align: right;
}

.timeline-event__time {
  font-family: var(--di-font-family-mono);
  font-size: var(--di-slide-meta-size);
  color: var(--di-slide-meta);
}

.timeline-event__title {
  font-family: var(--di-font-family-mono);
  font-size: 24px;
  font-weight: 600;
  color: var(--di-fg);
}

.timeline-event__desc {
  font-size: 20px;
  line-height: 1.3;
  color: var(--di-fg-body);
}

.timeline-event__stem {
  position: absolute;
  bottom: 14px;
  left: -1px;
  width: 2px;
  height: 34px;
  background: var(--di-fg);
}

.timeline-event__dot {
  position: absolute;
  bottom: 4px;
  left: -10px;
  width: 20px;
  height: 20px;
  border: 3px solid var(--di-fg);
  border-radius: 50%;
  background: var(--di-bg);
}

.timeline-event--key .timeline-event__dot {
  left: -13px;
  bottom: 1px;
  width: 26px;
  height: 26px;
  background: var(--di-fg);
}
</style>
