# Brand Guidelines — davideimola

Design system estratto da `davideimola.dev`. Usare come riferimento quando si lavora sul tema.

## Colori

| Token        | Valore      | Uso                                      |
|--------------|-------------|------------------------------------------|
| `--bg`       | `#080807`   | Sfondo principale (quasi nero)           |
| `--bg-card`  | `#0f0e0d`   | Sfondo card / code block                 |
| `--bg-hover` | `#141311`   | Sfondo hover                             |
| `--border`   | `#1c1a18`   | Bordi primari                            |
| `--border-mid`| `#252220`  | Bordi medi                               |
| `--text-1`   | `#eae5df`   | Testo principale (bianco caldo)          |
| `--text-2`   | `#9a948e`   | Testo secondario                         |
| `--text-3`   | `#7e7874`   | Testo terziario / muted                  |
| `--accent`   | `#c91f37`   | Akane Red — colore primario del brand    |
| `--accent-hover` | `#a8192e` | Rosso hover                            |
| `--accent-glow`  | `rgba(201,31,55,0.12)` | Glow / ombre accent     |

## Tipografia

- **Sans-serif**: `IBM Plex Sans` — corpo del testo, paragrafi
- **Monospace**: `JetBrains Mono` — heading, UI chrome, codice, etichette

## Aesthetic

- Dark terminal/developer-focused
- Dot grid di sfondo (24–28px, punti al 6% opacity)
- Proporzioni pulite, spaziature precise
- Minimalismo: niente decorazioni superflue
- Il `//` rosso è il prefisso "commento" del brand (usato in footer, attribution, label)
- Il `~` tilde rosso è il prefisso del logo (`~/davideimola`)

## Pattern ricorrenti

```
// commento / attribution / label  →  JetBrains Mono, accent color prefix
~/davideimola                      →  logo header, tilde in accent
```

## Layout Slidev disponibili

| Layout    | Uso                                          |
|-----------|----------------------------------------------|
| `cover`   | Prima/ultima slide, titolo grande             |
| `intro`   | Slide di presentazione speaker con code block |
| `default` | Contenuto generico                            |
| `section` | Separatore di sezione con numero              |
| `fact`    | Numero grande in accent color                 |
| `quote`   | Citazione con watermark decorativo            |
| `two-cols`| Due colonne                                   |
