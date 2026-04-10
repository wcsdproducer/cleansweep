"use client"

import * as React from "react"
import { CheckCircle2, ChevronDown, ChefHat, Bath, Bed, Home } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const sections = [
  {
    title: "Kitchen",
    icon: ChefHat,
    items: [
      "Clean and sanitize sink",
      "Scrub and shine faucet",
      "Wipe down and sanitize countertops",
      "Clean and polish exterior of microwave",
      "Clean microwave interior",
      "Clean and polish exterior of refrigerator",
      "Clean and polish exterior of oven/stove",
      "Wipe down stovetop and burners",
      "Wipe down cabinet and drawer fronts",
      "Dust light fixtures and ceiling fan",
      "Wipe down baseboards and window sills",
      "Vacuum and mop floor",
    ],
  },
  {
    title: "Bathrooms",
    icon: Bath,
    items: [
      "Clean and sanitize toilet (inside and out)",
      "Scrub and sanitize shower/tub walls",
      "Clean shower door/curtain",
      "Scrub and sanitize shower/tub floor",
      "Clean and sanitize sink and vanity top",
      "Scrub and shine faucet",
      "Clean mirrors",
      "Shine chrome fixtures",
      "Wipe down cabinet and drawer fronts",
      "Dust light fixtures and ceiling fan",
      "Wipe down baseboards and window sills",
      "Empty trash and replace liner",
      "Vacuum and mop floor",
    ],
  },
  {
    title: "Bedrooms",
    icon: Bed,
    items: [
      "Dust all accessible surfaces",
      "Wipe down furniture exteriors",
      "Dust picture frames and decor",
      "Dust ceiling fans and light fixtures",
      "Wipe down baseboards",
      "Clean interior and exterior of windows",
      "Clean mirrors",
      "Make beds (clean linens provided)",
      "Empty trash and replace liner",
      "Vacuum all carpeted areas",
      "Mop hard floors",
      "General tidying",
    ],
  },
  {
    title: "Living & Common Areas",
    icon: Home,
    items: [
      "Dust all accessible surfaces",
      "Wipe down furniture exteriors",
      "Dust picture frames and decor",
      "Dust ceiling fans and light fixtures",
      "Wipe down baseboards",
      "Clean interior and exterior of windows",
      "Clean glass table tops",
      "Tidy up (pillows, remotes, etc.)",
      "Empty trash and replace liner",
      "Vacuum all carpeted areas",
      "Mop hard floors",
      "Wipe down light switches and handles",
    ],
  },
]

export function Checklist() {
  return (
    <section id="checklist" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold font-headline mb-4">The CleanSweep 49-Point Checklist</h2>
          <p className="text-muted-foreground text-lg">
            We don't just clean; we obsess over details. Our comprehensive checklist ensures your home meets our highest standards of cleanliness every single time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section, idx) => (
                <AccordionItem key={section.title} value={`item-${idx}`} className="border rounded-2xl px-6 mb-4 overflow-hidden shadow-sm">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">{section.items.length} Points Inspected</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-start gap-2 group">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3" />
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-border">
              <h3 className="text-2xl font-bold mb-6">Why our checklist matters</h3>
              <ul className="space-y-6">
                {[
                  { title: "Standardized Excellence", desc: "Every professional follows the exact same rigorous process." },
                  { title: "Transparency", desc: "You know exactly what was cleaned and what to expect." },
                  { title: "Accountability", desc: "Items are checked off in real-time by our cleaning supervisors." },
                  { title: "Customization", desc: "Focus more on areas that matter to you, skip the ones that don't." },
                ].map((point) => (
                  <li key={point.title} className="flex gap-4">
                    <div className="h-10 w-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{point.title}</p>
                      <p className="text-sm text-muted-foreground">{point.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
