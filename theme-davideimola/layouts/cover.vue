<template>
  <div class="slidev-layout cover">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col justify-center px-16 py-8">
      <div class="cover-accent-line" />
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

<style scoped>
.cover-accent-line {
  width: 48px;
  height: 3px;
  background: #C91F37;
  margin-bottom: 24px;
}
</style>
