
"use client"

import * as React from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-headline mb-8 text-[#1a6a91]">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none text-muted-foreground space-y-8">
            <section>
              <p className="text-sm font-medium italic">Last Updated: February 20, 2026</p>
              <p className="mt-4">
                At CleanSweep Cleaning Company LLC, we are committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share your personal information when you visit our website (the "Site") or use our professional cleaning services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Your name, email address, phone number, and physical address for service delivery.</li>
                <li><strong>Service Details:</strong> Information about your home, cleaning preferences, and any specific instructions provided through our quote forms or AI plan generator.</li>
                <li><strong>Communications:</strong> Records of our correspondence if you contact us for support or inquiries.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
              <p>
                We use the information we collect for several purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our cleaning services, including scheduling and processing payments.</li>
                <li>To generate personalized cleaning plans using our AI tools.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., payment processing, hosting, or data analysis).</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect the safety of our customers and employees.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Your Choices and Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete the data we hold about you. You can opt out of promotional communications at any time by following the unsubscribe links in our emails.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policies of any website you visit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="pt-8 border-t border-primary/10">
              <h2 className="text-2xl font-bold text-foreground">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
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
