import { Lines } from './primitives'

const STATS = [
  { value: '10+', label: ['Transportadoras', 'parceiras'] },
  { value: '50+', label: ['Rotas interprovinciais', 'em todo o país'] },
  { value: '18', label: ['Províncias ligadas', 'de norte a sul'] },
] as const

export function Stats() {
  return (
    <section
      aria-label="A C-TRIP em números"
      className="mx-4 mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4 desk:mx-[31.3px] desk:mt-[63.61px] desk:flex desk:h-[146.73px] desk:items-start desk:justify-between desk:gap-0 desk:px-[6.84px]"
    >
      {STATS.map((stat, i) => (
        <div key={stat.value} className="contents">
          {i > 0 && <div aria-hidden="true" className="hidden desk:mt-[7.83px] desk:block desk:h-[131.08px] desk:w-[1.16px] desk:bg-line" />}
          <div className="text-center desk:mt-[4.88px] desk:h-[136.95px] desk:w-[391.3px] desk:pt-[4.19px]">
            <p className="text-[44px] leading-[52px] font-medium whitespace-nowrap text-ink desk:text-[56px] desk:leading-16">{stat.value}</p>
            <p className="mt-2 text-[16px] leading-7 text-body desk:whitespace-nowrap desk:mt-[8.78px]">
              <Lines lines={stat.label} />
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
