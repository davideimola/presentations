<template>
  <img
    class="di-wordmark"
    :src="bold ? wordmarkBold : wordmark"
    :width="width"
    :height="Math.round(width * (bold ? 126 / 670 : 122 / 666))"
    alt="davide imola"
  >
</template>

<script setup lang="ts">
import wordmark from '@davideimola/brand/assets/svg/wordmark.svg'
import wordmarkBold from '@davideimola/brand/assets/svg/wordmark-bold.svg'

/* The wordmark is never typeset: always the SVG from the brand package.
   Regular for 300px wide and up, bold for footers and anything small. */
defineProps({
  width: { type: Number, default: 130 },
  bold: { type: Boolean, default: false },
})
</script>

<style scoped>
.di-wordmark {
  display: block;
  flex-shrink: 0;
}
</style>
