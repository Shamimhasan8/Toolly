"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { CaseSensitive, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseMode =
  | "UPPER"
  | "lower"
  | "Title"
  | "Sentence"
  | "camelCase"
  | "PascalCase"
  | "snake_case"
  | "kebab-case"
  | "CONSTANT_CASE"
  | "dot.case";

const MODES: { id: CaseMode; label: string; desc: string }[] = [
  { id: "UPPER", label: "UPPER CASE", desc: "ALL CAPS" },
  { id: "lower", label: "lower case", desc: "all lowercase" },
  { id: "Title", label: "Title Case", desc: "Each Word Capitalized" },
  { id: "Sentence", label: "Sentence case", desc: "First letter capitalized" },
  { id: "camelCase", label: "camelCase", desc: "firstWordLower, restCapitalized" },
  { id: "PascalCase", label: "PascalCase", desc: "EachWordCapitalized" },
  { id: "snake_case", label: "snake_case", desc: "words_with_underscores" },
  { id: "kebab-case", label: "kebab-case", desc: "words-with-hyphens" },
  { id: "CONSTANT_CASE", label: "CONSTANT_CASE", desc: "UPPER_SNAKE" },
  { id: "dot.case", label: "dot.case", desc: "words.with.dots" },
];

// Split into "words" handling camelCase, PascalCase, snake, kebab, etc.
function splitWords(input: string): string[] {
  const s = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-\.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s ? s.split(" ").filter(Boolean) : [];
}

function transform(input: string, mode: CaseMode): string {
  if (!input) return "";
  switch (mode) {
    case "UPPER":
      return input.toUpperCase();
    case "lower":
      return input.toLowerCase();
    case "Title": {
      return input
        .toLowerCase()
        .replace(/\b([a-z])/g, (m, p1) => p1.toUpperCase());
    }
    case "Sentence": {
      const lower = input.toLowerCase();
      return lower.replace(/(^\s*[\p{L}])|([.!?]\s+[\p{L}])/gu, (m) =>
        m.toUpperCase()
      );
    }
    case "camelCase": {
      const w = splitWords(input).map((x) => x.toLowerCase());
      return w
        .map((x, i) =>
          i === 0 ? x : x.charAt(0).toUpperCase() + x.slice(1)
        )
        .join("");
    }
    case "PascalCase": {
      const w = splitWords(input).map((x) => x.toLowerCase());
      return w
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
    }
    case "snake_case":
      return splitWords(input).map((x) => x.toLowerCase()).join("_");
    case "kebab-case":
      return splitWords(input).map((x) => x.toLowerCase()).join("-");
    case "CONSTANT_CASE":
      return splitWords(input).map((x) => x.toUpperCase()).join("_");
    case "dot.case":
      return splitWords(input).map((x) => x.toLowerCase()).join(".");
  }
}

export function CaseConverter() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<CaseMode>("UPPER");
  const output = React.useMemo(() => transform(text, mode), [text, mode]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Input text"
        subtitle="Paste or type text below, then choose a target case."
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
          placeholder="e.g. convert THIS text into camelCase"
          aria-label="Input text"
          className="min-h-[140px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <ToolSection title="Target case">
        <div role="radiogroup" aria-label="Target case" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
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
                    ? "border-brand-strong bg-brand-soft text-foreground shadow-brand-glow"
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

      {output ? (
        <ToolSection
          title="Output"
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="converted.txt" />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {output}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<CaseSensitive className="size-5" />}
          title="Output appears here"
          description="Enter some text above to convert it into the selected case."
        />
      )}
    </div>
  );
}
