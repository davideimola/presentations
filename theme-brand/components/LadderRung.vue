<template>
  <div class="ladder-rung">
    <span class="ladder-rung__marker">{{ String(n).padStart(2, '0') }}</span>
    <div class="ladder-rung__body">
      <div class="ladder-rung__title">{{ title }}<Tape v-if="tag" class="ladder-rung__tag" :n="2" :size="18">{{ tag }}</Tape></div>
      <div class="ladder-rung__desc"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tape from './Tape.vue'

/* One rung of a <Ladder>: numbered mono marker, title, description.
   Rungs are separated by hairlines, the brand's only divider. `tag` puts a
   small tape beside the title, such as "built by me". */
defineProps({
  n: { type: Number, required: true },
  title: { type: String, required: true },
  tag: { type: String, default: '' },
})
</script>

<style scoped>
.ladder-rung {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid var(--di-border);
}

.ladder-rung:first-child {
  border-top: 1px solid var(--di-border);
}

.ladder-rung__marker {
  flex-shrink: 0;
  min-width: 36px;
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  font-weight: 500;
  color: var(--di-slide-meta);
}

.ladder-rung__title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--di-fg);
}

.ladder-rung__desc {
  margin-top: 2px;
  font-size: var(--di-slide-body);
  line-height: 1.4;
  color: var(--di-fg-muted);
}

.ladder-rung__tag {
  margin-left: 14px;
  vertical-align: 2px;
}
</style>
