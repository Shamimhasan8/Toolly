"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { ToolCard } from "./ToolCard";
import type { Tool } from "@/lib/tools/types";

interface ToolGridProps {
  tools: Tool[];
  onSelect: (slug: string) => void;
  query: string;
}

export function ToolGrid({ tools, onSelect, query }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
          <Search className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">No tools match your search</h3>
          <p className="mt-1 max-w-md text-xs text-muted-foreground">
            Try a different keyword or clear the search to see all {tools.length === 0 ? "available" : ""} tools.
            {query && (
              <>
                {" "}
                You searched for <span className="font-mono text-foreground">"{query}"</span>.
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="tools"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
    >
      {tools.map((tool, i) => (
        <ToolCard
          key={tool.slug}
          tool={tool}
          onClick={onSelect}
          style={{
            animation: `toolly-fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(i, 12) * 25}ms both`,
          }}
        />
      ))}
    </div>
  );
}
