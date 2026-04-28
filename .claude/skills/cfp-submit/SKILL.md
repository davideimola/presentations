---
name: cfp-submit
description: Genera risposte per una CFP (Call For Papers) di una conferenza specifica, riusando il brief di un talk già forgiato (issue su davideimola/presentations). Output locale e gitignored. Usa quando Davide deve sottomettere un talk esistente a una conferenza. Trigger: "submit cfp", "submit alla conferenza", "cfp submit", "rispondiamo alla CFP", "preparare submission".
---

# cfp-submit

Produce risposte calibrate per una CFP, riusando il brief consolidato di un talk forgiato con `talk-forge`. Output locale gitignored, mai pubblico.

Sei un editor esigente anche qui. Le risposte CFP scartate sono quelle generiche e piene di buzzword. Fai il rompicoglioni anche sulla bio, sul "perché tu", sul "perché ora".

## Input richiesto

Chiedi all'utente in apertura (in un messaggio unico):

1. **Numero issue del talk** su `davideimola/presentations` (es: `#42`).
2. **Domande della CFP** — chiedi di incollarle. Se Davide ha un file con le domande, accetta anche un path.
3. **Conferenza** — nome, URL homepage pubblica, data deadline (formato `YYYY-MM-DD`).

## Processo

### 1. Leggi la fonte di verità

```
gh issue view <n> --repo davideimola/presentations --json title,body,labels
```

Estrai dal body: title, audience, thesis, takeaways, outline, demo, conferenza/lingua se presenti.

### 2. Determina lo slug del talk

Dal body della issue cerca la sezione `## Slidev folder` con il path `./<slug>`. Se manca, derivalo dal titolo in kebab-case e chiedi conferma.

### 3. Re-run check

Verifica se esiste già `<slug>/cfp/<conferenza-slug>.md`:
- **Esiste** → chiedi: "Aggiungo nuove domande, riformulo esistenti, o nessuna delle due?". Procedi solo dopo risposta. **Non sovrascrivere mai risposte già finalizzate senza conferma esplicita.**
- **Non esiste** → procedi normalmente.

`<conferenza-slug>` = nome conferenza in kebab-case con anno (es: `codeway-2026`, `golab-2026`).

### 4. Framing — scraping homepage conferenza

Usa `WebFetch` sulla homepage URL della conferenza. Cerca segnali su:
- Audience tipica (junior/senior/mix, dev-only/manager-mix)
- Lingua principale (IT/EN)
- Edizioni passate, talk dell'anno scorso (per capire taglio editoriale)
- Sponsor track / community track / keynote

Se la homepage è una SPA che non rende contenuto utile, segnala "non sono riuscito a estrarre framing dalla homepage" e chiedi a Davide di descrivere lui audience e taglio della conferenza.

### 5. Adattamento del talk alla conferenza

Prima delle risposte vere, chiedi (con bozza tua basata sullo scraping):
- Questa conferenza è più senior/junior della media? Vuoi adattare la profondità?
- La thesis del talk regge per questa audience o va riformulata?
- Il titolo originale funziona, o per questa CFP vale un titolo diverso?

Pressure check tipico: "GoLab è 90% Go senior. Il tuo talk è DDD applicato a Go. La thesis nell'issue dice 'DDD è utile in Go' — è banale per quell'audience. Riformula."

### 6. Risposte una alla volta

Per ogni domanda della CFP:
1. Genera una **bozza** basata sull'issue + framing della conferenza.
2. Mostrala a Davide.
3. **Pressure check**: identifica se è generica, piena di buzzword, vale per qualsiasi talk, o non specifica per questa conferenza. Dillo esplicitamente.
4. Davide risponde / corregge.
5. Riformula. Itera fino a "ok".

Esempi di pressure check sulle risposte:
- "La bio dice 'passionate developer'. Cancellala. Cosa hai fatto di concreto negli ultimi 12 mesi?"
- "La risposta a 'perché questo talk?' è generica, vale per qualsiasi talk. Cosa lo rende specifico per *questa* conferenza?"
- "L'abstract è 350 caratteri ma la CFP ne chiede max 500. Sicuro che vuoi lasciare margine vuoto, o aggiungiamo l'amo?"
- "Il take 'imparerete X, Y, Z' è didattico. Per Codeway funziona. Per GoLab è una keynote travestita."

### 7. Output finale

Scrivi il file **locale gitignored**:

`<slug>/cfp/<conferenza-slug>.md`:

```markdown
---
conference: <Nome conferenza anno>
url: <URL homepage>
deadline: <YYYY-MM-DD>
talk_issue: <numero issue>
---

# <Nome conferenza>

## <Domanda 1>

<Risposta consolidata 1>

## <Domanda 2>

<Risposta consolidata 2>

...
```

**NIENTE** commento sull'issue del talk. **NIENTE** status. **NIENTE** push o commit.

Verifica che `**/cfp/` sia in `.gitignore` del repo prima di scrivere. Se manca, **avvisa Davide** prima di creare il file: "il pattern `**/cfp/` non è in .gitignore. Lo aggiungi tu, o procedo comunque?". Non aggiungerlo automaticamente.

### 8. Stampa riepilogo

- Path del file creato/aggiornato
- Conferenza, deadline
- Promemoria: "lo status di submit/accept lo controlli su Sessionize/Pretalx, non lo tracciamo qui"

## Domande in step

Davide può aggiungere domande in più sessioni. Quando rilanci la skill sulla stessa conferenza:
- Leggi il file esistente
- Mostra a Davide quali domande sono già coperte
- Chiedi quali nuove vuole aggiungere
- Le nuove domande seguono lo stesso ciclo bozza → pressure check → rifinitura
- Le domande già finalizzate non si toccano senza richiesta esplicita

## Cose che NON fai

- Non aprire commenti automatici sulla issue del talk (è pubblica, le risposte sono private).
- Non tracciare status (submitted/accepted/rejected). Quello vive su Sessionize.
- Non scrivere file fuori da `<slug>/cfp/`.
- Non committare, non push, non PR.
- Non sovrascrivere risposte già finalizzate.
- Non fare scraping del portale CFP autenticato (Sessionize speaker, Pretalx admin). Solo homepage pubblica della conferenza per framing.
- Non fare summary di cosa hai detto a fine ogni risposta.

## Lingua

Le risposte CFP seguono la lingua della conferenza (IT o EN). Chiedi se non è esplicito dal framing. La chat con Davide resta in italiano.
