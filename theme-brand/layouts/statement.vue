<template>
  <div class="slidev-layout statement">
    <div class="di-body statement__body">
      <slot />
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'

/* One idea, set large. Pair it with one <Marker> on the key word. */
</script>

<style scoped>
.statement__body {
  justify-content: center;
  max-width: 1080px;
}
</style>
