<template>
  <div class="slidev-layout quote">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col justify-center px-20 py-8">
      <slot />
    </div>
    <LayoutFooter :website="website" :handle="handle" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  website:    { type: String },
  handle:     { type: String },
})
</script>
