<template>
  <div class="stat-grid">
    <slot />
  </div>
</template>

<style scoped>
/* One equal column per <Stat> child — works with 2, 3 or 4 stats */
.stat-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 40px;
  text-align: center;
}
</style>
