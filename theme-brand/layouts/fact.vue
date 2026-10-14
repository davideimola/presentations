<template>
  <div class="slidev-layout fact">
    <div class="di-body fact__body">
      <slot />
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'

/* One number, set huge in ink, with its label below. */
</script>

<style scoped>
.fact__body {
  justify-content: center;
}
</style>
