<template>
  <div class="qr-block">
    <QRCode :value="value" :size="size" dark="#EAE5DF" light="#080807" />
    <span class="qr-block__label">{{ labelText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QRCode from './QRCode.vue'

const props = defineProps({
  value: { type: String, required: true },
  label: { type: String },
  size:  { type: Number, default: 140 },
})

/* Default label: the value without protocol */
const labelText = computed(() => props.label ?? props.value.replace(/^https?:\/\//, ''))
</script>

<style scoped>
.qr-block {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.qr-block__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-3);
  letter-spacing: 0.02em;
}
</style>
