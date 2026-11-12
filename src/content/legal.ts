import type { LegalDoc } from '../components/site/LegalPage'

/* Text transcribed from the Figma frames "C-TRIP – Termos e Condições" (20:2) and
   "C-TRIP – Política de Privacidade" (20:196). Placeholders in [ ] are still to be filled by the company. */

export const TERMOS: LegalDoc = {
  title: 'Termos e Condições',
  intro: 'As regras de utilização da C-TRIP: reservas, pagamentos, cancelamentos e os seus direitos como passageiro.',
  updated: 'Última actualização: 26 de outubro de 2026 · Versão 1.0',
  lead: 'Estes Termos e Condições regulam a utilização da plataforma C-TRIP — site e aplicação — para pesquisar, reservar e pagar bilhetes de autocarro de transportadoras parceiras em Angola. Ao criar uma conta ou fazer uma reserva, aceita estes termos.',
  sections: [
    {
      title: '1. Quem somos',
      blocks: [
        {
          p: 'A C-TRIP é uma plataforma digital operada por [Nome legal da empresa], com sede em Luanda, Angola, NIF [•]. A C-TRIP actua como intermediária entre os passageiros e as transportadoras parceiras, que são as responsáveis pela realização das viagens.',
        },
      ],
    },
    {
      title: '2. Definições',
      blocks: [
        {
          ul: [
            'Plataforma: o site c-trip.africa e a aplicação C-TRIP.',
            'Transportadora: a empresa de transporte rodoviário que realiza a viagem (por exemplo, Macon, Angoré Bus ou Labuta).',
            'Reserva: o lugar escolhido numa viagem, identificado por um código único.',
            'Bilhete digital: o comprovativo da reserva paga, com código QR, válido para embarque.',
          ],
        },
      ],
    },
    {
      title: '3. Conta de utilizador',
      blocks: [
        {
          p: 'Para comprar bilhetes precisa de uma conta com nome, número de telefone e documento de identificação válidos. É responsável por manter os seus dados correctos e por guardar o acesso à sua conta.',
        },
        {
          ul: [
            'Deve ter pelo menos 18 anos para criar uma conta.',
            'Não pode partilhar a conta nem usá-la em nome de outra pessoa sem autorização.',
            'Podemos suspender contas usadas de forma fraudulenta.',
          ],
        },
      ],
    },
    {
      title: '4. Reservas e bilhetes',
      blocks: [
        {
          p: 'Ao escolher um lugar, este fica reservado durante um período limitado para concluir o pagamento. Se o prazo terminar sem pagamento, a reserva é cancelada e o lugar é libertado.',
        },
        {
          ul: [
            'O bilhete só é válido depois de o pagamento ser confirmado.',
            'O bilhete é pessoal e intransmissível e deve corresponder ao documento apresentado no embarque.',
            'Os horários, terminais e preços são definidos pelas transportadoras e podem ser alterados por estas.',
          ],
        },
      ],
    },
    {
      title: '5. Preços e pagamentos',
      blocks: [
        { p: 'Os preços são apresentados em kwanzas (Kz) e incluem os valores indicados no resumo da compra antes do pagamento.' },
        {
          ul: [
            'Aceitamos Multicaixa Express e pagamento por referência Multicaixa.',
            'A confirmação do pagamento pode demorar alguns minutos, consoante o meio usado.',
            'A C-TRIP não guarda dados de cartões bancários.',
          ],
        },
      ],
    },
    {
      title: '6. Cancelamentos e reembolsos',
      blocks: [
        {
          p: 'Pode cancelar uma reserva ou pedir reembolso na sua conta, antes da partida da viagem. O valor e o prazo do reembolso dependem da política da transportadora.',
        },
        {
          note: 'Atenção: cancelar uma reserva paga não devolve automaticamente o valor. Para reaver o dinheiro, peça o reembolso em vez de cancelar.',
        },
        {
          p: 'Depois da partida da viagem já não é possível pedir reembolso. Se a transportadora cancelar a viagem, tem direito ao reembolso total ou a uma alteração sem custos.',
        },
      ],
    },
    {
      title: '7. Embarque e obrigações do passageiro',
      blocks: [
        {
          ul: [
            'Chegue ao terminal com, pelo menos, 30 minutos de antecedência.',
            'Apresente o bilhete digital (código QR) e um documento de identificação válido.',
            'Respeite as regras de bagagem e de conduta da transportadora.',
            'O não comparecimento sem cancelamento prévio pode implicar a perda do valor pago.',
          ],
        },
      ],
    },
    {
      title: '8. Responsabilidades',
      blocks: [
        {
          p: 'A C-TRIP é responsável pelo funcionamento da plataforma, pela emissão do bilhete digital e pelo apoio ao cliente. A realização da viagem, os horários, a segurança a bordo e a bagagem são da responsabilidade da transportadora. Nada nestes termos limita os direitos que a Lei de Defesa do Consumidor (Lei n.º 15/03) lhe garante.',
        },
      ],
    },
    {
      title: '9. Propriedade intelectual',
      blocks: [
        {
          p: 'A marca C-TRIP, o logótipo, o design e o software da plataforma pertencem a [Nome legal da empresa] e não podem ser copiados ou usados sem autorização.',
        },
      ],
    },
    {
      title: '10. Alterações a estes termos',
      blocks: [
        {
          p: 'Podemos actualizar estes termos. Avisaremos por email ou na aplicação sobre alterações importantes, com antecedência razoável. A versão em vigor está sempre disponível nesta página.',
        },
      ],
    },
    {
      title: '11. Lei aplicável e resolução de litígios',
      blocks: [
        {
          p: 'Estes termos regem-se pela lei da República de Angola. Em caso de litígio, procure primeiro o nosso apoio ao cliente; pode também recorrer ao INADEC ou aos tribunais competentes da comarca de Luanda.',
        },
      ],
    },
  ],
}

export const PRIVACIDADE: LegalDoc = {
  title: 'Política de Privacidade',
  intro: 'Como recolhemos, usamos e protegemos os seus dados pessoais.',
  updated: 'Última actualização: 26 de outubro de 2026 · Versão 1.0',
  lead: 'A sua privacidade é importante para nós. Esta política explica que dados pessoais a C-TRIP recolhe, para que os usa, com quem os partilha e como pode exercer os seus direitos, nos termos da Lei n.º 22/11 — Lei da Protecção de Dados Pessoais.',
  sections: [
    {
      title: '1. Responsável pelo tratamento',
      blocks: [
        {
          p: 'O responsável pelo tratamento dos seus dados é [Nome legal da empresa], com sede em Luanda, Angola, NIF [•]. Pode contactar-nos através de privacidade@c-trip.africa.',
        },
      ],
    },
    {
      title: '2. Dados que recolhemos',
      blocks: [
        {
          ul: [
            'Identificação: nome completo e número do documento de identificação.',
            'Contacto: número de telefone e email.',
            'Viagens: reservas, lugares, bilhetes, pedidos de reembolso e de aluguer.',
            'Pagamentos: estado e referência do pagamento (não guardamos dados bancários completos).',
            'Utilização: dispositivo, idioma e registos técnicos para segurança e melhoria do serviço.',
          ],
        },
      ],
    },
    {
      title: '3. Para que usamos os dados',
      blocks: [
        {
          ul: [
            'Criar e gerir a sua conta.',
            'Emitir bilhetes e permitir o embarque.',
            'Processar pagamentos e reembolsos.',
            'Enviar avisos sobre as suas viagens (alterações, atrasos, cancelamentos).',
            'Prevenir fraude e cumprir obrigações legais.',
            'Enviar novidades e promoções, apenas se der o seu consentimento.',
          ],
        },
      ],
    },
    {
      title: '4. Com quem partilhamos',
      blocks: [
        { p: 'Partilhamos apenas o necessário para realizar o serviço:' },
        {
          ul: [
            'Transportadoras: nome, documento e lugar, para validar o embarque.',
            'Prestadores de pagamento (Multicaixa / EMIS): dados da transacção.',
            'Prestadores de alojamento e tecnologia, sob contrato e confidencialidade.',
            'Autoridades, quando a lei o exigir.',
          ],
        },
        { note: 'Nunca vendemos os seus dados pessoais.' },
      ],
    },
    {
      title: '5. Durante quanto tempo guardamos',
      blocks: [
        {
          p: 'Guardamos os dados enquanto a sua conta estiver activa e, depois, apenas pelo tempo exigido por obrigações legais e fiscais. Os dados que já não são necessários são eliminados ou anonimizados.',
        },
      ],
    },
    {
      title: '6. Os seus direitos',
      blocks: [
        { p: 'Nos termos da Lei n.º 22/11, tem direito a:' },
        {
          ul: [
            'Aceder aos seus dados e saber como são tratados.',
            'Corrigir dados incorrectos ou desactualizados.',
            'Pedir a eliminação dos dados, quando aplicável.',
            'Opor-se ao uso dos dados para marketing e retirar o consentimento.',
          ],
        },
        {
          p: 'Para exercer estes direitos, escreva para privacidade@c-trip.africa. Pode também apresentar reclamação à Agência de Protecção de Dados (APD).',
        },
      ],
    },
    {
      title: '7. Segurança',
      blocks: [
        {
          p: 'Usamos ligações cifradas (HTTPS), controlo de acessos e registo de actividade para proteger os seus dados. Os números de telefone e de documento não são mostrados por completo depois de guardados.',
        },
      ],
    },
    {
      title: '8. Cookies e armazenamento local',
      blocks: [
        {
          p: 'Usamos armazenamento local no seu dispositivo para manter a sessão, o idioma e os bilhetes disponíveis offline. Cookies de análise só são usados com o seu consentimento.',
        },
      ],
    },
    {
      title: '9. Alterações a esta política',
      blocks: [{ p: 'Podemos actualizar esta política. Avisaremos sobre alterações importantes por email ou na aplicação.' }],
    },
  ],
}
