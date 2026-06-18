"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser, useAuth } from "@/firebase"
import { initiateSignOut } from "@/firebase/non-blocking-login"
import { CustomerAuthModal } from "@/components/CustomerAuthModal"

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-3673070449-f277c.firebasestorage.app/o/brand%2Fcleansweep-logo.png?alt=media"

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
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [authModalOpen, setAuthModalOpen] = React.useState(false)

  const { user, isUserLoading } = useUser()
  const auth = useAuth()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = React.useCallback(() => {
    initiateSignOut(auth)
  }, [auth])

  return (
    <>
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
                <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap">
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



            <Button className="rounded-full px-8 shadow-md hover:shadow-lg transition-all shrink-0" asChild>
              <Link href="/contact">Get Free Estimate</Link>
            </Button>

            {/* Auth section — desktop */}
            {!isUserLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      id="nav-account-avatar"
                      aria-label="My Account"
                      className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#1a6a91] ring-offset-2 hover:ring-[#2eb086] transition-all shrink-0 focus:outline-none"
                    >
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt={user.displayName ?? "My Account"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#1a6a91] flex items-center justify-center text-white text-sm font-bold">
                          {(user.displayName ?? user.email ?? "U").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-2xl mt-2 shadow-xl border-none">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold truncate">{user.displayName ?? "Customer"}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      id="nav-sign-out"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  id="nav-sign-in"
                  onClick={() => setAuthModalOpen(true)}
                  className="text-sm font-semibold text-[#1a6a91] hover:text-[#2eb086] transition-colors whitespace-nowrap shrink-0"
                >
                  Sign In
                </button>
              )
            )}
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
                <div className="font-bold text-primary uppercase text-xs tracking-widest px-2">Services &amp; Support</div>
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
                <div className="font-bold text-primary uppercase text-xs tracking-widest px-2">Company</div>
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
                <Link href="/faq" className="block text-sm font-semibold px-2 py-2">FAQ</Link>

                <Button className="w-full rounded-2xl py-6 text-lg font-bold mt-4" onClick={() => setIsOpen(false)} asChild>
                  <Link href="/contact">Get Free Estimate</Link>
                </Button>

                {/* Mobile auth */}
                {!isUserLoading && (
                  user ? (
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex items-center gap-3 px-2 py-2">
                        {user.photoURL ? (
                          <div className="relative h-9 w-9 rounded-full overflow-hidden ring-2 ring-[#1a6a91]">
                            <Image src={user.photoURL} alt={user.displayName ?? ""} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-[#1a6a91] flex items-center justify-center text-white text-sm font-bold">
                            {(user.displayName ?? user.email ?? "U").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold">{user.displayName ?? "Customer"}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 text-sm font-medium p-3 hover:bg-muted rounded-xl transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4" /> My Account
                      </Link>
                      <button
                        onClick={() => { handleSignOut(); setIsOpen(false); }}
                        className="flex items-center gap-2 text-sm font-medium p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setAuthModalOpen(true); setIsOpen(false); }}
                      className="w-full border border-[#1a6a91] text-[#1a6a91] rounded-2xl py-3 text-sm font-semibold hover:bg-[#1a6a91]/5 transition-colors"
                    >
                      Sign In to My Account
                    </button>
                  )
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Modal — rendered outside header to avoid z-index stacking issues */}
      <CustomerAuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}

function MenuSection({ title, items }: { title: string; items: { name: string; href: string }[] }) {
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
