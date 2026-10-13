import type { Metadata } from "next";
import Image from "next/image";
import { LogoMark } from "@/components/LogoMark";
import { getBrandLogoSrc } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: "Athammas Achar is handmade pickle from a family kitchen, sun-dried and packed in clay jars.",
};

export default function AboutPage() {
  const logoSrc = getBrandLogoSrc();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-8 flex justify-center">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt="Athammas Achar logo"
            width={220}
            height={220}
            priority
            className="h-44 w-44 rounded-full object-cover shadow-[0_16px_40px_rgba(15,56,42,0.12)] sm:h-52 sm:w-52"
          />
        ) : (
          <LogoMark className="h-44 w-44 drop-shadow-md sm:h-52 sm:w-52" />
        )}
      </div>
      <section className="rounded-[1.5rem] border border-forest/10 bg-parchment px-5 py-8 shadow-[0_20px_50px_rgba(15,56,42,0.06)] sm:rounded-[2rem] sm:px-10 sm:py-12">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-forest sm:text-5xl">
          From Athamma’s kitchen
        </h1>
        <div className="mt-6 space-y-4 text-base leading-7 text-forest/85 sm:text-lg">
          <p>
            Athammas Achar is handmade pickle. Fruit is dried in the sun, spices are ground on stone, and
            everything is mixed with cold-pressed mustard oil.
          </p>
          <p>
            The jars are clay barnis. They sit until the flavour settles, the same slow way Athamma
            learned at home. Nothing is rushed, and nothing extra is added.
          </p>
          <p>Small batches. No preservatives. Just the taste of a home kitchen.</p>
        </div>
      </section>
    </div>
  );
}
