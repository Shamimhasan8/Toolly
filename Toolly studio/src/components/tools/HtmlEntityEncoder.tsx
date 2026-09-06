"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Code2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "encode" | "decode" | "escape" | "unescape";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "encode", label: "Encode", desc: "< → &lt; > → &gt; & → &amp;" },
  { id: "decode", label: "Decode", desc: "&lt; → < &gt; > &amp; → &" },
  { id: "escape", label: "Escape", desc: "JS string — \" \\ \n → &quot; \\\\ \\n" },
  { id: "unescape", label: "Unescape", desc: "&quot; \\\\ \\n → \" \\ \n" },
];

function run(input: string, mode: Mode): { value: string; error: string | null } {
  if (!input) return { value: "", error: null };
  try {
    switch (mode) {
      case "encode":
        return {
          value: input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;"),
          error: null,
        };
      case "decode":
        return {
          value: input
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#0?39;/g, "'")
            .replace(/&amp;/g, "&"),
          error: null,
        };
      case "escape": {
        const escaped = JSON.stringify(input);
        return { value: escaped, error: null };
      }
      case "unescape": {
        // Only accept strings that look like quoted JS strings
        const trimmed = input.trim();
        if (!trimmed.startsWith('"') || !trimmed.endsWith('"')) {
          return { value: "", error: "Input must be a double-quoted JS string literal." };
        }
        const parsed = JSON.parse(trimmed);
        if (typeof parsed !== "string") return { value: "", error: "Input did not decode to a string." };
        return { value: parsed, error: null };
      }
    }
  } catch (e) {
    return { value: "", error: e instanceof Error ? e.message : String(e) };
  }
}

export function HtmlEntityEncoder() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("encode");
  const result = React.useMemo(() => run(text, mode), [text, mode]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Input"
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
          placeholder={mode === "encode" ? "<a href=\"https://example.com\">Tom & Jerry</a>" : "&lt;a href=&quot;https://example.com&quot;&gt;Tom &amp; Jerry&lt;/a&gt;"}
          aria-label="Input"
          spellCheck={false}
          className="min-h-[120px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <ToolSection title="Mode">
        <div role="radiogroup" aria-label="Mode" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
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

      {result.error ? (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {result.error}
        </div>
      ) : result.value ? (
        <ToolSection
          title="Output"
          actions={
            <>
              <CopyButton value={result.value} />
              <DownloadButton value={result.value} filename="output.txt" />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-all">
            {result.value}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Code2 className="size-5" />}
          title="Result appears here"
          description="Enter text above to encode or decode HTML entities and JS string escapes."
        />
      )}
    </div>
  );
}
