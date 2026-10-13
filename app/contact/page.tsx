import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import Link from "next/link";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { SocialRow } from "@/components/SocialRow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Athammas Achar. A fuller contact desk is coming soon.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <ComingSoonCard
        title="The contact desk is being laid"
        lede="A fuller page for visits, trade, and press is on the way. Until then, write to us or send a jar inquiry and we will answer from the kitchen."
      >
        <dl className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-cream px-4 py-4">
            <dt className="flex items-center gap-2 text-sm font-medium text-forest/70">
              <Mail className="h-4 w-4 text-terracotta" aria-hidden="true" />
              Support email
            </dt>
            <dd className="mt-2">
              <a href={`mailto:${site.email}`} className="break-all font-medium text-forest underline decoration-mustard decoration-2">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="rounded-2xl bg-cream px-4 py-4">
            <dt className="flex items-center gap-2 text-sm font-medium text-forest/70">
              <Clock className="h-4 w-4 text-terracotta" aria-hidden="true" />
              Hours
            </dt>
            <dd className="mt-2 font-medium">{site.hours}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <SocialRow />
        </div>
        <Link href="/inquiry" className="btn-primary mt-8 w-full sm:w-auto">
          Send an inquiry in the meantime
        </Link>
      </ComingSoonCard>
    </div>
  );
}
