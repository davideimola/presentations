<template>
  <Tape v-if="text" class="di-section-tape" :n="page" :size="size">{{ text }}</Tape>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDeck } from '../logic/deck'
import Tape from './Tape.vue'

/* The section tape on content slides ("03 · AGENTS"). Inherited from the
   last `section` slide's `label`; a slide can set its own with `tape: "..."`
   or hide it with `tape: false`. The tilt alternates from slide to slide. */
const props = defineProps({
  label: { type: [String, Boolean], default: undefined },
  size: { type: Number, default: 18 },
})

const { page, sectionTape } = useDeck()

const text = computed(() => {
  if (props.label === false)
    return null
  if (typeof props.label === 'string' && props.label)
    return props.label
  return sectionTape.value
})
</script>
