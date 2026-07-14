# Brand Guidelines — davideimola

Design system estratto da `davideimola.dev`. Usare come riferimento quando si lavora sul tema. La fonte canonica sono `docs/brand.md` e `docs/design-system.md` nel repo del sito.

## Colori

| Token           | Valore                   | Uso                                        |
|-----------------|--------------------------|--------------------------------------------|
| `--bg`          | `#080807`                | Sfondo principale (quasi nero)             |
| `--bg-card`     | `#0f0e0d`                | Sfondo card / code block                   |
| `--bg-hover`    | `#141311`                | Sfondo hover                               |
| `--border`      | `#1c1a18`                | Bordi primari                              |
| `--border-mid`  | `#252220`                | Bordi medi                                 |
| `--border-hover`| `rgba(201,31,55,0.3)`    | Bordo card in hover (accent tenue)         |
| `--text-1`      | `#eae5df`                | Testo principale (bianco caldo)            |
| `--text-2`      | `#9a948e`                | Testo secondario                           |
| `--text-3`      | `#a39c95`                | Testo terziario / muted (vedi nota)        |
| `--accent`      | `#c91f37`                | Akane Red — colore primario del brand      |
| `--accent-text` | `#e0475c`                | Akane schiarito per testo piccolo (WCAG AA)|
| `--accent-hover`| `#a8192e`                | Rosso hover                                |
| `--accent-glow` | `rgba(201,31,55,0.12)`   | Glow / overlay / highlight tenue           |

> **Nota su `--text-3`** — nel tema vale `#a39c95`, più chiaro del `#7e7874` usato
> sul sito. È una deviazione a11y **intenzionale**: garantisce contrasto sufficiente
> quando le slide vengono proiettate (proiettori e sale luminose comprimono i toni
> scuri). Non allinearlo al valore del sito.

> **Regola `--accent-text`** — `#c91f37` come testo piccolo si ferma a 3.56:1 su
> `--bg` (soglia AA: 4.5:1). Il rosso usato come **testo piccolo** (prefissi `//`,
> il `.dev` del lockup, le keyword del codice, badge/callout) usa `--accent-text`
> (`#e0475c`, 4.99:1 su `--bg`, 4.80:1 su `--bg-card`). `#c91f37` resta per titoli
> giganti (fact), UI, fill e per il **cursore del brand**, che non va mai
> ricolorato: il cursore è decorativo, non testo.

## Tipografia

- **Sans-serif**: `IBM Plex Sans` — corpo del testo, paragrafi
- **Monospace**: `JetBrains Mono` — heading, UI chrome, codice, etichette

## Brand mark

Il concept è lo stato finale della typing animation della homepage: il nome appena
digitato, con il cursore rosso ancora lì. "Just typed, still writing."

- **Mark**: `di` + cursore a barra rosso. Per avatar, sticker, app icon, favicon.
- **Wordmark**: `davideimola` + cursore a barra rosso. Logo del NavBar del sito e
  del tema (header delle slide).

### Regole

- Il cursore è **sempre** `#c91f37` (`var(--accent)`): mai ricolorato, mai omesso.
- Il cursore può lampeggiare nei contesti animati: `1.1s step-end infinite`,
  rispettando sempre `prefers-reduced-motion`.
- La vecchia forma `~/davideimola` (tilde rossa) è **deprecata** come logo — non va
  mai anteposta al mark o al wordmark. Sopravvive **solo** come metafora di path
  di shell nel layout `terminal` (titolo della finestra), dove è coerente col
  contesto terminale.

### Costruzione

- Tipo: **JetBrains Mono Bold**, lowercase, tracking `-0.03em`.
- Cursore a barra: `0.14em` di larghezza × `0.86em` di altezza, gap `0.10em` dopo
  l'ultima glifo. Nel tema è implementato come `<span>`/`::after` a barra CSS
  (`inline-block`, `background: var(--accent)`), non come carattere.
- Ink: `#eae5df` su `#080807`.

### Asset

Asset scaricabili su [davideimola.dev/brand](https://davideimola.dev/brand) e nel
repo del sito in `public/brand/`:

- `mark.svg` (+ varianti `mark-light.svg`, `mark-mono.svg`)
- `wordmark.svg` (+ variante ink scuro `wordmark-dark.svg`)
- `domain.svg` — lockup `davideimola` + `.dev` rosso (+ variante ink scuro)

Sono path SVG outlined (nessuna dipendenza dal font), licenza CC BY-ND 4.0.

## Aesthetic

- Dark terminal/developer-focused
- Dot grid di sfondo (24–28px, punti al ~6% opacity)
- Proporzioni pulite, spaziature precise
- Minimalismo: niente decorazioni superflue (ma/間 — lo spazio negativo è design)
- Il `//` rosso è il prefisso "commento" del brand (label h6, attribution delle quote e simili)
- La firma del brand è il **cursore rosso**, non più la tilde

## Pattern ricorrenti

```
// commento / attribution / label   →  JetBrains Mono, prefisso in accent color (label h6, quote)
davideimola▏                        →  wordmark: nome + barra-cursore rossa (logo/header)
davideimola.dev                     →  domain lockup (footer): nome quiet (text-2) + TLD rosso, senza //
```

## Layout Slidev disponibili

| Layout            | Uso                                             |
|-------------------|-------------------------------------------------|
| `cover`           | Prima/ultima slide, titolo grande + cursore     |
| `intro`           | Slide di presentazione speaker con code block   |
| `default`         | Contenuto generico                              |
| `section`         | Separatore di sezione con numero                |
| `fact`            | Numero grande in accent color                   |
| `quote`           | Citazione con watermark decorativo              |
| `two-cols`        | Due colonne                                     |
| `two-cols-header` | Header a tutta larghezza + due colonne          |
| `center`          | Contenuto centrato                              |
| `statement`       | Affermazione grande, singolo concetto           |
| `image-left`      | Immagine a sinistra, contenuto a destra         |
| `image-right`     | Contenuto a sinistra, immagine a destra         |
| `split-code`      | Contenuto e blocco di codice affiancati         |
| `code-hero`       | Codice protagonista a tutta pagina (spot-the-bug), solo label h6 o `<Rungs>` |
| `terminal`        | Finestra terminale con titlebar (path `~/…` ok) |
