/**
 * Central SEO config. All titles, canonical URLs, and structured data derive
 * from this one file so cross-page consistency is trivial to enforce.
 *
 * Production domain: swingpathpro.com (canonical). swingpathpro.net should
 * redirect to .com at the hosting layer so link equity consolidates.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://swingpathpro.com";

export const SITE_NAME = "Swing Path Pro";
export const BRAND_TAGLINE = "Feel the swing. Correct the cause.";
export const PATENT_NUMBER = "1408632";
export const CONTACT_EMAIL = "hello@swingpathpro.com";

/** Google Search Console verification token - set once the site is live and
 *  the property is added in GSC. Empty string means the meta tag is omitted. */
export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION || "";

/** Canonical absolute URL for a route path. */
export function canonical(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p === "/" ? "" : p}`;
}

/** Absolute URL for a public asset. */
export function absoluteUrl(publicPath: string) {
  return `${SITE_URL}${publicPath.startsWith("/") ? publicPath : `/${publicPath}`}`;
}

/**
 * Default Open Graph image. Next.js metadata merging replaces the whole
 * `openGraph` object when a page defines its own, so every page that sets
 * openGraph must include an `images` entry - use this so the same 1200x630
 * card is served everywhere unless a page provides its own.
 */
export const DEFAULT_OG_IMAGE = {
  url: absoluteUrl("/seo/og-image.jpg"),
  width: 1200,
  height: 630,
  alt: "Swing Path Pro - Feel the swing. Correct the cause.",
};

/**
 * JSON-LD builder helpers. Return plain objects that get JSON.stringified
 * into a <script type="application/ld+json"> tag on the target page.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/brand/spp-logo-ink.png"),
    description:
      "Swing Path Pro is a physical golf training station made in South Africa. The apparatus gives players real, mechanical feedback so they can feel and correct the swing itself, not just read the number afterwards.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
    },
    email: CONTACT_EMAIL,
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: SITE_NAME,
    description:
      "A physical, mechanical golf swing training apparatus. Guides the club through the correct arc, resists incorrect movement, and grooves muscle memory that transfers to the course. No batteries, no screens.",
    image: absoluteUrl("/seo/og-image.jpg"),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Sporting Goods > Golf > Training Aids",
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      address: { "@type": "PostalAddress", addressCountry: "ZA" },
    },
    countryOfOrigin: "ZA",
    // Patent-protected, register the identifier so Google can associate it
    identifier: `Patent #${PATENT_NUMBER}`,
  };
}

/**
 * Breadcrumb structured data for a sub-page. Pass an ordered list of
 * segments; Home is prepended for you.
 */
export function breadcrumbJsonLd(
  segments: Array<{ name: string; path: string }>,
) {
  const items = [{ name: "Home", path: "/" }, ...segments].map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    item: canonical(s.path),
  }));
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/** Serialise a JSON-LD payload for direct injection into a <script> tag. */
export function ldJson(obj: object) {
  return JSON.stringify(obj);
}
