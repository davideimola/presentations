<template>
  <div class="slidev-layout terminal">
    <LayoutHeader />
    <div class="slidev-layout__content flex-1 flex flex-col justify-center px-16 py-8">
      <div class="terminal-window">
        <div class="terminal-titlebar">
          <div class="terminal-dots">
            <span class="dot dot--close" />
            <span class="dot dot--minimize" />
            <span class="dot dot--expand" />
          </div>
          <span class="terminal-title">{{ title }}</span>
        </div>
        <div class="terminal-body">
          <slot />
        </div>
      </div>
    </div>
    <LayoutFooter :website="website" />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

defineProps({
  title:   { type: String, default: '~/davideimola' },
  website: { type: String },
})
</script>

<style scoped>
.terminal-window {
  border: 1px solid #252220;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}

.terminal-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #0f0e0d;
  border-bottom: 1px solid #1c1a18;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot--close    { background: #C91F37; }
.dot--minimize { background: #3a3530; }
.dot--expand   { background: #3a3530; }

.terminal-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #7e7874;
  flex: 1;
  text-align: center;
  margin-right: 52px; /* bilancia i dots */
}

.terminal-body {
  background: #080807;
  padding: 24px 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #eae5df;
}

/* Rimuove lo stile dei code block dentro il terminale — la finestra è già il contesto */
.terminal-body :deep(.slidev-code),
.terminal-body :deep(pre) {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}

.terminal-body :deep(code) {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  font-size: inherit !important;
}
</style>
