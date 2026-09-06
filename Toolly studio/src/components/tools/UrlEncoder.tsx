"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Link2, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "encode" | "decode" | "encode-component";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "encode", label: "encodeURIComponent", desc: "Encodes entire string except [A-Za-z0-9-_.!~*'()]" },
  { id: "decode", label: "decodeURIComponent", desc: "Decodes %-encoded string" },
  { id: "encode-component", label: "encodeURI", desc: "Does not encode :/?#[]@!$&'()*+,;=" },
];

function run(input: string, mode: Mode): { value: string; error: string | null } {
  if (!input) return { value: "", error: null };
  try {
    if (mode === "encode") return { value: encodeURIComponent(input), error: null };
    if (mode === "encode-component") return { value: encodeURI(input), error: null };
    return { value: decodeURIComponent(input), error: null };
  } catch {
    return { value: "", error: "Invalid encoded input — check for stray % characters." };
  }
}

export function UrlEncoder() {
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
          placeholder={mode === "decode" ? "https%3A%2F%2Fexample.com%2F%3Fq%3Dhello" : "https://example.com/?q=hello world"}
          aria-label="Input"
          spellCheck={false}
          className="min-h-[120px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <ToolSection title="Function">
        <div role="radiogroup" aria-label="Function" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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
                <span className="font-mono text-sm font-semibold">{m.label}</span>
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
              <DownloadButton value={result.value} filename="url.txt" />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-all">
            {result.value}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Link2 className="size-5" />}
          title="Result appears here"
          description="Enter text above to encode or decode."
        />
      )}
    </div>
  );
}
