import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { revealUp } from '../../lib/motion'
import { SmartLink } from '../site/SmartLink'

const MotionSmartLink = motion.create(SmartLink)

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

/** Desktop absolute positioning from Figma coordinates (via CSS vars, so mobile keeps normal flow). */
export const ABS = 'desk:absolute desk:left-(--x) desk:top-(--y)'

export function at(x: number, y: number, vars: Record<string, number> = {}): CSSProperties {
  const style: Record<string, string> = { '--x': `${x}px`, '--y': `${y}px` }
  for (const [key, value] of Object.entries(vars)) style[`--${key}`] = `${value}px`
  return style as CSSProperties
}

/** Text authored with fixed line breaks in Figma: breaks on desktop, flows naturally on mobile. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="desk:block">
          {line}
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}

/** Section eyebrow pill; fades up into place when scrolled into view. */
export function Tag({
  children,
  width,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode
  /** Fixed Figma width on desktop; omit for the auto-width "Site/Tag" (24px side padding). */
  width?: number
  className?: string
  style?: CSSProperties
  delay?: number
}) {
  return (
    <motion.span
      {...revealUp(delay)}
      className={cn(
        'inline-flex h-[40.11px] items-center justify-center rounded-full bg-brand-soft px-6 text-[16px] leading-5 whitespace-nowrap text-brand',
        width !== undefined && 'desk:w-(--tag-w) desk:px-0',
        className,
      )}
      style={width !== undefined ? { ...style, ['--tag-w' as string]: `${width}px` } : style}
    >
      {children}
    </motion.span>
  )
}

export const headingClass =
  'text-[34px] leading-[42px] font-medium tracking-[-0.3px] text-ink desk:text-[56px] desk:leading-[68.5px] desk:whitespace-nowrap'

export const bodyClass = 'text-[16px] leading-7 text-body'

/** Green pill call-to-action with the white arrow circle on the right. */
export function ArrowPillButton({
  label,
  href,
  type,
  className,
  style,
  height,
  circleWidth,
  reveal,
}: {
  label: string
  href?: string
  type?: 'submit' | 'button'
  className?: string
  style?: CSSProperties
  height: number
  circleWidth: number
  /** Fade up on scroll with this delay (seconds). */
  reveal?: number
}) {
  const content = (
    <>
      <span className="relative pl-[31.3px] text-[16px] leading-5 font-medium whitespace-nowrap text-white">
        {label}
      </span>
      {/* Hover: a soft ring appears around the circle and the arrow turns to point right. */}
      <span
        className="absolute top-0 right-0 flex h-full items-center justify-center rounded-full border-2 border-brand bg-canvas transition-[box-shadow] duration-500 group-hover:shadow-[0_0_0_6px_rgba(33,125,80,0.16)]"
        style={{ width: circleWidth }}
      >
        <img
          src="/assets/icon-arrow-green.svg"
          alt=""
          width={23.47}
          height={23.47}
          className="size-[23.47px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45"
        />
      </span>
    </>
  )
  const classes = cn(
    'group relative flex items-center overflow-hidden rounded-full bg-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    className,
  )
  const motionProps = {
    whileTap: { scale: 0.985 },
    ...(reveal !== undefined ? revealUp(reveal) : {}),
  }
  if (href) {
    return (
      <MotionSmartLink href={href} className={classes} style={{ ...style, height }} {...motionProps}>
        {content}
      </MotionSmartLink>
    )
  }
  return (
    <motion.button type={type ?? 'button'} className={cn(classes, 'cursor-pointer text-left')} style={{ ...style, height }} {...motionProps}>
      {content}
    </motion.button>
  )
}
