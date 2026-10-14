<template>
  <div class="slidev-layout image-right">
    <div class="di-body image-right__row">
      <div class="image-side__text">
        <SectionTape :label="tape" />
        <slot />
      </div>
      <div v-if="imageSrc" class="image-side__image" :class="{ 'image-side__image--bw': grayscale }" :style="{ backgroundImage: `url(${imageSrc})` }" />
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '../logic/deck'
import SectionTape from '../components/SectionTape.vue'
import SlideFooter from '../components/SlideFooter.vue'

/* Image on the right, text beside it. Images stay straight. Set
   `grayscale: true` for portraits (the brand shoots people in black
   and white); leave screenshots in colour. */
const props = defineProps({
  image: { type: String },
  grayscale: { type: Boolean, default: false },
  tape: { type: [String, Boolean], default: undefined },
})

const imageSrc = computed(() => props.image ? resolveAssetUrl(props.image) : null)
</script>

<style scoped>
.image-right__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 42%;
  column-gap: 56px;
}

.image-side__image {
  min-height: 0;
  background-size: cover;
  background-position: center top;
}

.image-side__image--bw {
  filter: grayscale(1);
}

.image-side__text {
  min-width: 0;
  display: flex;
  flex-direction: column;
}
</style>
