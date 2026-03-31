<template>
  <span class="badge" :class="`badge--${type}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps({
  type: { type: String, default: 'default' }, // default | accent | success | warning
})
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 3px;
  border: 1px solid;
  line-height: 1.6;
  vertical-align: middle;
}

.badge--default {
  color: #9a948e;
  border-color: #252220;
  background: #0f0e0d;
}

.badge--accent {
  color: #C91F37;
  border-color: rgba(201, 31, 55, 0.3);
  background: rgba(201, 31, 55, 0.08);
}

.badge--success {
  color: #4a9e6e;
  border-color: rgba(74, 158, 110, 0.3);
  background: rgba(74, 158, 110, 0.08);
}

.badge--warning {
  color: #c4860a;
  border-color: rgba(196, 134, 10, 0.3);
  background: rgba(196, 134, 10, 0.08);
}
</style>
