"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth, useUser, useFirestore, setDocumentNonBlocking } from "@/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc } from "firebase/firestore"
import { Footer } from "@/components/Footer"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const { user, isUserLoading } = useUser()
  const auth = useAuth()
  const firestore = useFirestore()
  const router = useRouter()
  const { toast } = useToast()
  
  const [isSignUp, setIsSignUp] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [authError, setAuthError] = React.useState<React.ReactNode | null>(null)

  // Only redirect if the user is fully signed in (not anonymous)
  React.useEffect(() => {
    if (user && !user.isAnonymous && !isUserLoading) {
      router.replace("/dashboard")
    }
  }, [user, isUserLoading, router])

  const handleGoogleSignIn = async () => {
    if (!auth || !firestore) return
    setLoading(true)
    setAuthError(null)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      const customerRef = doc(firestore, "customers", user.uid)
      const displayName = user.displayName || ""
      const [gFirstName, ...gLastNameParts] = displayName.split(" ")
      const gLastName = gLastNameParts.join(" ")

      setDocumentNonBlocking(customerRef, {
        id: user.uid,
        externalAuthId: user.uid,
        firstName: gFirstName || "User",
        lastName: gLastName || "",
        email: user.email || "",
        registrationDate: new Date().toISOString(),
        loyaltyCredits: 0
      }, { merge: true })

      toast({
        title: "Welcome to CleanSweep",
        description: "Successfully signed in with Google.",
      })
    } catch (error: any) {
      console.error("Firebase Auth Error:", error)
      let errorMessage: React.ReactNode = error.message || "Failed to sign in with Google."
      
      if (error.code === 'auth/unauthorized-domain') {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'the current domain'
        errorMessage = (
          <div className="space-y-2">
            <p><strong>Authorization Required:</strong> This domain is not authorized in your Firebase Console.</p>
            <p className="text-sm bg-black/5 p-3 rounded-xl border border-destructive/20 font-mono">
              {currentHost}
            </p>
            <p className="text-xs text-muted-foreground">
              Please copy the domain above and add it to <strong>Authentication {'>'} Settings {'>'} Authorized domains</strong> in the Firebase Console.
            </p>
          </div>
        )
      }

      setAuthError(errorMessage)
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Domain authorization required.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth || !firestore) return
    setLoading(true)
    setAuthError(null)
    
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const newUser = userCredential.user
        
        const customerRef = doc(firestore, "customers", newUser.uid)
        setDocumentNonBlocking(customerRef, {
          id: newUser.uid,
          externalAuthId: newUser.uid,
          firstName,
          lastName,
          email,
          registrationDate: new Date().toISOString(),
          loyaltyCredits: 0
        }, { merge: true })

        toast({
          title: "Account Created",
          description: "Welcome to CleanSweep! Redirecting to your portal.",
        })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        toast({
          title: "Welcome Back",
          description: "Successfully signed in.",
        })
      }
    } catch (error: any) {
      console.error(error)
      setAuthError(error.message || "Failed to log in.")
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "Failed to log in.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F6F7]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F6F7]">
      <main className="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="w-full max-w-xl space-y-8 relative z-10">
          <Card className="rounded-[40px] shadow-2xl border-none overflow-hidden bg-white/80 backdrop-blur-md">
            <CardContent className="px-10 py-10 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Jane"
                        className="h-14 rounded-2xl bg-white border-muted focus:ring-primary shadow-sm"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="h-14 rounded-2xl bg-white border-muted focus:ring-primary shadow-sm"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-12 h-14 rounded-2xl bg-white border-muted focus:ring-primary shadow-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {!isSignUp && (
                      <button type="button" className="text-xs text-primary hover:underline font-semibold">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-14 rounded-2xl bg-white border-muted focus:ring-primary shadow-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {authError && (
                  <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium leading-relaxed">
                    {authError}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-16 rounded-[20px] text-xl font-bold shadow-xl bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  ) : (
                    isSignUp ? "Sign Up Now" : "Sign In"
                  )}
                </Button>
              </form>

              <Button 
                variant="outline" 
                className="w-full h-14 rounded-2xl border-muted bg-white hover:bg-accent hover:text-accent-foreground transition-all font-bold text-lg gap-3"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                Continue with Google
              </Button>
            </CardContent>
            <CardFooter className="px-10 pb-10 bg-transparent flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                {isSignUp ? "Already have a CleanSweep account?" : "New to CleanSweep?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary font-bold hover:underline transition-colors"
                >
                  {isSignUp ? "Log in here" : "Create an account"}
                </button>
              </div>
            </CardFooter>
          </Card>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
