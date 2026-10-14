<template>
  <div class="slidev-layout quote">
    <div class="di-body quote__body">
      <span class="quote__square" aria-hidden="true" />
      <slot />
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SlideFooter from '../components/SlideFooter.vue'

/* Quote set large with a small ink square, never a side bar. */
</script>

<style scoped>
.quote__body {
  justify-content: center;
  max-width: 1040px;
}

.quote__square {
  width: 16px;
  height: 16px;
  background: var(--di-fg);
  margin-bottom: 28px;
}
</style>
