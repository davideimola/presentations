<template>
  <div v-html="svg" class="qrcode" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { renderSVG } from 'uqr'

const props = defineProps({
  value:  { type: String, required: true },
  size:   { type: Number, default: 96 },
  dark:   { type: String, default: '#000000' },
  light:  { type: String, default: '#ffffff' },
})

const svg = computed(() =>
  renderSVG(props.value, {
    blackColor: props.dark,
    whiteColor: props.light,
  }).replace('<svg ', `<svg width="${props.size}" height="${props.size}" `)
)
</script>

<style scoped>
.qrcode {
  display: inline-flex;
  line-height: 0;
}
</style>
