<template>
  <div class="slidev-layout image-right">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-row overflow-hidden">
      <div class="image-right__body flex flex-col justify-center px-16 py-8">
        <slot />
      </div>
      <div
        v-if="imageSrc"
        class="image-right__image"
        :style="{ backgroundImage: `url(${imageSrc})` }"
      />
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
.image-right__body {
  flex: 1;
  min-width: 0;
}

.image-right__image {
  width: 42%;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  border-left: 1px solid #1C1A18;
}
</style>
