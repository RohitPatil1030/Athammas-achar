import type { ReactNode } from "react";

export function ComingSoonCard({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-forest/10 bg-parchment px-5 py-8 shadow-[0_20px_50px_rgba(15,56,42,0.06)] sm:rounded-[2rem] sm:px-10 sm:py-12">
      <p className="inline-flex rounded-full bg-mustard px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
        Coming Soon
      </p>
      <h1 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-forest sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-forest/80 sm:text-lg">{lede}</p>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
