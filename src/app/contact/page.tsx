
"use client"

import * as React from "react"
import Script from "next/script"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pb-20">
        <section className="bg-[#1a6a91] text-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
            <h1 className="text-5xl font-bold font-headline leading-tight">Get in Touch</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions about our services or need a customized quote? Our team is here to help you bring the sparkle back to your home.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </section>

        <section className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            {/* Centered Embedded Contact Form */}
            <Card className="rounded-[40px] shadow-2xl border-none overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="w-full min-h-[650px] relative">
                  <iframe
                    src="https://links.t3kniq.com/widget/form/ZkVglWQliPdv0DvcFE2R"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                    id="inline-ZkVglWQliPdv0DvcFE2R" 
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact Us"
                    data-height="609"
                    data-layout-iframe-id="inline-ZkVglWQliPdv0DvcFE2R"
                    data-form-id="ZkVglWQliPdv0DvcFE2R"
                    title="Contact Us"
                    className="min-h-[650px]"
                  />
                  <Script 
                    src="https://links.t3kniq.com/js/form_embed.js" 
                    strategy="lazyOnload"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-24 text-center space-y-8">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold font-headline">Need a quick answer?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out our frequently asked questions for instant help with scheduling, pricing, and service details.
          </p>
          <Button variant="outline" className="rounded-xl border-[#1a6a91] text-[#1a6a91] h-12 px-8 font-bold" asChild>
            <a href="/faq">View FAQs</a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
