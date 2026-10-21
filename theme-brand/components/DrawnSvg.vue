<template>
  <div
    ref="root"
    class="draw di-drawn"
    role="img"
    :aria-label="alt"
    :data-drawn="all ? '' : undefined"
    v-html="html"
  />
</template>

<script setup lang="ts">
import { prepareDrawSvg } from '@davideimola/brand/draw'
import { tokens } from '@davideimola/brand/tokens'
import { onSlideEnter, onSlideLeave, useNav, useSlideContext } from '@slidev/client'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { resolveAssetUrl } from '../logic/deck'

/* A drawing in the brand's line style that draws itself (brand.md, Drawings):
   the ink traces in and the red detail lands last. Without `steps` it draws
   all at once each time the slide is entered. With `steps` every part sits in
   a <g data-step="n">: step 0 draws on enter, step n on the slide's n-th click
   (set `clicks:` in the slide frontmatter). Outside the live slide (overview,
   export, print) it shows drawn; reduced motion shows each part at once. */
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  steps: { type: Boolean, default: false },
})

const palette = tokens.color.palette
const root = ref<HTMLElement>()
const html = ref('')
const entered = ref(false)
const active = ref(false)

const { isPrintMode } = useNav()
const { $clicks, $renderContext } = useSlideContext()
const live = computed(() => ['slide', 'presenter'].includes(unref($renderContext)) && !unref(isPrintMode))
const all = computed(() => !live.value || (!props.steps && active.value))

function sync() {
  if (!props.steps || !root.value)
    return
  for (const step of root.value.querySelectorAll<SVGGElement>('[data-step]')) {
    const due = !live.value || (active.value && Number(step.dataset.step) <= unref($clicks))
    if (due)
      step.setAttribute('data-drawn', '')
    else
      step.removeAttribute('data-drawn')
  }
}

onMounted(async () => {
  const svg = await fetch(resolveAssetUrl(props.src)).then(res => res.text())
  html.value = prepareDrawSvg(svg, [palette.akane, palette['akane-night']], palette.paper)
  await nextTick()
  sync()
})

// Start a frame after the undrawn state is on screen, or there is nothing to animate.
watch([entered, html], ([isEntered, markup]) => {
  if (isEntered && markup)
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
.di-drawn :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
