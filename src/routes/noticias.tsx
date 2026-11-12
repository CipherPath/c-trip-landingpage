import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { EASE_OUT, clipReveal, revealUp } from '../lib/motion'
import { PageBanner, PageLayout, PageSection, SectionHeading } from '../components/site/PageLayout'
import { cn } from '../components/landing/primitives'

export const Route = createFileRoute('/noticias')({
  head: () => ({
    meta: [
      { title: 'Notícias — C-TRIP' },
      { name: 'description', content: 'Novidades da C-TRIP, novas rotas, dicas de viagem e guias práticos.' },
    ],
  }),
  component: NoticiasPage,
})

type Category = 'Novidades' | 'Rotas' | 'Dicas de viagem' | 'Pagamentos'
const FILTERS = ['Todas', 'Novidades', 'Rotas', 'Dicas de viagem', 'Pagamentos'] as const

type Article = { title: string; excerpt: string; category: Category; date: string; image: string }

/* The first six are the Figma grid; the rest load with "Carregar mais artigos". */
const ARTICLES: readonly Article[] = [
  {
    title: 'Novas partidas diárias entre Luanda e Saurimo',
    excerpt: 'Mais horários para quem viaja para o Leste, com escolha de lugar e bilhete digital.',
    category: 'Rotas',
    date: '15 out 2026',
    image: '/assets/service-interprovinciais.jpg',
  },
  {
    title: '7 dicas para uma viagem longa de autocarro mais confortável',
    excerpt: 'Do lugar à janela à bagagem de mão: pequenos detalhes que fazem diferença.',
    category: 'Dicas de viagem',
    date: '10 out 2026',
    image: '/assets/service-executiva.jpg',
  },
  {
    title: 'Pagar com Multicaixa Express: guia passo a passo',
    excerpt: 'Como pagar o bilhete em segundos e o que fazer se o pagamento ficar pendente.',
    category: 'Pagamentos',
    date: '2 out 2026',
    image: '/assets/service-online.jpg',
  },
  {
    title: 'Agora pode pedir reembolsos directamente na app',
    excerpt: 'Acompanhe cada pedido, do envio à devolução do valor, sem sair da conta.',
    category: 'Novidades',
    date: '25 set 2026',
    image: '/assets/about-4.jpg',
  },
  {
    title: 'O que levar na bagagem de mão numa viagem interprovincial',
    excerpt: 'Documentos, água, carregador e outros essenciais para chegar bem ao destino.',
    category: 'Dicas de viagem',
    date: '18 set 2026',
    image: '/assets/about-1.jpg',
  },
  {
    title: 'Como escolhemos as transportadoras parceiras',
    excerpt: 'Os critérios de segurança, pontualidade e frota que pedimos a cada operador.',
    category: 'Rotas',
    date: '9 set 2026',
    image: '/assets/about-3.jpg',
  },
  {
    title: 'Aluguer de autocarros para grupos: como pedir um orçamento',
    excerpt: 'Excursões, eventos e viagens de empresa com a frota das nossas transportadoras parceiras.',
    category: 'Novidades',
    date: '1 set 2026',
    image: '/assets/service-aluguer.jpg',
  },
  {
    title: 'Pagamento por referência: quanto tempo demora a confirmar?',
    excerpt: 'Prazos habituais, o que acontece se a reserva expirar e como recuperar o valor.',
    category: 'Pagamentos',
    date: '24 ago 2026',
    image: '/assets/about-2.jpg',
  },
  {
    title: 'Viajar à noite em segurança: o que deve saber',
    excerpt: 'Escolha do lugar, objectos de valor e chegada ao terminal nas partidas nocturnas.',
    category: 'Dicas de viagem',
    date: '12 ago 2026',
    image: '/assets/faq.jpg',
  },
]

const PAGE_SIZE = 6
const imageReveal = clipReveal(20)

function Meta({ category, date, large = false }: { category: Category; date: string; large?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-brand-soft px-3 py-[6px] text-[13px] leading-[18px] font-medium whitespace-nowrap text-brand">{category}</span>
      <span className={cn('whitespace-nowrap text-muted', large ? 'text-[14px] leading-5' : 'text-[13px] leading-[18px]')}>{date}</span>
    </div>
  )
}

function NoticiasPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Todas')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => (filter === 'Todas' ? ARTICLES : ARTICLES.filter((a) => a.category === filter)), [filter])
  const shown = filtered.slice(0, visible)

  return (
    <PageLayout
      banner={
        <PageBanner
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Notícias' }]}
          title="Notícias"
          intro="Novidades da C-TRIP, novas rotas, dicas de viagem e guias práticos."
          introWidth={820}
        />
      }
    >
      {/* Destaque */}
      <PageSection>
        <article className="group flex flex-col gap-8 desk:flex-row desk:items-center desk:gap-14">
          <div className="overflow-hidden rounded-[24px] desk:h-[440px] desk:w-[720px] desk:shrink-0">
            <motion.img
              src="/assets/faq.jpg"
              alt=""
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={clipReveal(24)}
              className="aspect-[720/440] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] desk:size-full"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px]">
            <motion.div {...revealUp(0.05)}>
              <Meta category="Novidades" date="20 out 2026 · 4 min de leitura" large />
            </motion.div>
            <motion.h2 {...revealUp(0.12)} className="text-[28px] leading-9 font-medium tracking-[-0.3px] text-ink desk:text-[36px] desk:leading-[46px]">
              Bilhetes digitais com código QR chegam a todas as rotas da C-TRIP
            </motion.h2>
            <motion.p {...revealUp(0.18)} className="text-[16px] leading-7 text-body">
              Já não precisa de imprimir nada: mostre o código QR no telemóvel e embarque. Explicamos como funciona e o que fazer se ficar sem bateria.
            </motion.p>
            <motion.span {...revealUp(0.24)} className="flex items-center gap-2 text-[16px] leading-[22px] font-medium text-brand">
              Ler artigo
              <img src="/assets/pages/icon-arrow-green-sm.svg" alt="" width={18} height={18} className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </motion.span>
          </div>
        </article>
      </PageSection>

      {/* Artigos */}
      <PageSection className="flex flex-col gap-10 desk:gap-12">
        <div className="flex flex-col gap-6 desk:flex-row desk:items-end">
          <SectionHeading tag="Últimos artigos" title="Fique a par de tudo" className="desk:flex-1" />
          <LayoutGroup id="news-filters">
            <div role="tablist" aria-label="Filtrar por categoria" className="flex flex-wrap gap-[10px] desk:shrink-0">
              {FILTERS.map((f) => {
                const active = f === filter
                return (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setFilter(f)
                      setVisible(PAGE_SIZE)
                    }}
                    className={cn(
                      'relative cursor-pointer rounded-full border px-5 py-[10px] text-[14px] leading-5 font-medium whitespace-nowrap transition-colors',
                      active ? 'border-brand text-white' : 'border-line bg-white text-ink hover:border-[#c4c9ce]',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="news-filter-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute -inset-px rounded-full bg-brand"
                      />
                    )}
                    <span className="relative">{f}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="grid gap-x-6 gap-y-10 md:grid-cols-2 desk:flex desk:flex-wrap desk:gap-x-6 desk:gap-y-10">
          <AnimatePresence mode="popLayout">
            {shown.map((a) => (
              <motion.article
                layout
                key={a.title}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="group flex flex-col items-start gap-[18px] desk:w-[437px]"
              >
                <div className="w-full overflow-hidden rounded-[20px]">
                  <motion.img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={imageReveal}
                    className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] desk:h-[260px]"
                  />
                </div>
                <Meta category={a.category} date={a.date} />
                <h3 className="text-[20px] leading-7 font-medium text-ink transition-colors group-hover:text-brand">{a.title}</h3>
                <p className="text-[15px] leading-6 text-body">{a.excerpt}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible < filtered.length && (
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="cursor-pointer rounded-full border border-line bg-white px-7 py-4 text-[16px] leading-5 font-medium whitespace-nowrap text-ink transition-colors hover:border-ink"
            >
              Carregar mais artigos
            </motion.button>
          </div>
        )}
      </PageSection>
    </PageLayout>
  )
}
