<template>
  <div class="whoami">
    <h1 class="whoami__name">Davide Imola</h1>
    <table class="whoami__table">
      <tbody>
        <tr>
          <td class="whoami__key">role</td>
          <td class="whoami__val">Tech Lead @ RedCarbon Srl</td>
        </tr>
        <tr>
          <td class="whoami__key">about</td>
          <td class="whoami__val">AI agents for SOC automation</td>
        </tr>
        <tr>
          <td class="whoami__key">community</td>
          <td class="whoami__val">Schrödinger Hat · Open Source Day</td>
        </tr>
        <tr>
          <td class="whoami__key">location</td>
          <td class="whoami__val">Verona, Italy</td>
        </tr>
        <tr>
          <td class="whoami__key">hobbies</td>
          <td class="whoami__val">bbq · jujutsu · board games · pokémon · comics/manga</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.whoami__name {
  margin: 0 0 22px !important;
}

.whoami__table {
  border-collapse: collapse;
  width: auto;
}

.whoami__table tr { border: none; }

.whoami__table td {
  border: none;
  padding: 5px 0;
  vertical-align: baseline;
}

.whoami__key {
  font-family: var(--di-font-family-mono);
  font-size: 16px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--di-fg-subtle);
  padding-right: 24px !important;
  white-space: nowrap;
}

.whoami__val {
  font-size: 24px;
  line-height: 1.35;
  color: var(--di-fg);
}
</style>
