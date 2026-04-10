"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function GreenerCleaningPage() {
  const getImg = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || ""

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] w-full flex items-center">
          <Image
            src={getImg("greener-hero")}
            alt="Greener Cleaning Hero"
            fill
            className="object-cover"
            priority
            data-ai-hint="nature cleaning"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md border-t-8 border-primary">
              <h1 className="text-4xl font-bold font-headline mb-4 text-[#1a6a91]">Greener Cleaning</h1>
              <p className="text-muted-foreground mb-6">Environmentally responsible professional cleaning.</p>
              <Button className="h-12 px-8 rounded-xl bg-[#2eb086] hover:bg-[#25916e] font-bold" asChild>
                <Link href="/contact">Get Free Estimate</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sub-Navigation Bar */}
        <nav className="bg-[#1a6a91] text-white py-3 sticky top-20 z-40 shadow-md">
          <div className="container mx-auto px-4">
            <ul className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold uppercase tracking-widest">
              <li><Link href="#checklist" className="hover:text-accent transition-colors">Checklist</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </nav>

        {/* Section: Being green is a big deal to us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#1a6a91]">Being green is a big deal to us.</h2>
                  <h3 className="text-xl font-bold text-[#5ea3c2]">Being green is about more than cleaning products, spokespeople or taglines.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    CleanSweep makes life cleaner, healthier and happier. We are committed to the health of our customers, employees, and environment.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#1a6a91]">Is it really green?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Is it really green if a company DOESN'T optimize its routes to save gas, reduce miles driven and minimize carbon emissions?
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[500px] w-full rounded-t-[100px] rounded-bl-[100px] overflow-hidden shadow-2xl">
                  <Image
                    src={getImg("greener-baby-dog")}
                    alt="Baby and Dog"
                    fill
                    className="object-cover"
                    data-ai-hint="baby dog"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Keeping the earth clean too */}
        <section className="py-24 bg-[#1a6a91] text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div className="relative order-2 lg:order-1">
                <div className="relative h-[500px] w-full rounded-t-[100px] rounded-br-[100px] overflow-hidden shadow-2xl border-8 border-white/10">
                  <Image
                    src={getImg("greener-family")}
                    alt="Family at home"
                    fill
                    className="object-cover"
                    data-ai-hint="family home"
                  />
                </div>
              </div>
              <div className="space-y-8 order-1 lg:order-2">
                <h2 className="text-3xl font-bold">Keeping the earth clean too</h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  We proudly make sure that the products, tools and processes we use are in the best interest of our planet and every individual whose life we touch. We are a truly green cleaning company.
                </p>
                <p className="text-white/80 leading-relaxed">
                  People deserve to live in clean and healthy homes; employees should have healthy, safe and rewarding careers; and we should all be environmentally responsible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section id="checklist" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1a6a91] text-center mb-16">Does your cleaning company...</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                "Group clients geographically to reduce driving and fuel costs?",
                "Reduce paper waste by communicating via telephone and e-mail, and store records electronically?",
                "Purchase supplies in concentrated form, and from sources with environmentally friendly supply chain and distribution systems?",
                "Train employees to use the correct amount and type of cleaning product for each part of the home?",
                "And, of course, use safe, effective and responsible cleaning products?",
                "Use reusable bottles, buckets, and bags?",
                "Promote the use of efficient washing machines to reduce the waste and contamination of water?",
                "Use washable, reusable micro-fiber rags that capture dust, crust and allergens better than disposable paper towels?",
                "Protect indoor air quality through the use of CRI Green Label Certified Vacuums?"
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-[#2eb086] shrink-0 mt-0.5" />
                  <p className="text-muted-foreground font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources CTA Section */}
        <section className="py-20 bg-[#1a6a91]/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              <div className="bg-[#1a6a91] p-12 rounded-3xl text-white space-y-8 relative overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <Image src={getImg("resource-bg")} alt="bg" fill className="object-cover" />
                </div>
                <div className="relative z-10 space-y-4">
                  <h2 className="text-4xl font-bold">Get started and see why cleaning is a big deal to us.</h2>
                  <p className="text-white/80 text-lg">Book your clean today!</p>
                  <Button className="bg-[#2eb086] hover:bg-[#25916e] rounded-xl px-10 h-14 font-bold text-lg shadow-xl" asChild>
                    <Link href="/contact">Get Free Estimate</Link>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-8 p-4">
                <h3 className="text-2xl font-bold text-[#1a6a91]">CleanSweep Resources</h3>
                <div className="flex flex-col space-y-2">
                  {[
                    "FAQs", "Blog", "Contact", "Privacy Policy", "Terms of Service"
                  ].map((res) => (
                    <Link 
                      key={res} 
                      href={res === 'FAQs' ? '/faq' : res === 'Contact' ? '/contact' : res === 'Blog' ? '/blog' : res === 'Privacy Policy' ? '/privacy-policy' : res === 'Terms of Service' ? '/terms-of-service' : '#'} 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 border-b border-primary/10 group"
                    >
                      <ChevronRight className="h-4 w-4 text-[#2eb086] group-hover:translate-x-1 transition-transform" />
                      {res}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
