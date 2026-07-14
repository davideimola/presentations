<template>
  <div class="ladder" :class="{ 'ladder--compact': compact }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  /* One line per rung (description inline next to the title).
     Use when the ladder has more than 4-5 rungs. */
  compact: { type: Boolean, default: false },
})
</script>

<style scoped>
.ladder {
  display: flex;
  flex-direction: column;
}

.ladder--compact :deep(.ladder-rung:not(:last-child)) {
  padding-bottom: 10px;
}

.ladder--compact :deep(.ladder-rung:not(:last-child)::before) {
  top: 26px;
  bottom: 2px;
}

.ladder--compact :deep(.ladder-rung__body) {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
}

.ladder--compact :deep(.ladder-rung__desc) {
  margin-top: 0;
}
</style>
