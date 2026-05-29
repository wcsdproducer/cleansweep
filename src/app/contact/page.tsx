"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFirebase } from "@/firebase"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Sparkles, CheckCircle2, Loader2, Phone, Mail, MapPin } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service type."),
  message: z.string().min(10, "Please tell us a bit more (at least 10 characters)."),
})

type FormValues = z.infer<typeof formSchema>

const SERVICE_OPTIONS = [
  "One-time Cleaning",
  "Regular Cleaning",
  "Deep Clean",
  "Move-in / Move-out",
  "Post-Construction",
  "Other / Not Sure",
]

export default function ContactPage() {
  const { firestore } = useFirebase()
  const { toast } = useToast()
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setSubmitting(true)
    try {
      await addDoc(collection(firestore, "contactSubmissions"), {
        ...values,
        submittedAt: serverTimestamp(),
        status: "new",
        source: "website-contact-form",
      })
      setSubmitted(true)
    } catch {
      toast({
        title: "Something went wrong",
        description: "We couldn't send your message. Please call us at 877-318-4816.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow pb-20">
        {/* Hero */}
        <section className="bg-[#1a6a91] text-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
            <h1 className="text-5xl font-bold font-headline leading-tight">Get in Touch</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions about our services or need a customized quote?
              Our team is here to help you bring the sparkle back to your home.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </section>

        <section className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Contact Info sidebar */}
            <div className="space-y-4 lg:pt-8">
              <ContactInfoCard
                icon={<Phone className="h-5 w-5 text-[#1a6a91]" />}
                label="Phone"
                value="877-318-4816"
                href="tel:8773184816"
              />
              <ContactInfoCard
                icon={<Mail className="h-5 w-5 text-[#1a6a91]" />}
                label="Email"
                value="info@cleansweepcleaningcompany.com"
                href="mailto:info@cleansweepcleaningcompany.com"
              />
              <ContactInfoCard
                icon={<MapPin className="h-5 w-5 text-[#1a6a91]" />}
                label="Service Area"
                value="Greater DC Metro Area"
              />
            </div>

            {/* Form card */}
            <div className="lg:col-span-2">
              <Card className="rounded-[32px] shadow-2xl border-none overflow-hidden bg-white">
                <CardContent className="p-8 sm:p-10">
                  {submitted ? (
                    <SuccessState onReset={() => { setSubmitted(false); form.reset(); }} />
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold text-[#1a6a91]">Send us a message</h2>
                          <p className="text-sm text-gray-500">We typically respond within 1 business day.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input id="contact-name" placeholder="Jane Smith" {...field} className="rounded-xl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input id="contact-email" type="email" placeholder="jane@example.com" {...field} className="rounded-xl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone <span className="text-gray-400">(optional)</span></FormLabel>
                                <FormControl>
                                  <Input id="contact-phone" type="tel" placeholder="(555) 000-0000" {...field} className="rounded-xl" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger id="contact-service" className="rounded-xl">
                                      <SelectValue placeholder="Select a service…" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="rounded-xl">
                                    {SERVICE_OPTIONS.map((opt) => (
                                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  id="contact-message"
                                  placeholder="Tell us about your home, preferred schedule, or any questions…"
                                  rows={5}
                                  {...field}
                                  className="rounded-xl resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          id="contact-submit"
                          type="submit"
                          disabled={submitting}
                          className="w-full rounded-2xl py-6 text-base font-bold bg-[#1a6a91] hover:bg-[#155878] transition-all shadow-md hover:shadow-lg"
                        >
                          {submitting ? (
                            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</>
                          ) : (
                            "Send Message"
                          )}
                        </Button>

                        <p className="text-xs text-gray-400 text-center">
                          By submitting you agree to our{" "}
                          <a href="/privacy-policy" className="underline hover:text-[#1a6a91]">Privacy Policy</a>.
                        </p>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-24 text-center space-y-8">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold font-headline">Need a quick answer?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out our frequently asked questions for instant help with scheduling, pricing, and service details.
          </p>
          <Button variant="outline" className="rounded-xl border-[#1a6a91] text-[#1a6a91] h-12 px-8 font-bold" asChild>
            <a href="/faq">View FAQs</a>
          </Button>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

function ContactInfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
      <div className="h-10 w-10 rounded-xl bg-[#1a6a91]/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5 break-all">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return <a href={href} className="block">{inner}</a>
  }
  return inner
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-12">
      <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
        <p className="text-gray-500 max-w-sm">
          Thanks for reaching out! We&apos;ll get back to you within 1 business day. 
          Need immediate help? Call us at{" "}
          <a href="tel:8773184816" className="text-[#1a6a91] font-semibold">877-318-4816</a>.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={onReset}
        className="rounded-2xl border-[#1a6a91] text-[#1a6a91] px-8"
      >
        Send Another Message
      </Button>
    </div>
  )
}
