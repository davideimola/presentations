<template>
  <div class="slidev-layout center">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col items-center justify-center text-center px-16 py-8">
      <slot />
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
