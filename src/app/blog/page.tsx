"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { blogPosts } from "@/lib/blog-posts"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function BlogPage() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getImg = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || ""

  // Helper to safely format dates only on the client to avoid hydration mismatches
  const formatDate = (dateStr: string) => {
    if (!mounted) return null
    try {
      return new Date(dateStr).toLocaleDateString()
    } catch (e) {
      return dateStr
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Blog Hero */}
        <section className="relative h-[350px] w-full flex items-center overflow-hidden">
          <Image
            src={getImg("blog-hero")}
            alt="CleanSweep Blog"
            fill
            className="object-cover"
            priority
            data-ai-hint="clean room"
          />
          <div className="absolute inset-0 bg-[#1a6a91]/70" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl text-white space-y-4">
              <h1 className="text-5xl font-bold font-headline leading-tight">CleanSweep Blog</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Expert cleaning tips, organizational tricks, and lifestyle insights from the professionals at CleanSweep Cleaning Company LLC.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
              {blogPosts.map((post) => (
                <div key={post.slug} className="flex flex-col group gap-6">
                  <Link href={`/blog/${post.slug}`} className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#1a6a91] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                      {post.category}
                    </div>
                  </Link>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary transition-colors">
                      <h3 className="text-2xl font-bold leading-tight">{post.title}</h3>
                    </Link>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:underline">
                      Read Full Article <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-24 flex items-center justify-center gap-4">
              <Button variant="outline" className="rounded-xl border-[#1a6a91] text-[#1a6a91] px-8 h-12 font-bold" disabled>
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button className="rounded-xl h-12 w-12 bg-[#1a6a91] text-white font-bold">1</Button>
                <Button variant="outline" className="rounded-xl h-12 w-12 border-[#1a6a91] text-[#1a6a91] font-bold">2</Button>
              </div>
              <Button variant="outline" className="rounded-xl border-[#1a6a91] text-[#1a6a91] px-8 h-12 font-bold">
                Next
              </Button>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              <div className="bg-[#1a6a91] p-12 rounded-3xl text-white space-y-8 relative overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <Image src={getImg("resource-bg")} alt="bg" fill className="object-cover" />
                </div>
                <div className="relative z-10 space-y-6 text-center lg:text-left">
                  <h2 className="text-4xl font-bold font-headline leading-tight">Ready to see why cleaning is a big deal to us?</h2>
                  <p className="text-white/80 text-xl">Book your CleanSweep service today!</p>
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-3 border-b border-primary/10 group"
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
