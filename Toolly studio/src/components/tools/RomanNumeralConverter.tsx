"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Hash, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "to-roman" | "to-number";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "to-roman", label: "→ Roman", desc: "Number → Roman" },
  { id: "to-number", label: "→ Number", desc: "Roman → Number" },
];

const MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"],
  [1, "I"],
];

function toRoman(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 3999) return "";
  let n = num;
  let out = "";
  for (const [v, s] of MAP) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

function fromRoman(roman: string): number | null {
  const s = roman.trim().toUpperCase();
  if (!s) return null;
  if (!/^M{0,3}(CM|CD|D?C{0,3})?(XC|XL|L?X{0,3})?(IX|IV|V?I{0,3})?$/.test(s)) return null;
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]];
    const next = map[s[i + 1]];
    if (next && cur < next) { total += next - cur; i++; }
    else total += cur;
  }
  return total;
}

interface ComputeResult {
  value: string;
  error: string | null;
}

function compute(text: string, mode: Mode): ComputeResult {
  const v = text.trim();
  if (!v) return { value: "", error: null };
  if (mode === "to-roman") {
    const n = parseInt(v, 10);
    if (isNaN(n)) return { value: "", error: "Enter a valid number" };
    if (n < 1) return { value: "", error: "Number must be ≥ 1" };
    if (n > 3999) return { value: "", error: "Max supported: 3999" };
    return { value: toRoman(n), error: null };
  } else {
    const r = fromRoman(v);
    if (r === null) return { value: "", error: "Invalid Roman numeral" };
    return { value: String(r), error: null };
  }
}

export function RomanNumeralConverter() {
  const [mode, setMode] = React.useState<Mode>("to-roman");
  const [text, setText] = React.useState("");
  const { value: result, error } = React.useMemo(() => compute(text, mode), [text, mode]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title={mode === "to-roman" ? "Number" : "Roman numeral"}
        actions={
          <>
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "rounded px-2.5 py-1 text-xs font-medium transition",
                    mode === m.id
                      ? "bg-brand-strong text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {text && (
              <button
                onClick={() => setText("")}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Clear"
              >
                <Eraser className="size-3.5" /> Clear
              </button>
            )}
          </>
        }
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === "to-roman" ? "2026" : "MMXXVI"}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-lg shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : result ? (
        <ToolSection
          title={mode === "to-roman" ? "Roman numeral" : "Number"}
          actions={<CopyButton value={result} />}
        >
          <div className="rounded-xl border border-border bg-card px-6 py-6 text-center text-3xl font-semibold tracking-tight text-foreground shadow-premium">
            {result}
          </div>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Hash className="size-5" />}
          title="Result appears here"
          description="Enter a value above to convert between Roman numerals and Arabic numbers."
        />
      )}
    </div>
  );
}
