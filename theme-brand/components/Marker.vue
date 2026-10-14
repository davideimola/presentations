<template>
  <span ref="root" class="di-marker" :class="{ 'di-marker--draw': drawing }">
    <svg
      v-if="geometry"
      class="di-marker__stroke"
      :width="geometry.w"
      :height="geometry.h"
      :viewBox="`0 0 ${geometry.w} ${geometry.h}`"
      :style="{ left: `${-geometry.pad}px`, top: `${geometry.top}px` }"
      aria-hidden="true"
    >
      <defs>
        <filter :id="filterId" x="-10%" y="-60%" width="120%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
        </filter>
      </defs>
      <path
        :d="geometry.d"
        pathLength="1"
        fill="none"
        stroke="var(--di-accent)"
        :stroke-width="geometry.stroke"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
      />
    </svg>
    <span class="di-marker__text"><slot /><span ref="probe" class="di-marker__probe" /></span>
  </span>
</template>

<script setup lang="ts">
import { onSlideEnter, useNav, useSlideContext } from '@slidev/client'
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'

/* The marker: one rough red stroke per slide, under the word that matters.
   Skip-ink: the word sits above the stroke with a paper halo, so the letters
   cut through the red. Geometry follows the approved mockup (P-Marker,
   option 2) scaled by the font size: thickness 0.19em, just under the
   baseline. It draws itself once, left to right, the first time the slide
   is shown; it is static in exports and with reduced motion. */

const filterId = `di-marker-rough-${useId()}`

const root = ref<HTMLElement>()
const probe = ref<HTMLElement>()
const geometry = ref<{ w: number, h: number, pad: number, top: number, stroke: number, d: string } | null>(null)
const drawing = ref(false)
let drawn = false
let observer: ResizeObserver | undefined

const { isPrintMode } = useNav()
const { $renderContext } = useSlideContext()

function measure() {
  const el = root.value
  if (!el)
    return
  const em = Number.parseFloat(getComputedStyle(el).fontSize) || 16
  const word = el.offsetWidth
  if (!word)
    return
  // Mockup at 64px: svg 4px left of the word, 26px tall, stroke 12px,
  // path "M8 14 C80 7 210 7 282 11" over a 290px box. The svg top sits on
  // the baseline (measured with a zero-size inline-block probe), so the
  // stroke runs just under it whatever the line-height.
  const box = el.getBoundingClientRect()
  const scale = el.offsetHeight ? box.height / el.offsetHeight : 1
  const baseline = probe.value && scale
    ? (probe.value.getBoundingClientRect().top - box.top) / scale
    : el.offsetHeight * 0.8
  const pad = 0.0625 * em
  const w = word + 2 * pad
  const h = 0.41 * em
  const inset = 0.125 * em
  const d = [
    `M${inset} ${0.22 * em}`,
    `C${w * 0.276} ${0.11 * em}`,
    `${w * 0.724} ${0.11 * em}`,
    `${w - inset} ${0.17 * em}`,
  ].join(' ')
  geometry.value = { w, h, pad, top: baseline - 0.02 * em, stroke: 0.19 * em, d }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

onSlideEnter(() => {
  const live = ['slide', 'presenter'].includes($renderContext.value)
  if (drawn || !live || isPrintMode.value || prefersReducedMotion())
    return
  drawn = true
  drawing.value = true
})

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (root.value)
    observer.observe(root.value)
  document.fonts?.ready.then(measure)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.di-marker {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}

.di-marker__stroke {
  position: absolute;
  z-index: 0;
  overflow: visible;
  pointer-events: none;
}

.di-marker__text {
  position: relative;
  z-index: 1;
  /* Paper halo of about 0.06em: the letters cut through the stroke. */
  text-shadow:
    var(--di-marker-halo) 0 0 var(--di-bg),
    calc(-1 * var(--di-marker-halo)) 0 0 var(--di-bg),
    0 var(--di-marker-halo) 0 var(--di-bg),
    0 calc(-1 * var(--di-marker-halo)) 0 var(--di-bg),
    0.045em 0.045em 0 var(--di-bg),
    -0.045em 0.045em 0 var(--di-bg),
    0.045em -0.045em 0 var(--di-bg),
    -0.045em -0.045em 0 var(--di-bg);
}

.di-marker__probe {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: baseline;
}

.di-marker--draw path {
  stroke-dasharray: 1;
  animation: di-marker-draw 500ms ease-out 250ms both;
}

@keyframes di-marker-draw {
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .di-marker--draw path { animation: none; }
}
</style>
