import { useState } from 'react'
import { ABS, Tag, Lines, at, bodyClass, cn, headingClass } from './primitives'

type Region = 'norte' | 'centro' | 'sul'

type City = { name: string; province: string; region: Region; x: number; y: number }

/* x/y are the Figma pin boxes (16×21) inside the map frame. */
const CITIES: readonly City[] = [
  { name: 'Cabinda', province: 'Província de Cabinda', region: 'norte', x: 341.3, y: 43.7 },
  { name: 'Soyo', province: 'Província do Zaire', region: 'norte', x: 350.6, y: 63.8 },
  { name: "M'banza Kongo", province: 'Província do Zaire', region: 'norte', x: 452.6, y: 68.6 },
  { name: 'Uíge', province: 'Província do Uíge', region: 'norte', x: 497.4, y: 115 },
  { name: 'Dundo', province: 'Província da Lunda Norte', region: 'norte', x: 812.2, y: 106.7 },
  { name: 'Caxito', province: 'Província do Bengo', region: 'norte', x: 421, y: 148.5 },
  { name: 'Luanda', province: 'Província de Luanda', region: 'norte', x: 397.5, y: 157.5 },
  { name: 'Malanje', province: 'Província de Malanje', region: 'norte', x: 567.2, y: 181.7 },
  { name: 'Saurimo', province: 'Província da Lunda Sul', region: 'norte', x: 788.2, y: 185.9 },
  { name: "N'dalatando", province: 'Província do Cuanza Norte', region: 'norte', x: 489.2, y: 173.4 },
  { name: 'Sumbe', province: 'Província do Cuanza Sul', region: 'centro', x: 430.8, y: 239.5 },
  { name: 'Luena', province: 'Província do Moxico', region: 'centro', x: 762.5, y: 259.2 },
  { name: 'Cuito', province: 'Província do Bié', region: 'centro', x: 599.4, y: 280 },
  { name: 'Benguela', province: 'Província de Benguela', region: 'centro', x: 407.3, y: 286.9 },
  { name: 'Huambo', province: 'Província do Huambo', region: 'centro', x: 533.5, y: 292.8 },
  { name: 'Lubango', province: 'Província da Huíla', region: 'sul', x: 411.7, y: 367.8 },
  { name: 'Namibe', province: 'Província do Namibe', region: 'sul', x: 338.6, y: 377.2 },
  { name: 'Menongue', province: 'Província do Cuando Cubango', region: 'sul', x: 640.9, y: 358.8 },
  { name: 'Ondjiva', province: 'Província do Cunene', region: 'sul', x: 533.9, y: 442.2 },
]

const REGIONS: readonly { id: Region; label: string; x: number; highlight: string; defaultCity: string }[] = [
  { id: 'norte', label: 'Norte', x: 0, highlight: '/assets/map-destaque-norte.svg', defaultCity: 'Luanda' },
  { id: 'centro', label: 'Centro', x: 120.33, highlight: '/assets/map-destaque-centro.svg', defaultCity: 'Huambo' },
  { id: 'sul', label: 'Sul', x: 239.66, highlight: '/assets/map-destaque-sul.svg', defaultCity: 'Lubango' },
]

/* The map frame is 1374.45×557.61 with a 1px border; content is laid out in % of the inner box so it scales. */
const INNER_W = 1372.45
const INNER_H = 555.61
const px = (x: number) => `${(x / INNER_W) * 100}%`
const py = (y: number) => `${(y / INNER_H) * 100}%`
const tipOf = (c: City) => ({ x: c.x + 8 - 1, y: c.y + 21 - 1 })

const LAYERS = [
  ...[48, 46, 44, 42, 40].map((top) => ({ top, src: '/assets/map-espessura.svg' })),
  ...[38, 36, 34, 32, 30, 28].map((top) => ({ top, src: '/assets/map-espessura-1.svg' })),
  { top: 26, src: '/assets/map-superficie.svg' },
]

const ZOOM_MIN = 1
const ZOOM_MAX = 2.5
const ZOOM_STEP = 0.5

function AngolaMap({ selected, onSelect }: { selected: City; onSelect: (city: City) => void }) {
  const [zoom, setZoom] = useState(1)
  const tip = tipOf(selected)
  const flip = tip.y > 400

  return (
    <div className="relative mt-8 aspect-[1374.45/557.61] w-full overflow-hidden rounded-[16px] border border-line bg-map sm:rounded-[24px] desk:absolute desk:top-[291.52px] desk:left-[0.97px] desk:mt-0 desk:aspect-auto desk:h-[557.61px] desk:w-[1374.45px]">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoom})`, transformOrigin: `${px(tip.x)} ${py(tip.y)}` }}
      >
        {LAYERS.map((layer, i) => (
          <img
            key={layer.top}
            src={layer.src}
            alt=""
            aria-hidden="true"
            className={cn('absolute max-w-none', i === 0 && 'drop-shadow-[0_22px_22px_rgba(33,37,41,0.16)]')}
            style={{ left: px(179), top: py(layer.top - 1), width: px(960), height: py(470) }}
          />
        ))}

        {CITIES.filter((c) => c.name !== selected.name).map((city) => {
          const t = tipOf(city)
          return (
            <button
              key={city.name}
              type="button"
              aria-label={`${city.name}, ${city.province}`}
              onClick={() => onSelect(city)}
              className="absolute h-[21px] w-4 -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-125 max-sm:h-[12px] max-sm:w-[9px]"
              style={{ left: px(t.x), top: py(t.y) }}
            >
              <img src="/assets/pin-city.svg" alt="" className="size-full" />
            </button>
          )
        })}

        <div
          className="pointer-events-none absolute h-[44px] w-[34px] -translate-x-1/2 -translate-y-full max-sm:scale-60 max-sm:origin-bottom"
          style={{ left: px(tip.x), top: py(tip.y) }}
        >
          <img src="/assets/pin-huambo.svg" alt="" className="absolute top-[-4px] left-[-7.92px] h-[60px] w-[49.85px] max-w-none" />
        </div>

        <div
          role="status"
          className="absolute hidden h-[90px] w-[200px] sm:block"
          style={{
            left: px(tip.x),
            top: py(tip.y),
            transform: flip ? 'translate(-50%, calc(-100% - 50px))' : 'translate(-50%, 6px)',
            transformOrigin: flip ? 'bottom center' : 'top center',
          }}
        >
          <img
            src="/assets/tooltip-pointer.svg"
            alt=""
            className={cn('absolute left-[90px] h-[21.52px] w-[19.56px]', flip ? 'top-[68.48px] rotate-180' : 'top-0')}
          />
          <div
            className={cn(
              'absolute left-0 h-[69.45px] w-[200px] overflow-hidden rounded-[6px] bg-white shadow-[0px_4px_14px_0px_rgba(33,37,41,0.1)]',
              flip ? 'top-0' : 'top-[20.53px]',
            )}
          >
            <img src="/assets/icon-pin.svg" alt="" className="absolute top-[29.34px] left-[13.69px] size-[19.56px]" />
            <p className="absolute top-[15.42px] left-[44.02px] text-[16px] leading-5 whitespace-nowrap text-ink">{selected.name}</p>
            <p className="absolute top-[43.83px] left-[44.02px] text-[14px] leading-[18px] whitespace-nowrap text-muted">{selected.province}</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[39.12px] bottom-[39.13px] hidden w-[54.77px] overflow-hidden rounded-[6px] bg-white shadow-[0px_2px_8px_0px_rgba(33,37,41,0.08)] md:block">
        <button
          type="button"
          aria-label="Aproximar"
          disabled={zoom >= ZOOM_MAX}
          onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
          className="flex h-[54.78px] w-full cursor-pointer items-center justify-center transition-colors hover:bg-canvas disabled:cursor-default disabled:opacity-40"
        >
          <img src="/assets/icon-plus.svg" alt="" className="size-[19.56px]" />
        </button>
        <button
          type="button"
          aria-label="Afastar"
          disabled={zoom <= ZOOM_MIN}
          onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
          className="flex h-[54.78px] w-full cursor-pointer items-center justify-center transition-colors hover:bg-canvas disabled:cursor-default disabled:opacity-40"
        >
          <img src="/assets/icon-minus.svg" alt="" className="size-[19.56px]" />
        </button>
      </div>
    </div>
  )
}

export function OperationalArea() {
  const [selected, setSelected] = useState<City>(CITIES.find((c) => c.name === 'Huambo')!)
  const region = selected.region

  return (
    <section
      aria-labelledby="area-title"
      className="relative mx-4 mt-20 flex flex-col items-start desk:mx-[31.3px] desk:mt-[95.88px] desk:block desk:h-[851.08px]"
    >
      <Tag width={199.56} className={ABS} style={at(0, 6.84)}>
        Área de Operação
      </Tag>
      <h2 id="area-title" className={cn(headingClass, 'mt-5 desk:mt-0', ABS)} style={at(0, 70.41)}>
        <Lines lines={['Viagens de Autocarro', 'Por Toda a Angola']} />
      </h2>
      <p className={cn(bodyClass, 'mt-3 desk:mt-0 desk:whitespace-nowrap', ABS)} style={at(0, 213.92)}>
        Encontre rotas para as principais cidades do país.
      </p>

      <div
        role="group"
        aria-label="Regiões"
        className="mt-6 flex gap-4 desk:absolute desk:top-[138.91px] desk:left-[1032.06px] desk:mt-0 desk:block desk:h-[102.72px] desk:w-[343.36px]"
      >
        {REGIONS.map((r) => {
          const active = r.id === region
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={active}
              aria-label={`Região ${r.label}`}
              onClick={() => setSelected(CITIES.find((c) => c.name === r.defaultCity)!)}
              className={cn(
                'relative h-[102.72px] w-[103.69px] shrink-0 cursor-pointer overflow-hidden rounded-[8px] border bg-canvas transition-colors desk:absolute desk:top-0 desk:left-(--x)',
                active ? 'border-muted' : 'border-line hover:border-[#c4c9ce]',
              )}
              style={at(r.x, 0)}
            >
              <span className="absolute top-[0.95px] left-[0.95px] block h-[98.8px] w-[99.77px] overflow-hidden rounded-[6px] bg-map">
                <img src="/assets/map-angola-mini.svg" alt="" className="absolute top-0 left-0 h-[99px] w-[100px] max-w-none" />
                <img src={r.highlight} alt="" className="absolute top-0 left-0 h-[99px] w-[100px] max-w-none" />
              </span>
            </button>
          )
        })}
      </div>

      <AngolaMap selected={selected} onSelect={setSelected} />

      <div className="mt-3 flex items-center gap-3 rounded-[12px] bg-white px-4 py-3 shadow-[0px_4px_14px_0px_rgba(33,37,41,0.1)] sm:hidden" aria-hidden="true">
        <img src="/assets/icon-pin.svg" alt="" className="size-[19.56px]" />
        <span>
          <span className="block text-[16px] leading-5 text-ink">{selected.name}</span>
          <span className="mt-1 block text-[14px] leading-[18px] text-muted">{selected.province}</span>
        </span>
      </div>
    </section>
  )
}
