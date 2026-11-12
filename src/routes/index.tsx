import { createFileRoute } from '@tanstack/react-router'
import { About } from '../components/landing/About'
import { Faq } from '../components/landing/Faq'
import { Footer, Newsletter } from '../components/landing/Footer'
import { Hero } from '../components/landing/Hero'
import { Highlights } from '../components/landing/Highlights'
import { OperationalArea } from '../components/landing/OperationalArea'
import { Services } from '../components/landing/Services'
import { Stats } from '../components/landing/Stats'
import { Testimonials } from '../components/landing/Testimonials'
import { WhyUs } from '../components/landing/WhyUs'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="overflow-x-clip">
      <div className="canvas mx-auto pb-2 desk:w-full desk:pb-[15.64px]">
        <Hero />
        <main className="desk:w-[1440px] mx-auto">
          <Highlights />
          <About />
          <Stats />
          <WhyUs />
          <Services />
          <OperationalArea />
          <Testimonials />
          <Faq />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  )
}
