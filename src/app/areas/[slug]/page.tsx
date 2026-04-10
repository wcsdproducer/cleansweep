
import { ServicePageTemplate } from "@/components/ServicePageTemplate"
import { notFound } from "next/navigation"

const areaData: Record<string, any> = {
  "bathrooms": {
    title: "Bathroom Cleaning",
    description: "We scrub, sanitize, and shine every surface in your bathrooms for a germ-free glow.",
    imageHint: "clean bathroom",
    features: ["Toilet Sanitization", "Tile & Grout Scrubbing", "Mirror & Chrome Polishing", "Cabinet Exterior Wiped"]
  },
  "kitchens": {
    title: "Kitchen Cleaning",
    description: "The heart of your home deserves to be the cleanest. We focus on food-safe sanitization.",
    imageHint: "kitchen counter",
    features: ["Countertop Sanitization", "Appliance Polishing", "Stovetop Degreasing", "Floor Scrubbing"]
  },
  "living-areas": {
    title: "Living Area Cleaning",
    description: "Comfort meets cleanliness in your common rooms. We dust and tidy for maximum relaxation.",
    imageHint: "living room",
    features: ["High-Detail Dusting", "Floor Vacuuming", "Glass Surface Polishing", "Furniture Tidying"]
  },
  "sleeping-areas": {
    title: "Bedroom Cleaning",
    description: "A clean room is a peaceful room. We focus on allergens and detailed dusting for better rest.",
    imageHint: "clean bedroom",
    features: ["Allergen Reduction", "Bed Making", "Nightstand Polishing", "Closet Floor Vacuuming"]
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = areaData[slug]

  if (!data) {
    notFound()
  }

  return <ServicePageTemplate {...data} />
}
