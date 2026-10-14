<template>
  <img class="di-brand-mark" :src="src" :width="size" :height="size" alt="" aria-hidden="true">
</template>

<script setup lang="ts">
import { computed } from 'vue'
import markL from '@davideimola/brand/assets/svg/mark-l.svg'
import markM from '@davideimola/brand/assets/svg/mark-m.svg'
import markS from '@davideimola/brand/assets/svg/mark-s.svg'

/* The mark comes from the brand package, never redrawn here.
   Pick the cut by rendered size (brand: L >= 96px, M 40-95px, S <= 39px)
   unless one is forced with `cut`. */
const props = defineProps({
  size: { type: Number, default: 26 },
  cut: { type: String, default: '' }, // l | m | s, empty = by size
})

const src = computed(() => {
  const cut = props.cut || (props.size >= 96 ? 'l' : props.size >= 40 ? 'm' : 's')
  return cut === 'l' ? markL : cut === 'm' ? markM : markS
})
</script>

<style scoped>
.di-brand-mark {
  display: block;
  flex-shrink: 0;
}
</style>
