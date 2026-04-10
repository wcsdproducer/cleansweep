
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { notFound } from "next/navigation"

const serviceData: Record<string, any> = {
  "one-time": {
    title: "One-Time Service",
    description: "A single, thorough visit to get your home back to its best state. Perfect for events or seasonal refreshes.",
    imageHint: "home cleaning",
    features: ["Flexible Scheduling", "Full 49-Point Checklist", "No Commitment", "Ready for Guests"]
  },
  "regular": {
    title: "Regular Service",
    description: "Maintenance plans that keep your home sparkling year-round on a schedule that works for you.",
    imageHint: "calendar cleaning",
    features: ["Weekly/Bi-Weekly/Monthly", "Same Pro Every Time", "No Long-Term Contracts", "Predictable Budgeting"]
  },
  "deep-clean": {
    title: "Deep Clean Service",
    description: "A comprehensive, corner-to-corner cleaning that refreshes your entire living space with intense scrubbing and high-detail attention.",
    imageHint: "detailed bathroom",
    features: ["Heavy Scrubbing Included", "Inside Appliances", "Wall Washing", "Baseboards & Vents"]
  },
  "move-in-out": {
    title: "Move-in/Move-out Service",
    description: "Stress-free cleaning for your big transition. We handle the scrubbing while you handle the boxes.",
    imageHint: "empty house",
    features: ["Inside Cabinet Cleaning", "Appliance Interiors", "Floor Polishing", "Detailed Sanitization"]
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = serviceData[slug]

  if (!data) {
    notFound()
  }

  return <ServicePageTemplate {...data} />
}
