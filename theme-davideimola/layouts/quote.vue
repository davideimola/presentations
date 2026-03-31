<template>
  <div class="slidev-layout quote">
    <LayoutHeader :logoHeader="logoHeader" />
    <div class="flex-1 flex flex-col justify-center">
      <div class="quote-accent" />
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
.quote-accent {
  width: 2px;
  height: 40px;
  background: #C91F37;
  margin-bottom: 20px;
}
</style>
