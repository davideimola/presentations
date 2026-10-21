<template>
  <div class="slidev-layout end">
    <div class="end__top">
      <Tape v-if="eventLabel" :n="1" :size="20">{{ eventLabel }}</Tape>
    </div>

    <div class="end__main">
      <div class="end__text">
        <slot />
        <ul v-if="links?.length" class="end__links">
          <li v-for="link in links" :key="link">{{ link }}</li>
        </ul>
      </div>
      <div v-if="qr || feedback" class="end__qrs">
        <QRBlock v-if="feedback" :value="feedback" :label="feedbackLabel" :size="190" />
        <QRBlock v-if="qr" :value="qr" :label="qrLabel" :size="190" />
      </div>
    </div>

    <div class="end__bottom">
      <div class="end__rule" />
      <div class="end__sign">
        <Wordmark :width="300" />
        <span v-if="role" class="end__role">{{ role }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeck } from '../logic/deck'
import QRBlock from '../components/QRBlock.vue'
import Tape from '../components/Tape.vue'
import Wordmark from '../components/Wordmark.vue'

/* Closing slide: thanks, links, and room for up to two QR codes
   (`qr` for links, `feedback` for the talk rating). Same frame as the
   cover, without the L mark so the QR codes stay the focus. The event
   tape falls back to the cover's `event`. */
const props = defineProps({
  event: { type: String, default: '' },
  role: { type: String, default: 'davideimola.dev' },
  links: { type: Array as () => string[], default: () => [] },
  qr: { type: String, default: '' },
  qrLabel: { type: String, default: undefined },
  feedback: { type: String, default: '' },
  feedbackLabel: { type: String, default: 'rate this talk' },
})

const { headmatter } = useDeck()
const eventLabel = computed(() => props.event || headmatter.value.event || '')
</script>

<style scoped>
.end {
  justify-content: space-between;
  padding: 64px 80px 48px;
}

.end__top {
  min-height: 34px;
}

.end__main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 56px;
}

.end__text {
  flex: 1;
  min-width: 0;
}

.end__links {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}

.end__links li {
  font-family: var(--di-font-family-mono);
  font-size: var(--di-slide-body);
  color: var(--di-fg);
  padding: 0;
  margin: 0 0 6px;
}

.end__qrs {
  display: flex;
  gap: 40px;
}

.end__bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.end__rule {
  height: 1px;
  background: var(--di-fg);
}

.end__sign {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.end__role {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  color: var(--di-slide-meta);
}
</style>
