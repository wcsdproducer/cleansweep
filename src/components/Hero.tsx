
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useAuth, initiateAnonymousSignIn } from "@/firebase"

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-home")
  const auth = useAuth()

  React.useEffect(() => {
    if (auth) {
      initiateAnonymousSignIn(auth)
    }
  }, [auth])

  const clientAvatars = [
    "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/Images%2FClients%2FClient%2001.png?alt=media&token=0400eb8c-0959-47df-933a-2bdef8f63239",
    "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/Images%2FClients%2FClient%2002.png?alt=media&token=9e325085-0c5d-476f-af5c-b8f2f3765f14",
    "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/Images%2FClients%2FClient%2003.png?alt=media&token=d08e8385-2cfb-475c-9556-ec5018bc59ca",
    "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/Images%2FClients%2FClient%2004.png?alt=media&token=9da423b8-13b1-4fa0-9058-59e30f206772"
  ]

  return (
    <section className="relative min-h-[80vh] flex items-center py-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ""}
          alt={heroImage?.description || "CleanSweep Clean Home"}
          fill
          className="object-cover opacity-20"
          priority
          data-ai-hint="modern living room"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-5xl lg:text-7xl font-bold font-headline leading-[1.1] text-foreground">
            Your Home, <br />
            <span className="text-primary italic">Cleaned Your Way.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
            Professional home cleaning services tailored to your life. From recurring visits to deep cleans, we bring the sparkle back to your space.
          </p>

          <Button className="h-16 px-10 rounded-2xl font-bold text-xl gap-3 shadow-xl hover:shadow-accent/40 transition-all bg-[#2eb086] text-white hover:bg-[#25916e] max-w-fit" asChild>
            <Link href="/contact">
              Get Free Estimate <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {clientAvatars.map((url, i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-background overflow-hidden relative">
                  <Image src={url} alt={`Client ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              <span className="text-foreground font-bold">1,000+</span> happy homes this month
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative animate-in zoom-in duration-700">
          <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
            <Image
              src={heroImage?.imageUrl || ""}
              alt="Clean Home"
              fill
              className="object-cover"
            />
          </div>
          {/* Floating card for trust */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[240px] border">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold">49-Point Checklist</p>
            </div>
            <p className="text-xs text-muted-foreground">Every corner, every time. No spot left behind.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
