<template>
  <div class="chat">
    <slot />
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 16px 0;
}
</style>
