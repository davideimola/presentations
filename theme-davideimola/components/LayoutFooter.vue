<template>
  <footer class="akane-footer" v-if="website">
    <div class="akane-footer__accent" />
    <div class="akane-footer__content">
      <span class="akane-footer__item">
        <span class="akane-footer__name">{{ siteName }}</span><span v-if="siteTld" class="akane-footer__tld">{{ siteTld }}</span>
      </span>
      <span class="akane-footer__item akane-footer__page">
        {{ currentPage }} / {{ total }}
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const props = defineProps({
  website: { type: String },
})

/* Domain lockup: nome in quiet ink, TLD (dall'ultimo punto) in accent.
   Senza punto, il testo resta intero in quiet ink. */
const dotIndex = computed(() => props.website?.lastIndexOf('.') ?? -1)
const siteName = computed(() =>
  dotIndex.value > 0 ? props.website!.slice(0, dotIndex.value) : props.website,
)
const siteTld = computed(() =>
  dotIndex.value > 0 ? props.website!.slice(dotIndex.value) : '',
)

const { currentPage, total } = useNav()
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
  background: var(--border);
}

.akane-footer__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 100%;
}

.akane-footer__item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-3);
  letter-spacing: 0.02em;
}

.akane-footer__name {
  color: var(--text-2);
}

.akane-footer__tld {
  color: var(--accent-text);
}

.akane-footer__page {
  color: var(--text-3);
}
</style>
