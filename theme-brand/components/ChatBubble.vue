<template>
  <div class="chat-bubble" :class="user ? 'chat-bubble--user' : 'chat-bubble--ai'">
    <slot />
  </div>
</template>

<script setup lang="ts">
/* User turns in ink, model turns on the white code surface. */
defineProps({
  user: { type: Boolean, default: false },
})
</script>

<style scoped>
.chat-bubble {
  max-width: 82%;
  padding: 12px 20px;
  border-radius: 18px;
  font-size: 24px;
  line-height: 1.4;
}

.chat-bubble :deep(p) {
  margin: 0;
  font-size: inherit;
  color: inherit;
}

.chat-bubble--user {
  align-self: flex-end;
  border-bottom-right-radius: 4px;
  background: var(--di-fg);
  color: var(--di-bg);
}

.chat-bubble--ai {
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  background: var(--di-surface);
  border: 1px solid var(--di-border);
  color: var(--di-fg-body);
}
</style>
