<template>
  <div class="slidev-layout two-cols-header">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col px-16 py-8 gap-6">
      <div class="two-cols-header__top">
        <slot />
      </div>
      <div class="two-cols-header__columns flex-1 flex flex-row gap-10 min-h-0">
        <div class="col-left flex-1 flex flex-col justify-center min-w-0">
          <slot name="left" />
        </div>
        <div class="col-right flex-1 flex flex-col justify-center min-w-0">
          <slot name="right" />
        </div>
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
