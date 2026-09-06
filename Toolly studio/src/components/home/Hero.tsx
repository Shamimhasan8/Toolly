"use client";

import * as React from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { categories, tools, popularTools } from "@/lib/tools/registry";

interface HeroProps {
  query: string;
  onQueryChange: (v: string) => void;
  onCategoryClick: (slug: string) => void;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

export function Hero({ query, onQueryChange, onCategoryClick, searchRef }: HeroProps) {
  const total = tools.length;
  const catCount = categories.length;
  const featuredCount = tools.filter((t) => t.featured).length;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 -z-10 bg-hero-mesh" aria-hidden />
      <div className="mx-auto w-full max-w-[1320px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong">
            <Sparkles className="size-3.5" />
            <span>{total}+ free tools — no sign-up, no install</span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Free online tools,{" "}
            <span className="text-gradient-brand">simply done.</span>
          </h1>

          <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
            {total} carefully crafted tools for text, code, conversions, calculators, generators, SEO, and AI. Fast, mobile-friendly, and privacy-first — most tools run entirely in your browser.
          </p>

          <div className="mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-premium">
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search for a tool — e.g. JSON, QR, password, BMI…"
                className="w-full bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                aria-label="Search tools"
                autoComplete="off"
              />
              <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">/</kbd>
            </div>
            <button
              onClick={() => onCategoryClick("all")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-strong px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand"
            >
              Explore
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {popularTools().slice(0, 5).map((t) => (
              <button
                key={t.slug}
                onClick={() => onCategoryClick("all")}
                data-tool={t.slug}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition hover:border-brand/60 hover:bg-accent"
              >
                {t.name}
              </button>
            ))}
          </div>

          <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card/70 px-3 py-4 shadow-premium">
              <dd className="text-2xl font-bold tracking-tight text-foreground">{total}+</dd>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Free tools</dt>
            </div>
            <div className="rounded-xl border border-border bg-card/70 px-3 py-4 shadow-premium">
              <dd className="text-2xl font-bold tracking-tight text-foreground">{catCount}</dd>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Categories</dt>
            </div>
            <div className="rounded-xl border border-border bg-card/70 px-3 py-4 shadow-premium">
              <dd className="text-2xl font-bold tracking-tight text-foreground">{featuredCount}</dd>
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Featured</dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
