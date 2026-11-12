import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { EASE_OUT, reveal, revealUp, stagger } from '../../lib/motion'
import { ABS, Lines, Tag, at, bodyClass, cn, headingClass } from './primitives'

/* Cards rise in sequence; the featured one also tilts into its 1.3° angle (CSS rotate + motion rotate). */
const cardVariants: Variants = {
  hidden: (featured: boolean) => ({ opacity: 0, y: 64, rotate: featured ? -4 : 0 }),
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1, ease: EASE_OUT } },
  hover: (featured: boolean) => ({
    y: -8,
    boxShadow: featured ? '0px 22px 44px 0px rgba(33,37,41,0.16)' : '0px 18px 40px 0px rgba(33,37,41,0.10)',
    transition: { duration: 0.4, ease: EASE_OUT },
  }),
}

const illusVariants: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.2 } },
  hover: { y: -6, scale: 1.05, transition: { type: 'spring', stiffness: 260, damping: 14 } },
}

type Card = {
  title: string
  body: readonly string[]
  x: number
  y: number
  w: number
  illus: { src: string; x: number; y: number; w: number; h: number }
  titleX: number
  bodyX: number
  featured?: boolean
}

/* Inner coordinates are Figma values minus the 1px border (CSS positions from the padding box). */
const CARDS: readonly Card[] = [
  {
    title: 'Transportadoras de Confiança',
    body: ['Trabalhamos com operadores como a Macon,', 'a Angoré Bus e a Labuta, com frotas', 'modernas, ar condicionado e conforto', 'para as viagens longas.'],
    x: 15.75,
    y: 325.75,
    w: 440,
    illus: { src: '/assets/why-transportadoras.jpg', x: 144.45, y: 28.38, w: 152, h: 131 },
    titleX: 219,
    bodyX: 219.5,
    featured: true,
  },
  {
    title: 'Bilhete Digital',
    body: ['Reserve a qualquer hora e em qualquer lugar,', 'sem filas no terminal. Mostre o código QR', 'no embarque e pronto: rápido, transparente', 'e sem papel.'],
    x: 484.23,
    y: 324.77,
    w: 440.22,
    illus: { src: '/assets/why-bilhete.jpg', x: 155.52, y: 23.45, w: 122.27, h: 136.95 },
    titleX: 219.61,
    bodyX: 219.11,
  },
  {
    title: 'Apoio 24/7',
    body: ['A nossa equipa de apoio ao cliente está', 'disponível a qualquer hora para dúvidas', 'sobre rotas, cancelamentos ou ajuda', 'durante a viagem.'],
    x: 949.88,
    y: 324.77,
    w: 442.16,
    illus: { src: '/assets/why-apoio.jpg', x: 154.53, y: 23.45, w: 123.25, h: 142.83 },
    titleX: 220.58,
    bodyX: 221.08,
  },
  {
    title: 'Preços Transparentes',
    body: ['Compare horários, preços e lugares livres', 'de várias transportadoras lado a lado e', 'escolha a viagem que melhor serve', 'o seu bolso.'],
    x: 250.42,
    y: 709.23,
    w: 441.19,
    illus: { src: '/assets/why-precos.jpg', x: 145.73, y: 34.22, w: 144.77, h: 117.38 },
    titleX: 219.59,
    bodyX: 220.09,
  },
  {
    title: 'Pagamento Local',
    body: ['Pague com Multicaixa Express ou por', 'referência Multicaixa, em kwanzas,', 'com confirmação imediata do seu', 'bilhete no telemóvel.'],
    x: 717.06,
    y: 709.23,
    w: 442.16,
    illus: { src: '/assets/why-pagamento.jpg', x: 170.19, y: 34.22, w: 103.69, h: 119.34 },
    titleX: 221.08,
    bodyX: 220.58,
  },
]

export function WhyUs() {
  return (
    <section
      aria-labelledby="vantagens-title"
      className="relative mx-4 mt-20 flex flex-col items-center text-center desk:mx-[15.64px] desk:mt-[83.16px] desk:block desk:h-[1090.75px]"
    >
      <Tag width={210.33} className={ABS} style={at(601.63, 12.72)}>
        As Nossas Vantagens
      </Tag>
      <motion.h2
        {...revealUp(0.08)}
        id="vantagens-title"
        className={cn(headingClass, 'mt-5 desk:absolute desk:top-[78.25px] desk:left-[704.34px] desk:mt-0 desk:-translate-x-1/2')}
      >
        <Lines lines={['O Que Nos Torna', 'Diferentes']} />
      </motion.h2>
      <motion.p {...revealUp(0.16)} className={cn(bodyClass, 'mt-3 desk:absolute desk:top-[219.8px] desk:left-[704.34px] desk:mt-0 desk:-translate-x-1/2 desk:whitespace-nowrap')}>
        <Lines lines={['Juntamos as melhores transportadoras com tecnologia simples,', 'para que viajar de autocarro seja mais cómodo e seguro.']} />
      </motion.p>

      <motion.div {...reveal} viewport={{ once: true, amount: 0.15 }} variants={stagger(0.12)} className="mt-10 grid w-full gap-4 md:grid-cols-2 desk:mt-0 desk:block">
        {CARDS.map((card) => (
          <motion.article
            key={card.title}
            custom={!!card.featured}
            variants={cardVariants}
            whileHover="hover"
            className={cn(
              'relative flex flex-col items-center overflow-hidden rounded-[16px] border bg-canvas px-5 pt-6 pb-7 desk:absolute desk:top-(--y) desk:left-(--x) desk:block desk:h-[360px] desk:w-(--w) desk:p-0',
              card.featured
                ? 'border-[#eef0f2] shadow-[0px_10px_30px_0px_rgba(33,37,41,0.1)] desk:rotate-[1.3deg]'
                : 'border-line',
            )}
            style={at(card.x, card.y, { w: card.w })}
          >
            <motion.img
              variants={illusVariants}
              src={card.illus.src}
              alt=""
              loading="lazy"
              width={card.illus.w}
              height={card.illus.h}
              className={cn('max-w-none object-cover', ABS)}
              style={{ ...at(card.illus.x, card.illus.y), width: card.illus.w, height: card.illus.h }}
            />
            <h3
              className="mt-5 text-[20px] leading-7 font-medium text-ink desk:absolute desk:top-[181.63px] desk:left-(--x) desk:mt-0 desk:-translate-x-1/2 desk:whitespace-nowrap"
              style={at(card.titleX, 181.63)}
            >
              {card.title}
            </h3>
            <p
              className={cn(bodyClass, 'mt-1 desk:absolute desk:top-[213.91px] desk:left-(--x) desk:mt-0 desk:-translate-x-1/2 desk:whitespace-nowrap')}
              style={at(card.bodyX, 213.91)}
            >
              <Lines lines={card.body} />
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
