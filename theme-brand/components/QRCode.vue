<template>
  <div class="qrcode" v-html="svg" />
</template>

<script setup lang="ts">
import { renderSVG } from 'uqr'
import { computed } from 'vue'

/* Defaults to ink on paper. */
const props = defineProps({
  value: { type: String, required: true },
  size: { type: Number, default: 96 },
  dark: { type: String, default: '#1C2233' },
  light: { type: String, default: '#F7F5F0' },
})

const svg = computed(() =>
  renderSVG(props.value, {
    blackColor: props.dark,
    whiteColor: props.light,
  }).replace('<svg ', `<svg width="${props.size}" height="${props.size}" `),
)
</script>

<style scoped>
.qrcode {
  display: inline-flex;
  line-height: 0;
}
</style>
