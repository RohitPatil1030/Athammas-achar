import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Inquiry",
  description: "Send an inquiry to the Athammas Achar kitchen. Parcels are not being sent yet.",
};

export default function InquiryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">Inquiries only</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-forest sm:text-5xl">Write to the kitchen</h1>
      <p className="mt-4 max-w-2xl leading-7 text-forest/75">
        Send a note and it goes straight to the kitchen inbox. Your mail app stays closed. Parcels are not going out, and the varieties are still being named.
      </p>
      <div className="mt-8">
        <InquiryForm />
      </div>
    </div>
  );
}
