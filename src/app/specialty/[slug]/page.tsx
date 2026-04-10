
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { notFound } from "next/navigation"

const specialtyData: Record<string, any> = {
  "special-event": {
    title: "Special Event Cleaning",
    description: "Pre-event prep or post-party recovery. We'll make sure your home is guest-ready.",
    imageHint: "party home",
    features: ["Fast Turnaround", "Focus on High-Traffic Areas", "Discreet Service", "Trash Removal"]
  },
  "seniors": {
    title: "Cleaning for Seniors",
    description: "Gentle, thorough cleaning services designed for the specific needs and comfort of seniors.",
    imageHint: "senior home",
    features: ["Consistent Pro Personnel", "Light Tidying", "Safe Cleaning Products", "Patience & Respect"]
  },
  "post-renovation": {
    title: "Post-Renovation Cleaning",
    description: "Eliminate construction dust and debris so you can actually enjoy your new space.",
    imageHint: "new renovation",
    features: ["HEPA Vacuuming", "Fine Dust Removal", "Window Track Cleaning", "Surface Polishing"]
  },
  "rental-property": {
    title: "Rental Property Cleaning",
    description: "Reliable cleaning for short-term or long-term rental turnovers. Five-star reviews guaranteed.",
    imageHint: "airbnb room",
    features: ["Quick Turnovers", "Laundry Service Options", "Inventory Checks", "Restocking Assistance"]
  },
  "holiday": {
    title: "Holiday Cleaning",
    description: "The holidays are busy enough. Let us handle the cleaning while you handle the hosting.",
    imageHint: "holiday decor",
    features: ["Guest Room Prep", "Dining Area Polishing", "Kitchen Deep Clean", "Fast Scheduling"]
  },
  "home-sale-prep": {
    title: "Home Sale Prep Cleaning",
    description: "Maximize your home's value with a deep clean that makes every surface shine for showings.",
    imageHint: "staged home",
    features: ["First Impression Focus", "Window Polishing", "Deep Floor Scrub", "Neutral Sanitization"]
  },
  "add-on": {
    title: "Add-On Cleaning",
    description: "Specific task-based cleaning that you can add to any of our standard service visits.",
    imageHint: "extra cleaning",
    features: ["Inside Oven/Fridge", "Window Washing", "Wall Cleaning", "Cabinet Organization"]
  },
  "housekeeping": {
    title: "Housekeeping",
    description: "Daily or frequent light cleaning and home management tasks to keep your life running smoothly.",
    imageHint: "housekeeper",
    features: ["Daily Maintenance", "Dishwashing", "Bed Making", "Organizational Help"]
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = specialtyData[slug]

  if (!data) {
    notFound()
  }

  return <ServicePageTemplate {...data} />
}
