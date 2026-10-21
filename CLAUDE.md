# presentations

Monorepo pnpm dei talk Slidev di Davide. Ogni talk è una cartella alla radice (es. `ai-defense/`, `go-ddd/`, `securing-go/`) con il proprio `src`, sopra il tema condiviso `theme-davideimola/`.

## Editorial home: Trilium

La pianificazione editoriale (idee, talk, CFP) vive nel **Trilium** di Davide (trilium.davideimola.dev), non qui, letto e scritto tramite il server MCP `trilium`. content-os (2026-10-09) e il vault Obsidian (2026-10-19) sono dismessi: non usarli mai. Questo repo è la **talks Factory**: contiene solo **Artifacts** (il `TALK.md` **Brief** di ogni talk e il suo deck Slidev) che referenziano la **talk note** proprietaria in Trilium. **Non aprire issue editoriali qui** (talk, CFP): vanno in Trilium.

- **Convenzioni:** la nota Trilium "Convenzioni per Claude" (`kg6Nk6GFhfZK`, in Sistema) è lo schema autorevole: leggila prima di creare o spostare note. Il corpo delle note è in italiano se non è già in inglese. Mai cancellare una nota: spostala in Archivio.
- **Talk note:** una nota per argomento nella collection Contenuti (`l78292msrPRH`), `#type=content`, relazione `~template` = Content Item (`HtMZvVGrddyG`), con `#channels=talk`. Lo stesso argomento può avere anche `blog` e `linkedin`. Campi talk: `#talkDate` (ISO, la prima data in calendario) e `#talk` (URL pubblicato, es. slide deployate o video). `#status`: `idea → in-progress → published` (o `archived`); `#flagSide`: `flag | side`; `#artifact`: link a brief, deck, PR (una label per valore).
- **CFP:** non è una nota a sé ma una riga nella sezione `## Talk` del corpo della talk note, una per conferenza: `*   **<Conferenza Anno>** (<date>, <città>) — <esito> — <url homepage>`. Esiti: `CFP da inviare (scadenza YYYY-MM-DD)`, `CFP inviato`, `CFP accettato`, `CFP rifiutato`. La checklist di preparazione sta in `## Prep` nello stesso corpo.
- **Gotcha MCP:** `edit_note_content` non funziona sulle note di testo: per cambiare il corpo usa `get_note_content`, modifica il Markdown e riscrivilo intero con `set_note_content`, preservando tutto il resto (link compresi). `set_attribute` **sovrascrive** un attributo con lo stesso nome, quindi non può aggiungere un secondo valore a una label multi-valore (`#artifact`, `#channels`): se la label c'è già con un altro valore, non toccarla. Per `#artifact` aggiungi il link in una lista `## Artifact` in fondo al corpo; per `#channels` chiedi a Davide di aggiungerla a mano. Un link a una nota inesistente diventa un link morto.

## Agent skills

### Issue tracker

Le GitHub Issue di ingegneria (tema, tooling, build, lavoro sul repo) vivono su `davideimola/presentations`, gestite con la CLI `gh`. Il lavoro editoriale (talk, CFP) va in Trilium, non qui. See `docs/agents/issue-tracker.md`.

### Triage labels

Vocabolario di default: i cinque ruoli canonici (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Layout single-context: un `GLOSSARY.md` + `docs/adr/` alla radice del repo. See `docs/agents/domain.md`.
