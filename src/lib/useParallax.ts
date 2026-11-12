import type { RefObject } from 'react'
import { MQ, gsap, useGSAP } from './motion'

/**
 * Scroll parallax for every `[data-parallax="<px>"]` inside `scope` (desktop + motion allowed only).
 * Each element travels from +px to −px while it crosses the viewport, so it sits at y = 0 (its exact
 * layout position) when its centre is at the centre of the screen.
 */
export function useParallax(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.desktop} and ${MQ.motionOk}`, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]', scope.current).forEach((el) => {
          const amount = Number(el.dataset.parallax) || 30
          gsap.fromTo(
            el,
            { y: amount },
            {
              y: -amount,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          )
        })
      })
    },
    { scope },
  )
}
