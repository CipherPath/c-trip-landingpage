import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '../components/site/LegalPage'
import { PRIVACIDADE } from '../content/legal'

export const Route = createFileRoute('/politica-de-privacidade')({
  head: () => ({
    meta: [
      { title: 'Política de Privacidade — C-TRIP' },
      { name: 'description', content: PRIVACIDADE.intro },
    ],
  }),
  component: () => <LegalPage doc={PRIVACIDADE} />,
})
