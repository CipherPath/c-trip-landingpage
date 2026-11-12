import type { CSSProperties, ReactNode } from 'react'

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

export function Tag({
  children,
  width,
  className,
  style,
}: {
  children: ReactNode
  width: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={cn(
        'inline-flex h-[40.11px] items-center justify-center rounded-full bg-brand-soft px-6 text-[16px] leading-5 whitespace-nowrap text-brand desk:w-(--tag-w) desk:px-0',
        className,
      )}
      style={{ ...style, ['--tag-w' as string]: `${width}px` }}
    >
      {children}
    </span>
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
}: {
  label: string
  href?: string
  type?: 'submit' | 'button'
  className?: string
  style?: CSSProperties
  height: number
  circleWidth: number
}) {
  const content = (
    <>
      <span className="pl-[31.3px] text-[16px] leading-5 font-medium whitespace-nowrap text-white">
        {label}
      </span>
      <span
        className="absolute top-0 right-0 flex h-full items-center justify-center rounded-full border-2 border-brand bg-canvas"
        style={{ width: circleWidth }}
      >
        <img
          src="/assets/icon-arrow-green.svg"
          alt=""
          width={23.47}
          height={23.47}
          className="size-[23.47px] transition-transform duration-300 group-hover:rotate-45"
        />
      </span>
    </>
  )
  const classes = cn(
    'group relative flex items-center overflow-hidden rounded-full bg-brand transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    className,
  )
  if (href) {
    return (
      <a href={href} className={classes} style={{ ...style, height }}>
        {content}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} className={cn(classes, 'cursor-pointer text-left')} style={{ ...style, height }}>
      {content}
    </button>
  )
}
