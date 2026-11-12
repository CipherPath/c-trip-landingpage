import { motion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

/*
 * Decorative background for the inner-page banners: deep green gradient with soft glows, a fine dot grid,
 * and the landing's 3D map of Angola on the right with animated routes between cities. Text sits on the
 * darker left side; the map fades out towards it. Purely decorative (aria-hidden, no pointer events).
 *
 * City points use the map SVG's own coordinates (960×470 viewBox), taken from the landing map pins.
 */
const CITIES = {
  luanda: [225.5, 152.5],
  malanje: [395.2, 176.7],
  saurimo: [616.2, 180.9],
  benguela: [235.3, 281.9],
  huambo: [361.5, 287.8],
  cuito: [427.4, 275],
  lubango: [239.7, 362.8],
} as const

type City = keyof typeof CITIES

/** Gently curved route between two cities (quadratic curve bowed upwards). */
function route(a: City, b: City) {
  const [x1, y1] = CITIES[a]
  const [x2, y2] = CITIES[b]
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.18
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`
}

const ROUTES: readonly [City, City][] = [
  ['luanda', 'malanje'],
  ['malanje', 'saurimo'],
  ['luanda', 'huambo'],
  ['huambo', 'lubango'],
  ['benguela', 'huambo'],
  ['huambo', 'cuito'],
]

const HUBS: readonly City[] = ['luanda', 'huambo', 'saurimo', 'lubango']

export function BannerBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Glows */}
      <div className="absolute -top-1/2 right-[-10%] h-[160%] w-[70%] bg-[radial-gradient(closest-side,rgba(95,185,138,0.32),rgba(95,185,138,0)_70%)]" />
      <div className="absolute -bottom-1/2 -left-[10%] h-[120%] w-[60%] bg-[radial-gradient(closest-side,rgba(6,30,18,0.55),rgba(6,30,18,0))]" />

      {/* Dot grid, fading towards the text */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1.2px)] bg-size-[22px_22px] [mask-image:linear-gradient(90deg,transparent_15%,#000_70%)]" />

      {/* Angola map with routes: sized to the space below the navbar so the whole country always shows */}
      <div className="absolute top-[80px] right-0 bottom-0 hidden items-center md:flex desk:right-[2%]">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.15 }}
          className="relative aspect-[960/470] h-[min(88%,360px)] [mask-image:linear-gradient(90deg,transparent_0%,#000_32%)]"
        >
          <img src="/assets/map-espessura.svg" alt="" className="absolute top-[3%] left-0 size-full max-w-none opacity-70" />
          <img src="/assets/map-superficie.svg" alt="" className="absolute top-0 left-0 size-full max-w-none opacity-45" />
        <svg viewBox="0 0 960 470" className="absolute inset-0 size-full" fill="none">
          {ROUTES.map(([a, b]) => (
            <path key={`${a}-${b}`} d={route(a, b)} className="route-flow" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeDasharray="4 7" strokeLinecap="round" />
          ))}
          {(Object.keys(CITIES) as City[]).map((city) => {
            const [x, y] = CITIES[city]
            const hub = HUBS.includes(city)
            return (
              <g key={city}>
                {hub && <circle cx={x} cy={y} r="5" className="city-ping" fill="rgba(255,255,255,0.55)" style={{ animationDelay: `${HUBS.indexOf(city) * 0.6}s` }} />}
                <circle cx={x} cy={y} r={hub ? 4.5 : 3} fill="#fff" fillOpacity={hub ? 0.95 : 0.7} />
              </g>
            )
          })}
        </svg>
        </motion.div>
      </div>

      {/* Darker left side for text contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,36,22,0.55)_0%,rgba(8,36,22,0.2)_40%,rgba(8,36,22,0)_62%)]" />
    </div>
  )
}
