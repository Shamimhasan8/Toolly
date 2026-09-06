"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Fingerprint, RefreshCw } from "lucide-react";

type Version = "v4" | "v7";

function uuidv4(): string {
  if (crypto.randomUUID) return crypto.randomUUID();
  // Fallback
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  buf[6] = (buf[6] & 0x0f) | 0x40;
  buf[8] = (buf[8] & 0x3f) | 0x80;
  const hex = Array.from(buf).map((b) => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

// UUIDv7 — RFC 9562. Unix timestamp (ms) + version + random.
function uuidv7(): string {
  const ts = Date.now();
  const tsHex = ts.toString(16).padStart(12, "0");
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);
  // first 2 bytes of rand: top 4 bits = 7 (version), bottom 12 = random
  rand[0] = (rand[0] & 0x0f) | 0x70;
  rand[2] = (rand[2] & 0x3f) | 0x80; // variant 10xxxxxx

  const bytes = new Uint8Array(16);
  // First 6 bytes: timestamp (48 bits)
  for (let i = 0; i < 6; i++) bytes[i] = parseInt(tsHex.slice(i * 2, i * 2 + 2), 16);
  bytes[6] = rand[0];
  bytes[7] = rand[1];
  bytes[8] = rand[2];
  for (let i = 9; i < 16; i++) bytes[i] = rand[i - 7];

  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function UuidGenerator() {
  const [count, setCount] = React.useState(1);
  const [version, setVersion] = React.useState<Version>("v4");
  const [uppercase, setUppercase] = React.useState(false);
  const [ids, setIds] = React.useState<string[]>([]);

  const generate = React.useCallback(() => {
    const n = Math.max(1, Math.min(500, count));
    const fn = version === "v4" ? uuidv4 : uuidv7;
    const arr = Array.from({ length: n }, () => {
      const id = fn();
      return uppercase ? id.toUpperCase() : id;
    });
    setIds(arr);
  }, [count, version, uppercase]);

  // Generate one by default on first render
  React.useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Options">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Count</span>
            <input
              type="number"
              min={1}
              max={500}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Version</span>
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm w-fit">
              {(["v4", "v7"] as Version[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVersion(v)}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    version === v
                      ? "bg-brand-strong text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="size-4 rounded border-border text-brand-strong focus:ring-ring"
            />
            <span className="text-sm">Uppercase</span>
          </label>
        </div>
        <button
          onClick={generate}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-strong px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand-glow transition hover:bg-brand"
        >
          <RefreshCw className="size-4" /> Generate
        </button>
      </ToolSection>

      {ids.length ? (
        <ToolSection
          title={`${ids.length} UUID${ids.length > 1 ? "s" : ""} (${version.toUpperCase()})`}
          actions={<CopyButton value={ids.join("\n")} label="Copy all" />}
        >
          <pre className="max-h-[400px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
            {ids.join("\n")}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Fingerprint className="size-5" />}
          title="UUIDs appear here"
          description="Configure options above and click Generate."
        />
      )}
    </div>
  );
}
