"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Sparkles, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  label: string;
  defaultChecked: boolean;
}

const OPTIONS: Option[] = [
  { id: "trim-lines", label: "Trim each line", defaultChecked: true },
  { id: "collapse-spaces", label: "Collapse multiple spaces", defaultChecked: true },
  { id: "remove-empty-lines", label: "Remove empty lines", defaultChecked: false },
  { id: "trim-trailing-newlines", label: "Trim trailing newlines", defaultChecked: true },
  { id: "normalize-to-lf", label: "Normalize line endings (LF)", defaultChecked: true },
  { id: "remove-non-printable", label: "Remove non-printable chars", defaultChecked: false },
  { id: "remove-extra-blank-lines", label: "Collapse 2+ blank lines to one", defaultChecked: true },
  { id: "unescape-html", label: "Unescape HTML entities", defaultChecked: false },
];

function clean(input: string, opts: Record<string, boolean>): string {
  let out = input;
  if (opts["normalize-to-lf"]) out = out.replace(/\r\n?/g, "\n");
  if (opts["trim-lines"]) out = out.split("\n").map((l) => l.replace(/^\s+|\s+$/g, "")).join("\n");
  if (opts["collapse-spaces"]) out = out.replace(/[ \t]+/g, " ");
  if (opts["remove-extra-blank-lines"]) out = out.replace(/\n{2,}/g, "\n");
  if (opts["remove-empty-lines"]) out = out.split("\n").filter((l) => l.trim() !== "").join("\n");
  if (opts["trim-trailing-newlines"]) out = out.replace(/\n+$/g, "");
  if (opts["remove-non-printable"])
    out = out.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  if (opts["unescape-html"]) {
    out = out
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&nbsp;/g, " ");
  }
  return out;
}

export function WhitespaceCleaner() {
  const [text, setText] = React.useState("");
  const [opts, setOpts] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(OPTIONS.map((o) => [o.id, o.defaultChecked]))
  );

  const output = React.useMemo(() => clean(text, opts), [text, opts]);

  const toggle = (id: string) => setOpts((o) => ({ ...o, [id]: !o[id] }));

  const savedChars = Math.max(0, text.length - output.length);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Input text"
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
          placeholder="Paste text with messy whitespace…"
          aria-label="Input text"
          className="min-h-[140px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <ToolSection title="Cleaning options">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <label
              key={o.id}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm transition-all cursor-pointer",
                opts[o.id]
                  ? "border-brand-strong bg-brand-soft"
                  : "border-border bg-background hover:bg-accent"
              )}
            >
              <input
                type="checkbox"
                checked={opts[o.id]}
                onChange={() => toggle(o.id)}
                className="size-4 rounded border-border text-brand-strong focus:ring-ring"
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </ToolSection>

      {output ? (
        <ToolSection
          title="Cleaned text"
          subtitle={savedChars > 0 ? `${savedChars} character(s) removed` : undefined}
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="cleaned.txt" />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {output}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Sparkles className="size-5" />}
          title="Cleaned text appears here"
          description="Paste text above and select the cleaning options you want."
        />
      )}
    </div>
  );
}
