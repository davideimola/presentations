---
status: accepted
---

# The editorial home moves to Trilium

Supersedes ADR-0001's choice of `davideimola/content-os` as the editorial source of truth. content-os was retired on 2026-10-09 (briefly replaced by an Obsidian vault), and on 2026-10-19 Davide's editorial planning moved to Trilium, under the Contenuti collection, read and written through the `trilium` MCP server. The Factory model of ADR-0001 stays: this repo holds only artifacts (`TALK.md` briefs and Slidev decks), never editorial state.

What changes:

- **Talk Piece → talk note.** The editorial item is a Trilium content note per topic (`#channels=talk`), which may also carry blog and LinkedIn for the same topic. `TALK.md` and the deck reference it by title and note ID instead of `content-os#<n>`.
- **CFP → a line in the talk note.** A CFP is no longer its own issue: it is one line per conference in the note's `## Talk` section, with its Outcome. `cfp-submit` creates the line if missing and writes only `CFP da inviare` / `CFP inviato`, as before; the answers stay local and gitignored.
- **`talk-forge` may create the talk note.** ADR-0001 kept Piece creation in `/desk` to avoid two spawn paths; `/desk` died with content-os, so talk-forge, after asking, captures the spark with `/idea` and moves it to Contenuti when no note exists. The artifact pointer becomes an `#artifact` label instead of an issue comment.

## Consequences

- `accepted` / `rejected` are set by Davide in Trilium (or by a skill only on his explicit request), and an accepted CFP is when `#talkDate` gets set.
- The Trilium MCP server overwrites same-name attributes and cannot edit text-note bodies in place; the skills work around both (see "Editorial home" in `CLAUDE.md`).
- Trilium is on a trial until ~2026-11-02. If it ends in favour of another tool, this ADR is the one to supersede.
