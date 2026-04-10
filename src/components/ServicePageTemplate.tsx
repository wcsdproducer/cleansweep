
"use client"

import * as React from "react"
import Image from "next/image"
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { PlaceHolderImages } from "@/lib/placeholder-images"

interface ServicePageTemplateProps {
  title: string
  description: string
  imageHint: string
  features: string[]
}

export function ServicePageTemplate({ title, description, imageHint, features }: ServicePageTemplateProps) {
  const getImg = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || ""

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 bg-[#1a6a91] text-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold font-headline leading-tight">
                {title}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-xl">
                {description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-[#2eb086] hover:bg-[#25916e] text-white px-8 py-6 rounded-xl font-bold text-lg shadow-xl">
                  Get My Estimate <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src={getImg("service-template-hero")}
                alt={title}
                fill
                className="object-cover"
                data-ai-hint={imageHint}
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Why choose our {title.toLowerCase()}?</h2>
                <div className="space-y-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="bg-[#2eb086]/10 p-2 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-[#2eb086]" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{feature}</p>
                        <p className="text-muted-foreground">Professional, reliable, and guaranteed quality every time.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1a6a91]/5 p-8 rounded-3xl space-y-6">
                <div className="bg-primary/10 p-3 w-fit rounded-2xl">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">The 49-Point Checklist</h3>
                <p className="text-muted-foreground">
                  Our comprehensive checklist ensures your home meets our highest standards of cleanliness every single time.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Standardized Excellence
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    24-Hour Re-Clean Guarantee
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Eco-Friendly Products
                  </li>
                </ul>
                <Button variant="outline" className="w-full py-6 rounded-xl border-[#1a6a91] text-[#1a6a91]">
                  View Full Checklist
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
