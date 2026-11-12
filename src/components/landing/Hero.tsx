import { useState } from 'react'
import type { FormEvent } from 'react'
import { ABS, ArrowPillButton, Lines, at, cn } from './primitives'
import { CITIES, NAV_LINKS } from '../../constants/cities'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative flex w-full items-center justify-between desk:absolute desk:inset-x-0 desk:top-0 desk:block desk:h-[80.22px]">
      <a href="#reservas" className={cn('block h-[39px] w-[100px]', ABS)} style={at(23.36, 21.36)} aria-label="C-TRIP — início">
        <img src="/assets/logo.png" alt="C-TRIP" width={100} height={39} className="size-full object-cover" />
      </a>

      <nav aria-label="Principal" className="hidden desk:absolute desk:top-[30.1px] desk:left-[444.13px] desk:block desk:h-5 desk:w-[518.47px]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="absolute top-0 text-[16px] leading-5 whitespace-nowrap text-white transition-opacity hover:opacity-75"
            style={{ left: link.x }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#"
        className="hidden text-[16px] leading-5 text-white transition-opacity hover:opacity-75 desk:absolute desk:top-[30.11px] desk:left-[1173.91px] desk:block"
      >
        Entrar
      </a>
      <a
        href="#"
        className="hidden h-[48.91px] w-[119.34px] items-center justify-center rounded-[12px] bg-white/22 text-[16px] leading-5 text-white backdrop-blur-[2px] transition-colors hover:bg-white/32 desk:absolute desk:top-[16.63px] desk:left-[1264.88px] desk:flex"
      >
        Registar
      </a>

      <button
        type="button"
        className="flex size-11 cursor-pointer items-center justify-center rounded-[12px] bg-white/22 text-white desk:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[56px] z-20 flex flex-col gap-1 rounded-[16px] bg-ink/85 p-3 backdrop-blur-md desk:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-[10px] px-3 py-2.5 text-[16px] leading-5 text-white hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a href="#" className="rounded-[12px] px-3 py-3 text-center text-[16px] leading-5 text-white ring-1 ring-white/30">
              Entrar
            </a>
            <a href="#" className="rounded-[12px] bg-white/22 px-3 py-3 text-center text-[16px] leading-5 text-white">
              Registar
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

const inputClass =
  'h-[53.8px] w-full rounded-full border border-line bg-transparent leading-5 text-ink outline-none transition-colors placeholder:text-muted hover:border-[#c4c9ce] focus:border-brand'

function DateInput({ id, name, onActivate }: { id: string; name: string; onActivate?: () => void }) {
  const [type, setType] = useState<'text' | 'date'>('text')
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
        placeholder="Escolher data"
        className={cn(inputClass, 'pr-1 pl-[35px] text-[13px] sm:pr-2 sm:pl-[40px] sm:text-[14px] desk:pr-3 desk:pl-[50.84px] desk:text-[16px]')}
        onFocus={(e) => {
          onActivate?.()
          if (type === 'text') {
            setType('date')
            const el = e.currentTarget
            requestAnimationFrame(() => {
              try {
                el.showPicker?.()
              } catch {
                /* showPicker needs a user gesture in some browsers */
              }
            })
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.value) setType('text')
        }}
      />
    </div>
  )
}

function BookingForm() {
  const [trip, setTrip] = useState<'oneway' | 'roundtrip'>('oneway')
  const roundtrip = trip === 'roundtrip'

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
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

      <div role="tablist" aria-label="Tipo de viagem">
        <button
          type="button"
          role="tab"
          aria-selected={!roundtrip}
          onClick={() => setTrip('oneway')}
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
          onClick={() => setTrip('roundtrip')}
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
        <label htmlFor="origem" className="text-[16px] leading-5">
          De onde parte?
        </label>
        <input id="origem" name="origem" list="cidades" autoComplete="off" placeholder="Cidade de partida" className={cn(inputClass, 'mt-[15.43px] pr-5 pl-[23.45px] text-[16px]')} />

        <label htmlFor="destino" className="mt-[18.38px] text-[16px] leading-5">
          Para onde vai?
        </label>
        <input id="destino" name="destino" list="cidades" autoComplete="off" placeholder="Cidade de destino" className={cn(inputClass, 'mt-[15.44px] pr-5 pl-[23.45px] text-[16px]')} />

        <div className="mt-[19.34px] grid grid-cols-2 gap-x-[8.82px]">
          <label htmlFor="data-ida" className="text-[16px] leading-5 whitespace-nowrap">
            Data de ida
          </label>
          <label htmlFor="data-regresso" className="text-[16px] leading-5 whitespace-nowrap">
            Data de regresso
          </label>
        </div>
        <div className="mt-[14.47px] grid grid-cols-2 gap-x-[8.82px]">
          <DateInput id="data-ida" name="data_ida" />
          <DateInput id="data-regresso" name="data_regresso" onActivate={() => setTrip('roundtrip')} />
        </div>

        <ArrowPillButton type="submit" label="Procurar viagens" height={87.06} circleWidth={86.08} className="mt-[24.45px] w-full" />
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
      <img
        src="/assets/hero-bg-1920.jpg"
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-[40%_center] desk:object-[center_60%]"
      />
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

export function Hero() {
  return (
    <section
      id="reservas"
      className="relative mx-2 mt-2 flex items-center justify-center scroll-mt-4 flex-col overflow-hidden rounded-[24px] p-4 pb-[18px] text-white desk:mx-[15.64px] desk:mt-[15.64px] desk:block desk:h-[880.42px] desk:p-0"
    >
      <HeroBackground />
      <div className="relative mx-auto flex w-full max-w-360 flex-col items-center justify-center desk:block desk:h-full desk:w-[1408.69px] desk:max-w-none">
        <Navbar />

        <p className={cn('relative mt-10 text-[16px] leading-7 desk:mt-0', ABS)} style={at(24.45, 112.19)}>
          <Lines lines={['Compare horários e preços das transportadoras e compre', 'o seu bilhete de autocarro directamente no telemóvel.']} />
        </p>

        <div aria-hidden="true" className="hidden bg-white/70 desk:absolute desk:top-[191.73px] desk:left-[25.42px] desk:block desk:h-[459.77px] desk:w-[1.36px]" />

        <h1
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
