import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { NAV_LINKS } from '../../constants/cities'
import { EASE_OUT } from '../../lib/motion'
import { cn } from './primitives'

/** Scroll distance after which the fixed header takes over from the hero navbar. */
export const STICKY_THRESHOLD = 80

const SECTION_IDS = ['reservas', 'sobre', 'servicos', 'novidades'] as const

/** Scroll-spy: the last nav section whose top has passed the middle of the viewport. */
function useActiveSection(scrollY: MotionValue<number>) {
  const [active, setActive] = useState<string>('reservas')
  const update = () => {
    const line = window.innerHeight * 0.45
    let current: string = SECTION_IDS[0]
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) current = id
    }
    setActive(current)
  }
  useEffect(update, [])
  useMotionValueEvent(scrollY, 'change', update)
  return active
}

/*
 * Fixed header shown once the page starts scrolling: a floating frosted-white bar (dark text, green CTA)
 * that slides down from the top, highlights the current section with a gliding pill and shows reading
 * progress along its bottom edge. The hero navbar fades out over the same distance (see Hero.tsx).
 */
export function StickyHeader() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 })
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(scrollY)

  useEffect(() => setVisible(window.scrollY > STICKY_THRESHOLD), [])
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > STICKY_THRESHOLD
    setVisible(next)
    if (!next) setOpen(false)
  })

  // Only the first link pointing at a section gets the highlight (Promoções and Notícias share #novidades).
  const activeLabel = NAV_LINKS.find((l) => l.href === `#${active}`)?.label

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="sticky-header"
          initial={{ y: -96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 top-2 z-50 px-2 sm:top-3 sm:px-4"
        >
          <div className="relative mx-auto flex h-16 w-full max-w-[1408.69px] items-center justify-between overflow-hidden rounded-[18px] border border-white/70 bg-white/80 pr-2.5 pl-4 shadow-[0px_10px_30px_0px_rgba(33,37,41,0.10)] backdrop-blur-xl sm:pl-5">
            <a href="#reservas" className="block h-8 w-[82px] shrink-0" aria-label="C-TRIP — início">
              <img src="/assets/logo.png" alt="C-TRIP" width={82} height={32} className="size-full object-contain" />
            </a>

            <nav aria-label="Principal (fixo)" className="hidden items-center gap-1 desk:flex">
              {NAV_LINKS.map((link) => {
                const isActive = link.label === activeLabel
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-[15px] leading-5 transition-colors',
                      isActive ? 'text-brand' : 'text-body hover:text-ink',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sticky-nav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-brand-soft"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                )
              })}
            </nav>

            <div className="hidden items-center gap-2 desk:flex">
              <a href="#" className="rounded-[12px] px-4 py-2.5 text-[15px] leading-5 text-ink transition-colors hover:bg-canvas">
                Entrar
              </a>
              <motion.a
                href="#"
                whileTap={{ scale: 0.97 }}
                className="rounded-[12px] bg-brand px-5 py-3 text-[15px] leading-5 font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Registar
              </motion.a>
            </div>

            <button
              type="button"
              className="flex size-11 cursor-pointer items-center justify-center rounded-[12px] text-ink transition-colors hover:bg-canvas desk:hidden"
              aria-expanded={open}
              aria-controls="sticky-mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                ) : (
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                )}
              </svg>
            </button>

            {/* Reading progress */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand"
              style={{ scaleX: progress }}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                id="sticky-mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="mx-auto mt-2 flex max-w-[1408.69px] origin-top flex-col gap-1 rounded-[18px] border border-white/70 bg-white/90 p-3 shadow-[0px_10px_30px_0px_rgba(33,37,41,0.10)] backdrop-blur-xl desk:hidden"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-[10px] px-3 py-2.5 text-[16px] leading-5 hover:bg-canvas',
                      link.label === activeLabel ? 'bg-brand-soft text-brand' : 'text-ink',
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <a href="#" className="rounded-[12px] px-3 py-3 text-center text-[16px] leading-5 text-ink ring-1 ring-line">
                    Entrar
                  </a>
                  <a href="#" className="rounded-[12px] bg-brand px-3 py-3 text-center text-[16px] leading-5 font-medium text-white">
                    Registar
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
