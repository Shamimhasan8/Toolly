"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { useAiTool } from "@/components/tool/useAiTool";
import { Code2, Wand2, Loader2, Eraser } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

const LANGS = ["Auto", "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", "C", "C++", "C#", "Ruby", "PHP", "Swift", "Kotlin", "SQL", "Bash", "HTML", "CSS"];

interface Resp { explanation: string; error?: string }

export function AiCodeExplainer() {
  const [code, setCode] = React.useState("");
  const [language, setLanguage] = React.useState("Auto");
  const [detail, setDetail] = React.useState<"short" | "detailed">("short");
  const { state, run, reset } = useAiTool<Resp>("/api/ai/explain-code");

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Code"
        subtitle="Paste any snippet — the AI will explain what it does in plain language."
        actions={
          code ? (
            <button
              onClick={() => { setCode(""); reset(); }}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Clear"
            >
              <Eraser className="size-3.5" /> Clear
            </button>
          ) : null
        }
      >
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={"function fib(n) {\n  return n < 2 ? n : fib(n - 1) + fib(n - 2);\n}"}
          spellCheck={false}
          className="min-h-[180px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
        <div className="mt-1 text-right text-[10px] text-muted-foreground">{code.length}/12,000</div>
      </ToolSection>

      <ToolSection title="Options">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Detail level</span>
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm w-fit">
              {(["short", "detailed"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDetail(d)}
                  className={cn(
                    "rounded px-3 py-1 text-xs font-medium capitalize transition",
                    detail === d ? "bg-brand-strong text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ToolSection>

      <button
        onClick={() => run({ code, language, detail })}
        disabled={!code.trim() || state.loading}
        className="inline-flex items-center gap-2 self-start rounded-lg bg-brand-strong px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
        {state.loading ? "Explaining…" : "Explain code"}
      </button>

      {state.error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      ) : state.result?.explanation ? (
        <ToolSection
          title="Explanation"
          actions={<CopyButton value={state.result.explanation} />}
        >
          <div className="max-w-none rounded-xl border border-brand/30 bg-brand-soft p-5 text-sm leading-relaxed text-foreground prose prose-sm prose-headings:font-semibold prose-headings:tracking-tight prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-ul:my-2 prose-li:my-0">
            <ReactMarkdown>{state.result.explanation}</ReactMarkdown>
          </div>
        </ToolSection>
      ) : !state.loading ? (
        <EmptyState
          icon={<Code2 className="size-5" />}
          title="Explanation appears here"
          description="Paste code above and the AI will explain it in plain language."
        />
      ) : null}
    </div>
  );
}
