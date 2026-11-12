import { useRef } from 'react'
import { motion } from 'framer-motion'
import { clipReveal, revealUp } from '../../lib/motion'
import { useParallax } from '../../lib/useParallax'
import { ABS, ArrowPillButton, Lines, Tag, at, bodyClass, cn, headingClass } from './primitives'

const PHOTOS = [
  { src: '/assets/about-1.jpg', x: 0.97, y: 2.92, parallax: 18 },
  { src: '/assets/about-2.jpg', x: 351.19, y: 35.22, parallax: 42 },
  { src: '/assets/about-3.jpg', x: 0.97, y: 306.19, parallax: 18 },
  { src: '/assets/about-4.jpg', x: 351.19, y: 338.47, parallax: 42 },
] as const

const photoReveal = clipReveal(16)

export function About() {
  const root = useRef<HTMLElement>(null)
  useParallax(root)

  return (
    <section
      ref={root}
      id="sobre"
      className="relative mx-4 mt-16 flex scroll-mt-24 flex-col-reverse gap-10 desk:mx-[31.3px] desk:mt-[88.04px] desk:block desk:h-[621.19px]"
    >
      <div className="grid grid-cols-2 gap-3 desk:block">
        {PHOTOS.map((photo, i) => (
          /* Outer element carries the GSAP parallax (transform), inner image the framer clip reveal. */
          <div
            key={photo.src}
            data-parallax={photo.parallax}
            className={cn('desk:h-[278.8px] desk:w-[325.75px]', i % 2 === 1 && 'translate-y-6 desk:translate-y-0', ABS)}
            style={at(photo.x, photo.y)}
          >
            <motion.img
              src={photo.src}
              alt=""
              loading="lazy"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={photoReveal}
              custom={i * 0.1}
              className="aspect-[325.75/278.8] w-full rounded-[16px] object-cover desk:size-full"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start desk:block">
        <Tag width={177.06} className={ABS} style={at(757.16, 74.34)}>
          Sobre Nós
        </Tag>
        <motion.h2 {...revealUp(0.08)} className={cn(headingClass, 'mt-5 desk:mt-0', ABS)} style={at(758.14, 141.83)}>
          <Lines lines={['Conheça a C-TRIP', 'de Perto']} />
        </motion.h2>
        <motion.p {...revealUp(0.16)} className={cn(bodyClass, 'mt-4 desk:mt-0 desk:whitespace-nowrap', ABS)} style={at(757.16, 290.23)}>
          <Lines
            lines={[
              'A C-TRIP é a plataforma angolana para pesquisar, comparar e comprar',
              'bilhetes de autocarro interprovinciais. Reunimos as principais',
              'transportadoras do país num só lugar, com horários actualizados,',
              'escolha de lugar e pagamento seguro, para que cada viagem',
              'comece de forma simples, rápida e sem filas.',
            ]}
          />
        </motion.p>
        <ArrowPillButton
          href="#servicos"
          label="Saber Mais Sobre Nós"
          height={86.08}
          circleWidth={86.08}
          reveal={0.24}
          className={cn('mt-8 w-[318.91px] max-w-full desk:mt-0', ABS)}
          style={at(755.22, 471.52)}
        />
      </div>
    </section>
  )
}
