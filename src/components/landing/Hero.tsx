import { useRef, useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import { ABS, ArrowPillButton, Lines, at, cn } from './primitives'
import { CITIES } from '../../constants/cities'
import { MQ, gsap, useGSAP } from '../../lib/motion'
import { SiteNavbar } from '../site/SiteNavbar'

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
      data-intro="form"
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
        <label data-field htmlFor="origem" className="text-[16px] leading-5">
          De onde parte?
        </label>
        <input data-field id="origem" name="origem" list="cidades" autoComplete="off" placeholder="Cidade de partida" className={cn(inputClass, 'mt-[15.43px] pr-5 pl-[23.45px] text-[16px]')} />

        <label data-field htmlFor="destino" className="mt-[18.38px] text-[16px] leading-5">
          Para onde vai?
        </label>
        <input data-field id="destino" name="destino" list="cidades" autoComplete="off" placeholder="Cidade de destino" className={cn(inputClass, 'mt-[15.44px] pr-5 pl-[23.45px] text-[16px]')} />

        <div data-field className="mt-[19.34px] grid grid-cols-2 gap-x-[8.82px]">
          <label htmlFor="data-ida" className="text-[16px] leading-5 whitespace-nowrap">
            Data de ida
          </label>
          <label htmlFor="data-regresso" className="text-[16px] leading-5 whitespace-nowrap">
            Data de regresso
          </label>
        </div>
        <div data-field className="mt-[14.47px] grid grid-cols-2 gap-x-[8.82px]">
          <DateInput id="data-ida" name="data_ida" />
          <DateInput id="data-regresso" name="data_regresso" onActivate={() => setTrip('roundtrip')} />
        </div>

        <div data-field className="mt-[24.45px]">
          <ArrowPillButton type="submit" label="Procurar viagens" height={87.06} circleWidth={86.08} className="w-full" />
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
