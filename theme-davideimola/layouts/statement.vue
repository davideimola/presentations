<template>
  <div class="slidev-layout statement">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col items-center justify-center text-center px-20 py-8">
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
