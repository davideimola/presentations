<template>
  <div class="slidev-layout code-hero">
    <div class="di-body">
      <SectionTape :label="tape" />
      <div class="code-hero__content">
        <slot />
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SectionTape from '../components/SectionTape.vue'
import SlideFooter from '../components/SlideFooter.vue'

/* The code is the protagonist (spot the bug): only an h6 kicker or a
   short title above it, code set a step larger. */
defineProps({
  tape: { type: [String, Boolean], default: undefined },
})
</script>

<style scoped>
.code-hero__content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
