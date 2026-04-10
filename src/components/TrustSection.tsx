"use client"

import { ShieldCheck, Leaf, Search, RefreshCw, Trophy } from "lucide-react"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Bonded & Insured",
    desc: "Your home is safe with us. We carry full liability and bonding insurance.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    desc: "We use sustainable, non-toxic products that are safe for pets and children.",
  },
  {
    icon: Search,
    title: "Background Checked",
    desc: "Every CleanSweep professional undergoes a rigorous background screening.",
  },
  {
    icon: RefreshCw,
    title: "24h Re-clean Guarantee",
    desc: "Not satisfied? We'll come back within 24 hours to make it right, free of charge.",
  },
]

export function TrustSection() {
  return (
    <section className="py-24 bg-white border-y">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-12 mb-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            <span className="font-bold">Forbes Top 10</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-bold">Entrepreneur Hall of Fame</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="font-bold">Eco-Certified 2024</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center group p-6 rounded-3xl hover:bg-secondary/50 transition-colors">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
