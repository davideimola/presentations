# presentations

Monorepo pnpm dei talk Slidev di Davide. Ogni talk è una cartella alla radice (es. `ai-defense/`, `go-ddd/`, `securing-go/`) con il proprio `src`, sopra il tema condiviso `theme-davideimola/`.

## Editorial home: content-os

La pianificazione editoriale (Ideas, Talk Pieces, CFPs) vive su **[`davideimola/content-os`](https://github.com/davideimola/content-os)**, non qui. Questo repo è la **talks Factory**: contiene solo **Artifacts** (il `TALK.md` **Brief** di ogni talk e il suo deck Slidev) che referenziano il **Talk Piece** proprietario (`content-os#<n>`). content-os è l'**Editorial source of truth** da cui le skill leggono il contesto editoriale e a cui scrivono l'**Outcome** dei **CFP**; questo Factory lo referenzia soltanto. **Non aprire issue editoriali qui** (talk, CFP): vanno su content-os.

## Agent skills

### Issue tracker

Le GitHub Issue di ingegneria (tema, tooling, build, lavoro sul repo) vivono su `davideimola/presentations`, gestite con la CLI `gh`. Le issue editoriali (talk, CFP) vanno su content-os, non qui. See `docs/agents/issue-tracker.md`.

### Triage labels

Vocabolario di default: i cinque ruoli canonici (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Layout single-context: un `CONTEXT.md` + `docs/adr/` alla radice del repo. See `docs/agents/domain.md`.
