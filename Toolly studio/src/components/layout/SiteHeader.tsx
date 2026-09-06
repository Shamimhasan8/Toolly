"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Moon, Sun, Search, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  onOpenSearch?: () => void;
  onOpenMobileNav?: () => void;
}

export function SiteHeader({ onOpenSearch, onOpenMobileNav }: SiteHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onOpenMobileNav}
          className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>

        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-strong text-primary-foreground shadow-brand-glow">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 11 2-2 3 3 5-5" />
              <path d="M11 18H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">Toolly</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          <Link href="/" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground">
            All tools
          </Link>
          <a
            href="/#categories"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Categories
          </a>
          <a
            href="/#featured"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Featured
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground sm:flex"
          >
            <Search className="size-4" />
            <span className="hidden lg:inline">Search 30+ tools…</span>
            <kbd className="ml-1 hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline">/</kbd>
          </button>
          <button
            onClick={onOpenSearch}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground sm:hidden"
            aria-label="Search"
          >
            <Search className="size-5" />
          </button>

          <a
            href="https://github.com/AdilShamim8/Toolly"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground sm:block"
            aria-label="View Toolly on GitHub"
          >
            <Github className="size-5" />
          </a>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
