import type { Metadata } from "next";
import { HeroAnimation } from "@/components/HeroAnimation";
import { HomeStory } from "@/components/HomeStory";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — ${site.tagline}`,
  },
  description:
    "Athammas Achar makes traditional handmade pickles with cold-pressed mustard oil, stone-ground spices, and no preservatives.",
};

export default function HomePage() {
  return (
    <>
      <HeroAnimation />
      <HomeStory />
    </>
  );
}
