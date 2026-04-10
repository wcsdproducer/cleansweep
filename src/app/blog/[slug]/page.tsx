
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Tag, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { blogPosts } from "@/lib/blog-posts"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pb-20">
        <article className="container mx-auto px-4 max-w-4xl pt-12">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="space-y-6 mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1 text-primary">
                <Tag className="h-4 w-4" />
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight text-foreground">
              {post.title}
            </h1>
          </header>

          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <section className="mt-20 p-10 bg-[#1a6a91] rounded-3xl text-white shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ChevronRight className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold">Ready for a CleanSweep?</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Join thousands of satisfied homeowners who trust CleanSweep Cleaning Company LLC for a professional, eco-friendly clean.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-[#2eb086] hover:bg-[#25916e] text-white rounded-xl px-10 h-14 font-bold text-lg" asChild>
                  <Link href="/contact">Book Your Clean Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-xl px-10 h-14 font-bold text-lg" asChild>
                  <Link href="/services/one-time">View Services</Link>
                </Button>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
