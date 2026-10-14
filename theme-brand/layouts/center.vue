<template>
  <div class="slidev-layout center">
    <div class="di-body center__body">
      <slot />
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'
</script>

<style scoped>
.center__body {
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
