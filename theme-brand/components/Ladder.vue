<template>
  <div
    class="ladder"
    :class="{ 'ladder--compact': compact, 'ladder--anchored': compact && total > 0 }"
    :data-rungs="compact ? density : undefined"
  >
    <slot />
    <LadderRung
      v-for="n in placeholders"
      :key="n"
      class="ladder-rung--empty"
      :n="filled + n"
      title="&nbsp;"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import { Comment, Fragment, computed, useSlots, type VNode } from 'vue'
import LadderRung from './LadderRung.vue'

/* A vertical list of steps split by hairlines.
   compact: one line per rung, the descriptions lined up in one column.
   A compact ladder sizes itself on its rungs: fewer rungs, bigger type and
   more air, so it fills the slide without per-slide styles.
   total: the number of rungs the ladder will reach over several slides. It
   sizes on that number and keeps the missing rungs as empty, numbered slots,
   so a list that grows slide by slide stays put and only the new rung moves. */
const props = defineProps({
  compact: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
})

const slots = useSlots()

const countRungs = (nodes: VNode[] = []): number =>
  nodes.reduce((total, node) => {
    if (node.type === Comment) return total
    if (node.type === Fragment) return total + countRungs(node.children as VNode[])
    return typeof node.type === 'object' ? total + 1 : total
  }, 0)

/* Buckets, not a formula: each one was checked on a 1280 x 720 default slide
   under a one-line title. */
const filled = computed(() => countRungs(slots.default?.()))
const placeholders = computed(() => Math.max(0, props.total - filled.value))

const density = computed(() => {
  const n = Math.max(filled.value, props.total)
  if (n <= 3) return 'few'
  if (n === 4) return 'four'
  if (n === 5) return 'five'
  return 'many'
})
</script>

<style scoped>
.ladder {
  --ladder-title-size: 28px;
  --ladder-rung-pad: 14px;
  display: flex;
  flex-direction: column;
}

/* Compact: a grid shared by every rung, so each description starts at the
   same x whatever the longest title. */
.ladder--compact {
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 0;
  --ladder-rung-pad: 8px;
}

/* A growing ladder cannot size its title column on titles it has not shown
   yet: the column is fixed, so the descriptions never move slide to slide. */
.ladder--anchored {
  grid-template-columns: auto 32% 1fr;
}

/* In a growing ladder the slot is already there: a rung revealed on click
   keeps its hairline and its faint number while hidden, and only its words
   fade in. */
.ladder--anchored :deep(.ladder-rung.slidev-vclick-hidden) {
  opacity: 1 !important;
  transform: none !important;
}

.ladder--anchored :deep(.ladder-rung__marker),
.ladder--anchored :deep(.ladder-rung__title),
.ladder--anchored :deep(.ladder-rung__desc) {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.ladder--anchored :deep(.slidev-vclick-hidden .ladder-rung__marker) {
  opacity: 0.35;
}

.ladder--anchored :deep(.slidev-vclick-hidden .ladder-rung__title),
.ladder--anchored :deep(.slidev-vclick-hidden .ladder-rung__desc) {
  opacity: 0;
  transform: translateY(6px);
}

.ladder--compact[data-rungs='few'] {
  --ladder-title-size: 40px;
  --ladder-rung-pad: 40px;
}

.ladder--compact[data-rungs='four'] {
  --ladder-title-size: 36px;
  --ladder-rung-pad: 30px;
}

.ladder--compact[data-rungs='five'] {
  --ladder-title-size: 34px;
  --ladder-rung-pad: 22px;
}

.ladder--compact :deep(.ladder-rung) {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}

.ladder--compact :deep(.ladder-rung__body) {
  display: contents;
}

.ladder--compact :deep(.ladder-rung__title) {
  padding-right: 36px;
}

/* An empty slot of a growing ladder: the hairline and a faint number. */
.ladder :deep(.ladder-rung--empty .ladder-rung__marker) {
  opacity: 0.35;
}

.ladder--compact :deep(.ladder-rung__desc) {
  margin-top: 0;
  align-self: baseline;
}
</style>
