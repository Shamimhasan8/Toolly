"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { useAiTool } from "@/components/tool/useAiTool";
import { Sparkles, Wand2, Loader2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "concise" | "bullets" | "key-points";
type Length = "short" | "medium" | "long";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "concise", label: "Concise paragraph", desc: "Flowing summary" },
  { id: "bullets", label: "Bullet points", desc: "Compact list" },
  { id: "key-points", label: "Key points", desc: "One idea per line" },
];

const LENGTHS: { id: Length; label: string }[] = [
  { id: "short", label: "Short" },
  { id: "medium", label: "Medium" },
  { id: "long", label: "Detailed" },
];

interface Resp { summary: string; error?: string }

export function AiSummarizer() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("concise");
  const [length, setLength] = React.useState<Length>("medium");
  const { state, run, reset } = useAiTool<Resp>("/api/ai/summarize");

  const runSummary = () => run({ text, mode, length });

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Text to summarize"
        subtitle="Paste an article, paragraph, or any text — up to ~12,000 characters."
        actions={
          text ? (
            <button
              onClick={() => { setText(""); reset(); }}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Clear"
            >
              <Eraser className="size-3.5" /> Clear
            </button>
          ) : null
        }
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here…"
          className="min-h-[160px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
        <div className="mt-1 text-right text-[10px] text-muted-foreground">{text.length}/12,000</div>
      </ToolSection>

      <ToolSection title="Style">
        <div role="radiogroup" aria-label="Style" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="radio"
              aria-checked={m.id === mode}
              onClick={() => setMode(m.id)}
              className={cn(
                "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left shadow-sm transition-all",
                m.id === mode ? "border-brand-strong bg-brand-soft shadow-brand-glow" : "border-border bg-background hover:bg-accent"
              )}
            >
              <span className="text-sm font-semibold">{m.label}</span>
              <span className="text-[10px] text-muted-foreground">{m.desc}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Length:</span>
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
            {LENGTHS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLength(l.id)}
                className={cn(
                  "rounded px-2.5 py-1 text-xs font-medium transition",
                  length === l.id ? "bg-brand-strong text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </ToolSection>

      <button
        onClick={runSummary}
        disabled={!text.trim() || state.loading}
        className="inline-flex items-center gap-2 self-start rounded-lg bg-brand-strong px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
        {state.loading ? "Summarizing…" : "Summarize"}
      </button>

      {state.error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : state.result?.summary ? (
        <ToolSection
          title="Summary"
          actions={<CopyButton value={state.result.summary} />}
        >
          <div className="rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {state.result.summary}
          </div>
        </ToolSection>
      ) : !state.loading ? (
        <EmptyState
          icon={<Sparkles className="size-5" />}
          title="Your summary appears here"
          description="AI summarizes the text in your chosen style."
        />
      ) : null}
    </div>
  );
}
