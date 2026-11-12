import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { card, clipReveal, reveal, revealUp, stagger } from '../lib/motion'
import { IconBadge, PageBanner, PageLayout, PageSection, SectionHeading, cardClass } from '../components/site/PageLayout'
import { SmartLink } from '../components/site/SmartLink'
import { cn } from '../components/landing/primitives'

export const Route = createFileRoute('/sobre')({
  head: () => ({
    meta: [
      { title: 'Sobre a C-TRIP' },
      {
        name: 'description',
        content: 'Ligamos passageiros às melhores transportadoras de Angola, para que viajar de autocarro seja simples, seguro e sem filas.',
      },
    ],
  }),
  component: SobrePage,
})

const PHOTOS = ['/assets/about-1.jpg', '/assets/about-2.jpg', '/assets/about-3.jpg', '/assets/about-4.jpg']

const NUMBERS = [
  { value: '10+', label: 'Transportadoras parceiras' },
  { value: '50+', label: 'Rotas interprovinciais' },
  { value: '18', label: 'Províncias ligadas' },
]

const VALUES = [
  {
    icon: '/assets/pages/icon-target.svg',
    title: 'Missão',
    text: 'Tornar as viagens de autocarro em Angola acessíveis, previsíveis e seguras para todos, a partir do telemóvel.',
  },
  {
    icon: '/assets/pages/icon-eye.svg',
    title: 'Visão',
    text: 'Ser a forma mais simples de viajar por estrada em Angola e, depois, em toda a região.',
  },
  {
    icon: '/assets/pages/icon-heart.svg',
    title: 'Valores',
    text: 'Transparência nos preços, respeito pelo tempo do passageiro, parceria com as transportadoras e apoio próximo.',
  },
]

const PARTNERS = [
  { name: 'Macon', logo: '/assets/pages/partner-macon.png' },
  { name: 'Angoré Bus', logo: '/assets/pages/partner-angore.jpg' },
  { name: 'Labuta', logo: '/assets/pages/partner-labuta.jpg' },
]

const photoReveal = clipReveal(20)

function SobrePage() {
  return (
    <PageLayout
      banner={
        <PageBanner
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]}
          title="Sobre a C-TRIP"
          intro="Ligamos passageiros às melhores transportadoras de Angola, para que viajar de autocarro seja simples, seguro e sem filas."
          introWidth={820}
        />
      }
    >
      {/* História */}
      <PageSection>
        <div className="flex flex-col gap-10 desk:flex-row desk:items-center desk:gap-16">
          <div className="grid grid-cols-2 gap-3 desk:flex desk:w-[668px] desk:shrink-0 desk:flex-wrap desk:gap-4">
            {PHOTOS.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={photoReveal}
                custom={i * 0.1}
                className="aspect-[326/279] w-full rounded-[20px] object-cover desk:h-[279px] desk:w-[326px]"
              />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <SectionHeading tag="A nossa história" title="Viajar de autocarro em Angola, mais simples" />
            <motion.p {...revealUp(0.2)} className="text-[16px] leading-7 text-body">
              Durante anos, comprar um bilhete de autocarro interprovincial significava ir ao terminal, fazer fila e esperar que ainda
              houvesse lugar. A C-TRIP nasceu para mudar isso.
            </motion.p>
            <motion.p {...revealUp(0.26)} className="text-[16px] leading-7 text-body">
              Reunimos as transportadoras num só lugar: compare horários e preços, escolha o seu lugar no autocarro, pague com Multicaixa
              e receba o bilhete digital no telemóvel — em poucos minutos.
            </motion.p>
            <motion.div {...reveal} variants={stagger(0.08, 0.3)} className="flex gap-3 desk:gap-4">
              {NUMBERS.map((n) => (
                <motion.div key={n.label} variants={card} className="flex min-w-0 flex-1 flex-col gap-1 rounded-[16px] bg-canvas p-4 desk:p-5">
                  <p className="text-[28px] leading-9 font-medium whitespace-nowrap text-brand desk:text-[36px] desk:leading-[44px]">{n.value}</p>
                  <p className="text-[13px] leading-5 text-body desk:text-[14px] desk:leading-[22px]">{n.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </PageSection>

      {/* Missão, visão e valores */}
      <PageSection className="flex flex-col items-center gap-10 desk:gap-12">
        <SectionHeading center tag="O que nos move" title="Missão, visão e valores" />
        <motion.div {...reveal} viewport={{ once: true, amount: 0.25 }} variants={stagger(0.12)} className="flex w-full flex-col gap-4 desk:flex-row desk:gap-6">
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              variants={card}
              whileHover={{ y: -6, boxShadow: '0px 18px 40px 0px rgba(33,37,41,0.08)' }}
              className={cn(cardClass, 'flex min-w-0 flex-1 flex-col gap-4 self-stretch px-8 py-9')}
            >
              <IconBadge src={v.icon} />
              <h3 className="text-[22px] leading-[30px] font-medium text-ink">{v.title}</h3>
              <p className="text-[15px] leading-[26px] text-body">{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </PageSection>

      {/* Parceiros */}
      <PageSection className="flex flex-col items-center gap-10 desk:gap-12">
        <SectionHeading
          center
          tag="Parceiros"
          title="Transportadoras que confiam na C-TRIP"
          text="Trabalhamos com operadores reconhecidos, com frotas modernas e rotas em todo o país."
          textWidth={680}
        />
        <motion.div {...reveal} viewport={{ once: true, amount: 0.25 }} variants={stagger(0.1)} className="grid w-full grid-cols-2 gap-4 desk:flex desk:gap-6">
          {PARTNERS.map((p) => (
            <motion.div
              key={p.name}
              variants={card}
              whileHover={{ y: -4 }}
              className="flex min-w-0 flex-1 flex-col items-center gap-4 rounded-[20px] bg-canvas p-5 desk:p-7"
            >
              <img src={p.logo} alt={`Logótipo ${p.name}`} loading="lazy" className="h-[70px] w-full max-w-[200px] rounded-[12px] object-contain desk:h-[90px] desk:w-[200px]" />
              <p className="text-[16px] leading-[22px] font-medium whitespace-nowrap text-ink">{p.name}</p>
            </motion.div>
          ))}
          <motion.a
            variants={card}
            whileHover={{ y: -4 }}
            href="mailto:suporte@c-trip.africa?subject=Parceria%20C-TRIP"
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[10px] self-stretch rounded-[20px] bg-brand-soft p-5 text-center font-medium desk:p-7"
          >
            <span className="text-[24px] leading-9 text-brand desk:text-[28px]">+ outras</span>
            <span className="text-[14px] leading-5 text-brand-deep">É transportadora? Junte-se a nós</span>
          </motion.a>
        </motion.div>
      </PageSection>

      {/* CTA */}
      <PageSection>
        <motion.div
          {...revealUp(0, 0.4)}
          className="flex flex-col items-start gap-8 rounded-[24px] bg-[linear-gradient(90deg,#13492f_0%,#217d50_100%)] p-8 desk:flex-row desk:items-center desk:gap-10 desk:p-14"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-3 text-white">
            <p className="text-[28px] leading-9 font-medium desk:text-[36px] desk:leading-[46px]">Pronto para a sua próxima viagem?</p>
            <p className="text-[16px] leading-7 text-white/86">Compare horários e preços e garanta o seu lugar em minutos.</p>
          </div>
          <SmartLink
            href="/#reservas"
            className="group inline-flex shrink-0 items-center gap-[10px] rounded-full bg-white px-7 py-4 text-[16px] leading-5 font-medium whitespace-nowrap text-brand transition-shadow hover:shadow-[0_0_0_6px_rgba(255,255,255,0.18)]"
          >
            Procurar viagens
            <img src="/assets/pages/icon-arrow-green-sm.svg" alt="" width={18} height={18} className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
          </SmartLink>
        </motion.div>
      </PageSection>
    </PageLayout>
  )
}
