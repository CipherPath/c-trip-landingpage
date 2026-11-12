import { ABS, Lines, Tag, at, bodyClass, cn, headingClass } from './primitives'

const SERVICES = [
  {
    title: 'Viagens Interprovinciais',
    body: ['Partidas diárias entre províncias, como Luanda–Huambo e', 'Luanda–Benguela, com horários de várias transportadoras.'],
    image: '/assets/service-interprovinciais.jpg',
    x: 0.97,
    y: 252.38,
    active: true,
  },
  {
    title: 'Classe Executiva & VIP',
    body: ['Viaje com mais conforto: bancos reclináveis, ar condicionado,', 'entretenimento a bordo e mais espaço durante a viagem.'],
    image: '/assets/service-executiva.jpg',
    x: 700.42,
    y: 252.38,
  },
  {
    title: 'Aluguer de Autocarros',
    body: ['Soluções para grupos: turismo, eventos de família, escolas', 'ou empresas, com frota adequada à sua capacidade.'],
    image: '/assets/service-aluguer.jpg',
    x: 0.97,
    y: 675.97,
  },
  {
    title: 'Reserva de Bilhetes Online',
    body: ['Compre bilhetes pela web ou pela app, de forma rápida,', 'flexível e sem filas, com escolha do seu lugar.'],
    image: '/assets/service-online.jpg',
    x: 700.42,
    y: 675.97,
  },
] as const

export function Services() {
  return (
    <section
      id="servicos"
      className="relative mx-4 mt-20 flex scroll-mt-6 flex-col items-start desk:mx-[31.3px] desk:mt-[78.26px] desk:block desk:h-[1078.03px]"
    >
      <Tag width={179.02} className={ABS} style={at(0.97, 4.88)}>
        Os Nossos Serviços
      </Tag>
      <h2 className={cn(headingClass, 'mt-5 desk:mt-0', ABS)} style={at(0.97, 70.41)}>
        <Lines lines={['Escolha o Serviço Ideal', 'Para a Sua Viagem']} />
      </h2>
      <p className={cn(bodyClass, 'mt-3 desk:absolute desk:top-[148.38px] desk:right-[1.1px] desk:mt-0 desk:text-right desk:whitespace-nowrap')}>
        <Lines lines={['A C-TRIP oferece várias formas de viajar por estrada,', 'adaptadas às suas necessidades.']} />
      </p>

      <div className="mt-10 grid w-full gap-4 md:grid-cols-2 desk:mt-0 desk:block">
        {SERVICES.map((service) => {
          const active = 'active' in service && service.active
          return (
            <a
              key={service.title}
              href="#reservas"
              className="group relative block h-[340px] overflow-hidden rounded-[20px] text-white md:h-auto md:aspect-[675.97/400.11] desk:absolute desk:top-(--y) desk:left-(--x) desk:aspect-auto desk:h-[400.11px] desk:w-[675.97px]"
              style={at(service.x, service.y)}
            >
              <img
                src={service.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] desk:object-fill"
              />
              <span
                className={cn(
                  'absolute top-[16.63px] right-[16.64px] flex size-[83.14px] items-center justify-center rounded-full transition-colors duration-300',
                  active ? 'bg-brand' : 'bg-canvas group-hover:bg-brand',
                )}
              >
                <img
                  src="/assets/icon-arrow-white.svg"
                  alt=""
                  className={cn('absolute size-[25.42px] transition-[opacity,rotate] duration-300 group-hover:rotate-45', active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                />
                <img
                  src="/assets/icon-arrow-dark.svg"
                  alt=""
                  className={cn('absolute size-[25.42px] transition-[opacity,rotate] duration-300 group-hover:rotate-45', active ? 'opacity-0' : 'opacity-100 group-hover:opacity-0')}
                />
              </span>
              <span className="absolute inset-x-[23.47px] bottom-[24.53px] block">
                <span className="block text-[20px] leading-7 font-medium">{service.title}</span>
                <span className="mt-[5.25px] block text-[16px] leading-7 text-white/88 desk:whitespace-nowrap">
                  <Lines lines={service.body} />
                </span>
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
