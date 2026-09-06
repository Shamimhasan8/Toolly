"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { useAiTool } from "@/components/tool/useAiTool";
import { SpellCheck, Wand2, Loader2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "professional" | "casual" | "academic";
const TONES: { id: Tone; label: string }[] = [
  { id: "neutral", label: "Neutral" },
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "academic", label: "Academic" },
];

interface Resp { improved: string; error?: string }

export function AiGrammar() {
  const [text, setText] = React.useState("");
  const [tone, setTone] = React.useState<Tone>("neutral");
  const { state, run, reset } = useAiTool<Resp>("/api/ai/grammar");

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Your text"
        subtitle="Fix grammar, spelling, and awkward phrasing."
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

      <ToolSection title="Tone">
        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm w-fit">
          {TONES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium transition",
                tone === t.id ? "bg-brand-strong text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </ToolSection>

      <button
        onClick={() => run({ text, tone })}
        disabled={!text.trim() || state.loading}
        className="inline-flex items-center gap-2 self-start rounded-lg bg-brand-strong px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
        {state.loading ? "Improving…" : "Improve grammar"}
      </button>

      {state.error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : state.result?.improved ? (
        <ToolSection
          title="Improved text"
          actions={<CopyButton value={state.result.improved} />}
        >
          <div className="rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {state.result.improved}
          </div>
        </ToolSection>
      ) : !state.loading ? (
        <EmptyState
          icon={<SpellCheck className="size-5" />}
          title="Improved text appears here"
          description="AI fixes grammar, spelling, and clarity while preserving your meaning."
        />
      ) : null}
    </div>
  );
}
