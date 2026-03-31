<template>
  <div class="slidev-layout two-cols">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-row gap-10 px-16 py-8">
      <div class="col-left flex-1 flex flex-col justify-center">
        <slot />
      </div>
      <div class="col-right flex-1 flex flex-col justify-center">
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
