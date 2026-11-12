import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { NAV_LINKS } from '../../constants/cities'
import { EASE_OUT } from '../../lib/motion'
import { ABS, at, cn } from '../landing/primitives'
import { STICKY_THRESHOLD } from '../landing/StickyHeader'
import { SmartLink } from './SmartLink'

/*
 * Figma "Site/Header": white navbar laid out on the 1408.69px banner column (absolute coordinates on
 * desktop, logo + menu button on mobile). Fades and lifts away while the fixed header slides in.
 * `intro` marks the items for the landing hero's GSAP intro (they stay hidden by CSS until it runs),
 * so it must only be set where that intro exists.
 */
export function SiteNavbar({ intro = false }: { intro?: boolean }) {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, STICKY_THRESHOLD], [1, 0])
  const navY = useTransform(scrollY, [0, STICKY_THRESHOLD], [0, -16])
  const introProps = intro ? { 'data-intro': 'nav' } : {}

  return (
    <motion.header
      style={{ opacity: navOpacity, y: navY }}
      className="relative z-10 flex w-full items-center justify-between desk:absolute desk:inset-x-0 desk:top-0 desk:block desk:h-[80.22px]"
    >
      <SmartLink {...introProps} href="/" className={cn('block h-[39px] w-[100px]', ABS)} style={at(23.36, 21.36)} aria-label="C-TRIP — início">
        <img src="/assets/logo.png" alt="C-TRIP" width={100} height={39} className="size-full object-cover" />
      </SmartLink>

      <nav aria-label="Principal" className="hidden desk:absolute desk:top-[30.1px] desk:left-[444.13px] desk:block desk:h-5 desk:w-[518.47px]">
        {NAV_LINKS.map((link) => (
          <SmartLink
            key={link.label}
            {...introProps}
            href={link.href}
            className="absolute top-0 text-[16px] leading-5 whitespace-nowrap text-white transition-opacity hover:opacity-75"
            style={{ left: link.x }}
          >
            {link.label}
          </SmartLink>
        ))}
      </nav>

      <a
        {...introProps}
        href="#"
        className="hidden text-[16px] leading-5 text-white transition-opacity hover:opacity-75 desk:absolute desk:top-[30.11px] desk:left-[1173.91px] desk:block"
      >
        Entrar
      </a>
      <a
        {...introProps}
        href="#"
        className="hidden h-[48.91px] w-[119.34px] items-center justify-center rounded-[12px] bg-white/22 text-[16px] leading-5 text-white backdrop-blur-[2px] transition-colors hover:bg-white/32 desk:absolute desk:top-[16.63px] desk:left-[1264.88px] desk:flex"
      >
        Registar
      </a>

      <button
        {...introProps}
        type="button"
        className="flex size-11 cursor-pointer items-center justify-center rounded-[12px] bg-white/22 text-white desk:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="absolute inset-x-0 top-[56px] z-20 flex origin-top flex-col gap-1 rounded-[16px] bg-ink/85 p-3 backdrop-blur-md desk:hidden"
          >
            {NAV_LINKS.map((link) => (
              <SmartLink
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[10px] px-3 py-2.5 text-[16px] leading-5 text-white hover:bg-white/10"
              >
                {link.label}
              </SmartLink>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href="#" className="rounded-[12px] px-3 py-3 text-center text-[16px] leading-5 text-white ring-1 ring-white/30">
                Entrar
              </a>
              <a href="#" className="rounded-[12px] bg-white/22 px-3 py-3 text-center text-[16px] leading-5 text-white">
                Registar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
