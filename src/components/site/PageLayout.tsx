import { Fragment } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import { EASE_OUT, revealUp } from '../../lib/motion'
import { Footer, Newsletter } from '../landing/Footer'
import { StickyHeader } from '../landing/StickyHeader'
import { Tag, cn } from '../landing/primitives'
import { BannerBackdrop } from './BannerBackdrop'
import { SiteNavbar } from './SiteNavbar'
import { SmartLink } from './SmartLink'

/**
 * Shell for the inner pages (Figma frames 20:2, 20:196, 21:98, 23:295, 24:999): white page, fixed header,
 * green banner, content column of 1440px, then the shared newsletter + footer (120px after the content).
 */
export function PageLayout({ banner, children }: { banner: ReactNode; children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <StickyHeader />
      <div className="overflow-x-clip bg-white">
        <div className="canvas mx-auto pb-2 desk:w-full desk:pb-[15.64px]">
          {banner}
          <main className="mx-auto desk:w-[1440px]">
            {children}
            <Newsletter className="desk:mt-[120px]" />
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}

export type Crumb = { label: string; href?: string }

const bannerItem = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.1 + i * 0.08 } }),
}

/** Figma "Banner": green card with the white navbar, breadcrumbs, title and intro (plus optional extras), over the decorative BannerBackdrop. */
export function PageBanner({
  crumbs,
  title,
  intro,
  introWidth = 760,
  paddingBottom = 80,
  children,
}: {
  crumbs: Crumb[]
  title: string
  intro: string
  introWidth?: number
  paddingBottom?: number
  children?: ReactNode
}) {
  return (
    <section
      className="relative mx-2 mt-2 overflow-hidden rounded-[24px] bg-[linear-gradient(115deg,#0d3522_0%,#13492f_38%,#1a6440_72%,#217d50_100%)] p-4 pb-12 text-white desk:mx-[15.64px] desk:mt-[15.64px] desk:p-0 desk:pb-(--banner-pb)"
      style={{ ['--banner-pb' as string]: `${paddingBottom}px` } as CSSProperties}
    >
      <BannerBackdrop />
      <div className="relative mx-auto w-full desk:w-[1408.69px]">
        <div className="relative desk:h-[80.22px]">
          <SiteNavbar />
        </div>
        <div className="flex flex-col items-start gap-5 pt-10 desk:px-10 desk:pt-16">
          <motion.nav aria-label="Localização" initial="hidden" animate="show" custom={0} variants={bannerItem} className="text-[14px] leading-[25px] whitespace-pre text-white/72">
            {crumbs.map((crumb, i) => (
              <Fragment key={crumb.label}>
                {i > 0 && '  /  '}
                {crumb.href ? (
                  <SmartLink href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </SmartLink>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </Fragment>
            ))}
          </motion.nav>
          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={bannerItem}
            className="text-[36px] leading-[44px] font-medium tracking-[-0.3px] desk:text-[56px] desk:leading-[68px] desk:whitespace-nowrap"
          >
            {title}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={bannerItem}
            className="text-[16px] leading-7 text-white/86 desk:w-(--intro-w) desk:text-[18px] desk:leading-[30px]"
            style={{ ['--intro-w' as string]: `${introWidth}px` } as CSSProperties}
          >
            {intro}
          </motion.p>
          {children && (
            <motion.div initial="hidden" animate="show" custom={3} variants={bannerItem} className="flex w-full flex-col items-start gap-5">
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

/** Content section with the Figma spacing (104px between blocks, 40px side padding). */
export function PageSection({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('scroll-mt-24 px-4 pt-16 desk:px-10 desk:pt-[104px]', className)}>
      {children}
    </section>
  )
}

/** Figma "Título secção": tag + 44/54 heading (+ optional text). */
export function SectionHeading({
  tag,
  title,
  text,
  center = false,
  textWidth,
  className,
}: {
  tag: string
  title: ReactNode
  text?: string
  center?: boolean
  textWidth?: number
  className?: string
}) {
  return (
    <div className={cn('flex w-full flex-col gap-[18px]', center ? 'items-center text-center' : 'items-start', className)}>
      <Tag>{tag}</Tag>
      <motion.h2 {...revealUp(0.08)} className="text-[32px] leading-[40px] font-medium tracking-[-0.3px] text-ink desk:text-[44px] desk:leading-[54px]">
        {title}
      </motion.h2>
      {text && (
        <motion.p
          {...revealUp(0.16)}
          className="text-[16px] leading-7 text-body desk:w-(--text-w)"
          style={textWidth ? ({ ['--text-w' as string]: `${textWidth}px` } as CSSProperties) : undefined}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

/** Figma "Ícone": 26px icon on a soft green 14px-radius tile. */
export function IconBadge({ src }: { src: string }) {
  return (
    <span className="inline-flex shrink-0 rounded-[14px] bg-brand-soft p-[14px]">
      <img src={src} alt="" width={26} height={26} className="size-[26px]" />
    </span>
  )
}

/** White card used across the inner pages (1px #dee2e6 border, 20px radius). */
export const cardClass = 'rounded-[20px] border border-line bg-white'
