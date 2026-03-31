<template>
  <div class="slidev-layout intro">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex items-center gap-16 px-16 py-8">
      <figure v-if="imageSrc" class="shrink-0">
        <img
          :src="imageSrc"
          width="220"
          height="220"
          class="intro-photo"
        />
      </figure>
      <div class="flex-1">
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
  introImage: { type: String },
  website:    { type: String },
})

const imageSrc = computed(() => props.introImage ? resolveAssetUrl(props.introImage) : null)
</script>

<style scoped>
.intro-photo {
  display: block;
  width: 220px;
  height: 220px;
  object-fit: cover;
  object-position: top;
  border-radius: 4px;
  border: 1px solid #1C1A18;
  filter: grayscale(100%);
}
</style>
