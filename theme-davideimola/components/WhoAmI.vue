<template>
  <div class="whoami">
    <table class="whoami__table">
      <tbody>
      <tr>
        <td class="whoami__key">name</td>
        <td class="whoami__val">Davide Imola</td>
      </tr>
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
        <td class="whoami__val">bbq · jujutsu · board games · pokémon</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.whoami {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
}

.whoami__table {
  border-collapse: collapse;
  width: auto;
}

.whoami__table tr { border: none; }
.whoami__table td { border: none; padding: 2px 0; }

.whoami__key {
  color: #7e7874;
  padding-right: 16px !important;
  width: 90px;
  white-space: nowrap;
  vertical-align: top;
}

.whoami__val {
  color: #eae5df;
}
</style>
