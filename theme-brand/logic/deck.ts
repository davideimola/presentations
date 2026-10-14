import { useNav, useSlideContext } from '@slidev/client'
import { computed } from 'vue'

/** Layouts that open a new section of the deck. */
export const SECTION_LAYOUTS = ['section']

interface DeckSlide {
  no: number
  layout: string
  frontmatter: Record<string, any>
}

/**
 * Deck-wide state for the current slide: its page number, the total,
 * the slides that open a section, and the section the slide belongs to.
 *
 * The page comes from the slide context, not from the global nav, so the
 * footer and the tape stay correct in exports, where every slide renders
 * at once.
 */
export function useDeck() {
  const nav = useNav()
  const { $page, $frontmatter } = useSlideContext()

  const slides = computed<DeckSlide[]>(() =>
    nav.slides.value.map(route => ({
      no: route.no,
      layout: route.meta?.slide?.frontmatter?.layout ?? (route.no === 1 ? 'cover' : 'default'),
      frontmatter: route.meta?.slide?.frontmatter ?? {},
    })),
  )

  const page = computed(() => $page.value)
  const total = computed(() => nav.total.value)

  const sectionStarts = computed(() =>
    slides.value.filter(s => SECTION_LAYOUTS.includes(s.layout)).map(s => s.no),
  )

  /** The section slide that opens the section this slide is in, if any. */
  const currentSection = computed(() =>
    [...slides.value]
      .reverse()
      .find(s => s.no <= page.value && SECTION_LAYOUTS.includes(s.layout)),
  )

  /**
   * Text of the section tape for this slide.
   * `tape: "..."` in the slide frontmatter wins, `tape: false` hides it,
   * otherwise the label of the current section is inherited.
   */
  const sectionTape = computed<string | null>(() => {
    const own = $frontmatter?.tape
    if (own === false)
      return null
    if (typeof own === 'string' && own.length > 0)
      return own
    const label = currentSection.value?.frontmatter?.label
    return typeof label === 'string' && label.length > 0 ? label : null
  })

  /** First slide frontmatter: the deck headmatter (event, role, ...). */
  const headmatter = computed(() => slides.value[0]?.frontmatter ?? {})

  return { page, total, slides, sectionStarts, currentSection, sectionTape, headmatter, isPrintMode: nav.isPrintMode }
}

/** Tilt for the n-th tape: the brand alternates -1deg, 1deg, -0.5deg. */
export const TAPE_TILTS = [-1, 1, -0.5]

export function tapeTilt(n: number) {
  return TAPE_TILTS[((n % TAPE_TILTS.length) + TAPE_TILTS.length) % TAPE_TILTS.length]
}

/** Resolve urls from frontmatter against the deck base url. */
export function resolveAssetUrl(url: string) {
  if (url.startsWith('/'))
    return import.meta.env.BASE_URL + url.slice(1)
  return url
}
