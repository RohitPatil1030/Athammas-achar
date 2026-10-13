import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getBrandLogoSrc } from "@/lib/brand";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: "Traditional handmade Indian pickles, sun-dried and cured in clay pots.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const logoSrc = getBrandLogoSrc();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-forest">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-mustard focus:px-4 focus:py-2 focus:text-forest"
        >
          Skip to content
        </a>
        <Navbar logoSrc={logoSrc} />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer logoSrc={logoSrc} />
      </body>
    </html>
  );
}
