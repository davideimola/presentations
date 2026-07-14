<template>
  <div class="slidev-layout code-hero">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col justify-start px-12 py-8">
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
