import type { Metadata } from "next";
import { UnifrakturMaguntia } from "next/font/google";
import "./globals.css";

/**
 * Fallback for the brand wordmark face.
 *
 * Cloister Black is declared as an @font-face in globals.css and loaded from
 * public/fonts. This open-licence blackletter sits behind it in the stack and
 * renders only while that file is missing, so the mark degrades to something
 * of the right character rather than to a plain serif.
 */
const blackletter = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-blackletter",
  display: "swap",
});
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Six Skincare Products — six products, one routine",
    template: "%s — Six",
  },
  description:
    "A six-step skincare routine with nothing spare in it: cleanser, essence, vitamin C, niacinamide, barrier cream and SPF 50.",
  openGraph: {
    type: "website",
    siteName: "Six Skincare Products",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={blackletter.variable}>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
