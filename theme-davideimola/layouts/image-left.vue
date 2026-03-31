<template>
  <div class="slidev-layout image-left">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-row overflow-hidden">
      <div
        v-if="imageSrc"
        class="image-left__image"
        :style="{ backgroundImage: `url(${imageSrc})` }"
      />
      <div class="image-left__body flex flex-col justify-center px-16 py-8">
        <slot />
      </div>
    </div>
    <LayoutFooter :website="website" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '../layoutHelper'
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

const props = defineProps({
  image:   { type: String },
  website: { type: String },
})

const imageSrc = computed(() => props.image ? resolveAssetUrl(props.image) : null)
</script>

<style scoped>
.image-left__image {
  width: 42%;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  border-right: 1px solid #1C1A18;
}

.image-left__body {
  flex: 1;
  min-width: 0;
}
</style>
