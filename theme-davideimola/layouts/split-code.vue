<template>
  <div class="slidev-layout split-code">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-row overflow-hidden">
      <div class="split-code__text flex flex-col justify-center px-14 py-10">
        <slot />
      </div>
      <div class="split-code__code flex flex-col justify-center px-10 py-10">
        <slot name="right" />
      </div>
    </div>
    <LayoutFooter :website="website" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  website: { type: String },
})
</script>

<style scoped>
.split-code__text {
  width: 42%;
  flex-shrink: 0;
  border-right: 1px solid #1c1a18;
}

.split-code__code {
  flex: 1;
  min-width: 0;
}
</style>
