import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Transition, Variants } from 'framer-motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  // Dev-only handle for debugging timelines from the console.
  if (import.meta.env.DEV) (window as unknown as { gsap: typeof gsap }).gsap = gsap
}

export { gsap, ScrollTrigger, useGSAP }

/** Easing shared by GSAP ("expo.out"-like) and framer-motion. */
export const EASE_OUT: Transition['ease'] = [0.16, 1, 0.3, 1]

export const MQ = {
  desktop: '(min-width: 75rem)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
} as const

/** Reveal-on-scroll props for any `motion.*` element (animates once, ends at its exact layout position). */
export const reveal = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.35 },
} as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  }),
}

/** Spread on a `motion.*` element: fades up into place once it scrolls into view. */
export const revealUp = (delay = 0, amount = 0.35) =>
  ({ ...reveal, viewport: { once: true, amount }, variants: fadeUp, custom: delay }) as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number = 0) => ({ opacity: 1, transition: { duration: 0.8, ease: EASE_OUT, delay } }),
}

/** Parent that staggers its children's `fadeUp`/`card` variants. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const card: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

/** Image/card wipe: opens from a rounded inset to its full box. */
export const clipReveal = (radius: number): Variants => ({
  hidden: { clipPath: `inset(10% 10% 10% 10% round ${radius}px)`, opacity: 0 },
  show: (delay: number = 0) => ({
    clipPath: `inset(0% 0% 0% 0% round ${radius}px)`,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT, delay },
  }),
})
