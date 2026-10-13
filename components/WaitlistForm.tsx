"use client";

import { LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { firstFieldErrors, waitlistSchema } from "@/lib/inquiry";

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setErrors({});
    setDone(false);

    const parsed = waitlistSchema.safeParse({
      type: "waitlist",
      name,
      contact,
    });
    if (!parsed.success) {
      setErrors(firstFieldErrors(parsed.error));
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/notify-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setFormError(data?.error || "We could not save that just now. Please try again.");
        return;
      }
      setDone(true);
      setName("");
      setContact("");
    } catch {
      setFormError("We could not reach the kitchen just now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p role="status" className="rounded-2xl bg-cream px-4 py-4 leading-7 text-forest">
        You are on the list. We will write when Athamma’s story is ready.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={pending} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        {formError ? (
          <p role="alert" className="mb-3 rounded-2xl bg-cream px-4 py-3 text-sm text-terracotta">
            {formError}
          </p>
        ) : null}
        <p className="text-sm text-forest/75">Leave an email or a WhatsApp number with country code.</p>
      </div>
      <div>
        <label htmlFor="waitlist-name" className="text-sm font-medium">
          Name <span className="font-normal text-forest/60">(optional)</span>
        </label>
        <input
          id="waitlist-name"
          className="field"
          value={name}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name ? <p className="mt-1 text-sm text-terracotta">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="waitlist-contact" className="text-sm font-medium">
          Email or WhatsApp
        </label>
        <input
          id="waitlist-contact"
          className="field"
          value={contact}
          autoComplete="email"
          aria-invalid={errors.contact ? true : undefined}
          aria-describedby={errors.contact ? "waitlist-contact-error" : undefined}
          onChange={(event) => setContact(event.target.value)}
        />
        {errors.contact ? (
          <p id="waitlist-contact-error" className="mt-1 text-sm text-terracotta">
            {errors.contact}
          </p>
        ) : null}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? "Saving your place…" : "Notify me"}
        </button>
      </div>
    </form>
  );
}
