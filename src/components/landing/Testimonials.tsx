import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { EASE_OUT, revealUp, stagger } from '../../lib/motion'
import { Lines, Tag, at, bodyClass, cn, headingClass } from './primitives'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, when: 'beforeChildren', staggerChildren: 0.06 } },
  hover: { y: -6, boxShadow: '0px 20px 44px 0px rgba(33,37,41,0.10)', transition: { duration: 0.4, ease: EASE_OUT } },
}

/* Photo settles from a slight zoom; on hover it zooms back in a touch. */
const photoVariants: Variants = {
  hidden: { scale: 1.14 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE_OUT } },
  hover: { scale: 1.04, transition: { duration: 0.8, ease: EASE_OUT } },
}

const quoteVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 420, damping: 14 } },
}

type Testimonial = {
  name: string
  quote: readonly string[]
  photo: string
  /** Avatar crop copied from Figma (image size/offset relative to the 47.92px circle). */
  avatar: CSSProperties
  x: number
  y: number
  w: number
  h: number
  photoSide: 'left' | 'right'
  /** Figma x of the text column inside the card. */
  textX: number
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Edson Manuel',
    quote: ['Comprei o bilhete em minutos', 'e escolhi o meu lugar. O', 'autocarro saiu a horas e não', 'precisei de fazer fila.'],
    photo: '/assets/testimonial-edson.jpg',
    avatar: { width: '133.33%', height: '200%', left: '-6.67%', top: '-10%' },
    x: 0,
    y: 317.92,
    w: 675.97,
    h: 478.36,
    photoSide: 'left',
    textX: 361.95,
  },
  {
    name: 'Luísa Domingos',
    quote: ['Fui de Luanda ao Lubango em', 'classe executiva. Bancos', 'confortáveis, ar condicionado', 'e tudo correu bem. Ideal para', 'viajar em família.'],
    photo: '/assets/testimonial-luisa.jpg',
    avatar: { width: '181.82%', height: '227.27%', left: '-40.91%', top: '-36.36%' },
    x: 700.42,
    y: 317.92,
    w: 675,
    h: 478.36,
    photoSide: 'left',
    textX: 360.97,
  },
  {
    name: 'Ana Cristina',
    quote: ['Alugámos um autocarro para', 'uma actividade da faculdade.', 'Frota limpa, motorista', 'profissional e atendimento', 'simpático do início ao fim.'],
    photo: '/assets/testimonial-ana.jpg',
    avatar: { width: '250%', height: '366.3%', left: '-67.5%', top: '-12.82%' },
    x: 0,
    y: 821.73,
    w: 675.97,
    h: 479.34,
    photoSide: 'right',
    textX: 23.47,
  },
  {
    name: 'Paulo Sebastião',
    quote: ['Enganei-me na data da viagem,', 'mas a equipa de apoio resolveu', 'tudo sem complicações. Resposta', 'rápida e muito prestável.', 'Recomendo.'],
    photo: '/assets/testimonial-paulo.jpg',
    avatar: { width: '333.33%', height: '500%', left: '-126.67%', top: '-110%' },
    x: 700.42,
    y: 821.73,
    w: 675,
    h: 479.34,
    photoSide: 'right',
    textX: 23.47,
  },
]

function Stars() {
  return (
    <motion.span variants={stagger(0.07, 0.35)} className="flex gap-[3.42px] pt-[0.48px] pl-[0.97px]" role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span key={i} variants={starVariants} className="relative size-[16.63px]">
          <img src="/assets/icon-star.svg" alt="" className="absolute top-0 left-0 h-[17.6px] w-[18.5px] max-w-none" />
        </motion.span>
      ))}
    </motion.span>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const photoLeft = t.photoSide === 'left'
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      className="relative flex flex-col overflow-hidden rounded-[20px] border border-[#d3d8dd] bg-canvas sm:flex-row desk:absolute desk:top-(--y) desk:left-(--x) desk:block desk:h-(--h) desk:w-(--w)"
      style={at(t.x, t.y, { w: t.w, h: t.h })}
    >
      <motion.img
        variants={photoVariants}
        src={t.photo}
        alt=""
        loading="lazy"
        className={cn(
          'h-[320px] w-full object-cover sm:h-auto sm:w-1/2 desk:absolute desk:top-0 desk:h-full',
          photoLeft ? 'desk:left-0 desk:w-[336.5px]' : 'sm:order-2 desk:left-[336.5px] desk:w-[calc(100%-336.5px)]',
        )}
      />
      <div
        className="relative flex flex-col px-[22.47px] pt-[21.5px] pb-[22.49px] sm:w-1/2 desk:absolute desk:inset-y-0 desk:left-(--x) desk:w-[300px] desk:px-0"
        style={at(t.textX - 1, 0)}
      >
        <motion.img variants={quoteVariants} src="/assets/icon-quote.svg" alt="" className="ml-[2.94px] h-[21.52px] w-[23.47px]" />
        <motion.blockquote variants={quoteVariants} className={cn(bodyClass, 'mt-[30.01px] text-ink desk:whitespace-nowrap')}>
          <p>
            <Lines lines={t.quote} />
          </p>
        </motion.blockquote>
        <motion.figcaption variants={quoteVariants} className="mt-8 flex items-start desk:mt-auto">
          <span className="relative size-[47.92px] shrink-0 overflow-hidden rounded-full">
            <img src={t.photo} alt="" loading="lazy" className="absolute max-w-none" style={t.avatar} />
          </span>
          <span className="ml-[12.74px] flex flex-col pt-[4.68px]">
            <span className="text-[14px] leading-5 whitespace-nowrap text-body">{t.name}</span>
            <span className="mt-[4.67px] -ml-[0.98px]">
              <Stars />
            </span>
          </span>
        </motion.figcaption>
      </div>
    </motion.figure>
  )
}

export function Testimonials() {
  return (
    <section
      aria-labelledby="testemunhos-title"
      className="relative mx-4 mt-20 flex flex-col items-center text-center desk:mx-[31.3px] desk:mt-[97.84px] desk:block desk:h-[1303.03px]"
    >
      <Tag width={200.53} className="desk:absolute desk:top-[5.86px] desk:left-[589.88px]">
        O Que Dizem
      </Tag>
      <motion.h2
        {...revealUp(0.08)}
        id="testemunhos-title"
        className={cn(headingClass, 'mt-5 desk:absolute desk:top-[71.39px] desk:left-[689.19px] desk:mt-0 desk:-translate-x-1/2')}
      >
        <Lines lines={['A Experiência de Quem', 'Viaja com a C-TRIP']} />
      </motion.h2>
      <motion.p {...revealUp(0.16)} className={cn(bodyClass, 'mt-3 desk:absolute desk:top-[212.95px] desk:left-[688.69px] desk:mt-0 desk:-translate-x-1/2 desk:whitespace-nowrap')}>
        <Lines
          lines={[
            'Acreditamos que a satisfação dos passageiros é a medida da qualidade do nosso serviço.',
            'Estas são as histórias de quem já viajou connosco.',
          ]}
        />
      </motion.p>

      <div className="mt-10 grid w-full gap-4 text-left lg:grid-cols-2 desk:mt-0 desk:block">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </section>
  )
}
