import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <h1 className="text-4xl font-bold tracking-tight">C-Trip</h1>
      <p className="mt-4 text-slate-400">Bem-vindo à landing page.</p>
    </main>
  )
}
