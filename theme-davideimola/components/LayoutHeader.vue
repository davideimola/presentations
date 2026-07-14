<template>
  <header class="akane-header">
    <div class="akane-header__track" />
    <div class="akane-header__progress" :style="{ width: `${progress}%` }" />
    <div class="akane-header__content">
      <span class="akane-header__logo">
        davideimola<span class="akane-header__cursor" aria-hidden="true" />
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentPage, total } = useNav()
const progress = computed(() => (currentPage.value / total.value) * 100)
</script>

<style scoped>
.akane-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  flex-shrink: 0;
}

.akane-header__track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent-glow);
}

.akane-header__progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.4s ease;
  max-width: 100%;
}

.akane-header__content {
  display: flex;
  align-items: center;
  padding: 0 24px;
  width: 100%;
}

.akane-header__logo {
  display: inline-flex;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: -0.03em;
}

/* Brand construction: 0.14em × 0.86em bar, 0.10em gap (see BRAND.md).
   Blinking as on the site's hero — "just typed, still writing".
   prefers-reduced-motion is handled globally in layouts.css. */
.akane-header__cursor {
  display: inline-block;
  width: 0.14em;
  height: 0.86em;
  margin-left: 0.1em;
  background: var(--accent);
  animation: header-cursor-blink 1.1s step-end infinite;
}

@keyframes header-cursor-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
</style>
