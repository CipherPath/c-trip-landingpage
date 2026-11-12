import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { revealUp } from '../../lib/motion'
import { cn } from '../landing/primitives'
import { PageBanner, PageLayout } from './PageLayout'

export type LegalBlock = { p: string } | { ul: readonly string[] } | { note: string }
export type LegalSection = { title: string; blocks: readonly LegalBlock[] }
export type LegalDoc = {
  title: string
  intro: string
  updated: string
  lead: string
  sections: readonly LegalSection[]
}

/** "6. Cancelamentos e reembolsos" → "cancelamentos-e-reembolsos" */
export const sectionId = (title: string) =>
  title
    .replace(/^\d+\.\s*/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Index highlight: the last section whose top has passed just below the fixed header. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ids])
  return active
}

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex gap-[14px]">
      <img src="/assets/pages/marcador.svg" alt="" width={7} height={18} className="h-[18px] w-[7px] shrink-0" />
      <span className="min-w-0 flex-1 text-[16px] leading-7 text-body">{children}</span>
    </li>
  )
}

function Block({ block }: { block: LegalBlock }) {
  if ('p' in block) return <p className="text-[16px] leading-7 text-body">{block.p}</p>
  if ('ul' in block)
    return (
      <ul className="flex flex-col gap-[14px]">
        {block.ul.map((item) => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </ul>
    )
  return (
    <div className="flex gap-[14px] rounded-[12px] bg-brand-soft px-[22px] py-[18px]">
      <span aria-hidden="true" className="w-1 shrink-0 self-stretch rounded-[2px] bg-brand" />
      <p className="min-w-0 flex-1 text-[15px] leading-[26px] text-brand-deep">{block.note}</p>
    </div>
  )
}

function HelpBox({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-[10px] rounded-[16px] bg-brand-soft p-7', className)}>
      <p className="text-[18px] leading-8 font-medium whitespace-nowrap text-brand-deep">Tem dúvidas?</p>
      <p className="text-[15px] leading-6 text-body">A nossa equipa responde em português, todos os dias.</p>
      <a href="mailto:suporte@c-trip.africa" className="w-fit text-[15px] leading-[26px] font-medium text-brand hover:underline">
        suporte@c-trip.africa
      </a>
    </div>
  )
}

/** Figma template shared by "Termos e Condições" and "Política de Privacidade". */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const ids = useMemo(() => doc.sections.map((s) => sectionId(s.title)), [doc])
  const active = useActiveSection(ids)

  return (
    <PageLayout
      banner={
        <PageBanner
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Ajuda', href: '/centro-de-ajuda' }, { label: doc.title }]}
          title={doc.title}
          intro={doc.intro}
        />
      }
    >
      <div className="flex flex-col gap-10 px-4 pt-12 desk:flex-row desk:items-start desk:gap-[72px] desk:px-10 desk:pt-[88px]">
        <aside className="hidden w-[340px] shrink-0 flex-col gap-5 desk:sticky desk:top-24 desk:flex">
          <nav aria-label="Nesta página" className="flex flex-col gap-[14px] rounded-[16px] border border-line bg-canvas p-7">
            <p className="text-[16px] leading-7 font-medium text-ink">Nesta página</p>
            {doc.sections.map((section, i) => {
              const isActive = ids[i] === active
              return (
                <a
                  key={section.title}
                  href={`#${ids[i]}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn('text-[15px] leading-6 transition-colors', isActive ? 'text-brand' : 'text-body hover:text-ink')}
                >
                  {section.title}
                </a>
              )
            })}
          </nav>
          <HelpBox />
        </aside>

        <article className="flex min-w-0 flex-1 flex-col gap-10">
          <p className="text-[14px] leading-[25px] text-muted">{doc.updated}</p>
          <p className="text-[17px] leading-[30px] text-ink desk:text-[18px] desk:leading-8">{doc.lead}</p>
          {doc.sections.map((section, i) => (
            <div key={section.title} className="flex flex-col gap-10">
              <div aria-hidden="true" className="h-px w-full bg-line" />
              <motion.section {...revealUp(0, 0.15)} id={ids[i]} className="flex scroll-mt-28 flex-col gap-[14px]">
                <h2 className="text-[22px] leading-8 font-medium text-ink desk:text-[26px] desk:leading-9">{section.title}</h2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </motion.section>
            </div>
          ))}
          <HelpBox className="desk:hidden" />
        </article>
      </div>
    </PageLayout>
  )
}
