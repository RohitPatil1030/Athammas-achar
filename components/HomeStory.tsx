import { CookingPot, Sun, Wheat } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

const steps = [
  {
    icon: Sun,
    title: "Sun-cured",
    text: "Fruit rests in the open until the water leaves and the flavour stays.",
  },
  {
    icon: Wheat,
    title: "Stone-ground",
    text: "Mustard, fennel, and chilli are crushed the slow way, so the oil smells alive.",
  },
  {
    icon: CookingPot,
    title: "Clay-pot cure",
    text: "Everything is sealed in earthen barnis and left to marry on its own time.",
  },
];

export function HomeStory() {
  return (
    <>
      <section id="pickles" className="scroll-mt-24 border-t border-forest/10 bg-parchment/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <FadeIn>
            <p className="inline-flex rounded-full bg-mustard px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
              Coming Soon
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
              The jars are still being named
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-forest/80">
              Athamma’s varieties are not listed yet. This shelf will open when the recipes are ready to jar.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">How it is made</p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
            Sun, stone, and a clay lid
          </h2>
        </FadeIn>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full">
              <FadeIn className="h-full">
                <div className="h-full rounded-[1.6rem] bg-forest px-6 py-7 text-cream">
                  <step.icon className="h-6 w-6 text-mustard" aria-hidden="true" />
                  <p className="mt-6 font-serif text-sm text-mustard">0{index + 1}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-cream/80">{step.text}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <FadeIn>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-terracotta px-5 py-8 text-cream sm:rounded-[2rem] sm:px-12 sm:py-10 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Inquiries only</h2>
              <p className="mt-3 max-w-xl leading-7 text-cream/85">
                Parcels are not going out yet. Inquiries are coming soon, when the kitchen is ready to take notes.
              </p>
            </div>
            <Link href="/inquiry" className="btn-mustard w-full sm:w-auto">
              Send an inquiry
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
