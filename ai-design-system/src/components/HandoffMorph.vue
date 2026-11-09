<template>
  <div ref="root" class="handoff-morph draw di-drawn" role="img" :aria-label="alt" v-html="html" />
</template>

<script setup lang="ts">
import { prepareDrawSvg } from '@davideimola/brand/draw'
import { tokens } from '@davideimola/brand/tokens'
import { onSlideEnter, onSlideLeave, useNav, useSlideContext } from '@slidev/client'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'

/* Chapter 5: the usual handoff turns into the package flow on one grid. It
   draws the way DrawnSvg does (same prepareDrawSvg, same draw.css): every part
   sits in a <g data-step="n"> and draws on the slide's n-th click.
   Four places: designer, Figma, developer, the app (React).
   Clicks 0-2: the red changes at every hand, and the AI sits with the
   developer. Click 3: the developer and the old arrows fade, the AI moves to
   the designer's shoulder. Click 4: a pull request over Figma to the
   components in Storybook, the source of truth, in the developer's place.
   Click 5: Figma follows through the MCP, a new version reaches the same app. Its override stays: the app's own CSS can still repaint the red,
   the question chapter 6 answers. Outside the live slide (overview, export, print)
   every due step shows drawn. */
defineProps({ alt: { type: String, default: '' } })

const SVG = `
<svg viewBox="0 -70 1600 530" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1C2233" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <!-- The designer: the start of both flows. -->
    <g data-step="0">
      <text x="150" y="62" class="t t-label" fill="#1C2233" stroke="none">akane</text>
      <rect x="64" y="-58" width="48" height="48" rx="6" fill="#C91F37" stroke="#C91F37" />
      <text x="126" y="-24" class="t t-hex" fill="#3B4152" stroke="none">#C91F37</text>
      <circle cx="150" cy="140" r="45" />
      <path d="M70 300 C70 230 110 205 150 205 C190 205 230 230 230 300" />
      <ellipse cx="150" cy="268" rx="64" ry="34" fill="#F7F5F0" />
      <circle cx="182" cy="282" r="9" />
      <circle cx="118" cy="262" r="7" fill="#1C2233" stroke="none" />
      <circle cx="144" cy="252" r="7" fill="#1C2233" stroke="none" />
      <circle cx="172" cy="256" r="7" fill="#1C2233" stroke="none" />
      <text x="150" y="390" class="t t-name" fill="#1C2233" stroke="none">designer</text>
    </g>

    <!-- The usual flow: Figma gives the red a role, the developer translates it. -->
    <g class="fade" data-step="0">
      <text x="560" y="62" class="t t-label" fill="#1C2233" stroke="none">accent</text>
      <rect x="474" y="-58" width="48" height="48" rx="6" fill="#C91F37" stroke="#C91F37" />
      <text x="536" y="-24" class="t t-hex" fill="#3B4152" stroke="none">#C91F37</text>
      <path d="M260 195 H455" />
      <path d="M430 173 L455 195 L430 217" />
    </g>
    <!-- Figma stays in both flows: first it leads, then it follows the code. -->
    <g data-step="0">
      <rect x="485" y="100" width="150" height="190" rx="10" fill="#F7F5F0" />
      <path d="M485 140 H635" />
      <rect x="510" y="165" width="100" height="55" rx="6" />
      <path d="M510 250 H590" />
      <text x="560" y="390" class="t t-name" fill="#1C2233" stroke="none">Figma</text>
    </g>
    <g class="fade" data-step="1">
      <text x="970" y="62" class="t t-label" fill="#1C2233" stroke="none">bg-red-600</text>
      <rect x="884" y="-58" width="48" height="48" rx="6" fill="#DC2626" stroke="#DC2626" />
      <text x="946" y="-24" class="t t-hex" fill="#3B4152" stroke="none">#DC2626</text>
      <path d="M665 195 H860" />
      <path d="M835 173 L860 195 L835 217" />
      <circle cx="970" cy="140" r="45" />
      <path d="M890 300 C890 230 930 205 970 205 C1010 205 1050 230 1050 300" />
      <rect x="917" y="232" width="106" height="66" rx="6" fill="#F7F5F0" />
      <path d="M897 300 H1043" />
      <circle cx="970" cy="265" r="5" fill="#1C2233" stroke="none" />
      <text x="970" y="390" class="t t-name" fill="#1C2233" stroke="none">developer</text>
    </g>
    <!-- The override stays at the turn: the app's own CSS can still repaint the red. -->
    <g data-step="2">
      <text x="1380" y="62" class="t t-label" fill="#1C2233" stroke="none">an override</text>
      <rect x="1294" y="-58" width="48" height="48" rx="6" fill="#EF4444" stroke="#EF4444" />
      <text x="1356" y="-24" class="t t-hex" fill="#3B4152" stroke="none">#EF4444</text>
    </g>
    <g class="fade" data-step="2">
      <path d="M1080 195 H1245" />
      <path d="M1220 173 L1245 195 L1220 217" />
    </g>

    <!-- The app, in React: the end of both flows. It stays, only what reaches it changes. -->
    <g data-step="2">
      <rect x="1275" y="110" width="210" height="170" rx="12" />
      <text x="1380" y="215" class="t t-glyph" fill="#1C2233" stroke="none">&lt;/&gt;</text>
      <text x="1380" y="390" class="t t-name" fill="#1C2233" stroke="none">the app</text>
    </g>

    <!-- The AI: on the developer's shoulder, then on the designer's. -->
    <g class="ai" data-step="1">
      <path d="M211 72 H289 Q305 72 305 88 V126 Q305 142 289 142 H245 L212 166 L220 142 H211 Q195 142 195 126 V88 Q195 72 211 72 Z" fill="#F7F5F0" />
      <text x="250" y="121" class="t t-ai" fill="#1C2233" stroke="none">AI</text>
    </g>

    <!-- Dev-first: the designer, with the AI, ships the components. Storybook is
         the source of truth, in the developer's place. The arc goes over Figma. -->
    <g data-step="4">
      <text x="150" y="440" class="t t-caption" fill="#3B4152" stroke="none">decides</text>
      <path d="M320 130 C420 -20 760 -20 870 90" />
      <path d="M867 58 L870 90 L838 87" />
      <text x="595" y="-12" class="t t-caption" fill="#3B4152" stroke="none">pull request</text>
      <text x="970" y="62" class="t t-label" fill="#1C2233" stroke="none">accent</text>
      <rect x="884" y="-58" width="48" height="48" rx="6" fill="#C91F37" stroke="#C91F37" />
      <text x="946" y="-24" class="t t-hex" fill="#3B4152" stroke="none">#C91F37</text>
      <rect x="870" y="100" width="200" height="190" rx="10" fill="#F7F5F0" />
      <path d="M870 140 H1070" />
      <circle cx="893" cy="120" r="5" fill="#1C2233" stroke="none" />
      <circle cx="911" cy="120" r="5" fill="#1C2233" stroke="none" />
      <circle cx="929" cy="120" r="5" fill="#1C2233" stroke="none" />
      <rect x="900" y="172" width="140" height="44" rx="22" />
      <path d="M900 250 H1000" />
      <circle cx="1065" cy="285" r="38" fill="#F7F5F0" stroke="#C91F37" />
      <path d="M1047 286 L1061 300 L1085 273" stroke="#C91F37" />
      <text x="970" y="390" class="t t-name" fill="#1C2233" stroke="none">Storybook</text>
      <text x="970" y="440" class="t t-caption" fill="#3B4152" stroke="none">source of truth</text>
    </g>
    <!-- From the source of truth: Figma through the MCP, the app through a version. -->
    <g data-step="5">
      <path d="M860 195 H665" />
      <path d="M690 173 L665 195 L690 217" />
      <text x="762" y="160" class="t t-caption" fill="#3B4152" stroke="none">MCP</text>
      <text x="560" y="440" class="t t-caption" fill="#3B4152" stroke="none">follows</text>
      <path d="M1110 195 H1245" />
      <path d="M1220 173 L1245 195 L1220 217" />
      <text x="1178" y="160" class="t t-caption" fill="#3B4152" stroke="none">version</text>
      <text x="1380" y="440" class="t t-caption" fill="#3B4152" stroke="none">bumps the import</text>
    </g>
  </g>
</svg>
`

const palette = tokens.color.palette
const html = prepareDrawSvg(SVG, [palette.akane, palette['akane-night']], palette.paper)
const root = ref<HTMLElement>()
const entered = ref(false)
const active = ref(false)

const { isPrintMode } = useNav()
const { $clicks, $renderContext } = useSlideContext()
const live = computed(() => ['slide', 'presenter'].includes(unref($renderContext)) && !unref(isPrintMode))

function sync() {
  if (!root.value)
    return
  const clicks = unref($clicks) ?? 0
  for (const step of root.value.querySelectorAll<SVGGElement>('[data-step]')) {
    const due = (!live.value || active.value) && Number(step.dataset.step) <= clicks
    step.toggleAttribute('data-drawn', due)
  }
  const turned = clicks >= 3
  for (const old of root.value.querySelectorAll('.fade'))
    old.classList.toggle('off', turned)
  root.value.querySelector('.ai')?.classList.toggle('moved', turned)
}

onMounted(async () => {
  await nextTick()
  sync()
})

// Start a frame after the undrawn state is on screen, or there is nothing to animate.
watch(entered, (isEntered) => {
  if (isEntered)
    requestAnimationFrame(() => requestAnimationFrame(() => (active.value = entered.value)))
})

watch([active, () => unref($clicks), live], sync)

onSlideEnter(() => (entered.value = true))
onSlideLeave(() => {
  entered.value = false
  active.value = false
})
</script>

<style scoped>
.handoff-morph :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.handoff-morph :deep(.t) {
  font-family: 'IBM Plex Mono', monospace;
  text-anchor: middle;
}

.handoff-morph :deep(.t-name) {
  font-size: 40px;
}

.handoff-morph :deep(.t-label) {
  font-size: 32px;
}

.handoff-morph :deep(.t-glyph) {
  font-size: 56px;
  font-weight: 600;
}

.handoff-morph :deep(.t-ai) {
  font-size: 38px;
  font-weight: 600;
}

.handoff-morph :deep(.t-caption) {
  font-size: 30px;
}

/* The hex sits right of its swatch, so the four reds can be told apart. */
.handoff-morph :deep(.t-hex) {
  font-size: 28px;
  text-anchor: start;
}

/* Not due yet: its paper fills would mask the drawing behind it. */
.handoff-morph :deep([data-step]:not([data-drawn])) {
  opacity: 0;
}

.handoff-morph :deep(.fade) {
  transition: opacity 0.45s ease;
}

.handoff-morph :deep(.fade.off) {
  opacity: 0;
}

/* The bubble is drawn on the designer's shoulder and starts on the
   developer's, 820 to the right. At the turn it slides home. */
.handoff-morph :deep(.ai) {
  transform: translateX(820px);
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1);
}

.handoff-morph :deep(.ai.moved) {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .handoff-morph :deep(.fade),
  .handoff-morph :deep(.ai) {
    transition: none;
  }
}
</style>
