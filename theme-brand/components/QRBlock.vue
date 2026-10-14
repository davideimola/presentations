<template>
  <div class="qr-block">
    <QRCode :value="value" :size="size" />
    <span class="qr-block__label">{{ labelText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import QRCode from './QRCode.vue'

const props = defineProps({
  value: { type: String, required: true },
  label: { type: String },
  size: { type: Number, default: 160 },
})

/* Default label: the value without protocol. */
const labelText = computed(() => props.label ?? props.value.replace(/^https?:\/\//, ''))
</script>

<style scoped>
.qr-block {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 14px 14px 12px;
  background: var(--di-surface);
  border: 1px solid var(--di-border);
}

.qr-block__label {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
}
</style>
