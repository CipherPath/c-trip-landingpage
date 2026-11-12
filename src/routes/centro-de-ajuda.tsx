import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT, card, fadeUp, reveal, revealUp, stagger } from '../lib/motion'
import { IconBadge, PageBanner, PageLayout, PageSection, SectionHeading, cardClass } from '../components/site/PageLayout'
import { cn } from '../components/landing/primitives'

export const Route = createFileRoute('/centro-de-ajuda')({
  head: () => ({
    meta: [
      { title: 'Centro de Ajuda — C-TRIP' },
      { name: 'description', content: 'Encontre respostas sobre reservas, pagamentos, reembolsos e viagens com a C-TRIP.' },
    ],
  }),
  component: CentroDeAjudaPage,
})

type TopicId = 'reservas' | 'pagamentos' | 'reembolsos' | 'bagagem' | 'conta' | 'aluguer'

/* Article counts are the Figma copy. */
const TOPICS: readonly { id: TopicId; icon: string; title: string; text: string; count: string }[] = [
  {
    id: 'reservas',
    icon: '/assets/pages/icon-ticket.svg',
    title: 'Reservas e bilhetes',
    text: 'Como reservar, escolher lugar, encontrar o bilhete digital e mostrar o código QR.',
    count: '8 artigos',
  },
  {
    id: 'pagamentos',
    icon: '/assets/pages/icon-card.svg',
    title: 'Pagamentos',
    text: 'Multicaixa Express, pagamento por referência e prazos de confirmação.',
    count: '6 artigos',
  },
  {
    id: 'reembolsos',
    icon: '/assets/pages/icon-undo.svg',
    title: 'Cancelamentos e reembolsos',
    text: 'Como cancelar, pedir reembolso e acompanhar o estado do pedido.',
    count: '7 artigos',
  },
  {
    id: 'bagagem',
    icon: '/assets/pages/icon-luggage.svg',
    title: 'Bagagem e embarque',
    text: 'Regras de bagagem, documentos necessários e chegada ao terminal.',
    count: '5 artigos',
  },
  {
    id: 'conta',
    icon: '/assets/pages/icon-shield.svg',
    title: 'Conta e segurança',
    text: 'Criar conta, alterar dados pessoais e proteger o acesso.',
    count: '4 artigos',
  },
  {
    id: 'aluguer',
    icon: '/assets/pages/icon-bus.svg',
    title: 'Aluguer de autocarros',
    text: 'Pedidos de aluguer para grupos, eventos, escolas e empresas.',
    count: '3 artigos',
  },
]

/* The first six are the Figma accordion; the rest appear when searching or filtering by topic. */
const FAQS: readonly { topic: TopicId; q: string; a: string }[] = [
  {
    topic: 'reservas',
    q: 'Como compro um bilhete online?',
    a: 'Escolha a origem, o destino e a data, seleccione a viagem e o lugar, e pague com Multicaixa. O bilhete digital fica na sua conta e no telemóvel.',
  },
  {
    topic: 'reembolsos',
    q: 'Posso cancelar ou alterar a data do meu bilhete?',
    a: 'Sim. Em Consultar Reserva pode pedir o cancelamento ou alterar a data da viagem, dentro do prazo definido pela transportadora. As condições e eventuais taxas são sempre indicadas antes de confirmar.',
  },
  {
    topic: 'pagamentos',
    q: 'Que métodos de pagamento estão disponíveis?',
    a: 'Aceitamos Multicaixa Express e pagamento por referência Multicaixa, sempre em kwanzas. A confirmação é imediata e o bilhete digital é enviado de seguida para o seu telemóvel.',
  },
  {
    topic: 'reservas',
    q: 'Preciso de imprimir o bilhete?',
    a: 'Não. Basta mostrar o código QR do bilhete digital no telemóvel no momento do embarque. Se preferir, também pode descarregar ou imprimir o bilhete a partir da sua conta.',
  },
  {
    topic: 'bagagem',
    q: 'Como sei onde fica o terminal de embarque?',
    a: 'O endereço do terminal aparece no bilhete e nos detalhes da reserva, com a localização no mapa. Recomendamos chegar com pelo menos 30 minutos de antecedência.',
  },
  {
    topic: 'aluguer',
    q: 'Há descontos para estudantes ou grupos?',
    a: 'Algumas transportadoras têm preços especiais para estudantes e grupos. Consulte as Promoções ou contacte o nosso apoio para reservas de grupo e aluguer de autocarros.',
  },
  {
    topic: 'reembolsos',
    q: 'Como peço um reembolso?',
    a: 'Na sua conta, abra a reserva e escolha "Pedir reembolso" antes da partida. Pode acompanhar o estado do pedido até à devolução do valor.',
  },
  {
    topic: 'pagamentos',
    q: 'O meu pagamento ficou pendente. E agora?',
    a: 'Pagamentos por referência podem demorar alguns minutos a confirmar. Se a reserva expirar antes da confirmação, o valor é devolvido automaticamente.',
  },
  {
    topic: 'bagagem',
    q: 'Quanta bagagem posso levar?',
    a: 'Cada transportadora define a bagagem incluída no bilhete, normalmente uma mala de porão e uma peça de mão. As condições aparecem no resumo da viagem antes de pagar.',
  },
  {
    topic: 'conta',
    q: 'Como altero os meus dados pessoais?',
    a: 'Na sua conta, abra o Perfil e edite o nome, o telefone ou o email. O documento de identificação só pode ser alterado com a ajuda do apoio ao cliente.',
  },
  {
    topic: 'conta',
    q: 'Esqueci-me da palavra-passe. O que faço?',
    a: 'No ecrã de entrada, escolha "Esqueci-me da palavra-passe" e siga as instruções enviadas por SMS ou email.',
  },
  {
    topic: 'aluguer',
    q: 'Como peço o aluguer de um autocarro?',
    a: 'Envie-nos a data, o percurso e o número de passageiros para suporte@c-trip.africa. Respondemos com propostas das transportadoras parceiras.',
  },
]

const POPULAR = [
  { label: 'Pedir reembolso', query: 'reembolso' },
  { label: 'Métodos de pagamento', query: 'pagamento' },
  { label: 'Onde fica o terminal', query: 'terminal' },
]

const CHANNELS = [
  { icon: '/assets/pages/icon-mail.svg', title: 'Email', lines: ['suporte@c-trip.africa', 'Resposta em até 24 horas.'], href: 'mailto:suporte@c-trip.africa' },
  { icon: '/assets/pages/icon-phone.svg', title: 'Telefone e WhatsApp', lines: ['+244 [9XX XXX XXX]', 'Chamadas e mensagens.'] },
  { icon: '/assets/pages/icon-clock.svg', title: 'Horário de apoio', lines: ['Todos os dias, das 6h às 22h', 'Incluindo feriados.'] },
]

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

const scrollToFaq = () => document.getElementById('perguntas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function CentroDeAjudaPage() {
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState<TopicId | null>(null)
  const [open, setOpen] = useState<string | null>(FAQS[0].q)

  const results = useMemo(() => {
    const q = normalize(query)
    if (!q && !topic) return FAQS.slice(0, 6)
    const words = q.split(/\s+/).filter(Boolean)
    return FAQS.filter((f) => {
      if (topic && f.topic !== topic) return false
      const hay = normalize(`${f.q} ${f.a}`)
      return words.every((w) => hay.includes(w))
    })
  }, [query, topic])

  const applySearch = (value: string) => {
    setDraft(value)
    setQuery(value)
    setTopic(null)
    const first = FAQS.find((f) => normalize(`${f.q} ${f.a}`).includes(normalize(value)))
    setOpen(first?.q ?? null)
    scrollToFaq()
  }
  const applyTopic = (id: TopicId) => {
    setTopic(id)
    setQuery('')
    setDraft('')
    setOpen(FAQS.find((f) => f.topic === id)?.q ?? null)
    scrollToFaq()
  }
  const clearFilters = () => {
    setTopic(null)
    setQuery('')
    setDraft('')
    setOpen(FAQS[0].q)
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    applySearch(draft)
  }
  const filterLabel = topic ? TOPICS.find((t) => t.id === topic)?.title : query ? `“${query}”` : null

  return (
    <PageLayout
      banner={
        <PageBanner
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Ajuda' }]}
          title="Como podemos ajudar?"
          intro="Encontre respostas sobre reservas, pagamentos, reembolsos e viagens com a C-TRIP."
          paddingBottom={88}
        >
          <form
            role="search"
            onSubmit={onSubmit}
            className="flex w-full items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 desk:w-[720px] desk:gap-4 desk:pl-7"
          >
            <img src="/assets/pages/icon-search.svg" alt="" width={22} height={22} className="size-[22px] shrink-0" />
            <label htmlFor="help-search" className="sr-only">
              Pesquisar no Centro de Ajuda
            </label>
            <input
              id="help-search"
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Pesquise uma dúvida, ex.: “reembolso” ou “bagagem”"
              className="min-w-0 flex-1 bg-transparent text-[15px] leading-6 text-ink outline-none placeholder:text-muted desk:text-[16px]"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="shrink-0 cursor-pointer rounded-full bg-brand px-5 py-4 text-[16px] leading-5 font-medium text-white transition-colors hover:bg-brand-dark desk:px-7"
            >
              Pesquisar
            </motion.button>
          </form>
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className="text-[14px] leading-5 whitespace-nowrap text-white/72">Mais procurado:</span>
            {POPULAR.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => applySearch(chip.query)}
                className="cursor-pointer rounded-full bg-white/14 px-4 py-2 text-[14px] leading-5 whitespace-nowrap text-white transition-colors hover:bg-white/24"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </PageBanner>
      }
    >
      {/* Temas */}
      <PageSection id="temas" className="flex flex-col gap-10 desk:gap-12">
        <SectionHeading tag="Temas de ajuda" title="Escolha um tema" />
        <motion.div {...reveal} viewport={{ once: true, amount: 0.2 }} variants={stagger(0.07)} className="grid gap-4 md:grid-cols-2 desk:flex desk:flex-wrap desk:gap-6">
          {TOPICS.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              variants={card}
              whileHover={{ y: -6, boxShadow: '0px 18px 40px 0px rgba(33,37,41,0.08)' }}
              onClick={() => applyTopic(t.id)}
              aria-pressed={topic === t.id}
              className={cn(
                cardClass,
                'group flex cursor-pointer flex-col items-start gap-4 p-8 text-left transition-colors desk:w-[437px]',
                topic === t.id ? 'border-brand' : 'hover:border-[#c4c9ce]',
              )}
            >
              <IconBadge src={t.icon} />
              <span className="text-[20px] leading-7 font-medium text-ink">{t.title}</span>
              <span className="text-[15px] leading-[26px] text-body">{t.text}</span>
              <span className="flex items-center gap-2 text-[15px] leading-[22px] font-medium whitespace-nowrap text-brand">
                {t.count}
                <img src="/assets/pages/icon-arrow-sm.svg" alt="" width={16} height={16} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </PageSection>

      {/* Perguntas frequentes */}
      <PageSection id="perguntas">
        <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:gap-16">
          <div className="flex flex-col items-start gap-7 desk:w-[520px] desk:shrink-0">
            <SectionHeading
              tag="FAQ"
              title={
                <>
                  <span className="desk:block">Perguntas </span>
                  <span className="desk:block">Frequentes</span>
                </>
              }
              text="As dúvidas mais comuns dos nossos passageiros. Não encontrou a resposta? Fale connosco."
            />
            <motion.a
              {...revealUp(0.24)}
              whileTap={{ scale: 0.97 }}
              href="#contacto"
              className="group inline-flex items-center gap-[10px] rounded-full bg-brand px-7 py-4 text-[16px] leading-5 font-medium whitespace-nowrap text-white transition-colors hover:bg-brand-dark"
            >
              Falar com o apoio
              <img src="/assets/pages/icon-arrow-white-sm.svg" alt="" width={18} height={18} className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <AnimatePresence initial={false}>
              {filterLabel && (
                <motion.div
                  key="filter"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex flex-wrap items-center gap-2 text-[15px] leading-6 text-body desk:max-w-[651.52px]"
                >
                  <span>
                    {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para <strong className="font-medium text-ink">{filterLabel}</strong>
                  </span>
                  <button type="button" onClick={clearFilters} className="cursor-pointer font-medium text-brand hover:underline">
                    Limpar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* First appearance: items rise in sequence. Filtering: the whole list cross-fades (keyed by the filter),
                so nothing is taken out of the flow while it animates. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${topic ?? ''}|${query}`}
                {...reveal}
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger(0.06)}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
                className="flex flex-col gap-4"
              >
                {results.map((item) => {
                  const isOpen = open === item.q
                  const id = normalize(item.q).replace(/[^a-z0-9]+/g, '-')
                  return (
                    <motion.div
                      key={item.q}
                      variants={fadeUp}
                      className={cn(
                        'relative w-full rounded-[16px] border bg-white transition-colors desk:w-[651.52px]',
                        isOpen ? 'border-[#8f969c]' : 'border-line hover:border-[#c4c9ce]',
                      )}
                    >
                      <h3>
                        <button
                          id={`q-${id}`}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`a-${id}`}
                          onClick={() => setOpen(isOpen ? null : item.q)}
                          className={cn(
                            'block w-full cursor-pointer pr-16 pl-[23.45px] text-left text-[16px] leading-6 font-medium text-ink transition-[padding] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                            isOpen ? 'pt-[25.14px] pb-0' : 'pt-[25.63px] pb-[25.64px]',
                          )}
                        >
                          {item.q}
                          <img
                            src="/assets/icon-plus.svg"
                            alt=""
                            className={cn('absolute top-[27.86px] right-[23.46px] size-[19.56px] transition-[opacity,rotate] duration-300', isOpen ? 'rotate-45 opacity-0' : 'opacity-100')}
                          />
                          <img
                            src="/assets/icon-close.svg"
                            alt=""
                            className={cn('absolute top-[28.34px] right-[24.24px] size-[17.8px] transition-[opacity,rotate] duration-300', isOpen ? 'opacity-100' : '-rotate-45 opacity-0')}
                          />
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`a-${id}`}
                            role="region"
                            aria-labelledby={`q-${id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-[560px] pt-[26.83px] pr-[23.47px] pb-[22.91px] pl-[23.45px] text-[16px] leading-7 text-body">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {results.length === 0 && (
              <div className="flex flex-col items-start gap-2 rounded-[16px] border border-dashed border-line p-6 desk:max-w-[651.52px]">
                <p className="text-[16px] leading-6 font-medium text-ink">Não encontrámos resultados.</p>
                <p className="text-[15px] leading-6 text-body">
                  Tente outra palavra ou{' '}
                  <a href="#contacto" className="font-medium text-brand hover:underline">
                    fale com o nosso apoio
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </PageSection>

      {/* Contactos */}
      <PageSection id="contacto" className="flex flex-col items-center gap-10 desk:gap-12">
        <SectionHeading center tag="Contacto" title="Ainda precisa de ajuda?" text="A nossa equipa de apoio responde em português." textWidth={640} />
        <motion.div {...reveal} viewport={{ once: true, amount: 0.25 }} variants={stagger(0.1)} className="flex w-full flex-col gap-4 desk:flex-row desk:gap-6">
          {CHANNELS.map((c) => (
            <motion.div key={c.title} variants={card} className={cn(cardClass, 'flex flex-col items-start gap-4 p-8 desk:w-[437px]')}>
              <IconBadge src={c.icon} />
              <p className="text-[20px] leading-7 font-medium text-ink">{c.title}</p>
              <p className="text-[15px] leading-[26px] text-body">
                {c.href ? (
                  <a href={c.href} className="transition-colors hover:text-brand hover:underline">
                    {c.lines[0]}
                  </a>
                ) : (
                  c.lines[0]
                )}
                <br />
                {c.lines[1]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </PageSection>
    </PageLayout>
  )
}
