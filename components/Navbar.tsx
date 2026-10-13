"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Bookings" },
  { href: "/inquiry", label: "Inquiry" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ logoSrc }: { logoSrc: string | null }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 rounded-full sm:gap-3">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
            />
          ) : (
            <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
          )}
          <span className="truncate font-serif text-lg font-semibold leading-none tracking-tight sm:text-2xl">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-terracotta" : "text-forest/75 hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/inquiry" className="btn-mustard hidden lg:inline-flex">
            Inquire
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-forest/10 bg-cream px-4 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-2xl px-3 py-3 text-base ${
                      active ? "bg-parchment text-terracotta" : "text-forest"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/inquiry" className="btn-primary mt-3 w-full">
            Inquire
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
