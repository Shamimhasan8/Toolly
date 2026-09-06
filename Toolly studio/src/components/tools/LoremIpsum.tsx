"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { FileText, RefreshCw } from "lucide-react";

const WORDS = `lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum at vero eos accusamus iusto odio dignissimos ducimus blanditiis praesent voluptatum deleniti atque corrupti quos quas molestias excepturi sint similique mollitia animi doloremque perspiciatis nemo voluptas quasi architecto beatae vitae dicta explicabo nemo enim ipsam voluptatem quia voluptas aspernatur aut odit fugit sed quia consequuntur magni dolores eos ratione sequi nesciunt neque porro quisquam dolorem ipsum quia sit amet consectetur adipisci velit sed non numquam eius modi tempora incidunt ut labore dolore magnam aliquam quaerat`.split(/\s+/u);

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeSentence() {
  const len = 8 + Math.floor(Math.random() * 14);
  const words = Array.from({ length: len }, () => rand(WORDS));
  const first = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  words[0] = first;
  // occasionally add a comma
  if (len > 6) {
    const comma = 3 + Math.floor(Math.random() * 3);
    words[comma] = words[comma] + ",";
  }
  return words.join(" ") + ".";
}

function makeParagraph() {
  const len = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: len }, makeSentence).join(" ");
}

function generate(paragraphs: number, sentencesPerParagraph: number, startWithLorem: boolean) {
  const out: string[] = [];
  for (let i = 0; i < paragraphs; i++) {
    let p = "";
    for (let j = 0; j < sentencesPerParagraph; j++) {
      p += (p ? " " : "") + makeSentence();
    }
    if (i === 0 && startWithLorem) {
      p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + p;
    }
    out.push(p);
  }
  return out.join("\n\n");
}

export function LoremIpsum() {
  const [paragraphs, setParagraphs] = React.useState(3);
  const [sentences, setSentences] = React.useState(4);
  const [startLorem, setStartLorem] = React.useState(true);
  const [output, setOutput] = React.useState("");

  const handleGenerate = () => {
    setOutput(generate(Math.max(1, Math.min(50, paragraphs)), Math.max(1, Math.min(20, sentences)), startLorem));
  };

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Options">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Paragraphs</span>
            <input
              type="number"
              min={1}
              max={50}
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value) || 1)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Sentences per paragraph</span>
            <input
              type="number"
              min={1}
              max={20}
              value={sentences}
              onChange={(e) => setSentences(Number(e.target.value) || 1)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={startLorem}
              onChange={(e) => setStartLorem(e.target.checked)}
              className="size-4 rounded border-border text-brand-strong focus:ring-ring"
            />
            <span className="text-sm">Start with "Lorem ipsum…"</span>
          </label>
        </div>
        <button
          onClick={handleGenerate}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-strong px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand"
        >
          <RefreshCw className="size-4" /> Generate
        </button>
      </ToolSection>

      {output ? (
        <ToolSection
          title="Generated text"
          actions={
            <>
              <CopyButton value={output} />
              <DownloadButton value={output} filename="lorem-ipsum.txt" />
            </>
          }
        >
          <div className="max-h-[360px] overflow-auto rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {output}
          </div>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<FileText className="size-5" />}
          title="Placeholder text appears here"
          description="Configure your options above and click Generate."
        />
      )}
    </div>
  );
}
