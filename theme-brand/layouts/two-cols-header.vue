<template>
  <div class="slidev-layout two-cols-header">
    <div class="di-body">
      <SectionTape :label="tape" />
      <div class="two-cols-header__top">
        <slot />
      </div>
      <div class="two-cols-header__row">
        <div class="col-left">
          <slot name="left" />
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
.two-cols-header__row {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 40px;
}
</style>
