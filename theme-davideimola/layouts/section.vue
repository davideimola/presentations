<template>
  <div class="slidev-layout section">
    <LayoutHeader :logoHeader="logoHeader" />
    <div class="flex-1 flex flex-col justify-center">
      <p class="section-label">{{ label }}</p>
      <slot />
    </div>
    <LayoutFooter :website="website" :handle="handle" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  label:      { type: String, default: 'section' },
  logoHeader: { type: String },
  website:    { type: String },
  handle:     { type: String },
})
</script>

<style scoped>
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #C91F37;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.section-label::before { content: '// '; }
</style>
