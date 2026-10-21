# Presentations (talks Factory)

This repo is a **Factory**: it produces the artifacts for talks (briefs and slide decks) while the editorial lifecycle lives in Davide's Trilium. The glossary below pins the terms that cross that boundary. See ADR-0002.

## Language

**Factory**:
This repo's role — a producer of artifacts for talks, holding no editorial state of its own.
_Avoid_: repo, project

**Artifact**:
A production output this Factory owns — a talk's `TALK.md` brief and its Slidev deck — that references its owning talk note in Trilium. Never the editorial source of truth.
_Avoid_: deliverable, output

**Brief**:
The structured definition of a talk (thesis, audience, takeaways, outline, demo), living in that talk's `TALK.md`.
_Avoid_: spec, proposal

**Talk note**:
The Trilium content note (`#type=content`, `#channels=talk`, in Contenuti) for one talk topic. It may also carry other channels (blog, LinkedIn) for the same topic. One talk note has many CFPs.
_Avoid_: talk issue, brief issue, Talk Piece

**CFP**:
One line in the `## Talk` section of a talk note's body, for submitting that talk to one conference, carrying the conference, dates, homepage and an Outcome.
_Avoid_: submission, proposal

**Outcome**:
A CFP's status — `CFP da inviare (scadenza …)`, `CFP inviato`, `CFP accettato`, `CFP rifiutato` — a separate axis from the note's `#status`.
_Avoid_: status, state

**Editorial source of truth**:
Davide's Trilium, read and written through the `trilium` MCP server — where skills read editorial context from and write outcomes to. This Factory only ever references it.
_Avoid_: pipeline, HQ
