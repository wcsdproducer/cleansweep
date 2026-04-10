
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { notFound } from "next/navigation"

const scheduleData: Record<string, any> = {
  "recurring-cleaning": {
    title: "Recurring Cleaning",
    description: "Maintenance plans that keep your home sparkling year-round on a schedule that works for you.",
    imageHint: "calendar cleaning",
    features: ["Weekly/Bi-Weekly/Monthly", "Same Pro Every Time", "No Long-Term Contracts", "Predictable Budgeting"]
  },
  "move-in-out": {
    title: "Move In / Move Out",
    description: "Stress-free cleaning for your big transition. We handle the scrubbing while you handle the boxes.",
    imageHint: "empty house",
    features: ["Inside Cabinet Cleaning", "Appliance Interiors", "Floor Polishing", "Detailed Sanitization"]
  },
  "one-time": {
    title: "One-Time Cleaning",
    description: "A single, thorough visit to get your home back to its best state. Perfect for events or seasonal refreshes.",
    imageHint: "home cleaning",
    features: ["Flexible Scheduling", "Full 49-Point Checklist", "No Commitment", "Ready for Guests"]
  },
  "customized": {
    title: "Customized Cleaning",
    description: "Tailor our services to your specific budget and priorities. You call the shots.",
    imageHint: "custom service",
    features: ["Priority Room Lists", "Budget-Friendly Options", "Special Requests", "Add-On Services"]
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = scheduleData[slug]

  if (!data) {
    notFound()
  }

  return <ServicePageTemplate {...data} />
}
