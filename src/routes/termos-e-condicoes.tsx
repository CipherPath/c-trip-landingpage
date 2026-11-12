import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '../components/site/LegalPage'
import { TERMOS } from '../content/legal'

export const Route = createFileRoute('/termos-e-condicoes')({
  head: () => ({
    meta: [
      { title: 'Termos e Condições — C-TRIP' },
      { name: 'description', content: TERMOS.intro },
    ],
  }),
  component: () => <LegalPage doc={TERMOS} />,
})
