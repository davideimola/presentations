<template>
  <div class="slidev-layout section">
    <div class="di-body section__body">
      <Tape v-if="label" :n="page" :size="22" class="section__tape">{{ label }}</Tape>
      <slot />
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import { useDeck } from '../logic/deck'
import SlideFooter from '../components/SlideFooter.vue'
import Tape from '../components/Tape.vue'

/* Section opener. Its `label` ("03 · agents") becomes the tape on every
   following content slide and the section name in the footer, and the
   section gets its own segment of the progress bar. */
defineProps({
  label: { type: String, default: '' },
})

const { page } = useDeck()
</script>

<style scoped>
.section__body {
  justify-content: center;
}

.section__tape {
  margin-bottom: 22px;
}
</style>
