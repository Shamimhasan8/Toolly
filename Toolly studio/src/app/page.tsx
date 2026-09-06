"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { CategoryBar } from "@/components/home/CategoryBar";
import { ToolGrid } from "@/components/home/ToolGrid";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { SeoContent } from "@/components/home/SeoContent";
import { ToolWorkspace } from "@/components/tool/ToolWorkspace";
import { tools, categories, toolsBySlug } from "@/lib/tools/registry";

export default function Home() {
  const searchParams = useSearchParams();
  const searchRef = React.useRef<HTMLInputElement | null>(null);

  // Hydration-safe initial state from URL
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [activeTool, setActiveTool] = React.useState<string | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  // Read URL state on mount only (and on URL changes)
  React.useEffect(() => {
    setHydrated(true);
    const t = searchParams.get("tool");
    const c = searchParams.get("cat");
    const q = searchParams.get("q");
    if (t && toolsBySlug.has(t)) {
      setActiveTool(t);
    } else {
      setActiveTool(null);
    }
    if (c && categories.some((cat) => cat.slug === c)) {
      setActiveCategory(c);
    } else {
      setActiveCategory("all");
    }
    if (q) setQuery(q);
  }, [searchParams]);

  // Sync URL state when user changes things (after hydration)
  React.useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    if (activeTool) url.searchParams.set("tool", activeTool);
    else url.searchParams.delete("tool");
    if (activeCategory !== "all") url.searchParams.set("cat", activeCategory);
    else url.searchParams.delete("cat");
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [activeTool, activeCategory, query, hydrated]);

  // Scroll to top when activeTool changes
  React.useEffect(() => {
    if (activeTool) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTool]);

  // Keyboard shortcut: focus search on "/"
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
        // Close active tool if any, to reveal the grid
        if (activeTool) setActiveTool(null);
      }
      if (e.key === "Escape" && activeTool) {
        setActiveTool(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTool]);

  // Filtered tools
  const filteredTools = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  const counts = React.useMemo(() => {
    const map: Record<string, number> = { all: tools.length };
    for (const c of categories) {
      map[c.slug] = tools.filter((t) => t.category === c.slug).length;
    }
    return map;
  }, []);

  const handleSelectTool = React.useCallback((slug: string) => {
    setActiveTool(slug);
  }, []);

  const handleBack = React.useCallback(() => {
    setActiveTool(null);
  }, []);

  const handleCategoryClick = React.useCallback((slug: string) => {
    setActiveCategory(slug);
    setActiveTool(null);
    // scroll to tools grid
    setTimeout(() => {
      document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const showHero = !activeTool;
  const showFeatured = !activeTool && !query && activeCategory === "all";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        onOpenSearch={() => {
          setActiveTool(null);
          searchRef.current?.focus();
          searchRef.current?.select();
        }}
      />

      <main className="flex-1">
        {activeTool ? (
          <ToolWorkspace slug={activeTool} onBack={handleBack} onSelect={handleSelectTool} />
        ) : (
          <>
            <Hero
              query={query}
              onQueryChange={setQuery}
              onCategoryClick={handleCategoryClick}
              searchRef={searchRef}
            />
            <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <CategoryBar
                active={activeCategory}
                onChange={handleCategoryClick}
                counts={counts}
              />
            </div>
            <section className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
              {showFeatured && <FeaturedSection onSelect={handleSelectTool} />}

              <header className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">
                    {query
                      ? `Results for "${query}"`
                      : activeCategory === "all"
                      ? "All tools"
                      : categories.find((c) => c.slug === activeCategory)?.name + " tools"}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {filteredTools.length} tool{filteredTools.length === 1 ? "" : "s"} available
                  </p>
                </div>
              </header>

              <ToolGrid
                tools={filteredTools}
                onSelect={handleSelectTool}
                query={query}
              />
            </section>

            <SeoContent />
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
