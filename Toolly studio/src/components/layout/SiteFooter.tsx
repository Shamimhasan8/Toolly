import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { categories, tools } from "@/lib/tools/registry";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-strong text-primary-foreground shadow-brand-glow">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7 11 2-2 3 3 5-5" />
                  <path d="M11 18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">Toolly</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Free online tools for text, code, conversions, calculations, generators, and AI. Simple, fast, and private — most tools run entirely in your browser.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="https://github.com/AdilShamim8/Toolly" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                <Github className="size-4" />
              </a>
              <a href="https://x.com/Toolly_" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                <Twitter className="size-4" />
              </a>
              <a href="https://www.linkedin.com/company/toolly8/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                <Linkedin className="size-4" />
              </a>
              <a href="mailto:info@toolly.tech" aria-label="Email" className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer — categories">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <a href={`/?cat=${c.slug}#tools`} className="text-sm text-foreground/80 transition hover:text-foreground hover:underline underline-offset-4">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — popular tools">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Popular tools</h3>
            <ul className="mt-3 space-y-2">
              {tools.filter((t) => t.isPopular).slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <a href={`/?tool=${t.slug}`} className="text-sm text-foreground/80 transition hover:text-foreground hover:underline underline-offset-4">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — project">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="https://github.com/AdilShamim8/Toolly" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/80 transition hover:text-foreground hover:underline underline-offset-4">GitHub</a></li>
              <li><a href="https://www.toolly.tech" className="text-sm text-foreground/80 transition hover:text-foreground hover:underline underline-offset-4">toolly.tech</a></li>
              <li><a href="mailto:info@toolly.tech" className="text-sm text-foreground/80 transition hover:text-foreground hover:underline underline-offset-4">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Toolly. Built with care. All tools free to use.</p>
          <p>Powerful tools. Simple experience. Free to use.</p>
        </div>
      </div>
    </footer>
  );
}
