"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Paintbrush } from "lucide-react";

type Direction = "to right" | "to left" | "to top" | "to bottom" | "to bottom right" | "to top right" | "to bottom left" | "to top left" | "radial";

const DIRECTIONS: Direction[] = ["to right", "to left", "to top", "to bottom", "to bottom right", "to top right", "to bottom left", "to top left", "radial"];

interface Stop {
  color: string;
  pos: number; // 0–100
}

export function GradientGenerator() {
  const [stops, setStops] = React.useState<Stop[]>([
    { color: "#B0DB9C", pos: 0 },
    { color: "#7ab566", pos: 100 },
  ]);
  const [direction, setDirection] = React.useState<Direction>("to right");

  const sortedStops = React.useMemo(() => [...stops].sort((a, b) => a.pos - b.pos), [stops]);

  const css = React.useMemo(() => {
    const stopsStr = sortedStops.map((s) => `${s.color} ${s.pos}%`).join(", ");
    if (direction === "radial") return `background: radial-gradient(circle, ${stopsStr});`;
    return `background: linear-gradient(${direction}, ${stopsStr});`;
  }, [sortedStops, direction]);

  const cssText = `background: linear-gradient(${direction}, ${sortedStops.map((s) => `${s.color} ${s.pos}%`).join(", ")});`;

  const addStop = () => {
    setStops((s) => [...s, { color: "#ffffff", pos: 50 }]);
  };
  const removeStop = (i: number) => {
    setStops((s) => s.filter((_, idx) => idx !== i || s.length <= 2));
  };
  const updateStop = (i: number, patch: Partial<Stop>) => {
    setStops((s) => s.map((st, idx) => (idx === i ? { ...st, ...patch } : st)));
  };

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Preview" subtitle="Live preview of your gradient.">
        <div
          className="h-40 w-full rounded-xl border border-border shadow-premium"
          style={{ background: direction === "radial" ? `radial-gradient(circle, ${sortedStops.map((s) => `${s.color} ${s.pos}%`).join(", ")})` : `linear-gradient(${direction}, ${sortedStops.map((s) => `${s.color} ${s.pos}%`).join(", ")})` }}
        />
      </ToolSection>

      <ToolSection title="Direction">
        <div className="flex flex-wrap gap-1.5">
          {DIRECTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                direction === d
                  ? "border-brand-strong bg-brand-strong text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-accent"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolSection title="Color stops" actions={
        <button
          onClick={addStop}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
        >
          + Add stop
        </button>
      }>
        <div className="flex flex-col gap-2">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 shadow-sm">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(i, { color: e.target.value })}
                className="size-10 cursor-pointer rounded-md border border-border p-0.5"
                aria-label={`Color ${i + 1}`}
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(i, { color: e.target.value })}
                className="w-24 rounded-md border border-border bg-background px-2 py-1.5 font-mono text-xs shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
              />
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.pos}
                  onChange={(e) => updateStop(i, { pos: Number(e.target.value) })}
                  className="flex-1 accent-[var(--brand-strong)]"
                  aria-label={`Position ${i + 1}`}
                />
                <span className="w-10 text-right font-mono text-xs tabular-nums text-muted-foreground">{stop.pos}%</span>
              </div>
              <button
                onClick={() => removeStop(i)}
                disabled={stops.length <= 2}
                className="rounded p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Remove stop ${i + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection title="CSS" actions={<CopyButton value={cssText} label="Copy CSS" />}>
        <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all">
          {css}
        </pre>
      </ToolSection>

      <EmptyState
        icon={<Paintbrush className="size-5" />}
        title="How to use"
        description="Pick colors and positions, choose a direction, then copy the generated CSS into your stylesheet."
      />
    </div>
  );
}
