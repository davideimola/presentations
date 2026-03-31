<template>
  <footer class="akane-footer" v-if="website">
    <div class="akane-footer__accent" />
    <div class="akane-footer__content">
      <span class="akane-footer__item">
        <span class="akane-footer__prefix">// </span>{{ website }}
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps({
  website: { type: String },
})
</script>

<style scoped>
.akane-footer {
  position: relative;
  flex-shrink: 0;
  height: 36px;
}

.akane-footer__accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #1C1A18;
}

.akane-footer__content {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 100%;
}

.akane-footer__item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #7E7874;
  letter-spacing: 0.02em;
}

.akane-footer__prefix {
  color: #C91F37;
}
</style>
