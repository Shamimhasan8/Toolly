"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { useAiTool } from "@/components/tool/useAiTool";
import { PenLine, Wand2, Loader2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Style = "simpler" | "formal" | "concise" | "expand" | "persuasive";
const STYLES: { id: Style; label: string; desc: string }[] = [
  { id: "simpler", label: "Simpler", desc: "Plain language" },
  { id: "formal", label: "Formal", desc: "Professional register" },
  { id: "concise", label: "Concise", desc: "Shorter & direct" },
  { id: "expand", label: "Expand", desc: "Richer detail" },
  { id: "persuasive", label: "Persuasive", desc: "Engaging tone" },
];

interface Resp { rewritten: string; error?: string }

export function AiRewriter() {
  const [text, setText] = React.useState("");
  const [style, setStyle] = React.useState<Style>("concise");
  const { state, run, reset } = useAiTool<Resp>("/api/ai/rewrite");

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Your text"
        subtitle="Paraphrase without changing the meaning."
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
        <div role="radiogroup" aria-label="Style" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STYLES.map((s) => (
            <button
              key={s.id}
              role="radio"
              aria-checked={s.id === style}
              onClick={() => setStyle(s.id)}
              className={cn(
                "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left shadow-sm transition-all",
                s.id === style ? "border-brand-strong bg-brand-soft shadow-brand-glow" : "border-border bg-background hover:bg-accent"
              )}
            >
              <span className="text-sm font-semibold">{s.label}</span>
              <span className="text-[10px] text-muted-foreground">{s.desc}</span>
            </button>
          ))}
        </div>
      </ToolSection>

      <button
        onClick={() => run({ text, style })}
        disabled={!text.trim() || state.loading}
        className="inline-flex items-center gap-2 self-start rounded-lg bg-brand-strong px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
        {state.loading ? "Rewriting…" : "Rewrite"}
      </button>

      {state.error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : state.result?.rewritten ? (
        <ToolSection
          title="Rewritten text"
          actions={<CopyButton value={state.result.rewritten} />}
        >
          <div className="rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {state.result.rewritten}
          </div>
        </ToolSection>
      ) : !state.loading ? (
        <EmptyState
          icon={<PenLine className="size-5" />}
          title="Rewritten text appears here"
          description="AI paraphrases your text in the chosen style."
        />
      ) : null}
    </div>
  );
}
