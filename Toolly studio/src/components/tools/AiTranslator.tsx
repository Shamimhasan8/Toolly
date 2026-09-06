"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { useAiTool } from "@/components/tool/useAiTool";
import { Languages, Wand2, Loader2, Eraser } from "lucide-react";

const LANGS: { id: string; label: string }[] = [
  { id: "auto", label: "Auto-detect" },
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "fr", label: "French" },
  { id: "de", label: "German" },
  { id: "it", label: "Italian" },
  { id: "pt", label: "Portuguese" },
  { id: "nl", label: "Dutch" },
  { id: "ru", label: "Russian" },
  { id: "zh", label: "Chinese" },
  { id: "ja", label: "Japanese" },
  { id: "ko", label: "Korean" },
  { id: "ar", label: "Arabic" },
  { id: "hi", label: "Hindi" },
  { id: "bn", label: "Bengali" },
  { id: "ur", label: "Urdu" },
  { id: "tr", label: "Turkish" },
  { id: "pl", label: "Polish" },
  { id: "sv", label: "Swedish" },
  { id: "id", label: "Indonesian" },
  { id: "vi", label: "Vietnamese" },
  { id: "th", label: "Thai" },
];

interface Resp { translation: string; error?: string }

export function AiTranslator() {
  const [text, setText] = React.useState("");
  const [from, setFrom] = React.useState("auto");
  const [to, setTo] = React.useState("en");
  const { state, run, reset } = useAiTool<Resp>("/api/ai/translate");

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Text to translate"
        subtitle="Translate between major languages while preserving meaning, names, and tone."
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
          className="min-h-[140px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
        <div className="mt-1 text-right text-[10px] text-muted-foreground">{text.length}/8,000</div>
      </ToolSection>

      <ToolSection title="Languages">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">From</span>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </label>
          <button
            onClick={() => { setFrom(to === "auto" ? "en" : to); setTo(from === "auto" ? "en" : from); }}
            className="mx-auto mt-5 flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-premium transition hover:bg-accent hover:text-accent-foreground"
            aria-label="Swap languages"
          >
            ⇄
          </button>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">To</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              {LANGS.filter((l) => l.id !== "auto").map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </label>
        </div>
      </ToolSection>

      <button
        onClick={() => run({ text, from, to })}
        disabled={!text.trim() || state.loading}
        className="inline-flex items-center gap-2 self-start rounded-lg bg-brand-strong px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
        {state.loading ? "Translating…" : "Translate"}
      </button>

      {state.error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : state.result?.translation ? (
        <ToolSection
          title="Translation"
          actions={<CopyButton value={state.result.translation} />}
        >
          <div className="rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {state.result.translation}
          </div>
        </ToolSection>
      ) : !state.loading ? (
        <EmptyState
          icon={<Languages className="size-5" />}
          title="Translation appears here"
          description="AI translates your text into the selected language."
        />
      ) : null}
    </div>
  );
}
