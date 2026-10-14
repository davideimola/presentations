<template>
  <div class="slidev-layout default">
    <div class="di-body">
      <SectionTape :label="tape" />
      <div class="default__content">
        <slot />
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SectionTape from '../components/SectionTape.vue'
import SlideFooter from '../components/SlideFooter.vue'

/* Content slide: section tape, title, content, footer. */
defineProps({
  tape: { type: [String, Boolean], default: undefined },
})
</script>

<style scoped>
.default__content {
  flex: 1;
  min-height: 0;
}
</style>
