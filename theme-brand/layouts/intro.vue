<template>
  <div class="slidev-layout intro">
    <div class="di-body intro__grid">
      <figure v-if="imageSrc" class="intro__photo">
        <img :src="imageSrc" alt="">
        <Tape v-if="tape !== false" class="intro__tape" :n="1">{{ tape || 'about' }}</Tape>
      </figure>

      <div class="intro__content">
        <slot />
        <dl v-if="hasSocials" class="intro__socials">
          <div v-if="github"><dt>github</dt><dd>{{ github }}</dd></div>
          <div v-if="bluesky"><dt>bluesky</dt><dd>{{ bluesky }}</dd></div>
          <div v-if="linkedin"><dt>linkedin</dt><dd>{{ linkedin }}</dd></div>
        </dl>
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '../logic/deck'
import SlideFooter from '../components/SlideFooter.vue'
import Tape from '../components/Tape.vue'

/* Speaker intro: black and white portrait cropped tight, a tape on its
   edge, <WhoAmI />, and the socials as more rows of its facts. */
const props = defineProps({
  introImage: { type: String },
  github: { type: String },
  bluesky: { type: String },
  linkedin: { type: String },
  tape: { type: [String, Boolean], default: undefined },
})

const imageSrc = computed(() => props.introImage ? resolveAssetUrl(props.introImage) : null)
const hasSocials = computed(() => props.github || props.bluesky || props.linkedin)
</script>

<style scoped>
.intro__grid {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  column-gap: 64px;
  align-items: center;
}

.intro__photo {
  position: relative;
  margin: 0;
  width: 340px;
  height: 440px;
}

.intro__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: grayscale(1);
}

.intro__tape {
  position: absolute;
  left: 20px;
  bottom: -14px;
}

.intro__content {
  min-width: 0;
}

.intro__socials {
  margin: 10px 0 0;
  display: grid;
  gap: 10px;
}

.intro__socials div {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  align-items: baseline;
}

.intro__socials dt {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--di-slide-meta);
}

.intro__socials dd {
  margin: 0;
  font-family: var(--di-font-family-mono);
  font-size: 22px;
  color: var(--di-fg);
}
</style>
