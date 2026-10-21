<template>
  <div class="slidev-layout intro">
    <div class="di-body intro__grid">
      <figure v-if="imageSrc" class="intro__photo">
        <img :src="imageSrc" alt="">
        <Tape v-if="tape !== false" class="intro__tape" :n="1">{{ tape || 'about' }}</Tape>
      </figure>

      <div class="intro__content">
        <slot />
        <ul v-if="hasSocials" class="intro__socials">
          <li v-if="github"><span>github</span>{{ github }}</li>
          <li v-if="bluesky"><span>bluesky</span>{{ bluesky }}</li>
          <li v-if="linkedin"><span>linkedin</span>{{ linkedin }}</li>
        </ul>
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
   edge, <WhoAmI /> and the socials in mono. */
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
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  gap: 32px;
}

.intro__socials li {
  font-family: var(--di-font-family-mono);
  font-size: 20px;
  color: var(--di-fg);
  margin: 0;
  padding: 0;
}

.intro__socials li span {
  display: block;
  font-size: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--di-slide-meta);
  margin-bottom: 2px;
}
</style>
