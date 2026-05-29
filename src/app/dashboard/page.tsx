"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Loader2, 
  LayoutDashboard, 
  User, 
  Calendar, 
  ClipboardList, 
  Plus, 
  ChevronRight,
  Home,
  Sparkles,
  Gift,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFirebase, useCollection, useDoc, useMemoFirebase } from "@/firebase"
import { collection, doc } from "firebase/firestore"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardPage() {
  // useFirebase() safely returns null when Firebase isn't initialized yet,
  // preventing the crash that useFirestore() caused by throwing on load.
  const { user, isUserLoading, firestore } = useFirebase()
  const router = useRouter()

  // Redirect unauthenticated / anonymous users to the account sign-in page
  React.useEffect(() => {
    if (!isUserLoading && (!user || user.isAnonymous)) {
      router.replace("/account")
    }
  }, [user, isUserLoading, router])

  const customerQuery = useMemoFirebase(() => {
    if (!firestore || !user || user.isAnonymous) return null
    return doc(firestore, "customers", user.uid)
  }, [firestore, user])

  const { data: customerData, isLoading: isCustomerLoading } = useDoc(customerQuery)

  const quotesQuery = useMemoFirebase(() => {
    if (!firestore || !user || user.isAnonymous) return null
    return collection(firestore, "customers", user.uid, "quotes")
  }, [firestore, user])

  const { data: quotes, isLoading: isQuotesLoading } = useCollection(quotesQuery)

  const loyaltyCredits = React.useMemo(() => {
    if (!quotes) return 0
    const bookedTotal = quotes
      .filter(q => q.status === "Booked")
      .reduce((acc, q) => acc + (q.estimatedCost || 0), 0)
    return Math.floor(bookedTotal / 5)
  }, [quotes])

  const regularServiceCost = React.useMemo(() => {
    if (!quotes) return 0
    const recurringQuotes = quotes
      .filter(q => q.status === "Booked" && q.cleaningFrequency !== "one-time")
      .sort((a, b) => new Date(b.submissionDateTime).getTime() - new Date(a.submissionDateTime).getTime())
    return recurringQuotes.length > 0 ? (recurringQuotes[0].estimatedCost || 0) : 0
  }, [quotes])

  const canRedeem = loyaltyCredits > 0 && regularServiceCost > 0 && loyaltyCredits >= regularServiceCost

  if (isUserLoading || (user && !user.isAnonymous && isCustomerLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F6F7]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading your portal...</p>
        </div>
      </div>
    )
  }

  // Double check to prevent flash of content for guest users
  if (!user || user.isAnonymous) return null

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F6F7]">
      <Navigation />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-headline text-[#1a6a91] flex items-center gap-3">
                <LayoutDashboard className="h-8 w-8" />
                Welcome, {customerData?.firstName || "Customer"}
              </h1>
              <p className="text-muted-foreground">Manage your Sparkle Pro services and rewards in one place.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild className="rounded-xl bg-[#2eb086] hover:bg-[#25916e] h-12 px-6 font-bold shadow-lg">
                <Link href="/#services"><Plus className="mr-2 h-5 w-5" /> New Quote</Link>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="rounded-3xl border-none shadow-xl overflow-hidden">
                <div className="bg-[#1a6a91] p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-6 w-6" />
                    <h2 className="font-bold text-lg">My Profile</h2>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white/80">Email</p>
                    <p className="font-medium truncate">{user.email}</p>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Address</p>
                    <p className="text-sm font-medium">{customerData?.preferredAddressStreet || "No address set"}</p>
                    <p className="text-sm text-muted-foreground">{customerData?.preferredAddressCity}, {customerData?.preferredAddressState}</p>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl text-sm h-10 border-primary/20 hover:bg-primary/5 text-primary">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-none shadow-xl overflow-hidden bg-gradient-to-br from-[#2eb086] to-[#1a6a91] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Sparkle Credits
                  </CardTitle>
                  <CardDescription className="text-white/70">Your Loyalty Balance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-5xl font-bold font-headline">{loyaltyCredits}</div>
                  <div className="space-y-2">
                    <p className="text-xs text-white/80 leading-relaxed">
                      Earned 1 credit for every $5 spent. Redeem credits for free cleaning sessions!
                    </p>
                    {regularServiceCost > 0 && (
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-white/10 p-2 rounded-lg">
                        <AlertCircle className="h-3 w-3" />
                        Next free clean at: {regularServiceCost} Credits
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full">
                            <Button 
                              className={cn(
                                "w-full rounded-xl font-bold h-10 transition-all",
                                canRedeem 
                                  ? "bg-white text-[#1a6a91] hover:bg-white/90" 
                                  : "bg-white/20 text-white/50 cursor-not-allowed"
                              )}
                              disabled={!canRedeem}
                            >
                              <Gift className="mr-2 h-4 w-4" /> Redeem Now
                            </Button>
                          </div>
                        </TooltipTrigger>
                        {!canRedeem && (
                          <TooltipContent className="rounded-xl p-3 bg-foreground text-background border-none">
                            <p className="text-xs max-w-[200px]">
                              {regularServiceCost > 0 
                                ? `You need ${regularServiceCost} credits to redeem a free clean. Keep sparkling!` 
                                : "Book a recurring service to start redeeming your credits!"}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <Tabs defaultValue="quotes" className="w-full">
                <TabsList className="bg-white p-1 rounded-2xl border mb-6 shadow-sm">
                  <TabsTrigger value="quotes" className="rounded-xl px-8 h-10 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <ClipboardList className="mr-2 h-4 w-4" /> My Quotes
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-xl px-8 h-10 data-[state=active]:bg-primary data-[state=active]:text-white">
                    <Calendar className="mr-2 h-4 w-4" /> Service History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quotes" className="space-y-6">
                  {isQuotesLoading ? (
                    <div className="flex justify-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !quotes || quotes.length === 0 ? (
                    <Card className="rounded-3xl border-dashed border-2 p-12 text-center bg-white/50">
                      <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                        <ClipboardList className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1a6a91] mb-2">No quotes found</h3>
                      <p className="text-muted-foreground mb-6">You haven't requested any cleaning quotes yet.</p>
                      <Button asChild className="rounded-xl h-12 px-8">
                        <Link href="/#services">Get a Free Quote Now</Link>
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {quotes.map((quote) => (
                        <Card key={quote.id} className="rounded-3xl border-none shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                          <div className="bg-secondary/50 p-6 border-b flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Home className="h-5 w-5 text-primary" />
                              <span className="font-bold text-[#1a6a91]">{quote.homeType}</span>
                            </div>
                            <Badge className={cn(
                              "rounded-full px-3 py-1",
                              quote.status === "Booked" ? "bg-[#2eb086]" : "bg-primary"
                            )}>
                              {quote.status}
                            </Badge>
                          </div>
                          <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest">Cleaning</p>
                                <p className="font-bold">{quote.cleaningFrequency}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest">Est. Cost</p>
                                <p className="font-bold text-primary">${quote.estimatedCost || "---"}</p>
                              </div>
                            </div>
                            <div className="pt-4 border-t text-xs text-muted-foreground flex justify-between">
                              <span>Requested: {new Date(quote.submissionDateTime).toLocaleDateString()}</span>
                              <Link href="#" className="text-primary font-bold hover:underline flex items-center gap-1">
                                View Details <ChevronRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  <Card className="rounded-3xl border-none shadow-lg p-12 text-center bg-white">
                    <p className="text-muted-foreground">Service history will be displayed here once your cleanings begin.</p>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
