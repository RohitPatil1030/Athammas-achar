import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { site } from "@/lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/booking", label: "Bookings" },
  { href: "/inquiry", label: "Inquiry" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ logoSrc }: { logoSrc: string | null }) {
  return (
    <footer className="mt-auto border-t border-white/10 bg-forest text-cream">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-8 sm:py-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <LogoMark className="h-11 w-11" />
            )}
            <p className="font-serif text-2xl font-semibold">{site.name}</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-cream/80">{site.tagline}</p>
        </div>
        <div className="flex flex-col gap-4">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/80">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-mustard">
                {link.label}
              </Link>
            ))}
          </nav>
          <a href={`mailto:${site.email}`} className="break-all text-sm text-mustard hover:text-cream">
            {site.email}
          </a>
          <p className="text-xs text-cream/60">© {site.copyrightYear} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
