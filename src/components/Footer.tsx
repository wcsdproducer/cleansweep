
"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/CleanSweep-Layer%2011%20copy.png?alt=media&token=e060532e-cc86-43f8-8780-76371d95c936"

export function Footer() {
  return (
    <footer className="bg-background border-t pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-20 w-80">
                <Image
                  src={LOGO_URL}
                  alt="CleanSweep Cleaning Company LLC"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              Professional residential cleaning services that give you the time to focus on what matters most. Bonded and insured.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold">Services</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="/services/one-time" className="hover:text-primary transition-colors">One-time Service</Link></li>
              <li><Link href="/services/regular" className="hover:text-primary transition-colors">Regular Service</Link></li>
              <li><Link href="/services/deep-clean" className="hover:text-primary transition-colors">Deep Clean Service</Link></li>
              <li><Link href="/services/move-in-out" className="hover:text-primary transition-colors">Move-in/Move-out service</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold">Company</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/greener-cleaning" className="hover:text-primary transition-colors">Why CleanSweep</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold">Support</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Service Feedback</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold">Locations</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Wesley Chapel, FL</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">New Tampa, FL</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© 2026 CleanSweep Cleaning Company LLC. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
