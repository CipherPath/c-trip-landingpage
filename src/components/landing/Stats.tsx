import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MQ, gsap, revealUp, useGSAP } from '../../lib/motion'
import { Lines } from './primitives'

const STATS = [
  { value: 10, suffix: '+', label: ['Transportadoras', 'parceiras'] },
  { value: 50, suffix: '+', label: ['Rotas interprovinciais', 'em todo o país'] },
  { value: 18, suffix: '', label: ['Províncias ligadas', 'de norte a sul'] },
] as const

export function Stats() {
  const root = useRef<HTMLElement>(null)

  /* GSAP: numbers count up from 0 and the dividers draw downwards when the row enters the viewport. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motionOk, () => {
        const counters = gsap.utils.toArray<HTMLElement>('[data-count]', root.current)
        counters.forEach((el) => {
          const end = Number(el.dataset.count)
          const suffix = el.dataset.suffix ?? ''
          const state = { v: 0 }
          el.textContent = `0${suffix}`
          gsap.to(state, {
            v: end,
            duration: 2,
            ease: 'power3.out',
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = `${state.v}${suffix}`
            },
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
        gsap.from('[data-divider]', {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.3,
          ease: 'power3.inOut',
          stagger: 0.18,
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        })
        // If the media query stops matching (e.g. reduced motion turned on), show the final values.
        return () => counters.forEach((el) => (el.textContent = `${el.dataset.count}${el.dataset.suffix ?? ''}`))
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-label="A C-TRIP em números"
      className="mx-4 mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4 desk:mx-[31.3px] desk:mt-[63.61px] desk:flex desk:h-[146.73px] desk:items-start desk:justify-between desk:gap-0 desk:px-[6.84px]"
    >
      {STATS.map((stat, i) => (
        <div key={stat.label[0]} className="contents">
          {i > 0 && (
            <div data-divider aria-hidden="true" className="hidden desk:mt-[7.83px] desk:block desk:h-[131.08px] desk:w-[1.16px] desk:bg-line" />
          )}
          <motion.div
            {...revealUp(i * 0.12, 0.5)}
            className="text-center desk:mt-[4.88px] desk:h-[136.95px] desk:w-[391.3px] desk:pt-[4.19px]"
          >
            <p
              data-count={stat.value}
              data-suffix={stat.suffix}
              className="text-[44px] leading-[52px] font-medium whitespace-nowrap text-ink desk:text-[56px] desk:leading-16"
            >
              {`${stat.value}${stat.suffix}`}
            </p>
            <p className="mt-2 text-[16px] leading-7 text-body desk:mt-[8.78px] desk:whitespace-nowrap">
              <Lines lines={stat.label} />
            </p>
          </motion.div>
        </div>
      ))}
    </section>
  )
}
