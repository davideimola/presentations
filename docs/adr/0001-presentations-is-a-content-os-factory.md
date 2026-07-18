---
status: accepted
---

# presentations is a content-os Factory: artifacts only, editorial creation stays upstream

`davideimola/content-os` is the single editorial source of truth for every content lifecycle (content-os ADR-0012). This repo was an island — it opened `talk`-labeled editorial issues on itself. We decided that `presentations` is a **Factory**: it holds only artifacts (each talk's `TALK.md` brief and its Slidev deck) that reference their owning `content-os#<n>`, and its skills read editorial context from and write outcomes to content-os. No editorial issue is ever opened here again.

## Creation authority

Editorial items are created upstream, with one deliberate asymmetry:

- **`talk-forge` is reference-only.** It starts from a Talk Piece (`content-os#<n>`, spawned by `/desk`), structures the talk into `TALK.md` + a Slidev scaffold, and writes back only a pointer to the artifact. It never creates a Piece — Piece creation is a planning decision that belongs to `/desk`, and a second spawn path would let the two diverge.
- **`cfp-submit` creates-if-missing.** Running it *is* the act of submitting a talk to a conference, so it is the honest birth moment of the CFP: it creates the content-os CFP issue when absent (linking the Talk Piece and the artifact), otherwise reads the existing one. It generates private, gitignored answers locally and writes back only the authoring-time Outcome (`to submit` / `submitted`).

`slide-craft` stays a pure artifact editor: it inherits the content-os link transitively through `TALK.md` and wires nothing directly.

## Considered options

- **Block all of this on the content-os three-tier migration (`content-os#42`)** — rejected: it would freeze the zero-dependency parts (the `CLAUDE.md` relationship, stopping editorial issues here) that stand on the already-landed content-os contract (labels + `idea.yml` / `cfp.yml`).
- **Let `talk-forge` create the Talk Piece** — rejected: two spawn paths for the same object, against the single-source model of content-os ADR-0011.
- **Make `cfp-submit` read-only** — rejected: it forces double entry of the same conference data into both the `cfp.yml` form and the skill.

## Consequences

- The `talk-forge` ← Talk Piece wiring is soft-blocked on `content-os#42`: clean Talk Pieces (channel `talk`, no `cfp`) don't exist yet, so in the interim it references whatever content-os issue represents the talk.
- `accepted` / `rejected` Outcome transitions stay on content-os (`/desk`), since an accepted CFP drives Piece-level slotting.
- Migrating the legacy artifacts and the three existing `talk` issues (#1–#3) is a separate follow-up, blocked on `content-os#42`.
