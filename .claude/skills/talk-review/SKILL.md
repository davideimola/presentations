---
name: talk-review
description: Cold read of one of Davide's talk decks against its TALK.md Brief, reported as what works, what doesn't hold, weak points, format changes and timing.
disable-model-invocation: true
context: fork
---

# talk-review

A **cold read** of a talk: you sit in the room the Brief names (`Conference`, `Audience`) and hear the talk for the first time, slide by slide, with the presenter notes as what Davide says. You review, Davide decides: read-only, no edits to any file.

The argument names the talk folder (`/talk-review ai-design-system`). Reply in Italian; quote slide titles and notes as they are.

## 1. Read

- `<talk>/TALK.md`: thesis, takeaways, outline with minutes, demo plan, Sources.
- `<talk>/src/slides.md`, every slide and every presenter note.
- The theme catalog named by the deck's `theme:` line (`theme-brand/BRAND.md` for `../../theme-brand`), for its limits.
- The custom components the deck uses (`<talk>/src/components/`), enough to know what each shows on screen, in the deployed deck and in an export.

Done when you can name every chapter, its slides and its minutes in the outline.

## 2. Cold read

Go through the deck in order. For each slide decide: **holds**, **weak** (the message is right, the slide doesn't carry it), or **change format** (another layout or component would carry it better). Note why in one line.

Done when every slide of the deck has a verdict: count them against the slides in `slides.md`.

## 3. Checks

Run each across the whole deck, each one a finding when it fails:

- **Thesis and takeaways**: each lands on a slide the audience sees, not only in a note. The Monday action is concrete enough to do on Monday.
- **Setups and payoffs**: everything planted early (an object, a line, a number) comes back; nothing comes back that was never planted.
- **Facts**: every number, date, quote, commit and screenshot traces to the Brief or its Sources. Check the Sources themselves (repos, files) when they are local. Unverifiable is a finding, even when it reads well.
- **Contradictions**: two slides or notes that cannot both be true ("7 colours today" against "the site owns no colour").
- **Promises the stage may not keep**: a note that describes what a live demo or a non-deterministic model will do, said as certain.
- **Chronology**: the story's order of events matches the order on screen, and every jump in time is announced.
- **Repetition**: the same layout or component so often it stops registering, a list revealed again that the audience already knows, a point explained twice.
- **Brand**: the limits of the theme catalog (sizes, lines of code, markers, punctuation).
- **Leftovers**: `[TO SOURCE]`, `TODO`, stale notes about setups that changed.
- **Timing**: minutes per chapter, about 35 seconds per text slide plus the demo times the notes give, against the outline.

A slow beat that is a deliberate joke or a moment of play is a feature: flag it only when it costs more than a minute.

## 4. Report

In this order, every finding naming the slide title and its line in `slides.md`:

1. **Cosa funziona**: the strong moments and why they work, so they survive the next edit.
2. **Cose che non reggono**: facts, contradictions, promises: what is wrong today.
3. **Punti deboli**: what holds but would land better changed, with the change.
4. **Formato**: a table, slide · today · proposal.
5. **Tempi**: a table, chapter · Brief · estimate, and the total against the slot.
6. **Fix list**: the corrections from 2, numbered, so Davide can answer by number.

Done when every finding of step 3 is in the report or was dropped on purpose, and every slide marked weak or change format appears in 3 or 4.
