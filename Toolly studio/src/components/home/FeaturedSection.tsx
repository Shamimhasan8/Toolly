"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { featuredTools } from "@/lib/tools/registry";
import { ToolCard } from "./ToolCard";

interface FeaturedSectionProps {
  onSelect: (slug: string) => void;
}

export function FeaturedSection({ onSelect }: FeaturedSectionProps) {
  const tools = featuredTools();
  if (!tools.length) return null;
  return (
    <section id="featured" aria-labelledby="featured-heading" className="mb-8">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 id="featured-heading" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
            <Star className="size-4 text-brand-strong" />
            Featured tools
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Hand-picked essentials to get you started.</p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool, i) => (
          <ToolCard
            key={tool.slug}
            tool={tool}
            onClick={onSelect}
            style={{
              animation: `toolly-fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(i, 8) * 30}ms both`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
