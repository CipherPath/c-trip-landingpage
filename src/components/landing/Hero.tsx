import { useEffect, useRef, useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ABS, Lines, at, cn } from './primitives'
import { CITIES } from '../../constants/cities'
import { EASE_OUT, MQ, gsap, useGSAP } from '../../lib/motion'
import { SiteNavbar } from '../site/SiteNavbar'

const inputClass =
  'h-[53.8px] w-full rounded-full border border-line bg-transparent leading-5 text-ink outline-none transition-colors placeholder:text-muted hover:border-[#c4c9ce] focus:border-brand aria-invalid:border-danger aria-invalid:focus:border-danger'

function DateInput({
  id,
  name,
  value,
  min,
  invalid,
  onChange,
}: {
  id: string
  name: string
  value: string
  min?: string
  invalid?: boolean
  onChange: (value: string) => void
}) {
  // Shows the "Escolher data" placeholder until focused or filled (native date inputs have no placeholder).
  const [focused, setFocused] = useState(false)
  const type = focused || value ? 'date' : 'text'
  return (
    <div className="relative min-w-0">
      <img
        src="/assets/icon-calendar.svg"
        alt=""
        width={19.56}
        height={21.52}
        className="pointer-events-none absolute top-[15.64px] left-[11px] h-[21.52px] w-[19.56px] sm:left-[14px] desk:left-[21.52px]"
      />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        min={min}
        aria-invalid={invalid || undefined}
        placeholder="Escolher data"
        onChange={(e) => onChange(e.target.value)}
        // Our calendar icon sits on the left, so hide the browser's own one; clicking the field opens the picker.
        onClick={(e) => {
          try {
            e.currentTarget.showPicker?.()
          } catch {
            /* not available / no user gesture */
          }
        }}
        className={cn(
          inputClass,
          'cursor-pointer pr-1 pl-[35px] text-[13px] sm:pr-2 sm:pl-[40px] sm:text-[14px] desk:pr-3 desk:pl-[50.84px] desk:text-[16px] [&::-webkit-calendar-picker-indicator]:hidden',
        )}
        onFocus={(e) => {
          setFocused(true)
          const el = e.currentTarget
          requestAnimationFrame(() => {
            try {
              el.showPicker?.()
            } catch {
              /* showPicker needs a user gesture in some browsers */
            }
          })
        }}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

/** Booking form submit: field-height green pill, search icon + label, arrow chip that turns on hover. */
function SearchButton() {
  return (
    <motion.button
      type="submit"
      whileTap={{ scale: 0.985 }}
      className="group relative flex h-[53.8px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brand pr-[53.8px] pl-[53.8px] text-[16px] leading-5 font-medium text-white shadow-[0_10px_24px_-10px_rgba(33,125,80,0.7)] transition-[background-color,box-shadow] duration-300 hover:bg-brand-dark hover:shadow-[0_14px_28px_-10px_rgba(33,125,80,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
        <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Procurar viagens
      <span className="absolute top-1/2 right-[7px] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/16 transition-colors duration-300 group-hover:bg-white/24">
        <img
          src="/assets/icon-arrow-white.svg"
          alt=""
          width={20}
          height={20}
          className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45"
        />
      </span>
    </motion.button>
  )
}

/** Web app that runs the search (results page: /search-results/:origin/:destination?date=YYYY-MM-DD). */
const WEBAPP_URL = (import.meta.env.VITE_WEBAPP_URL as string | undefined) ?? 'https://app.c-trip.africa'

type Trip = 'oneway' | 'roundtrip'
type Field = 'origem' | 'destino' | 'data-ida' | 'data-regresso'
type FormError = { field: Field; message: string }

/** Local calendar date as YYYY-MM-DD (the format of <input type="date">). */
const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const sameCity = (a: string, b: string) =>
  a.trim().localeCompare(b.trim(), 'pt', { sensitivity: 'base' }) === 0

function validate(v: { trip: Trip; origem: string; destino: string; ida: string; regresso: string; today: string }): FormError | null {
  if (!v.origem.trim()) return { field: 'origem', message: 'Indique a cidade de partida.' }
  if (!v.destino.trim()) return { field: 'destino', message: 'Indique a cidade de destino.' }
  if (sameCity(v.origem, v.destino)) return { field: 'destino', message: 'O destino tem de ser diferente da partida.' }
  if (!v.ida) return { field: 'data-ida', message: 'Escolha a data de ida.' }
  if (v.today && v.ida < v.today) return { field: 'data-ida', message: 'A data de ida já passou.' }
  if (v.trip === 'roundtrip') {
    if (!v.regresso) return { field: 'data-regresso', message: 'Escolha a data de regresso.' }
    if (v.regresso < v.ida) return { field: 'data-regresso', message: 'O regresso tem de ser depois da ida.' }
  }
  return null
}

function BookingForm() {
  const [trip, setTrip] = useState<Trip>('oneway')
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [ida, setIda] = useState('')
  const [regresso, setRegresso] = useState('')
  const [error, setError] = useState<FormError | null>(null)
  const [today, setToday] = useState('')
  const roundtrip = trip === 'roundtrip'

  // Client-only, so server and browser time zones never disagree on the date.
  useEffect(() => setToday(todayISO()), [])

  // Editing a field clears its error.
  const edit = (field: Field, set: (v: string) => void) => (value: string) => {
    set(value)
    if (error?.field === field) setError(null)
  }
  const changeIda = (value: string) => {
    edit('data-ida', setIda)(value)
    if (regresso && value && regresso < value) setRegresso('') // a return before the new departure no longer makes sense
  }
  const swapCities = () => {
    setOrigem(destino)
    setDestino(origem)
    setError(null)
  }
  const chooseTrip = (next: Trip) => {
    setTrip(next)
    if (error?.field === 'data-regresso') setError(null)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate({ trip, origem, destino, ida, regresso, today })
    setError(found)
    if (found) {
      document.getElementById(found.field)?.focus()
      return
    }
    const params = new URLSearchParams({ date: ida })
    if (roundtrip) params.set('return', regresso)
    window.location.href = `${WEBAPP_URL}/search-results/${encodeURIComponent(origem.trim())}/${encodeURIComponent(destino.trim())}?${params}`
  }

  const invalid = (field: Field) => error?.field === field || undefined

  return (
    <form
      data-intro="form"
      noValidate
      onSubmit={onSubmit}
      aria-label="Pesquisar viagens"
      className="relative mt-8 h-[521.41px] w-[97.826%] text-ink desk:absolute desk:top-[333.58px] desk:left-[880.42px] desk:mt-0 desk:w-[503.8px]"
    >
      {/* Inactive tab (behind the form body) */}
      <div
        aria-hidden="true"
        className="absolute top-0 h-[55.75px] w-[43.883%] transition-[left] duration-300"
        style={{ left: roundtrip ? '7.658%' : '49.706%' }}
      >
        <img
          src="/assets/tab-inactive.svg"
          alt=""
          className={cn('absolute top-0 left-0 h-[102.24%] w-[102.23%] max-w-none', roundtrip && '-scale-x-100')}
        />
      </div>
      {/* Form body with the active tab */}
      <img
        src="/assets/form-bg.svg"
        alt=""
        aria-hidden="true"
        className={cn('absolute top-0 left-0 h-[102.223%] w-[102.223%] max-w-none', roundtrip && '-scale-x-100')}
      />

      <div role="tablist" aria-label="Tipo de viagem" data-field>
        <button
          type="button"
          role="tab"
          aria-selected={!roundtrip}
          onClick={() => chooseTrip('oneway')}
          className={cn(
            'absolute top-[17.38px] -translate-x-1/2 cursor-pointer text-[16px] leading-5 whitespace-nowrap transition-[left,color] duration-300',
            roundtrip ? 'text-subtle hover:text-ink' : 'text-brand',
          )}
          style={{ left: roundtrip ? '31.157%' : '28.934%' }}
        >
          Só ida
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={roundtrip}
          onClick={() => chooseTrip('roundtrip')}
          className={cn(
            'absolute top-[17.38px] -translate-x-1/2 cursor-pointer text-[16px] leading-5 whitespace-nowrap transition-[left,color] duration-300',
            roundtrip ? 'text-brand' : 'text-subtle hover:text-ink',
          )}
          style={{ left: roundtrip ? '73.29%' : '71.066%' }}
        >
          Ida e volta
        </button>
      </div>

      <div className="relative flex flex-col pt-[81.95px] pr-[24.47px] pl-[24.45px]">
        <label data-field htmlFor="origem" className="text-[16px] leading-5">
          De onde parte?
        </label>
        <input
          data-field
          id="origem"
          name="origem"
          list="cidades"
          autoComplete="off"
          placeholder="Cidade de partida"
          value={origem}
          aria-invalid={invalid('origem')}
          onChange={(e) => edit('origem', setOrigem)(e.target.value)}
          className={cn(inputClass, 'mt-[15.43px] pr-5 pl-[23.45px] text-[16px]')}
        />

        <div data-field className="relative mt-[18.38px] flex items-center justify-between">
          <label htmlFor="destino" className="text-[16px] leading-5">
            Para onde vai?
          </label>
          {/* Sits in the gap between the two city fields, on the right. */}
          <motion.button
            type="button"
            onClick={swapCities}
            whileTap={{ scale: 0.92 }}
            aria-label="Trocar partida e destino"
            title="Trocar partida e destino"
            className="group absolute right-[18px] top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-canvas text-brand shadow-[0_2px_8px_rgba(33,37,41,0.08)] transition-colors hover:border-brand hover:bg-brand-soft"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180">
              <path d="M7 4v15m0 0-3.5-3.5M7 19l3.5-3.5M17 20V5m0 0-3.5 3.5M17 5l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
        <input
          data-field
          id="destino"
          name="destino"
          list="cidades"
          autoComplete="off"
          placeholder="Cidade de destino"
          value={destino}
          aria-invalid={invalid('destino')}
          onChange={(e) => edit('destino', setDestino)(e.target.value)}
          className={cn(inputClass, 'mt-[15.44px] pr-5 pl-[23.45px] text-[16px]')}
        />

        {/* Só ida: one full-width date. Ida e volta: departure + return side by side (return slides in). */}
        <div data-field className="mt-[19.34px] flex gap-x-[8.82px]">
          <motion.div layout transition={{ duration: 0.35, ease: EASE_OUT }} className="flex min-w-0 flex-1 flex-col gap-[14.47px]">
            <label htmlFor="data-ida" className="text-[16px] leading-5 whitespace-nowrap">
              Data de ida
            </label>
            <DateInput id="data-ida" name="data_ida" value={ida} min={today || undefined} invalid={invalid('data-ida')} onChange={changeIda} />
          </motion.div>
          <AnimatePresence mode="popLayout" initial={false}>
            {roundtrip && (
              <motion.div
                key="regresso"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16, transition: { duration: 0.18 } }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex min-w-0 flex-1 flex-col gap-[14.47px]"
              >
                <label htmlFor="data-regresso" className="text-[16px] leading-5 whitespace-nowrap">
                  Data de regresso
                </label>
                <DateInput
                  id="data-regresso"
                  name="data_regresso"
                  value={regresso}
                  min={ida || today || undefined}
                  invalid={invalid('data-regresso')}
                  onChange={edit('data-regresso', setRegresso)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Same 53.8px height as the fields; the 33px it frees inside the fixed form shape holds the
            reassurance line, which also shows validation messages. */}
        <div data-field className="mt-[24.45px] flex flex-col items-center gap-[14px]">
          <SearchButton />
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={error ? error.message : 'secure'}
              role={error ? 'alert' : undefined}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={cn('flex items-center gap-1.5 text-[13px] leading-[18px]', error ? 'font-medium text-danger' : 'text-muted')}
            >
              {error ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M12 7.5v5.5M12 16.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                  <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
              <span className="whitespace-nowrap">
                {error ? (
                  error.message
                ) : (
                  <>
                    Pagamento seguro com Multicaixa<span className="hidden sm:inline"> Express</span>
                  </>
                )}
              </span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <datalist id="cidades">
        {CITIES.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </form>
  )
}

/*
 * Background photo: "Buses parked at an interchange" by The Transport Enthusiast DC on Unsplash
 * (https://unsplash.com/photos/aGiwblIOYA0, Unsplash License). It replaces the Figma fill, which had the
 * old form baked into it and could not go full-bleed. The gradients keep the white nav, subtitle and
 * title readable on the brighter photo, like the darkened original.
 */
const HERO_SRCSET = '/assets/hero-bg-mobile.jpg 1280w, /assets/hero-bg-1920.jpg 1920w, /assets/hero-bg.jpg 2560w'

function HeroBackground() {
  return (
    <>
      <div data-hero-bg className="absolute inset-0 overflow-hidden">
      <img
        data-hero-img
        src="/assets/hero-bg-1920.jpg"
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-[40%_center] desk:object-[center_60%]"
      />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,20,0.62)_0%,rgba(17,24,20,0.28)_22%,rgba(17,24,20,0.18)_45%,rgba(17,24,20,0.6)_100%)] desk:bg-[linear-gradient(180deg,rgba(17,24,20,0.58)_0%,rgba(17,24,20,0.22)_24%,rgba(17,24,20,0.14)_50%,rgba(17,24,20,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(17,24,20,0.38)_0%,rgba(17,24,20,0.18)_35%,rgba(17,24,20,0)_60%)] desk:block"
      />
      {/* Navbar band: background blur from the Figma frame (it was baked into the original photo). */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[76px] bg-white/[0.06] backdrop-blur-[20px] desk:h-[80.22px]"
      />
    </>
  )
}

/*
 * GSAP intro: photo settles from a slow zoom, nav drops in, subtitle and divider draw, title lines rise,
 * then the booking form and its fields. Elements marked [data-intro] are hidden by CSS until this runs
 * (see app.css), and every tween ends on the element's exact layout position. While the hero scrolls out,
 * the photo zooms in slightly (scrubbed).
 */
function useHeroIntro(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add({ desktop: MQ.desktop, motionOk: MQ.motionOk }, (ctx) => {
        const { desktop, motionOk } = ctx.conditions as { desktop: boolean; motionOk: boolean }
        if (!motionOk) {
          gsap.set(q('[data-intro]'), { autoAlpha: 1 })
          return
        }

        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
        tl.from(q('[data-hero-img]'), { scale: 1.18, duration: 2.4, ease: 'power3.out' }, 0)
          .fromTo(q('[data-intro="nav"]'), { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 1 }, 0.2)
          .fromTo(q('[data-intro="sub"]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0 }, 0.4)

        if (desktop) {
          tl.fromTo(
            q('[data-intro="divider"]'),
            { autoAlpha: 0, scaleY: 0 },
            { autoAlpha: 1, scaleY: 1, duration: 1.6, ease: 'power3.inOut' },
            0.45,
          )
            .set(q('[data-intro="title"]'), { autoAlpha: 1 }, 0.55)
            .from(q('[data-intro="title"] > span'), { autoAlpha: 0, yPercent: 70, stagger: 0.14, duration: 1.4 }, 0.55)
        } else {
          tl.set(q('[data-intro="divider"]'), { autoAlpha: 1 }, 0).fromTo(
            q('[data-intro="title"]'),
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0 },
            0.5,
          )
        }

        tl.fromTo(q('[data-intro="form"]'), { autoAlpha: 0, y: 56 }, { autoAlpha: 1, y: 0, duration: 1.4 }, 0.6).from(
          q('[data-intro="form"] [data-field]'),
          { autoAlpha: 0, y: 14, stagger: 0.06, duration: 0.9 },
          0.85,
        )

        gsap.to(q('[data-hero-bg]'), {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  useHeroIntro(root)

  return (
    <section
      ref={root}
      id="reservas"
      className="relative mx-2 mt-2 flex items-center justify-center scroll-mt-4 flex-col overflow-hidden rounded-[24px] p-4 pb-[18px] text-white desk:mx-[15.64px] desk:mt-[15.64px] desk:block desk:h-[880.42px] desk:p-0"
    >
      <HeroBackground />
      <div className="relative mx-auto flex w-full max-w-360 flex-col items-center justify-center desk:block desk:h-full desk:w-[1408.69px] desk:max-w-none">
        <SiteNavbar intro />

        <p data-intro="sub" className={cn('relative mt-10 text-[16px] leading-7 desk:mt-0', ABS)} style={at(24.45, 112.19)}>
          <Lines lines={['Compare horários e preços das transportadoras e compre', 'o seu bilhete de autocarro directamente no telemóvel.']} />
        </p>

        <div data-intro="divider" aria-hidden="true" className="hidden origin-top bg-white/70 desk:absolute desk:top-[191.73px] desk:left-[25.42px] desk:block desk:h-[459.77px] desk:w-[1.36px]" />

        <h1
          data-intro="title"
          className={cn(
            'relative mt-6 text-[36px] leading-[44px] font-medium tracking-[-0.36px] desk:mt-0 desk:text-[64px] desk:leading-[78px] desk:tracking-[-0.64px] desk:whitespace-nowrap',
            ABS,
          )}
          style={at(25.42, 698.61)}
        >
          <Lines lines={['A Escolha Inteligente para', 'Viajar por Angola']} />
        </h1>

        <BookingForm />
      </div>
    </section>
  )
}
