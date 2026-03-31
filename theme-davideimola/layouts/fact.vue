<template>
  <div class="slidev-layout fact">
    <LayoutHeader :logoHeader="logoHeader" />
    <div class="flex-1 flex flex-col items-center justify-center">
      <slot />
    </div>
    <LayoutFooter :website="website" :handle="handle" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  logoHeader: { type: String },
  website:    { type: String },
  handle:     { type: String },
})
</script>
