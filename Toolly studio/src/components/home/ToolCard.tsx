"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/tools/types";

interface ToolCardProps {
  tool: Tool;
  onClick?: (slug: string) => void;
  style?: React.CSSProperties;
}

export function ToolCard({ tool, onClick, style }: ToolCardProps) {
  return (
    <button
      onClick={() => onClick?.(tool.slug)}
      style={style}
      className={cn(
        "group relative flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left shadow-premium transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-brand-strong/60 hover:shadow-premium-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label={`Open ${tool.name}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-brand-soft text-brand-strong transition-colors group-hover:border-brand-strong/40 group-hover:bg-brand group-hover:text-primary-foreground">
          <tool.icon className="size-4.5" />
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {tool.isAI && (
            <span className="rounded-full bg-purple-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              AI
            </span>
          )}
          {tool.isNew && (
            <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              New
            </span>
          )}
          {tool.isPopular && !tool.isNew && (
            <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-strong">
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="mt-1 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-tight text-foreground">{tool.name}</h3>
        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="text-xs leading-snug text-muted-foreground line-clamp-2">{tool.short}</p>
    </button>
  );
}
