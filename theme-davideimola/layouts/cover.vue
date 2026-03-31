<template>
  <div class="slidev-layout cover">
    <LayoutHeader :logoHeader="logoHeader" />
    <div class="flex-1 flex flex-col justify-center">
      <div class="cover-accent-line" />
      <slot />
    </div>
    <LayoutFooter :website="website" :handle="handle" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  logoHeader: { type: String },
  website:    { type: String },
  handle:     { type: String },
})
</script>

<style scoped>
.cover-accent-line {
  width: 48px;
  height: 3px;
  background: #C91F37;
  margin-bottom: 24px;
}
</style>
