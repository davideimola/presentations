<template>
  <div class="hex-chaos">
    <div v-show="clicks >= 1" class="hex-chaos__row">
      <div class="hex-chaos__count">
        <span class="hex-chaos__number">{{ clicks >= 2 ? greys.length : before.length }}</span>
        <span class="hex-chaos__label">{{ clicks >= 2 ? 'shades of grey. Not quite fifty.' : 'distinct hex colours in src' }}</span>
        <span class="hex-chaos__source">before</span>
      </div>
      <div class="hex-chaos__chips">
        <i
          v-for="c in before"
          :key="c"
          :style="{ background: c }"
          :class="{ 'hex-chaos__chip--off': clicks >= 2 && !greys.includes(c) }"
        />
      </div>
    </div>
    <div v-show="clicks >= 3" class="hex-chaos__row">
      <div class="hex-chaos__count">
        <span class="hex-chaos__number">{{ today.length }}</span>
        <span class="hex-chaos__label">with a system</span>
        <span class="hex-chaos__source">after</span>
      </div>
      <div class="hex-chaos__chips">
        <i v-for="c in today" :key="c" :style="{ background: c }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed, unref } from 'vue'

/* Chapter 1: the real colours of the site, not just their count. Every
   distinct hex in src of the Cursor site (website-next-cursor-1.0, case and
   #fff/#ffffff folded), then the seven of main today.
   Click 1: the 34, greys first. Click 2: everything but the greys fades.
   Click 3: today. */
const all = ([
  '#000000', '#0a0a0a', '#0d0d0d', '#141414', '#1a1816', '#2a2725', '#333333', '#3a3735',
  '#3e3b38', '#54504c', '#666666', '#726d68', '#9ca3af', '#a39e98', '#c9c8cd', '#d1d5db',
  '#d4cfc9', '#e0e0e0', '#e5e7eb', '#e6e4e0', '#f0f0f0', '#f3f4f6', '#f4f4f4', '#f9f9f9',
  '#ffffff', '#007a3d', '#009246', '#00a651', '#165e83', '#1e6b93', '#3897f0', '#c91f37',
  '#d3381c', '#fca5a5',
])
// The neutrals first, black to white, then the colours grouped by hue: when
// the colours fade, a clean grey scale is left.
const neutral = (c: string) => chroma(c) < 0.08
const before = [...sortByLightness(all.filter(neutral)), ...sortByHue(all.filter(c => !neutral(c)))]
// Greys without black and white: low chroma, neither end of the scale.
const greys = before.filter(c => neutral(c) && c !== '#000000' && c !== '#ffffff')
const today = sortByLightness(['#1c2233', '#c91f37', '#dedcd5', '#e0475c', '#ece9e2', '#f7f5f0', '#a07a12'])

const { $clicks } = useSlideContext()
const clicks = computed(() => unref($clicks))

function rgb(c: string) {
  return [1, 3, 5].map(i => Number.parseInt(c.slice(i, i + 2), 16) / 255)
}
function chroma(c: string) {
  const v = rgb(c)
  return Math.max(...v) - Math.min(...v)
}
function hue(c: string) {
  const [r, g, b] = rgb(c)
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  if (!d)
    return 0
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (h * 60 + 360) % 360
}
function sortByHue(list: string[]) {
  return [...list].sort((a, b) => hue(a) - hue(b))
}
function sortByLightness(list: string[]) {
  const lightness = (c: string) => rgb(c).reduce((a, b) => a + b, 0)
  return [...list].sort((a, b) => lightness(a) - lightness(b))
}
</script>

<style scoped>
.hex-chaos {
  display: flex;
  flex-direction: column;
  gap: 44px;
  margin-top: 28px;
}

.hex-chaos__row {
  display: grid;
  grid-template-columns: 360px 1fr;
  align-items: start;
  gap: 32px;
}

.hex-chaos__count {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hex-chaos__number {
  font-family: var(--di-font-family-sans);
  font-size: 96px;
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--di-fg);
}

.hex-chaos__label {
  font-size: 24px;
  line-height: 1.25;
  color: var(--di-fg-body);
}

.hex-chaos__source {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
}

.hex-chaos__chips {
  display: grid;
  grid-template-columns: repeat(12, 52px);
  gap: 10px;
}

.hex-chaos__chips i {
  width: 52px;
  height: 52px;
  border: 1px solid var(--di-border);
  transition: opacity 0.4s ease;
}

.hex-chaos__chip--off {
  opacity: 0.08;
}
</style>
