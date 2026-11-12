import { ABS, at, cn } from './primitives'

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
    <section
      aria-label="Destaques"
      className="relative mx-4 mt-12 flex flex-col gap-10 desk:mx-[31.3px] desk:mt-[62.63px] desk:block desk:h-[166.3px]"
    >
      {HIGHLIGHTS.map((item) => (
        <div
          key={item.title}
          className="flex flex-col items-center text-center desk:absolute desk:top-[19.56px] desk:left-(--x) desk:block desk:h-[132.06px] desk:w-[293.47px]"
          style={at(item.x, 19.56)}
        >
          <img
            src={item.icon.src}
            alt=""
            width={item.icon.w}
            height={item.icon.h}
            className={cn('max-w-none', ABS)}
            style={{ ...at(item.icon.x, item.icon.y), width: item.icon.w, height: item.icon.h }}
          />
          <h3
            className="mt-4 text-[20px] leading-7 font-medium whitespace-nowrap text-ink desk:absolute desk:top-[72.08px] desk:left-(--x) desk:mt-0 desk:-translate-x-1/2"
            style={at(item.titleX, 72.08)}
          >
            {item.title}
          </h3>
          <p
            className="mt-1.5 text-[16px] leading-6 whitespace-nowrap text-body desk:absolute desk:top-[106.36px] desk:left-(--x) desk:mt-0 desk:-translate-x-1/2"
            style={at(item.subtitleX, 106.36)}
          >
            {item.subtitle}
          </p>
        </div>
      ))}
    </section>
  )
}
