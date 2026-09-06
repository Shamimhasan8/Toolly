"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { ArrowLeftRight, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "reverse-chars" | "reverse-words" | "reverse-lines" | "flip-text";

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: "reverse-chars", label: "Reverse characters", desc: "abc → cba" },
  { id: "reverse-words", label: "Reverse words", desc: "hello world → world hello" },
  { id: "reverse-lines", label: "Reverse lines", desc: "line order flipped" },
  { id: "flip-text", label: "Flip text (upside-down)", desc: "ʇxǝʇ uʍop-ǝpᴉsdn" },
];

// Upside-down character map (subset, common Latin + numbers + punctuation)
const FLIP_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l",
  m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
  y: "ʎ", z: "z",
  A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "ᖷ", G: "⅁", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥",
  M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ò", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X",
  Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄩ", "8": "8", "9": "6",
  ".": "˙",
  ",": "‘",
  "?": "¿",
  "!": "¡",
  '"': "„",
  "'": ",",
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "&": "⅋",
  "_": "‾",
};

function flipText(input: string): string {
  // Reverse string AND substitute upside-down glyphs
  const chars = Array.from(input);
  return chars
    .map((c) => (FLIP_MAP[c] !== undefined ? FLIP_MAP[c] : c))
    .reverse()
    .join("");
}

function transform(input: string, mode: Mode): string {
  if (!input) return "";
  switch (mode) {
    case "reverse-chars":
      return Array.from(input).reverse().join("");
    case "reverse-words":
      return input
        .split(/\s+/u)
        .filter((s) => s.length > 0)
        .reverse()
        .join(" ");
    case "reverse-lines":
      return input.split(/\n/u).reverse().join("\n");
    case "flip-text":
      return flipText(input);
  }
}

export function TextReverser() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("reverse-chars");
  const output = React.useMemo(() => transform(text, mode), [text, mode]);

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
          placeholder="Type or paste text to transform…"
          aria-label="Input text"
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

      {output ? (
        <ToolSection
          title="Output"
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="reversed.txt" />
            </>
          }
        >
          <pre className="min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {output}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<ArrowLeftRight className="size-5" />}
          title="Reversed text appears here"
          description="Enter text above and pick a transformation mode."
        />
      )}
    </div>
  );
}
