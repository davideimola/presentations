<template>
  <div class="slidev-layout section">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col justify-center px-16 py-8">
      <p class="section-label">{{ label }}</p>
      <slot />
    </div>
    <LayoutFooter :website="website" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  label:   { type: String, default: 'section' },
  website: { type: String },
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
