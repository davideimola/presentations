<template>
  <div class="slidev-layout intro">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col px-16 py-8 gap-6">

      <p class="intro-prompt">
        <span class="intro-prompt__dollar">$</span> whoami --verbose
      </p>

      <div class="flex-1 flex items-center gap-12 min-h-0">
        <aside class="intro-aside shrink-0">
          <figure v-if="imageSrc">
            <img :src="imageSrc" width="160" height="160" class="intro-photo" />
          </figure>

          <ul v-if="hasSocials" class="intro-socials">
            <li v-if="github">
              <span class="intro-socials__prefix">// </span>
              <span class="intro-socials__key">github</span>
              <span class="intro-socials__val">{{ github }}</span>
            </li>
            <li v-if="bluesky">
              <span class="intro-socials__prefix">// </span>
              <span class="intro-socials__key">bluesky</span>
              <span class="intro-socials__val">{{ bluesky }}</span>
            </li>
            <li v-if="linkedin">
              <span class="intro-socials__prefix">// </span>
              <span class="intro-socials__key">linkedin</span>
              <span class="intro-socials__val">{{ linkedin }}</span>
            </li>
          </ul>
        </aside>

        <div class="flex-1 min-w-0">
          <slot />
        </div>
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
  github:     { type: String },
  bluesky:    { type: String },
  linkedin:   { type: String },
  website:    { type: String },
})

const imageSrc = computed(() => props.introImage ? resolveAssetUrl(props.introImage) : null)
const hasSocials = computed(() => props.github || props.bluesky || props.linkedin)
</script>

<style scoped>
.intro-prompt {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #7e7874;
  margin: 0;
}

.intro-prompt__dollar {
  color: #C91F37;
  margin-right: 8px;
}

.intro-aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  width: 180px;
}

.intro-photo {
  display: block;
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: top;
  border-radius: 4px;
  border: 1px solid #1C1A18;
  filter: grayscale(100%);
}

.intro-socials {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.intro-socials li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  line-height: 1.4;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.intro-socials__prefix {
  color: #C91F37;
  flex-shrink: 0;
}

.intro-socials__key {
  color: #7e7874;
  width: 60px;
  flex-shrink: 0;
}

.intro-socials__val {
  color: #7e7874;
}
</style>
