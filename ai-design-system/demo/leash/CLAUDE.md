## Brand
- Colours come only from `@davideimola/brand` utilities: `bg-bg`,
  `bg-surface`, `text-fg`, `text-fg-body`, `border-border`, `bg-tape-bg`…
- Never write a colour by hand: no hex, no `rgb()`, no Tailwind
  palette colours (`text-green-600`), no arbitrary values (`bg-[#…]`).
- Red (`accent`) is for the knot and the marker only.
- Copy is in English. No kanji or other decorative scripts.

## Components
- Reuse `src/components/ui/` before writing anything new.
- Every component gets a story in `src/stories/`: title `UI/<Name>`,
  a `Default` export.
