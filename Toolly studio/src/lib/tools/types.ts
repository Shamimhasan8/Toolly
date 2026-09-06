import type { LucideIcon } from "lucide-react";

export type ToolCategorySlug =
  | "text"
  | "developer"
  | "converters"
  | "calculators"
  | "generators"
  | "web-seo"
  | "ai";

export interface ToolCategory {
  slug: ToolCategorySlug;
  name: string;
  /** Short tagline used in cards & hero */
  tagline: string;
  /** Lucide icon name — resolved in the registry */
  icon: LucideIcon;
  /** Hex accent for category badge — derived from brand family */
  accent: string;
}

export interface Tool {
  /** URL slug — used in ?tool=slug */
  slug: string;
  /** Display name */
  name: string;
  /** One-line description used in cards */
  short: string;
  /** 1–2 sentence description used in tool header & SEO */
  description: string;
  /** Category */
  category: ToolCategorySlug;
  /** Search keywords */
  keywords: string[];
  /** Lucide icon */
  icon: LucideIcon;
  /** The React component that renders the tool's UI */
  component: React.ComponentType;
  /** Whether the tool calls a server-side AI endpoint */
  isAI?: boolean;
  /** Whether the tool is featured on the homepage */
  featured?: boolean;
  /** Whether the tool is marked as "new" */
  isNew?: boolean;
  /** Whether the tool is marked as "popular" */
  isPopular?: boolean;
  /** Related tool slugs (for the related-tools sidebar) */
  related?: string[];
  /** Short "how to use" instructions shown on the tool page */
  howToUse?: string[];
  /** FAQ entries for SEO content */
  faqs?: { q: string; a: string }[];
}
