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

.akane-header__cursor {
  display: inline-block;
  width: 2px;
  height: 0.9em;
  margin-left: 3px;
  background: var(--accent);
}
</style>
