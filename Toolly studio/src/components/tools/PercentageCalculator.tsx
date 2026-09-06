"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Percent } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "pct-of" | "is-what-pct" | "pct-change" | "add-pct";

const MODES: { id: Mode; label: string; inputs: [string, string]; placeholders: [string, string] }[] = [
  { id: "pct-of", label: "What is X% of Y?", inputs: ["Percentage (X)", "Of value (Y)"], placeholders: ["15", "200"] },
  { id: "is-what-pct", label: "X is what % of Y?", inputs: ["Value (X)", "Total (Y)"], placeholders: ["30", "200"] },
  { id: "pct-change", label: "% change from X to Y", inputs: ["From (X)", "To (Y)"], placeholders: ["100", "125"] },
  { id: "add-pct", label: "Add X% to Y", inputs: ["Percentage (X)", "Value (Y)"], placeholders: ["15", "200"] },
];

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1e9) return n.toExponential(4);
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export function PercentageCalculator() {
  const [mode, setMode] = React.useState<Mode>("pct-of");
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");

  const result = React.useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return null;
    switch (mode) {
      case "pct-of": return (x / 100) * y;
      case "is-what-pct": return y === 0 ? NaN : (x / y) * 100;
      case "pct-change": return x === 0 ? NaN : ((y - x) / Math.abs(x)) * 100;
      case "add-pct": return y + (x / 100) * y;
    }
  }, [a, b, mode]);

  const current = MODES.find((m) => m.id === mode)!;
  const hasResult = result !== null && isFinite(result);

  const sentence = React.useMemo(() => {
    if (!hasResult) return "";
    switch (mode) {
      case "pct-of": return `${fmt(parseFloat(a))}% of ${fmt(parseFloat(b))} = ${fmt(result!)}`;
      case "is-what-pct": return `${fmt(parseFloat(a))} is ${fmt(result!)}% of ${fmt(parseFloat(b))}`;
      case "pct-change": {
        const x = parseFloat(a), y = parseFloat(b);
        const dir = y > x ? "increase" : "decrease";
        return `${fmt(x)} → ${fmt(y)} is a ${fmt(Math.abs(result!))}% ${dir}`;
      }
      case "add-pct": return `${fmt(parseFloat(a))}% added to ${fmt(parseFloat(b))} = ${fmt(result!)}`;
    }
  }, [hasResult, result, mode, a, b]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Choose calculation">
        <div role="radiogroup" aria-label="Calculation type" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="radio"
              aria-checked={m.id === mode}
              onClick={() => setMode(m.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-left text-sm shadow-sm transition-all",
                m.id === mode
                  ? "border-brand-strong bg-brand-soft"
                  : "border-border bg-background hover:bg-accent"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolSection title="Inputs">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">{current.inputs[0]}</span>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder={current.placeholders[0]}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">{current.inputs[1]}</span>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder={current.placeholders[1]}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>
      </ToolSection>

      {hasResult ? (
        <ToolSection
          title="Result"
          actions={<CopyButton value={fmt(result!)} />}
        >
          <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-premium">
            {sentence}
          </div>
          <div className="mt-2 rounded-xl border border-brand/30 bg-brand-soft px-4 py-3 text-2xl font-semibold tabular-nums text-foreground">
            {fmt(result!)}{mode === "is-what-pct" || mode === "pct-change" ? "%" : ""}
          </div>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Percent className="size-5" />}
          title="Result appears here"
          description="Enter both values above to compute the percentage."
        />
      )}
    </div>
  );
}
