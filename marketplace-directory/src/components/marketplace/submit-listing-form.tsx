"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/lib/marketplace-data"

type SubmitFormValues = {
  businessName: string
  ownerName: string
  email: string
  city: string
  categoryId: string
  tags: string
  mediaLink: string
  summary: string
}

const steps = ["Business Info", "Category + Tags", "Media Upload", "Preview", "Submit"]

export function SubmitListingForm() {
  const [step, setStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<SubmitFormValues>({
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      city: "Toronto, ON",
      categoryId: categories[0]?.id ?? "",
      tags: "premium, local, fast-growing",
      mediaLink: "https://images.example.com/brand-cover.jpg",
      summary: "A polished, high-intent marketplace listing built for discovery and trust.",
    },
  })

  const values = form.watch()

  const nextStep = async () => {
    const fieldsByStep: Array<Array<keyof SubmitFormValues>> = [
      ["businessName", "ownerName", "email", "city"],
      ["categoryId", "tags", "summary"],
      ["mediaLink"],
      [],
      [],
    ]

    const isValid = await form.trigger(fieldsByStep[step])
    if (!isValid) return
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const previousStep = () => setStep((current) => Math.max(current - 1, 0))

  const onSubmit = form.handleSubmit(() => {
    setIsSubmitted(true)
    setStep(steps.length - 1)
  })

  const panelClass = "rounded-[28px] border border-border bg-card p-6 shadow-[0_22px_50px_rgba(15,23,42,0.08)] dark:shadow-none"

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className={panelClass}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Step {step + 1} of {steps.length}</div>
            <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground">{steps[step]}</h2>
          </div>
          <div className="text-sm text-muted-foreground">React Hook Form powered mock submission</div>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-coral-400 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 ? (
        <div className={`grid gap-4 ${panelClass} md:grid-cols-2`}>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Business name
            <Input {...form.register("businessName", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Owner name
            <Input {...form.register("ownerName", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Email
            <Input type="email" {...form.register("email", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Primary city
            <Input {...form.register("city", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
          </label>
        </div>
      ) : null}

      {step === 1 ? (
        <div className={`grid gap-4 ${panelClass}`}>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Category
            <select
              {...form.register("categoryId", { required: true })}
              className="h-12 rounded-2xl border border-border bg-muted px-4 text-sm text-foreground outline-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Tags
            <Input {...form.register("tags", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Marketplace summary
            <textarea
              {...form.register("summary", { required: true })}
              className="min-h-32 rounded-[22px] border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none"
            />
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={`grid gap-4 ${panelClass}`}>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Hero media URL
            <Input {...form.register("mediaLink", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
          </label>
          <div className="rounded-[24px] border border-dashed border-border bg-muted/60 p-8 text-center text-sm text-muted-foreground">
            Mock upload zone for gallery images, brand assets, and short video teasers.
          </div>
        </div>
      ) : null}

      {step >= 3 ? (
        <div className={panelClass}>
          <div className="rounded-[28px] bg-gradient-to-br from-indigo-900 via-indigo-600 to-coral-400 p-6 text-white">
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
              Preview card
            </div>
            <div className="mt-2 font-heading text-3xl font-semibold">{values.businessName || "Your business name"}</div>
            <div className="mt-2 text-white/80">
              {values.city} • {categories.find((category) => category.id === values.categoryId)?.name}
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/85">{values.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {values.tags.split(",").map((tag) => (
                <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
          {isSubmitted ? (
            <div className="mt-5 rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              Submission received. This mock flow would now create a pending Supabase record for admin approval.
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="outline" onClick={previousStep} disabled={step === 0} className="h-11 rounded-full border-border px-5 text-sm text-indigo-700 dark:text-indigo-400">
          Back
        </Button>
        {step < steps.length - 2 ? (
          <Button type="button" onClick={nextStep} className="h-11 rounded-full bg-indigo-900 px-5 text-sm text-white hover:bg-indigo-800">
            Continue
          </Button>
        ) : step === steps.length - 2 ? (
          <Button type="submit" className="h-11 rounded-full bg-coral-500 px-5 text-sm text-white hover:bg-coral-400">
            Submit listing
          </Button>
        ) : (
          <Button type="button" onClick={() => setStep(0)} className="h-11 rounded-full bg-indigo-900 px-5 text-sm text-white hover:bg-indigo-800">
            Start another mock submission
          </Button>
        )}
      </div>
    </form>
  )
}
