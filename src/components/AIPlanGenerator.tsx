"use client"

import * as React from "react"
import { Sparkles, Loader2, ListChecks, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateCustomCleaningPlan, type GenerateCustomCleaningPlanOutput } from "@/ai/flows/generate-custom-cleaning-plan"
import { cn } from "@/lib/utils"

export function AIPlanGenerator() {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<GenerateCustomCleaningPlanOutput | null>(null)
  const [form, setForm] = React.useState({
    numBedrooms: 2,
    numBathrooms: 2,
    cleaningFrequency: "weekly" as const,
    cleaningIntensity: "standard" as const,
    additionalNotes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const plan = await generateCustomCleaningPlan(form)
      setResult(plan)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold font-headline">AI-Powered Custom Plan</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Tell us about your home and our AI will build a personalized cleaning strategy based on our 49-Point Checklist.
          </p>
        </div>

        {!result ? (
          <Card className="rounded-3xl shadow-xl overflow-hidden border-none max-w-2xl mx-auto">
            <CardHeader className="bg-primary text-white p-8">
              <CardTitle className="text-2xl">Tell us about your home</CardTitle>
              <CardDescription className="text-primary-foreground/80">Our AI will generate a tailored checklist just for you.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Input
                      id="beds"
                      type="number"
                      min={0}
                      value={form.numBedrooms}
                      onChange={(e) => setForm({ ...form, numBedrooms: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Input
                      id="baths"
                      type="number"
                      min={0}
                      value={form.numBathrooms}
                      onChange={(e) => setForm({ ...form, numBathrooms: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select
                      value={form.cleaningFrequency}
                      onValueChange={(val: any) => setForm({ ...form, cleaningFrequency: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-Time</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Intensity</Label>
                    <Select
                      value={form.cleaningIntensity}
                      onValueChange={(val: any) => setForm({ ...form, cleaningIntensity: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="deep-clean">Deep Clean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Any special focus or instructions?</Label>
                  <Input
                    placeholder="e.g. Focus on kitchen floors, ignore the basement"
                    value={form.additionalNotes}
                    onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                  />
                </div>

                <Button
                  disabled={loading}
                  className="w-full py-6 rounded-xl text-lg font-bold shadow-lg"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Designing your plan...
                    </>
                  ) : (
                    "Generate My Plan"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 rounded-3xl shadow-lg border-none">
                <CardHeader className="bg-accent text-accent-foreground p-8 rounded-t-3xl">
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-6 w-6" />
                    Your Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="p-4 bg-secondary rounded-2xl">
                    <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Summary</p>
                    <p className="text-muted-foreground leading-relaxed">{result.suggestedPlanSummary}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={() => setResult(null)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Adjust Details
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 rounded-3xl shadow-lg border-none">
                <CardHeader className="p-8 border-b">
                  <CardTitle className="text-2xl">Your Tailored Checklist</CardTitle>
                  <CardDescription>Based on CleanSweep's 49-Point Standard</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {result.detailedChecklist.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <div className="mt-1 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                          <Sparkles className="h-3 w-3 text-primary group-hover:text-white" />
                        </div>
                        <span className="text-sm leading-tight text-muted-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
