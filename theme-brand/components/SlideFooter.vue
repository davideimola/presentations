<template>
  <footer class="di-footer">
    <span class="di-footer__brand">
      <BrandMark :size="26" cut="s" />
      <Wordmark bold :width="130" />
    </span>

    <!-- Progress: one segment per section, as long as its share of the
         slides. Done in a 5px ink line, ahead in a 2px ash line, the red
         knot at the current slide. -->
    <div class="di-footer__bar" aria-hidden="true">
      <span
        v-for="seg in segments"
        :key="seg.start"
        class="di-footer__seg"
        :style="{ flexGrow: seg.count }"
      >
        <span class="di-footer__todo" />
        <span v-if="seg.done > 0" class="di-footer__done" :style="{ width: pct(seg.done) }" />
        <span v-if="seg.current" class="di-footer__knot" :style="{ left: pct(seg.done) }" />
      </span>
    </div>

    <span class="di-footer__meta">
      <span v-if="sectionName" class="di-footer__section" :title="sectionName">{{ sectionName }}</span>
      <span class="di-footer__page">{{ page }} / {{ total }}</span>
    </span>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeck } from '../logic/deck'
import BrandMark from './BrandMark.vue'
import Wordmark from './Wordmark.vue'

const { page, total, sectionStarts, currentSection } = useDeck()

/* Slides before the first section belong to the first segment. */
const segments = computed(() => {
  const starts = sectionStarts.value
  const bounds = starts.length ? [1, ...starts.slice(1)] : [1]
  return bounds.map((start, i) => {
    const end = i + 1 < bounds.length ? bounds[i + 1] - 1 : total.value
    const count = Math.max(1, end - start + 1)
    let done = 0
    if (page.value > end)
      done = 1
    else if (page.value >= start)
      done = count > 1 ? (page.value - start) / (count - 1) : 1
    const current = page.value >= start && page.value <= end
    return { start, count, done, current }
  })
})

const sectionName = computed(() => {
  const label = currentSection.value?.frontmatter?.label
  return typeof label === 'string' && label ? label : ''
})

function pct(ratio: number) {
  return `${(ratio * 100).toFixed(3)}%`
}
</script>

<style scoped>
/* One flex row: brand | bar | section name | counter. The bar is the
   only flexible item and the name is capped, so nothing can overlap. */
.di-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 32px;
  padding-top: 18px;
}

.di-footer__brand {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.di-footer__bar {
  flex: 1;
  min-width: 240px;
  display: flex;
  gap: 12px;
  height: 20px;
}

.di-footer__seg {
  position: relative;
  flex-basis: 0;
  min-width: 0;
}

.di-footer__todo,
.di-footer__done {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.di-footer__todo {
  right: 0;
  height: 2px;
  border-radius: 1px;
  background: var(--di-slides-graph-line);
}

.di-footer__done {
  height: 5px;
  min-width: 5px;
  border-radius: 2.5px;
  background: var(--di-fg);
}

.di-footer__knot {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: var(--di-accent);
  transform: translate(-50%, -50%);
}

.di-footer__meta {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 24px;
  min-width: 0;
}

.di-footer__section {
  max-width: 300px;
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.di-footer__page {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
