import { firstFieldErrors, formatOwnerMessage, notifySchema } from "@/lib/inquiry";
import { isRateLimited } from "@/lib/rate-limit";
import twilio from "twilio";

function whatsappAddress(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("whatsapp:") ? trimmed : `whatsapp:${trimmed}`;
}

function ownerPhone() {
  const raw = process.env.OWNER_WHATSAPP_NUMBER ?? "";
  const digits = raw.replace(/\D/g, "");
  return digits ? `+${digits}` : "";
}

function inquiryInbox() {
  return process.env.INQUIRY_EMAIL?.trim() || "";
}

function formSubmitTarget() {
  return process.env.FORMSUBMIT_ID?.trim() || "";
}

async function sendInquiryEmail(message: string, name: string, origin: string) {
  const target = formSubmitTarget();
  if (!target) {
    throw new Error("unconfigured");
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/inquiry`,
    },
    body: JSON.stringify({
      name,
      email: inquiryInbox(),
      message,
      _subject: "New Athammas Achar inquiry",
      _captcha: "false",
      _template: "box",
    }),
    cache: "no-store",
    redirect: "manual",
  });

  const body = await response.text();
  let delivered = false;
  try {
    const parsed = JSON.parse(body) as { success?: string | boolean };
    delivered = response.ok && String(parsed.success).toLowerCase() === "true";
  } catch {
    delivered = false;
  }

  if (!delivered) {
    console.error("Email delivery failed", response.status, body.slice(0, 400));
    throw new Error("failed");
  }
}

async function sendViaCallMeBot(message: string, apiKey: string, phone: string) {
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", phone);
  url.searchParams.set("text", message);
  url.searchParams.set("apikey", apiKey);

  const response = await fetch(url, { cache: "no-store" });
  const body = await response.text();
  if (!response.ok || !/message queued/i.test(body)) {
    console.error("CallMeBot delivery failed", response.status, body.slice(0, 400));
    throw new Error("CallMeBot delivery failed");
  }
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > 20_000) {
    return Response.json({ error: "That note is a little too long." }, { status: 413 });
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || "local";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many notes in a short while. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "We could not read that request." }, { status: 400 });
  }

  const parsed = notifySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Please check the form and try again.",
        fieldErrors: firstFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const message = formatOwnerMessage(parsed.data);
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;
  const to = process.env.OWNER_WHATSAPP_NUMBER || `whatsapp:${ownerPhone()}`;
  const callMeBotKey = process.env.CALLMEBOT_API_KEY?.trim();

  try {
    if (parsed.data.type === "inquiry") {
      const origin = request.headers.get("origin") || new URL(request.url).origin;
      await sendInquiryEmail(message, parsed.data.name, origin);
      return Response.json({ ok: true });
    }

    if (sid && token && from && to) {
      const client = twilio(sid, token);
      await client.messages.create({
        from: whatsappAddress(from),
        to: whatsappAddress(to),
        body: message,
      });
    } else if (callMeBotKey) {
      const phone = ownerPhone();
      if (!phone) {
        return Response.json(
          { error: "The kitchen WhatsApp number is missing." },
          { status: 500 },
        );
      }
      await sendViaCallMeBot(message, callMeBotKey, phone);
    } else {
      return Response.json(
        { error: "The kitchen list is not open yet." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Inquiry delivery failed", error);
    return Response.json(
      { error: "We could not send your note just now. Please try again in a moment." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
