import Link from "next/link";
import { categories, tools, popularTools } from "@/lib/tools/registry";
import { ShieldCheck, Zap, Heart, Globe } from "lucide-react";

export function SeoContent() {
  return (
    <section className="mx-auto mt-20 w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-premium">
          <Zap className="size-5 text-brand-strong" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Instant results</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Every tool runs in your browser with no waiting, no page reloads, and no servers to spin up.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-premium">
          <ShieldCheck className="size-5 text-brand-strong" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Privacy-first</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Client-side tools never send your data anywhere. AI tools send only the text needed to produce your result.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-premium">
          <Heart className="size-5 text-brand-strong" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Always free</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            No sign-up, no paywall, no upsell. Every tool is free to use, every day, as often as you like.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-premium">
          <Globe className="size-5 text-brand-strong" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">Works everywhere</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Desktop, laptop, tablet, mobile — every tool is responsive, accessible, and ready to use.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <article className="prose prose-stone dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-brand-strong prose-a:no-underline hover:prose-a:underline">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            A curated platform of {tools.length} free online tools
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Toolly is a free online tools platform built around a simple idea: the tools you use every day should be fast, private, and genuinely useful — without forcing you to sign up, install anything, or wrestle with ads. We started with {categories.length} categories — text, developer, converters, calculators, generators, web/SEO, and AI — and filled each with carefully designed tools that solve real problems people actually have. Each tool is built to do one job well, with a clean interface, helpful defaults, and outputs you can copy or download in one click.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most of our tools run entirely in your browser. That means your data never leaves your device — your text stays yours, your files stay yours, and there is no server in the middle that sees your work. For the AI tools (text summarizer, grammar improver, rewriter, translator, and code explainer), we send only the specific input needed to produce your result, and we do not store it. The result is a tools platform that feels instant and trustworthy.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Whether you are a developer formatting JSON, decoding a JWT, or generating UUIDs; a writer counting words and improving grammar; a marketer building Open Graph tags and a robots.txt; a student calculating BMI or compound interest; or anyone who needs a quick QR code, color palette, or password — Toolly has you covered with {tools.length}+ tools that simply work.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-foreground">Explore by category</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {categories.map((c) => {
              const n = tools.filter((t) => t.category === c.slug).length;
              return (
                <li key={c.slug}>
                  <Link href={`/?cat=${c.slug}#tools`} className="font-medium text-foreground hover:text-brand-strong hover:underline underline-offset-4">
                    {c.name}
                  </Link>{" "}
                  <span className="text-xs text-muted-foreground">— {n} tool{n === 1 ? "" : "s"}</span>
                </li>
              );
            })}
          </ul>
        </article>

        <aside className="rounded-2xl border border-brand/30 bg-brand-soft p-6">
          <h3 className="text-sm font-semibold text-foreground">Most-used tools</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {popularTools().map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/?tool=${t.slug}`}
                  className="flex items-center gap-2 text-sm text-foreground/80 transition hover:text-brand-strong"
                >
                  <t.icon className="size-4 text-brand-strong" />
                  <span className="flex-1">{t.name}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Powerful tools. Simple experience. Free to use.
          </p>
        </aside>
      </div>
    </section>
  );
}
