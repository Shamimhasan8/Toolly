"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Hash, Eraser, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Algo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const ALGOS: Algo[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

async function digest(input: string, algo: Algo): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest(algo, data);
  const bytes = new Uint8Array(buf);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGenerator() {
  const [text, setText] = React.useState("");
  const [hashes, setHashes] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!text) {
      setHashes({});
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all(ALGOS.map(async (a) => [a, await digest(text, a)] as const))
      .then((entries) => {
        if (cancelled) return;
        setHashes(Object.fromEntries(entries));
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Text to hash"
        subtitle="SHA-1, SHA-256, SHA-384, SHA-512 — computed in your browser via Web Crypto."
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
          placeholder="Type any text to compute cryptographic hashes…"
          aria-label="Text to hash"
          spellCheck={false}
          className="min-h-[120px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {text && !loading && Object.keys(hashes).length ? (
        <div className="flex flex-col gap-3">
          {ALGOS.map((a) => (
            <ToolSection
              key={a}
              title={a}
              actions={<CopyButton value={hashes[a]} label="Copy" />}
            >
              <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-xs text-foreground break-all">
                {hashes[a]}
              </code>
            </ToolSection>
          ))}
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-12 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Computing hashes…
        </div>
      ) : (
        <EmptyState
          icon={<Hash className="size-5" />}
          title="Hashes appear here"
          description="Type text above to compute SHA-1, SHA-256, SHA-384, and SHA-512."
        />
      )}

      <p className="text-xs text-muted-foreground">
        Tip — for password storage, never use plain SHA hashes; use a slow KDF like bcrypt, scrypt, or Argon2. SHA is great for checksums and identifiers, not passwords.
      </p>
    </div>
  );
}
