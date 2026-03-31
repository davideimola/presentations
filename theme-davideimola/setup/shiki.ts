import { defineShikiSetup } from '@slidev/types'
import theme from '../shiki-theme.json'

export default defineShikiSetup(() => ({
  themes: {
    dark:  theme as never,
    light: theme as never,
  },
}))
