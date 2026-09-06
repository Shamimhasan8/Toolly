"use client";

import * as React from "react";
import { categories } from "@/lib/tools/registry";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
  active: string;
  onChange: (slug: string) => void;
  counts?: Record<string, number>;
}

export function CategoryBar({ active, onChange, counts }: CategoryBarProps) {
  return (
    <div
      id="categories"
      className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/85 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/65 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => onChange("all")}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
            active === "all"
              ? "border-brand-strong bg-brand-strong text-primary-foreground shadow-brand-glow"
              : "border-border bg-background text-foreground hover:bg-accent"
          )}
        >
          All
          <span className={cn("rounded-full px-1.5 text-[10px]", active === "all" ? "bg-white/20" : "bg-muted text-muted-foreground")}>
            {counts?.all ?? ""}
          </span>
        </button>
        {categories.map((c) => {
          const isActive = active === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => onChange(c.slug)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                isActive
                  ? "border-brand-strong bg-brand-strong text-primary-foreground shadow-brand-glow"
                  : "border-border bg-background text-foreground hover:bg-accent"
              )}
            >
              <c.icon className="size-3.5" />
              {c.name}
              <span className={cn("rounded-full px-1.5 text-[10px]", isActive ? "bg-white/20" : "bg-muted text-muted-foreground")}>
                {counts?.[c.slug] ?? ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
