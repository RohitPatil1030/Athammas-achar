import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z, type ZodError } from "zod";
import { spiceLevels } from "@/lib/pickles";

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Enter a WhatsApp number with country code.")
  .max(22, "That number looks too long.")
  .superRefine((value, ctx) => {
    if (!toE164(value)) {
      ctx.addIssue(
        "Enter a WhatsApp number, for example 8487815361 or +91 84878 15361.",
      );
    }
  });

export const inquirySchema = z.object({
  type: z.literal("inquiry"),
  name: z
    .string()
    .trim()
    .min(2, "Please share your full name.")
    .max(80, "Please use a shorter name."),
  phone: phoneSchema,
  spice: z.enum(spiceLevels, "Tell us how hot you like it."),
  notes: z.string().trim().max(500, "Please keep the note under 500 characters."),
});

export const waitlistSchema = z.object({
  type: z.literal("waitlist"),
  name: z.string().trim().max(80, "Please use a shorter name."),
  contact: z
    .string()
    .trim()
    .min(5, "Add an email or WhatsApp number.")
    .max(120, "That contact is too long.")
    .superRefine((value, ctx) => {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!email && !toE164(value)) {
        ctx.addIssue("Enter an email, or a WhatsApp number with country code.");
      }
    }),
});

export const notifySchema = z.discriminatedUnion("type", [inquirySchema, waitlistSchema]);

export type InquiryPayload = z.infer<typeof inquirySchema>;
export type WaitlistPayload = z.infer<typeof waitlistSchema>;
export type NotifyPayload = z.infer<typeof notifySchema>;

export function toE164(value: string) {
  const trimmed = value.trim();
  const direct = parsePhoneNumberFromString(trimmed);
  if (direct?.isValid()) return direct.format("E.164");

  const digits = trimmed.replace(/\D/g, "");
  const national =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  if (national.length !== 10) return null;

  const local = parsePhoneNumberFromString(national, "IN");
  if (!local?.isValid()) return null;
  return local.format("E.164");
}

export function firstFieldErrors(error: ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) {
      fields[key] = issue.message;
    }
  }
  return fields;
}

function oneLine(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
}

export function formatOwnerMessage(payload: NotifyPayload) {
  if (payload.type === "waitlist") {
    const name = oneLine(payload.name) || "—";
    const contact = toE164(payload.contact) ?? oneLine(payload.contact);
    return [
      "🌿 ATHAMMAS ACHAR WAITLIST 🌿",
      `• Name: ${name}`,
      `• Contact: ${contact}`,
    ].join("\n");
  }

  const phone = toE164(payload.phone) ?? oneLine(payload.phone);
  const noteParts = [`Spice tolerance: ${payload.spice}`];
  const custom = oneLine(payload.notes);
  if (custom) noteParts.push(custom);

  return [
    "🌶️ NEW ATHAMMAS ACHAR INQUIRY 🌶️",
    `• Name: ${oneLine(payload.name)}`,
    `• Phone: ${phone}`,
    "• Parcels: Not sending yet — inquiry only",
    `• Notes: ${noteParts.join(". ")}`,
  ].join("\n");
}
