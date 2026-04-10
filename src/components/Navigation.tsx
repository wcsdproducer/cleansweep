"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUser, useAuth } from "@/firebase"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/CleanSweep-Layer%2011%20copy.png?alt=media&token=e060532e-cc86-43f8-8780-76371d95c936"

const cleaningTypes = [
  { name: "One-time Service", href: "/services/one-time" },
  { name: "Regular Service", href: "/services/regular" },
  { name: "Deep Clean Service", href: "/services/deep-clean" },
  { name: "Move-in/Move-out service", href: "/services/move-in-out" },
]

const areasWeClean = [
  { name: "Bathrooms", href: "/areas/bathrooms" },
  { name: "Kitchens", href: "/areas/kitchens" },
  { name: "Living Areas", href: "/areas/living-areas" },
  { name: "Sleeping Areas", href: "/areas/sleeping-areas" },
]

const supportItems = [
  { name: "FAQs", href: "/faq" },
  { name: "Service Feedback", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
]

const whyCleanSweep = [
  { name: "About CleanSweep", href: "/about" },
  { name: "Greener Cleaning", href: "/greener-cleaning" },
  { name: "Blog", href: "/blog" },
]

export function Navigation() {
  const { user, isUserLoading } = useUser()
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut()
      router.push("/")
    }
  }

  const isAuthenticated = user && !user.isAnonymous

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background transition-all duration-300 border-b",
        scrolled ? "shadow-md py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-14 w-64">
            <Image
              src={LOGO_URL}
              alt="CleanSweep Cleaning Company LLC"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap">
                Cleaning Services <ChevronDown className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              align="center" 
              className="w-auto max-w-2xl p-0 mt-4 border-none shadow-2xl rounded-3xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 p-10 bg-white">
                <MenuSection title="CLEANING TYPES" items={cleaningTypes} />
                <MenuSection title="AREAS WE CLEAN" items={areasWeClean} />
                <MenuSection title="SUPPORT" items={supportItems} />
              </div>
              <div className="bg-[#1a6a91] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white">
                  <h4 className="text-2xl font-bold mb-1">Get a FREE cleaning!</h4>
                  <p className="text-white/80">Get your 3rd cleaning for free with a minimum 12-month commitment.</p>
                </div>
                <Button className="bg-[#2eb086] hover:bg-[#25916e] text-white px-8 py-6 rounded-2xl font-bold text-lg border-2 border-white/20 shadow-lg">
                  Redeem Now
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap">
                Why CleanSweep? <ChevronDown className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              align="center" 
              className="w-64 p-4 mt-4 border-none shadow-2xl rounded-2xl bg-white"
            >
              <ul className="space-y-1">
                {whyCleanSweep.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-[#1a6a91] hover:text-accent transition-colors text-base font-medium block p-2 rounded-lg hover:bg-secondary/20"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          <Link href="/faq" className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap">FAQ</Link>
          
          <div className="flex items-center gap-3 text-primary font-bold shrink-0">
            <Phone className="h-8 w-8" />
            <span className="text-4xl tracking-tighter">877-318-4816</span>
          </div>

          <div className="flex items-center gap-6 flex-1 justify-end">
            {!isUserLoading && (
              isAuthenticated ? (
                pathname === "/" ? (
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-sm font-bold text-[#1a6a91] hover:text-primary transition-colors whitespace-nowrap"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-bold text-[#1a6a91] hover:text-primary transition-colors whitespace-nowrap"
                  >
                    <User className="h-4 w-4" />
                    Log Out
                  </button>
                )
              ) : (
                <Link 
                  href="/login" 
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold transition-colors whitespace-nowrap",
                    pathname === "/login" ? "text-primary" : "text-[#1a6a91] hover:text-primary"
                  )}
                >
                  <User className="h-4 w-4" />
                  Log In
                </Link>
              )
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b animate-in slide-in-from-top duration-300 shadow-xl">
          <nav className="flex flex-col p-6 gap-6">
            <div className="space-y-4">
              <div className="font-bold text-primary uppercase text-xs tracking-widest px-2">Services & Support</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[...cleaningTypes, ...areasWeClean, ...supportItems].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium p-3 hover:bg-muted rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t space-y-4">
              <div className="font-bold text-primary uppercase text-xs tracking-widest px-2">Portal</div>
              <div className="grid grid-cols-1 gap-1">
                {!isUserLoading && (
                  isAuthenticated ? (
                    pathname === "/" ? (
                      <Link
                        href="/dashboard"
                        className="text-sm font-bold p-3 bg-primary/5 text-primary rounded-xl flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        className="text-sm font-bold p-3 bg-primary/5 text-primary rounded-xl flex items-center gap-2 w-full text-left"
                      >
                        <User className="h-4 w-4" /> Log Out
                      </button>
                    )
                  ) : (
                    <Link
                      href="/login"
                      className="text-sm font-bold p-3 bg-primary/5 text-primary rounded-xl flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" /> Log In
                    </Link>
                  )
                )}
              </div>
              
              <div className="font-bold text-primary uppercase text-xs tracking-widest px-2 pt-4">Company</div>
              <div className="grid grid-cols-1 gap-1">
                {whyCleanSweep.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium p-3 hover:bg-muted rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <Link href="/faq" className="block text-sm font-semibold px-2 py-2" onClick={() => setIsOpen(false)}>FAQ</Link>
              <div className="flex items-center gap-2 text-primary font-bold px-2 py-2">
                <Phone className="h-7 w-7" />
                <span className="text-3xl">877-318-4816</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function MenuSection({ title, items }: { title: string, items: { name: string, href: string }[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[#1a6a91] font-extrabold text-xs tracking-widest">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.name}>
            <Link 
              href={item.href} 
              className="text-[#5ea3c2] hover:text-[#1a6a91] transition-colors text-sm font-semibold block"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
