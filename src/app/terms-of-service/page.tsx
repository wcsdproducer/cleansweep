
"use client"

import * as React from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-headline mb-8 text-[#1a6a91]">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none text-muted-foreground space-y-8">
            <section>
              <p className="text-sm font-medium italic">Last Updated: February 20, 2026</p>
              <p className="mt-4">
                Welcome to CleanSweep Cleaning Company LLC. These Terms of Service ("Terms") govern your access to and use of our website and professional cleaning services. By using our website or booking our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Use of Services</h2>
              <p>
                By using the services provided by CleanSweep Cleaning Company LLC, you represent that you are at least 18 years of age and have the legal authority to enter into this agreement. You agree to provide accurate and complete information when booking services or interacting with our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Bookings and Estimations</h2>
              <p>
                All service estimates provided through our website or AI tools are based on the information provided by you. CleanSweep reserves the right to adjust the final price if the actual condition of the property differs significantly from the description provided.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service availability is not guaranteed until confirmed by our office.</li>
                <li>We reserve the right to refuse service for properties that pose a health or safety risk to our employees.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Payment Terms</h2>
              <p>
                Payment is required at the time of service unless prior arrangements have been made. We accept major credit cards and secure electronic payments. Failure to provide payment may result in the suspension of future services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Cancellation and Rescheduling</h2>
              <p>
                We value our employees' time and schedules. Please provide at least 2 business days' notice for any cancellations or rescheduling requests. Cancellations made with less than 2 business days' notice may be subject to a cancellation fee as outlined in our FAQ.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Satisfaction Guarantee</h2>
              <p>
                We stand behind the quality of our work. If you are dissatisfied with any area of our cleaning, please contact us within 24 hours of service. We will return to re-clean the area at no additional cost as part of our PRO Clean Promise.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
              <p>
                CleanSweep Cleaning Company LLC is bonded and insured. However, we are not liable for pre-existing damage, wear and tear, or damage resulting from unstable or improperly installed fixtures. Our total liability for any claim shall not exceed the total amount paid for the service giving rise to the claim.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of CleanSweep Cleaning Company LLC and is protected by copyright laws. You may not use or reproduce any content without our express written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Colorado, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="pt-8 border-t border-primary/10">
              <h2 className="text-2xl font-bold text-foreground">9. Contact Us</h2>
              <p>
                If you have any questions regarding these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-secondary/20 rounded-2xl border border-primary/10">
                <p className="font-bold text-[#1a6a91]">CleanSweep Cleaning Company LLC</p>
                <p>Email: info@cleansweepcleaningcompany.com</p>
                <p>Phone: 877-318-4816</p>
                <p>Address: 3360 S Richfield Way, Aurora, CO 80013</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
