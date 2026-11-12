import { useState } from 'react'
import type { FormEvent } from 'react'
import { ABS, Lines, at, cn } from './primitives'

const LINK_TOPS_GAP = 21.29

const COLUMNS = [
  {
    title: 'Navegação',
    x: 695.53,
    links: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Reservas', href: '#reservas' },
      { label: 'Promoções', href: '#novidades' },
      { label: 'Notícias', href: '#novidades' },
    ],
  },
  {
    title: 'Ajuda',
    x: 959.66,
    links: [
      { label: 'Centro de Ajuda', href: '#' },
      { label: 'Termos e Condições', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Consultar Reserva', href: '#' },
      { label: 'Reembolsos e Alterações', href: '#' },
    ],
  },
  {
    title: 'Redes Sociais',
    x: 1223.8,
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'X (Twitter)', href: '#' },
    ],
  },
] as const

export function Newsletter() {
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (e.currentTarget.checkValidity()) {
      setDone(true)
      e.currentTarget.reset()
    }
  }

  return (
    <section
      id="novidades"
      aria-labelledby="novidades-title"
      className="relative z-10 mx-4 mt-20 scroll-mt-6 overflow-hidden rounded-[24px] bg-canvas p-6 shadow-[0px_8px_24px_0px_rgba(33,37,41,0.06)] desk:mx-0 desk:mt-[102.73px] desk:ml-[39.13px] desk:h-[160.42px] desk:w-[1359.77px] desk:p-0"
    >
      <img src="/assets/newsletter.jpg" alt="" className="absolute top-0 left-0 h-[100.01%] w-full object-cover object-left desk:object-fill" />
      <h2 id="novidades-title" className={cn('relative text-[20px] leading-7 font-medium text-ink', ABS)} style={at(40.11, 48.61)}>
        Não Perca as Nossas Novidades
      </h2>
      <p className={cn('relative mt-1 text-[16px] leading-6 text-muted desk:mt-0 desk:whitespace-nowrap', ABS)} style={at(40.11, 82.88)}>
        {done ? 'Obrigado! Vai receber as próximas rotas e promoções no seu email.' : 'Um passo simples para ficar a par das rotas e promoções da C-TRIP.'}
      </p>
      <form
        onSubmit={onSubmit}
        className={cn('relative mt-5 h-[72px] rounded-full border border-line desk:mt-0 desk:h-[88.03px] desk:w-[559.56px]', ABS)}
        style={at(760.11, 36.19)}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Introduza o seu email"
          className="size-full rounded-full bg-transparent pr-[96px] pl-[23.45px] text-[16px] leading-6 text-ink outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-brand/30"
        />
        <button
          type="submit"
          aria-label="Subscrever"
          className="group absolute -top-px -right-px flex size-[72px] cursor-pointer items-center justify-center rounded-full bg-brand transition-colors hover:bg-brand-dark desk:size-[88.03px]"
        >
          <img src="/assets/icon-arrow-white.svg" alt="" className="size-[25.42px] transition-transform duration-300 group-hover:rotate-45" />
        </button>
      </form>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative mx-2 -mt-12 overflow-hidden rounded-[24px] px-4 pt-24 pb-8 text-white desk:mx-0 desk:-mt-[80.22px] desk:ml-[calc(50%-704.36px)] desk:h-[540px] desk:w-[1407.72px] desk:p-0">
      <img
        src="/assets/footer.jpg"
        alt=""
        loading="lazy"
        className="absolute top-[-18%] left-0 h-[118%] w-full object-cover desk:top-0 desk:h-full desk:object-fill"
      />

      <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 desk:static desk:block">
        <div className={cn('desk:h-[190.75px] desk:w-[328.69px]', ABS)} style={at(23.47, 152.61)}>
          <a href="#reservas" className="block h-[39px] w-[100px] desk:-mt-[0.33px]" aria-label="C-TRIP — início">
            <img src="/assets/logo.png" alt="C-TRIP" width={100} height={39} className="size-full object-cover" />
          </a>
          <p className="mt-6 text-[16px] leading-7 text-white/88 desk:mt-[32.44px] desk:whitespace-nowrap">
            <Lines lines={['Porque cada viagem merece começar', 'com segurança e conforto']} />
          </p>
          <a href="mailto:suporte@c-trip.africa" className="mt-6 block w-fit text-[16px] leading-6 text-white/88 transition-colors hover:text-white desk:mt-[34.03px]">
            suporte@c-trip.africa
          </a>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className={cn('desk:w-[205.42px] desk:pt-[0.72px]', ABS)} style={at(col.x, 152.61)}>
            <h2 className="text-[16px] leading-6 font-medium whitespace-nowrap text-white">{col.title}</h2>
            <ul className="mt-5 flex flex-col desk:mt-[37.62px]" style={{ gap: LINK_TOPS_GAP }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[16px] leading-6 whitespace-nowrap text-white/88 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <p className="relative mt-12 text-center text-[16px] leading-6 text-white/88 desk:absolute desk:top-[482.02px] desk:left-[702.86px] desk:mt-0 desk:-translate-x-1/2 desk:whitespace-nowrap">
        ©2026 C-TRIP. Todos os direitos reservados.
      </p>
    </footer>
  )
}
