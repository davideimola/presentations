<template>
  <div class="slidev-layout two-cols">
    <div class="di-body">
      <SectionTape :label="tape" />
      <div class="two-cols__row">
        <div class="col-left">
          <slot />
        </div>
        <div class="col-right">
          <slot name="right" />
        </div>
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import SectionTape from '../components/SectionTape.vue'
import SlideFooter from '../components/SlideFooter.vue'

defineProps({
  tape: { type: [String, Boolean], default: undefined },
})
</script>

<style scoped>
.two-cols__row {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 48px;
}
</style>
