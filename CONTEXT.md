# Presentations (talks Factory)

This repo is a **content-os Factory**: it produces the artifacts for talks (briefs and slide decks) while the editorial lifecycle lives on `davideimola/content-os`. The glossary below pins the terms that cross that boundary.

## Language

**Factory**:
This repo's role — a producer of artifacts for content-os, holding no editorial state of its own.
_Avoid_: repo, project

**Artifact**:
A production output this Factory owns — a talk's `TALK.md` brief and its Slidev deck — that references its owning `content-os#<n>`. Never the editorial source of truth.
_Avoid_: deliverable, output

**Brief**:
The structured definition of a talk (thesis, audience, takeaways, outline, demo), living in that talk's `TALK.md`.
_Avoid_: spec, proposal

**Talk Piece**:
The content-os issue representing one talk (channel `talk`, not `cfp`), created by `/desk`. One Talk Piece has many CFPs.
_Avoid_: talk issue, brief issue

**CFP**:
The content-os issue for submitting one Talk Piece to one conference, carrying a deadline and an Outcome.
_Avoid_: submission, proposal

**Outcome**:
A CFP's status — `to submit`, `submitted`, `accepted`, `rejected` — a separate axis from a Piece's state ladder.
_Avoid_: status, state

**Editorial source of truth**:
`davideimola/content-os` — where skills read editorial context from and write outcomes to. This Factory only ever references it.
_Avoid_: pipeline, HQ
