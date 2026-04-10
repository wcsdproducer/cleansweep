
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { TrustSection } from "@/components/TrustSection"
import { ServiceCards } from "@/components/ServiceCards"
import { Checklist } from "@/components/Checklist"
import { AIPlanGenerator } from "@/components/AIPlanGenerator"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <TrustSection />
        <ServiceCards />
        <Checklist />
        <AIPlanGenerator />
      </main>
      <Footer />
    </div>
  )
}
