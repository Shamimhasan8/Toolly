"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection } from "@/components/tool/ToolShell";
import { TextCursor, Eraser } from "lucide-react";

export function WordCounter() {
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/u).filter(Boolean).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const sentences = trimmed
      ? (trimmed.match(/[^.!?\n]+[.!?]+|\S[^.!?\n]*$/g) || []).length
      : 0;
    const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter(Boolean).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    const readingMins = words / 200; // ~200 wpm adult average
    const speakingMins = words / 130; // ~130 wpm speaking average
    const fmt = (m: number) => {
      if (m <= 0) return "0 sec";
      if (m < 1) return `${Math.round(m * 60)} sec`;
      const mins = Math.floor(m);
      const secs = Math.round((m - mins) * 60);
      return secs ? `${mins} min ${secs} sec` : `${mins} min`;
    };
    return { words, chars, charsNoSpaces, sentences, paragraphs, lines, readingMins: fmt(readingMins), speakingMins: fmt(speakingMins) };
  }, [text]);

  const tiles = [
    { label: "Words", value: stats.words.toLocaleString() },
    { label: "Characters", value: stats.chars.toLocaleString() },
    { label: "Characters (no spaces)", value: stats.charsNoSpaces.toLocaleString() },
    { label: "Sentences", value: stats.sentences.toLocaleString() },
    { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
    { label: "Lines", value: stats.lines.toLocaleString() },
    { label: "Reading time", value: stats.readingMins },
    { label: "Speaking time", value: stats.speakingMins },
  ];

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Your text"
        subtitle="Type or paste your text — counters update live."
        actions={
          <>
            {text && (
              <button
                onClick={() => setText("")}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Clear text"
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
          placeholder="Start typing or paste your text here…"
          aria-label="Text to analyze"
          className="min-h-[180px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <section aria-label="Text statistics" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium"
          >
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t.label}
            </div>
            <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">
              {t.value}
            </div>
          </div>
        ))}
      </section>

      {text && (
        <ToolSection
          title="Text"
          actions={
            <>
              <CopyButton value={text} />
              <DownloadButton value={text} filename="text.txt" />
            </>
          }
        >
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-xs text-muted-foreground">
              <TextCursor className="mr-1 inline size-3.5" />
              Your text is ready to copy or download above.
            </p>
          </div>
        </ToolSection>
      )}
    </div>
  );
}
