import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { EASE_OUT, reveal, stagger } from '../../lib/motion'
import { ABS, at, cn } from './primitives'

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

/* Icon pops in with a little overshoot after its column appears. */
const icon: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -12 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16, delay: 0.15 } },
  hover: { scale: 1.12, rotate: -6, transition: { type: 'spring', stiffness: 300, damping: 12 } },
}

const HIGHLIGHTS = [
  {
    x: 62.61,
    icon: { src: '/assets/icon-award.svg', x: 127.16, y: 2.92, w: 40.11, h: 54.77 },
    title: 'Várias transportadoras',
    titleX: 147.23,
    subtitle: 'Num só lugar',
    subtitleX: 148.22,
  },
  {
    x: 541.95,
    icon: { src: '/assets/icon-certificate.svg', x: 123.25, y: 6.84, w: 51.84, h: 47.92 },
    title: 'Pagamento Multicaixa',
    titleX: 147.23,
    subtitle: 'Express e referência',
    subtitleX: 135,
  },
  {
    x: 1021.3,
    icon: { src: '/assets/icon-handshake.svg', x: 116.41, y: 6.84, w: 59.66, h: 44.02 },
    title: 'Bilhete digital',
    titleX: 146.73,
    subtitle: 'Sempre no seu telemóvel',
    subtitleX: 135,
  },
] as const

export function Highlights() {
  return (
    <motion.section
      {...reveal}
      variants={stagger(0.14)}
      aria-label="Destaques"
      className="relative mx-4 mt-12 flex flex-col gap-10 desk:mx-[31.3px] desk:mt-[62.63px] desk:block desk:h-[166.3px]"
    >
      {HIGHLIGHTS.map((h) => (
        <motion.div
          key={h.title}
          variants={item}
          whileHover="hover"
          className="flex flex-col items-center text-center desk:absolute desk:top-[19.56px] desk:left-(--x) desk:block desk:h-[132.06px] desk:w-[293.47px]"
          style={at(h.x, 19.56)}
        >
          <motion.img
            variants={icon}
            src={h.icon.src}
            alt=""
            width={h.icon.w}
            height={h.icon.h}
            className={cn('max-w-none', ABS)}
            style={{ ...at(h.icon.x, h.icon.y), width: h.icon.w, height: h.icon.h }}
          />
          <h3
            className="mt-4 text-[20px] leading-7 font-medium whitespace-nowrap text-ink desk:absolute desk:top-[72.08px] desk:left-(--x) desk:mt-0 desk:-translate-x-1/2"
            style={at(h.titleX, 72.08)}
          >
            {h.title}
          </h3>
          <p
            className="mt-1.5 text-[16px] leading-6 whitespace-nowrap text-body desk:absolute desk:top-[106.36px] desk:left-(--x) desk:mt-0 desk:-translate-x-1/2"
            style={at(h.subtitleX, 106.36)}
          >
            {h.subtitle}
          </p>
        </motion.div>
      ))}
    </motion.section>
  )
}
