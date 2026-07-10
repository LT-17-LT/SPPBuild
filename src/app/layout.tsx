import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import {
  BRAND_TAGLINE,
  GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  ldJson,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

/**
 * Root metadata. Individual pages extend this via their own `metadata`
 * export - the `%s` in `title.template` slots each page's title in and
 * the fallback (title.default) is used only on routes that don't set one.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${BRAND_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Physical golf swing training and feedback. Feel the movement, correct the cause. Made in South Africa. Patent-protected.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  keywords: [
    "swing path pro",
    "golf swing trainer",
    "golf training aid",
    "physical swing feedback",
    "golf swing correction",
    "golf apparatus South Africa",
    "muscle memory golf",
    "Ernie Els Foundation partner",
  ],
  category: "Sporting Goods",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${BRAND_TAGLINE}`,
    description:
      "The physical golf training station that lets players feel and correct the swing itself, not just the number. Made in South Africa.",
    url: SITE_URL,
    locale: "en_ZA",
    images: [
      {
        url: absoluteUrl("/seo/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - ${BRAND_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${BRAND_TAGLINE}`,
    description:
      "The physical golf training station that lets players feel and correct the swing itself.",
    images: [absoluteUrl("/seo/og-image.jpg")],
  },
  icons: {
    icon: [
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/seo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#09140b",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Organization + WebSite structured data - present on every page so
            Google can consistently attribute the brand across the graph. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: ldJson({ ...organizationJsonLd(), "@id": `${SITE_URL}#organization` }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(websiteJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
