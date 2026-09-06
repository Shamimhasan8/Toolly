"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Braces, Minimize2, Maximize2, Check, AlertTriangle, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "beautify" | "minify" | "validate";

export function JsonFormatter() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [indent, setIndent] = React.useState(2);
  const [mode, setMode] = React.useState<Mode>("beautify");

  const run = React.useCallback(
    (src: string, m: Mode, ind: number) => {
      if (!src.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        const parsed = JSON.parse(src);
        setError(null);
        if (m === "minify") setOutput(JSON.stringify(parsed));
        else if (m === "validate") setOutput(JSON.stringify(parsed, null, ind));
        else setOutput(JSON.stringify(parsed, null, ind));
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        setOutput("");
      }
    },
    []
  );

  React.useEffect(() => {
    run(input, mode, indent);
  }, [input, mode, indent, run]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="JSON input"
        actions={
          <>
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
              {(["beautify", "minify", "validate"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded px-2.5 py-1 text-xs font-medium capitalize transition",
                    mode === m
                      ? "bg-brand-strong text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={mode === m}
                >
                  {m === "beautify" ? (
                    <span className="inline-flex items-center gap-1"><Maximize2 className="size-3" /> Beautify</span>
                  ) : m === "minify" ? (
                    <span className="inline-flex items-center gap-1"><Minimize2 className="size-3" /> Minify</span>
                  ) : (
                    <span className="inline-flex items-center gap-1"><Check className="size-3" /> Validate</span>
                  )}
                </button>
              ))}
            </div>
            {input && (
              <button
                onClick={() => setInput("")}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Clear input"
              >
                <Eraser className="size-3.5" /> Clear
              </button>
            )}
          </>
        }
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'{"hello":"world","items":[1,2,3],"nested":{"ok":true}}'}
          aria-label="JSON input"
          spellCheck={false}
          className="min-h-[160px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {mode === "beautify" && (
        <div className="flex items-center gap-3 text-xs">
          <label className="font-medium text-muted-foreground">Indent:</label>
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
            {[2, 4, 0].map((n) => (
              <button
                key={n}
                onClick={() => setIndent(n)}
                className={cn(
                  "rounded px-2.5 py-1 text-xs font-medium transition",
                  indent === n
                    ? "bg-brand-strong text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {n === 0 ? "Tab" : `${n} sp`}
              </button>
            ))}
          </div>
        </div>
      )}

      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Invalid JSON</p>
            <p className="text-xs text-muted-foreground">{error}</p>
          </div>
        </div>
      ) : output ? (
        <ToolSection
          title={mode === "validate" ? "Valid JSON ✓" : "Output"}
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="output.json" mime="application/json" />
            </>
          }
        >
          <pre className="max-h-[400px] min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground">
            {output}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Braces className="size-5" />}
          title="Formatted JSON appears here"
          description="Paste your JSON above to beautify, minify, or validate it."
        />
      )}
    </div>
  );
}
