import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://toolly.tech";
const siteName = "Toolly";
const tagline = "Powerful free tools for everyday work — text, developer, converters, calculators, generators, and AI. Simple experience. Free to use.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Toolly — Free Online Tools for Text, Code, Calculators & AI",
    template: "%s · Toolly",
  },
  description: tagline,
  keywords: [
    "free tools",
    "online tools",
    "developer tools",
    "text tools",
    "calculators",
    "converters",
    "AI tools",
    "JSON formatter",
    "Base64 encoder",
    "QR code generator",
    "password generator",
    "word counter",
    "color converter",
    "unit converter",
    "AI summarizer",
    "AI grammar",
    "AI translator",
    "Toolly",
  ],
  authors: [{ name: "Toolly" }],
  creator: "Toolly",
  publisher: "Toolly",
  applicationName: "Toolly",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Toolly — Free Online Tools for Text, Code, Calculators & AI",
    description: tagline,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolly — Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolly — Free Online Tools",
    description: tagline,
    images: ["/og-image.png"],
    creator: "@toolly",
    site: "@toolly",
  },
  category: "technology",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#B0DB9C" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data — helps search engines understand the platform.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Toolly",
  url: siteUrl,
  description: tagline,
  publisher: {
    "@type": "Organization",
    name: "Toolly",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Toolly Free Online Tools",
  description: "A curated platform of free, fast, privacy-first online tools across Text, Developer, Converters, Calculators, Generators, Web/SEO, and AI categories.",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Text Tools", description: "Word counter, case converter, lorem ipsum, duplicate line remover, whitespace cleaner, text reverser" },
    { "@type": "ListItem", position: 2, name: "Developer Tools", description: "JSON formatter, Base64, URL encoder, JWT decoder, hash generator, UUID generator, color converter, HTML entity encoder" },
    { "@type": "ListItem", position: 3, name: "Converters", description: "Number base, unit, roman numeral, CSV/JSON, timestamp converters" },
    { "@type": "ListItem", position: 4, name: "Calculators", description: "Percentage, age, BMI, loan/EMI, tip, compound interest calculators" },
    { "@type": "ListItem", position: 5, name: "Generators", description: "QR code, password, color palette, CSS gradient, meta tag generators" },
    { "@type": "ListItem", position: 6, name: "Web & SEO Tools", description: "Open Graph generator, robots.txt generator" },
    { "@type": "ListItem", position: 7, name: "AI Tools", description: "AI text summarizer, grammar improver, rewriter, translator, code explainer" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
        />
      </body>
    </html>
  );
}
