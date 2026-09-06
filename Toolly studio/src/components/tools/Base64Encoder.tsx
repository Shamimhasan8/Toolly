"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { ArrowLeftRight, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "encode" | "decode";

function encode(input: string): { value: string; error?: string } {
  try {
    // Convert string to UTF-8 bytes, then base64
    const bytes = new TextEncoder().encode(input);
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    return { value: btoa(bin) };
  } catch (e) {
    return { value: "", error: e instanceof Error ? e.message : String(e) };
  }
}

function decode(input: string): { value: string; error?: string } {
  try {
    const cleaned = input.replace(/\s+/g, "");
    const bin = atob(cleaned);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { value: new TextDecoder().decode(bytes) };
  } catch (e) {
    return { value: "", error: "Not valid Base64 — please check your input." };
  }
}

export function Base64Encoder() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("encode");
  const result = React.useMemo(() => {
    if (!text) return { value: "", error: null as string | null };
    const r = mode === "encode" ? encode(text) : decode(text);
    return { value: r.value, error: r.error ?? null };
  }, [text, mode]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title={mode === "encode" ? "Plain text input" : "Base64 input"}
        actions={
          <>
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
              {(["encode", "decode"] as Mode[]).map((m) => (
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
                  {m}
                </button>
              ))}
            </div>
            {text && (
              <button
                onClick={() => setText("")}
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === "encode" ? "Type text to encode…" : "Paste Base64 to decode…"}
          aria-label="Input"
          spellCheck={false}
          className="min-h-[120px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {result.error ? (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {result.error}
        </div>
      ) : result.value ? (
        <ToolSection
          title={mode === "encode" ? "Base64 output" : "Decoded text"}
          actions={
            <>
              <CopyButton value={result.value} />
              <DownloadButton value={result.value} filename={mode === "encode" ? "encoded.b64" : "decoded.txt"} />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-all">
            {result.value}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<ArrowLeftRight className="size-5" />}
          title="Result appears here"
          description="Enter text above to encode or decode Base64."
        />
      )}
    </div>
  );
}
