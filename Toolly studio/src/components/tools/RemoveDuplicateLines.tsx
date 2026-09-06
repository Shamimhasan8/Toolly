"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { ListFilter, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "unique" | "duplicates" | "sort-az" | "sort-za" | "trim-empty";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "unique", label: "Remove duplicate lines", desc: "Keep first occurrence only" },
  { id: "duplicates", label: "Show duplicates only", desc: "Lines that appear 2+ times" },
  { id: "sort-az", label: "Sort A → Z", desc: "Alphabetical ascending" },
  { id: "sort-za", label: "Sort Z → A", desc: "Alphabetical descending" },
  { id: "trim-empty", label: "Remove empty lines", desc: "Drop blank lines" },
];

function process(input: string, mode: Mode): { output: string; removed: number } {
  const lines = input.split(/\n/);
  let out: string[] = lines;
  let removed = 0;

  switch (mode) {
    case "unique": {
      const seen = new Set<string>();
      out = [];
      for (const l of lines) {
        if (!seen.has(l)) {
          seen.add(l);
          out.push(l);
        } else removed++;
      }
      break;
    }
    case "duplicates": {
      const counts = new Map<string, number>();
      for (const l of lines) counts.set(l, (counts.get(l) ?? 0) + 1);
      out = lines.filter((l) => (counts.get(l) ?? 0) > 1);
      const dupesSet = new Set<string>();
      for (const [l, c] of counts) if (c > 1) dupesSet.add(l);
      out = Array.from(dupesSet);
      removed = lines.length - lines.filter((l) => (counts.get(l) ?? 0) > 1).length;
      break;
    }
    case "sort-az":
      out = [...lines].sort((a, b) => a.localeCompare(b));
      break;
    case "sort-za":
      out = [...lines].sort((a, b) => b.localeCompare(a));
      break;
    case "trim-empty":
      out = lines.filter((l) => l.trim() !== "");
      removed = lines.length - out.length;
      break;
  }

  return { output: out.join("\n"), removed: mode === "duplicates" ? 0 : removed };
}

export function RemoveDuplicateLines() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("unique");
  const result = React.useMemo(() => process(text, mode), [text, mode]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Input lines"
        subtitle="One line per row — duplicates are matched exactly."
        actions={
          text ? (
            <button
              onClick={() => setText("")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Clear input"
            >
              <Eraser className="size-3.5" /> Clear
            </button>
          ) : null
        }
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"apple\nbanana\napple\ncherry"}
          aria-label="Input lines"
          className="min-h-[160px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <ToolSection title="Operation">
        <div role="radiogroup" aria-label="Operation" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => {
            const active = m.id === mode;
            return (
              <button
                key={m.id}
                role="radio"
                aria-checked={active}
                onClick={() => setMode(m.id)}
                className={cn(
                  "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left shadow-sm transition-all",
                  active
                    ? "border-brand-strong bg-brand-soft shadow-brand-glow"
                    : "border-border bg-background hover:border-brand/60 hover:bg-accent"
                )}
              >
                <span className="text-sm font-semibold">{m.label}</span>
                <span className="text-[10px] text-muted-foreground">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </ToolSection>

      {result.output ? (
        <ToolSection
          title="Output"
          subtitle={result.removed > 0 ? `${result.removed} line(s) removed` : undefined}
          actions={
            <>
              <CopyButton value={result.output} />
              <DownloadButton value={result.output} filename="lines.txt" />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {result.output}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<ListFilter className="size-5" />}
          title="Processed lines appear here"
          description="Enter lines above and pick an operation."
        />
      )}
    </div>
  );
}
