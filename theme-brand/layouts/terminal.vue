<template>
  <div class="slidev-layout terminal">
    <div class="di-body">
      <SectionTape :label="tape" />
      <div class="terminal__stage">
        <div class="terminal__window">
          <div class="terminal__bar">{{ barTitle }}</div>
          <div class="terminal__body">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <SlideFooter />
  </div>
</template>

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import SectionTape from '../components/SectionTape.vue'
import SlideFooter from '../components/SlideFooter.vue'

/* A terminal window: white surface, hairline border, the command as the
   title bar. No traffic lights: red belongs to the knot and the marker.
   Text after the code block renders inside the window, under the output. */
const props = defineProps({
  title: { type: String, default: '' },
  tape: { type: [String, Boolean], default: undefined },
})

// `title` is a reserved frontmatter field: Slidev does not pass it as a
// prop, so read it from the slide frontmatter.
const { $frontmatter } = useSlideContext()
const barTitle = computed(() => props.title || $frontmatter?.title || '~/davideimola')
</script>

<style scoped>
.terminal__stage {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.terminal__window {
  background: var(--di-surface);
  border: 1px solid var(--di-border);
}

.terminal__bar {
  font-family: var(--di-font-family-mono);
  font-size: 16px;
  color: var(--di-fg-subtle);
  padding: 12px 28px;
  border-bottom: 1px solid var(--di-border);
}

.terminal__body {
  padding: 4px 0 8px;
}

.terminal__body :deep(.slidev-code),
.terminal__body :deep(pre.shiki) {
  border: none !important;
  background: transparent !important;
}

.terminal__body :deep(p) {
  padding: 0 28px;
  margin: 12px 0 6px;
}
</style>
