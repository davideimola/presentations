/* The live demos (Claude Code, Storybook, the brand build) are middleware of
   the Slidev dev server: they run only under `pnpm dev`, on the machine that
   gives the talk. The deployed deck and every export replay what the last
   rehearsal recorded, so the slides work for anyone who opens them. */
export const LIVE = import.meta.env.DEV

/* A file from public/, under the base the deck is served from
   (/ai-design-system/ once deployed). */
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`
