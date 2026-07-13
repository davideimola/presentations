<template>
  <div class="chat-bubble" :class="user ? 'chat-bubble--user' : 'chat-bubble--ai'">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  user: { type: Boolean, default: false },
})
</script>

<style scoped>
.chat-bubble {
  max-width: 85%;
  padding: 10px 16px;
  border-radius: 16px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
}

.chat-bubble :deep(p) {
  margin: 0;
  font-size: inherit;
}

.chat-bubble--user {
  align-self: flex-end;
  border-bottom-right-radius: 4px;
  background: var(--accent-glow);
  border: 1px solid var(--border-hover);
  color: var(--text-1);
}

.chat-bubble--ai {
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-2);
}
</style>
