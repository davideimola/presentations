<template>
  <div class="whoami">
    <h1 class="whoami__name">Davide Imola</h1>
    <p class="whoami__line">
      <slot name="line">I build AI agents for <Marker>security</Marker>, and the tools I need along the way.</slot>
    </p>
    <p class="whoami__lead">
      <slot name="lead">Tech Lead at RedCarbon. I write mostly Go, and I share everything I learn.</slot>
    </p>
    <dl class="whoami__facts">
      <div>
        <dt>based in</dt>
        <dd>Verona, Italy</dd>
      </div>
      <div>
        <dt>community</dt>
        <dd>Schrödinger Hat · Open Source Day</dd>
      </div>
      <div>
        <dt>off the clock</dt>
        <dd>bbq · jujutsu · board games · pokémon · comics and manga</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import Marker from './Marker.vue'

/* The speaker intro, in the brand's voice (brand.md, Positioning and Voice):
   the name, the line with the slide's one marker, the role inside a first
   person lead, then the facts by kind. The hobbies stay: they are the ice
   breakers. Override `line` or `lead` per talk when the room needs another
   angle; the defaults are the brand's own words, as on the site's home. */
</script>

<style scoped>
.whoami__name {
  margin: 0 0 18px !important;
}

.whoami__line {
  margin: 0 0 14px;
  font-size: 34px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--di-fg);
}

.whoami__lead {
  margin: 0 0 28px;
  font-size: var(--di-slide-body);
  line-height: 1.4;
  color: var(--di-slide-meta);
}

.whoami__facts {
  margin: 0;
  display: grid;
  gap: 10px;
}

.whoami__facts div {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  align-items: baseline;
}

.whoami__facts dt {
  font-family: var(--di-font-family-mono);
  font-size: 18px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--di-slide-meta);
}

.whoami__facts dd {
  margin: 0;
  font-size: 24px;
  line-height: 1.35;
  color: var(--di-fg);
}
</style>
