"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type EnquiryFormValues = {
  name: string
  email: string
  message: string
}

export function EnquiryForm({ listingName }: { listingName: string }) {
  const [sent, setSent] = useState(false)
  const form = useForm<EnquiryFormValues>()

  const onSubmit = form.handleSubmit(() => {
    setSent(true)
    form.reset()
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-none">
      <div>
        <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Contact vendor</div>
        <h3 className="mt-1 font-heading text-2xl font-semibold text-foreground">Send an enquiry</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This mock form represents a secure enquiry flow for {listingName}.
        </p>
      </div>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Your name
        <Input {...form.register("name", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Email
        <Input type="email" {...form.register("email", { required: true })} className="h-12 rounded-2xl border-border bg-muted px-4 text-sm" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-foreground">
        Message
        <textarea
          {...form.register("message", { required: true })}
          className="min-h-32 rounded-[22px] border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none"
          defaultValue={`Hi ${listingName}, I'd like more details on availability, pricing, and the best package for my team.`}
        />
      </label>
      {sent ? (
        <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
          Mock enquiry sent. In production this would post to Supabase and trigger email notifications.
        </div>
      ) : null}
      <Button type="submit" className="h-11 w-full rounded-full bg-coral-500 px-5 text-sm text-white hover:bg-coral-400 sm:w-auto">
        Send enquiry
      </Button>
    </form>
  )
}
