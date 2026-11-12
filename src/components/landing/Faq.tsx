import { useState } from 'react'
import { ABS, Lines, Tag, at, bodyClass, cn, headingClass } from './primitives'

const FAQS: readonly { question: string; answer: string | readonly string[] }[] = [
  {
    question: 'Como compro um bilhete online?',
    answer: [
      'Pode comprar o seu bilhete no site ou na app da C-TRIP. Escolha a',
      'origem, o destino, a data e o seu lugar, e pague com Multicaixa.',
      'O bilhete digital fica disponível na sua conta e no seu telemóvel.',
    ],
  },
  {
    question: 'Posso cancelar ou alterar a data do meu bilhete?',
    answer:
      'Sim. Em Consultar Reserva pode pedir o cancelamento ou alterar a data da viagem, dentro do prazo definido pela transportadora. As condições e eventuais taxas são sempre indicadas antes de confirmar.',
  },
  {
    question: 'Que métodos de pagamento estão disponíveis?',
    answer:
      'Aceitamos Multicaixa Express e pagamento por referência Multicaixa, sempre em kwanzas. A confirmação é imediata e o bilhete digital é enviado de seguida para o seu telemóvel.',
  },
  {
    question: 'Preciso de imprimir o bilhete?',
    answer:
      'Não. Basta mostrar o código QR do bilhete digital no telemóvel no momento do embarque. Se preferir, também pode descarregar ou imprimir o bilhete a partir da sua conta.',
  },
  {
    question: 'Como sei onde fica o terminal de embarque?',
    answer:
      'O endereço do terminal aparece no bilhete e nos detalhes da reserva, com a localização no mapa. Recomendamos chegar com pelo menos 30 minutos de antecedência.',
  },
  {
    question: 'Há descontos para estudantes ou grupos?',
    answer:
      'Algumas transportadoras têm preços especiais para estudantes e grupos. Consulte as Promoções ou contacte o nosso apoio para reservas de grupo e aluguer de autocarros.',
  },
]

/* Vertical gaps between items, as laid out in Figma. */
const GAPS = [0, 16.64, 15.66, 16.64, 15.67, 16.65]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      aria-labelledby="faq-title"
      className="relative mx-4 mt-20 flex flex-col items-start desk:mx-[31.3px] desk:mt-[95.88px] desk:block desk:h-[931.3px]"
    >
      <Tag width={99.77} className={ABS} style={at(0.97, 6.84)}>
        FAQ
      </Tag>
      <h2 id="faq-title" className={cn(headingClass, 'mt-5 desk:mt-0', ABS)} style={at(0, 73.36)}>
        <Lines lines={['Perguntas', 'Frequentes']} />
      </h2>
      <p className={cn(bodyClass, 'mt-3 desk:absolute desk:top-[70.13px] desk:right-[1.22px] desk:mt-0 desk:text-right desk:whitespace-nowrap')}>
        <Lines lines={['Encontre respostas às perguntas mais comuns sobre os nossos', 'serviços, a compra de bilhetes e as viagens com a C-TRIP.']} />
      </p>

      <img
        src="/assets/faq.jpg"
        alt=""
        loading="lazy"
        className={cn('mt-10 aspect-square w-full rounded-[20px] object-cover md:hidden desk:mt-0 desk:block desk:size-[675.97px]', ABS)}
        style={at(0, 254.34)}
      />

      <div className={cn('mt-6 w-full desk:mt-0 desk:w-[651.52px]', ABS)} style={at(723.91, 254.34)}>
        {FAQS.map((item, i) => {
          const isOpen = open === i
          const panelId = `faq-panel-${i}`
          const buttonId = `faq-button-${i}`
          return (
            <div
              key={item.question}
              className={cn('relative rounded-[16px] border transition-colors', isOpen ? 'border-[#8f969c]' : 'border-line hover:border-[#c4c9ce]')}
              style={{ marginTop: GAPS[i] }}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={cn(
                    'block w-full cursor-pointer pr-16 pl-[23.45px] text-left text-[16px] leading-6 font-medium text-ink transition-[padding] duration-300',
                    isOpen ? 'pt-[25.14px] pb-0' : 'pt-[25.63px] pb-[25.64px]',
                  )}
                >
                  {item.question}
                  <img
                    src="/assets/icon-plus.svg"
                    alt=""
                    className={cn(
                      'absolute top-[27.86px] right-[23.46px] size-[19.56px] transition-[opacity,rotate] duration-300',
                      isOpen ? 'rotate-45 opacity-0' : 'opacity-100',
                    )}
                  />
                  <img
                    src="/assets/icon-close.svg"
                    alt=""
                    className={cn(
                      'absolute top-[28.34px] right-[24.24px] size-[17.8px] transition-[opacity,rotate] duration-300',
                      isOpen ? 'opacity-100' : '-rotate-45 opacity-0',
                    )}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn('grid transition-[grid-template-rows] duration-300 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
              >
                <div className="overflow-hidden">
                  <p className={cn(bodyClass, 'pt-[26.83px] pr-[23.47px] pb-[22.91px] pl-[23.45px]')}>
                    {typeof item.answer === 'string' ? item.answer : <Lines lines={item.answer} />}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
