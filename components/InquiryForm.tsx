"use client";

import { LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { firstFieldErrors, inquirySchema } from "@/lib/inquiry";
import { spiceLevels } from "@/lib/pickles";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [spice, setSpice] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setErrors({});

    const parsed = inquirySchema.safeParse({
      type: "inquiry" as const,
      name,
      phone,
      spice,
      notes,
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
      const data = (await response.json().catch(() => null)) as {
        error?: string;
        fieldErrors?: Record<string, string>;
      } | null;

      if (!response.ok) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data?.error || "We could not send that just now. Please try again.");
        return;
      }

      setSummary(parsed.data.name);
      setOpen(true);
      setName("");
      setPhone("");
      setSpice("");
      setNotes("");
    } catch {
      setFormError("We could not reach the kitchen just now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate aria-busy={pending} className="space-y-6">
        {formError ? (
          <p role="alert" className="rounded-2xl border border-terracotta/30 bg-terracotta/10 px-4 py-3 text-sm text-forest">
            {formError}
          </p>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="full-name"
            label="Full name"
            value={name}
            autoComplete="name"
            error={errors.name}
            onChange={setName}
          />
          <Field
            id="whatsapp"
            label="WhatsApp phone number"
            hint="An Indian mobile number is enough, for example 8487815361."
            value={phone}
            autoComplete="tel"
            inputMode="tel"
            error={errors.phone}
            onChange={setPhone}
          />
        </div>

        <div>
          <label htmlFor="spice" className="text-sm font-medium text-forest">
              Spice tolerance
            </label>
            <select
              id="spice"
              className="field"
              value={spice}
              aria-invalid={errors.spice ? true : undefined}
              aria-describedby={errors.spice ? "spice-error" : undefined}
              onChange={(event) => setSpice(event.target.value)}
            >
              <option value="">Choose a preference</option>
              {spiceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.spice ? (
              <p id="spice-error" className="mt-1 text-sm text-terracotta">
                {errors.spice}
              </p>
            ) : null}
        </div>

        <div className="rounded-2xl border border-forest/10 bg-cream/70 px-5 py-5">
          <p className="inline-flex rounded-full bg-mustard px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
            Coming Soon
          </p>
          <p className="mt-3 font-serif text-2xl font-semibold">Parcels and varieties</p>
          <p className="mt-2 leading-7 text-forest/75">
            We are taking inquiries only. Jars are not being parcelled yet, and the list of achars is still being named.
          </p>
        </div>

        <div>
          <label htmlFor="notes" className="text-sm font-medium text-forest">
            Custom notes
          </label>
          <textarea
            id="notes"
            className="field min-h-28 resize-y"
            value={notes}
            maxLength={500}
            aria-invalid={errors.notes ? true : undefined}
            aria-describedby={errors.notes ? "notes-error" : undefined}
            onChange={(event) => setNotes(event.target.value)}
          />
          {errors.notes ? (
            <p id="notes-error" className="mt-1 text-sm text-terracotta">
              {errors.notes}
            </p>
          ) : null}
        </div>

        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? "Sending…" : "Send inquiry"}
        </button>
      </form>
      <ConfirmModal open={open} summary={summary} onClose={() => setOpen(false)} />
    </>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  error,
  onChange,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "tel" | "numeric" | "text";
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-forest">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-forest/65">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        className="field"
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-terracotta">
          {error}
        </p>
      ) : null}
    </div>
  );
}
