<template>
  <div class="whoami">
    <h1 class="whoami__name">Davide Imola</h1>
    <p class="whoami__line">
      <slot name="line">I build AI agents for <Marker>security</Marker>, and the tools I need along the way.</slot>
    </p>
    <p v-if="$slots.lead" class="whoami__lead">
      <slot name="lead" />
    </p>
    <dl class="whoami__facts">
      <div>
        <dt>at work</dt>
        <dd>Tech Lead at RedCarbon<Tape v-if="hiring" class="whoami__tag" :n="2" :size="18">we're hiring</Tape></dd>
      </div>
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
import Tape from './Tape.vue'

/* The speaker intro, in the brand's voice (brand.md, Positioning and Voice):
   the name, the line with the slide's one marker, then the facts by kind.
   The hobbies stay: they are the ice breakers. Override `line` per talk
   when the room needs another angle (its default is the brand's own
   words); add a `lead` only when a talk needs one more sentence. `hiring`
   puts a "we're hiring" tape beside the job, for the talks where it's true. */
defineProps({
  hiring: { type: Boolean, default: false },
})
</script>

<style scoped>
.whoami__tag {
  margin-left: 14px;
  vertical-align: 3px;
}

.whoami__name {
  margin: 0 0 18px !important;
}

.whoami__line {
  margin: 0 0 28px;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.35;
  color: var(--di-fg-muted);
}

.whoami__lead {
  margin: 0 0 28px;
  font-size: var(--di-slide-body);
  line-height: 1.4;
  color: var(--di-slide-meta);
}

/* The rule: the brand's only divider, in full ink on slides */
.whoami__facts {
  margin: 0;
  padding-top: 24px;
  border-top: 1px solid var(--di-fg);
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
