<template>
  <div class="slidev-layout split-code">
    <div class="di-body split-code__grid">
      <div class="split-code__text">
        <SectionTape :label="tape" />
        <slot />
      </div>
      <div class="split-code__code">
        <slot name="right" />
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SectionTape from '../components/SectionTape.vue'
import SlideFooter from '../components/SlideFooter.vue'

/* Text on the left, code on the right at full height (SYS-SlideCode,
   mirrored so the title leads). The code column fits about 52 columns
   at 22px: wrap longer lines. */
defineProps({
  tape: { type: [String, Boolean], default: undefined },
})
</script>

<style scoped>
.split-code {
  padding-left: 56px;
  padding-right: 56px;
}

.split-code__grid {
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  column-gap: 40px;
}

.split-code__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.split-code__code {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
