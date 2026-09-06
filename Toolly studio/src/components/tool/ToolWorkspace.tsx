"use client";

import * as React from "react";
import { ChevronLeft, BookOpen, HelpCircle, Wrench } from "lucide-react";
import { toolsBySlug, categories, tools } from "@/lib/tools/registry";

interface ToolWorkspaceProps {
  slug: string;
  onBack: () => void;
  onSelect: (slug: string) => void;
}

export function ToolWorkspace({ slug, onBack, onSelect }: ToolWorkspaceProps) {
  const tool = toolsBySlug.get(slug);
  if (!tool) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Tool not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The tool you're looking for doesn't exist.</p>
        <button
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-strong px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand"
        >
          <ChevronLeft className="size-4" /> Back to all tools
        </button>
      </div>
    );
  }
  const cat = categories.find((c) => c.slug === tool.category);
  const related = (tool.related ?? [])
    .map((s) => toolsBySlug.get(s))
    .filter((t): t is NonNullable<typeof t> => !!t);
  const Component = tool.component;

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li><a href="/" className="hover:text-foreground hover:underline underline-offset-4">Home</a></li>
          <li aria-hidden>/</li>
          <li><a href={`/?cat=${tool.category}#tools`} className="hover:text-foreground hover:underline underline-offset-4">{cat?.name}</a></li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{tool.name}</li>
        </ol>
      </nav>

      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
      >
        <ChevronLeft className="size-4" /> All tools
      </button>

      <header className="mb-6 flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-brand-soft text-brand-strong shadow-sm">
            <tool.icon className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{tool.name}</h1>
              {tool.isAI && (
                <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  AI-powered
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-premium sm:p-6">
        <Component />
      </div>

      {/* SEO & support content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          {tool.howToUse && tool.howToUse.length > 0 && (
            <section aria-labelledby="howto-heading" className="rounded-xl border border-border bg-card p-5 shadow-premium">
              <h2 id="howto-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <BookOpen className="size-4 text-brand-strong" /> How to use {tool.name}
              </h2>
              <ol className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                {tool.howToUse.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10px] font-semibold text-brand-strong">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {tool.faqs && tool.faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="rounded-xl border border-border bg-card p-5 shadow-premium">
              <h2 id="faq-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <HelpCircle className="size-4 text-brand-strong" /> Frequently asked questions
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {tool.faqs.map((f, i) => (
                  <details key={i} className="group rounded-lg border border-border bg-muted/30 p-3 text-sm">
                    <summary className="cursor-pointer list-none font-medium text-foreground marker:content-['']">
                      <span className="flex items-center justify-between gap-2">
                        <span>{f.q}</span>
                        <span className="text-muted-foreground transition group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-2 text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {related.length > 0 && (
          <aside aria-label="Related tools" className="rounded-xl border border-border bg-card p-5 shadow-premium lg:sticky lg:top-32 lg:self-start">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Wrench className="size-4 text-brand-strong" /> Related tools
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              {related.map((t) => (
                <li key={t.slug}>
                  <button
                    onClick={() => onSelect(t.slug)}
                    className="flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                  >
                    <t.icon className="size-4 shrink-0 text-brand-strong" />
                    <span className="flex-1">{t.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-muted-foreground">
              Toolly offers {tools.length}+ free tools across {categories.length} categories.
            </p>
          </aside>
        )}
      </div>
    </div>
  );
}
