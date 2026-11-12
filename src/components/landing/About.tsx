import { ABS, ArrowPillButton, Lines, Tag, at, bodyClass, cn, headingClass } from './primitives'

const PHOTOS = [
  { src: '/assets/about-1.jpg', x: 0.97, y: 2.92 },
  { src: '/assets/about-2.jpg', x: 351.19, y: 35.22 },
  { src: '/assets/about-3.jpg', x: 0.97, y: 306.19 },
  { src: '/assets/about-4.jpg', x: 351.19, y: 338.47 },
] as const

export function About() {
  return (
    <section
      id="sobre"
      className="relative mx-4 mt-16 flex scroll-mt-6 flex-col-reverse gap-10 desk:mx-[31.3px] desk:mt-[88.04px] desk:block desk:h-[621.19px]"
    >
      <div className="grid grid-cols-2 gap-3 desk:block">
        {PHOTOS.map((photo, i) => (
          <img
            key={photo.src}
            src={photo.src}
            alt=""
            loading="lazy"
            className={cn(
              'aspect-[325.75/278.8] w-full rounded-[16px] object-cover desk:h-[278.8px] desk:w-[325.75px]',
              i % 2 === 1 && 'translate-y-6 desk:translate-y-0',
              ABS,
            )}
            style={at(photo.x, photo.y)}
          />
        ))}
      </div>

      <div className="flex flex-col items-start desk:block">
        <Tag width={177.06} className={ABS} style={at(757.16, 74.34)}>
          Sobre Nós
        </Tag>
        <h2 className={cn(headingClass, 'mt-5 desk:mt-0', ABS)} style={at(758.14, 141.83)}>
          <Lines lines={['Conheça a C-TRIP', 'de Perto']} />
        </h2>
        <p className={cn(bodyClass, 'mt-4 desk:mt-0 desk:whitespace-nowrap', ABS)} style={at(757.16, 290.23)}>
          <Lines
            lines={[
              'A C-TRIP é a plataforma angolana para pesquisar, comparar e comprar',
              'bilhetes de autocarro interprovinciais. Reunimos as principais',
              'transportadoras do país num só lugar, com horários actualizados,',
              'escolha de lugar e pagamento seguro, para que cada viagem',
              'comece de forma simples, rápida e sem filas.',
            ]}
          />
        </p>
        <ArrowPillButton
          href="#servicos"
          label="Saber Mais Sobre Nós"
          height={86.08}
          circleWidth={86.08}
          className={cn('mt-8 w-[318.91px] max-w-full desk:mt-0', ABS)}
          style={at(755.22, 471.52)}
        />
      </div>
    </section>
  )
}
