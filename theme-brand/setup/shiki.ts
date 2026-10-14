import { defineShikiSetup } from '@slidev/types'
import theme from '../shiki-theme.json'

/* Slides are always light: the same paper theme for both slots.
   Keywords in akane, strings in the code-string token, comments slate
   italic, everything else ink. */
export default defineShikiSetup(() => ({
  themes: {
    dark: theme as never,
    light: theme as never,
  },
}))
