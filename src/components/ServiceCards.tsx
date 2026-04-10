
"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar, Zap, Truck, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const services = [
  {
    id: "standard",
    title: "Recurring Cleaning",
    desc: "The perfect maintenance plan for busy families. Weekly, bi-weekly, or monthly.",
    icon: Calendar,
    image: "service-standard",
    points: ["Regular Maintenance", "Predictable Pricing", "Same Professional Team"],
    btnText: "Schedule Now",
    accent: "primary",
  },
  {
    id: "deep",
    title: "One-Time Deep Clean",
    desc: "A corner-to-corner detailed scrub for seasonal cleaning or special occasions.",
    icon: Zap,
    image: "service-deep",
    points: ["All 49 Checklist Points", "Intense Scrubbing", "Sanitized Surfaces"],
    btnText: "Go Deep",
    accent: "accent",
  },
  {
    id: "move",
    title: "Move In / Move Out",
    desc: "Starting fresh? We'll handle the scrub so you can focus on the boxes.",
    icon: Truck,
    image: "service-moving",
    points: ["Inside Cabinets", "Inside Appliances", "Wall Washing Included"],
    btnText: "Book Move Clean",
    accent: "primary",
  },
]

export function ServiceCards() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold font-headline mb-4">Our Premium Services</h2>
            <p className="text-muted-foreground text-lg">
              We offer flexible cleaning plans designed to fit your schedule and budget. No contracts, just amazing results.
            </p>
          </div>
          <Button variant="outline" className="rounded-full h-12 px-8">View All Services</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const img = PlaceHolderImages.find(i => i.id === service.image)
            return (
              <Card key={service.id} className="group relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-white">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={img?.imageUrl || ""}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={cn(
                      "p-3 rounded-2xl shadow-lg",
                      service.accent === "primary" ? "bg-primary text-white" : "bg-accent text-accent-foreground"
                    )}>
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-xl py-6 font-bold shadow-md hover:shadow-lg transition-all" variant={service.accent === "primary" ? "default" : "secondary"}>
                    {service.btnText}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
