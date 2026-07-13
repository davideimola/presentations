<template>
  <div class="chat">
    <slot />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}
</style>
