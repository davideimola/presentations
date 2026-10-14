<template>
  <div class="slidev-layout cover">
    <div class="cover__top">
      <Tape v-if="eventLabel" :n="0" :size="20">{{ eventLabel }}</Tape>
      <span v-else />
      <BrandMark :size="120" cut="l" />
    </div>

    <div class="cover__title">
      <slot />
    </div>

    <div class="cover__bottom">
      <div class="cover__rule" />
      <div class="cover__sign">
        <Wordmark :width="300" />
        <span v-if="role" class="cover__role">{{ role }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BrandMark from '../components/BrandMark.vue'
import Tape from '../components/Tape.vue'
import Wordmark from '../components/Wordmark.vue'

/* Title slide (SYS-SlideTitle): tape with the event, display title with
   one <Marker>, L mark top right, hairline, wordmark and role at the
   bottom. No footer. */
const props = defineProps({
  event: { type: String, default: '' },
  role: { type: String, default: 'Tech Lead, RedCarbon · davideimola.dev' },
})

const eventLabel = computed(() => props.event)
</script>

<style scoped>
.cover {
  justify-content: space-between;
  padding: 64px 80px 48px;
}

.cover__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.cover__title {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.cover__bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cover__rule {
  height: 1px;
  background: var(--di-fg);
}

.cover__sign {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cover__role {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
}
</style>
