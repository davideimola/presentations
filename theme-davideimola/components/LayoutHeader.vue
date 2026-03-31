<template>
  <header class="akane-header">
    <div class="akane-header__accent" />
    <div class="akane-header__content">
      <span class="akane-header__logo">
        <span class="akane-header__tilde">~</span>/davideimola
      </span>
    </div>
  </header>
</template>

<style scoped>
.akane-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  flex-shrink: 0;
}

.akane-header__accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #C91F37;
}

.akane-header__content {
  display: flex;
  align-items: center;
  padding: 0 64px;
  width: 100%;
}

.akane-header__logo {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: #EAE5DF;
  letter-spacing: -0.02em;
}

.akane-header__tilde {
  color: #C91F37;
}
</style>
