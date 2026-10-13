import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoonCard } from "@/components/ComingSoonCard";

export const metadata: Metadata = {
  title: "Bookings",
  description: "Festival hamper bookings and tastings for Athammas Achar are opening soon.",
};

export default function BookingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <ComingSoonCard
        title="Bookings will open at the table"
        lede="Festival hampers and small tastings are being planned. We are not parceling jars yet. Until the book is open, send an inquiry and we will reply."
      >
        <Link href="/inquiry" className="btn-primary w-full sm:w-auto">
          Send an inquiry
        </Link>
      </ComingSoonCard>
    </div>
  );
}
