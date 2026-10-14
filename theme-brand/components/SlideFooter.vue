<template>
  <footer class="di-footer">
    <span class="di-footer__brand">
      <BrandMark :size="26" cut="s" />
      <Wordmark bold :width="130" />
    </span>

    <!-- The progress bar is a graph line: a commit ring where each section
         starts, the red knot at the current slide. The only place outside
         the mark where the graph appears. -->
    <div class="di-footer__graph" aria-hidden="true">
      <span class="di-footer__line" />
      <span
        v-for="no in rings"
        :key="no"
        class="di-footer__ring"
        :class="{ 'di-footer__ring--past': no < page }"
        :style="{ left: x(no) }"
      />
      <span class="di-footer__knot" :style="{ left: x(page) }" />
    </div>

    <span class="di-footer__page">{{ page }} / {{ total }}</span>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeck } from '../logic/deck'
import BrandMark from './BrandMark.vue'
import Wordmark from './Wordmark.vue'

const { page, total, sectionStarts } = useDeck()

const rings = computed(() => sectionStarts.value.filter(no => no !== page.value))

function x(no: number) {
  const ratio = total.value > 1 ? (no - 1) / (total.value - 1) : 0
  return `${(ratio * 100).toFixed(3)}%`
}
</script>

<style scoped>
.di-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 18px;
}

.di-footer__brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.di-footer__graph {
  position: relative;
  flex: 1;
  height: 20px;
  margin: 0 8px;
}

.di-footer__line {
  position: absolute;
  left: -4px;
  right: -4px;
  top: 11px;
  height: 2px;
  background: var(--di-slides-graph-line);
}

.di-footer__ring {
  position: absolute;
  top: 12px;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid var(--di-slides-graph-line);
  background: var(--di-bg);
  transform: translate(-50%, -50%);
}

.di-footer__ring--past {
  border-color: var(--di-slides-graph-ring);
}

.di-footer__knot {
  position: absolute;
  top: 12px;
  width: 13px;
  height: 13px;
  border-radius: 2.5px;
  background: var(--di-accent);
  transform: translate(-50%, -50%);
}

.di-footer__page {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
