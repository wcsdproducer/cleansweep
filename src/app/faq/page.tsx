"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const faqData = [
  {
    q: "Who will be cleaning my home?",
    a: "CleanSweep is very careful to select, vet, and train every one of our PROs. You're getting only the best housekeeping professionals around, employed, bonded, and insured by CleanSweep."
  },
  {
    q: "What happens if someone's injured in my home?",
    a: "CleanSweep is fully licensed and insured, as are all our PROs. This allows us to provide you with a worry-free clean. If one of our PROs gets injured on your property, the insurance we provide will cover the claim."
  },
  {
    q: "What if something's damaged during a clean?",
    a: "At CleanSweep, we treat each home we clean with the utmost care and respect. If something happens to break while we're cleaning, we do our best to repair or replace the item. All our PROs are fully insured, so you can file any necessary and appropriate claims."
  },
  {
    q: "What should I do before CleanSweep arrives?",
    a: "No need to run the vacuum before we arrive - that's what you hire us for! However, for the most efficient and effective clean, we ask that you please pick up toys, clothing, or small clutter. Also, make sure your pets are somewhere comfortable so we don't disrupt their peace."
  },
  {
    q: "Do I need to be home for you to come clean my house?",
    a: "No. Our PROs work on a typical work week schedule, and most of our clients are gone when we arrive. In these cases, we're provided a spare key or a door/garage code so we can let ourselves in and lock up when we're done."
  },
  {
    q: "What if something's missed?",
    a: "We work hard to ensure that your home receives the most consistent clean every time we visit. During your first consultation, we will work with you to determine if there are any specialized needs that fall outside our 49-Point Checklist. And you can always add special requests by contacting your PRO prior to service. If you return home and discover something essential was missed, contact the office within 24 hours and we'll take care of it as part of our PRO Clean Promise."
  },
  {
    q: "Do I need to provide your team with my own cleaning equipment or supplies?",
    a: "No. We arrive with everything we need to get your home sparkling, and we take all our supplies and equipment with us when we leave. If you have preferences in regards to the cleaning products and equipment we use, please let us know. We will do our best to accommodate your request."
  },
  {
    q: "What if I need to reschedule a clean?",
    a: "We understand things happen and you may not be able to keep your scheduled clean - That's OK! Just please let us know a minimum of 2 business days in advance of your appointment and we'll do our best to shift your schedule. If we receive less than 2 business days notice or we cannot access your home, CleanSweep will charge you the full price of your cleaning."
  },
  {
    q: "Can I provide my PROs with special instructions?",
    a: "Yes - we encourage it! Your preferences help us give you the clean your home deserves. We do ask that you communicate your special requests - one time or regular - directly to your local CleanSweep office rather than your PROs. This allows us to note this information in your file so anyone who visits your home knows your preferences."
  },
  {
    q: "How often can you clean my home?",
    a: "CleanSweep is happy to offer cleaning once a week, every other week, or once a month depending on your individual cleaning needs. You can also request one-time maid service such as for special events, moving in or out of a home, hosting a holiday, or almost any other reason."
  },
  {
    q: "What if I'm not satisfied with my cleaning?",
    a: "At CleanSweep, your satisfaction is our top priority, which is why we provide our PRO Clean Promise. We understand that cleaning is a personal and human service. And occasionally something might not meet your expectations. If any area of your home isn't cleaned to your satisfaction, just let us know within 24 hours. We'll happily return to re-clean the area at no additional cost. It's our way of making it right and ensuring you feel great about your clean."
  },
  {
    q: "Do you always send the same team?",
    a: "We believe that the key to ensuring you get the clean you want is to send the same team every time you receive service. If a member of your team is unavailable during your scheduled clean, we do our best to find the most suitable replacement. All our PROs undergo extensive training, so they will all provide a consistent, thorough quality of work."
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const getImg = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || ""

  const filteredFaqs = faqData.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] w-full flex items-center overflow-hidden">
          <Image
            src={getImg("faq-hero")}
            alt="FAQ Hero"
            fill
            className="object-cover"
            priority
            data-ai-hint="bright interior"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-white/95 backdrop-blur-md p-10 rounded-[40px] shadow-2xl max-w-lg border-t-8 border-primary animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-4xl font-bold font-headline mb-4 text-[#1a6a91]">Frequently Asked Questions</h1>
              <p className="text-muted-foreground mb-8">Everything you need to know about our professional cleaning services.</p>
              <Button className="h-14 px-10 rounded-2xl bg-[#2eb086] hover:bg-[#25916e] font-bold text-lg" asChild>
                <Link href="/contact">Get Free Estimate</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
            <h2 className="text-4xl font-bold text-[#1a6a91] font-headline">Your Clean. Your Schedule.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We know it can be a little stressful preparing for your first professional house cleaning. That's why we've compiled this list of Frequently Asked Questions to hopefully give you some guidance.
            </p>
            <p className="text-muted-foreground">
              If one of your questions isn't on this list, feel free to reach out to our team to ask!
            </p>
          </div>
        </section>

        {/* FAQ Search & Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center mb-16 space-y-8">
              <h2 className="text-3xl font-bold text-[#1a6a91]">Frequently Asked Questions</h2>
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Find your solution here..." 
                  className="pl-12 h-14 rounded-full border-muted bg-secondary/5 focus:ring-primary shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {filteredFaqs.map((faq, idx) => (
                <div key={idx} className="space-y-4 animate-in fade-in duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                  <div className="flex gap-4">
                    <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">Q</div>
                    <h3 className="text-lg font-bold text-[#1a6a91] leading-tight pt-1">{faq.q}</h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 h-10 w-10 rounded-full bg-[#2eb086]/10 flex items-center justify-center text-[#2eb086] font-bold border border-[#2eb086]/20">A</div>
                    <p className="text-muted-foreground leading-relaxed pt-1 text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No matching questions found. Try a different search term or contact us!</p>
              </div>
            )}
          </div>
        </section>

        {/* Resources CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              <div className="bg-[#1a6a91] p-12 rounded-[40px] text-white space-y-8 relative overflow-hidden shadow-2xl min-h-[450px] flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <Image src={getImg("resource-bg")} alt="bg" fill className="object-cover" />
                </div>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl font-bold font-headline leading-tight">Get started and see why cleaning is a big deal to us.</h2>
                  <p className="text-white/80 text-xl">Book your clean today!</p>
                  <Button className="bg-[#2eb086] hover:bg-[#25916e] rounded-2xl px-10 h-14 font-bold text-lg shadow-xl" asChild>
                    <Link href="/contact">Get Free Estimate</Link>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-8 p-4">
                <h3 className="text-3xl font-bold text-[#1a6a91]">CleanSweep Resources</h3>
                <div className="flex flex-col space-y-2">
                  {[
                    "FAQs", "Blog", "Contact", "Privacy Policy", "Terms of Service"
                  ].map((res) => (
                    <Link 
                      key={res} 
                      href={res === 'FAQs' ? '/faq' : res === 'Contact' ? '/contact' : res === 'Blog' ? '/blog' : res === 'Privacy Policy' ? '/privacy-policy' : res === 'Terms of Service' ? '/terms-of-service' : '#'} 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-4 border-b border-primary/10 group font-medium"
                    >
                      <ChevronRight className="h-5 w-5 text-[#2eb086] group-hover:translate-x-1 transition-transform" />
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
