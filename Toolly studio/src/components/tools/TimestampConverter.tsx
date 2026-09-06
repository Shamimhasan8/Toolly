"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Clock, Calendar, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "to-date" | "to-timestamp";

function pad(n: number, w = 2) {
  return String(n).padStart(w, "0");
}

function fmtUTC(d: Date) {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}
function fmtLocal(d: Date) {
  return d.toLocaleString();
}
function fmtISO(d: Date) {
  return d.toISOString();
}

export function TimestampConverter() {
  const [ts, setTs] = React.useState("");
  const [dateStr, setDateStr] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("to-date");
  const [error, setError] = React.useState<string | null>(null);
  const [now, setNow] = React.useState<number>(Date.now());

  // Tick the "now" display every second
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Compute on mode change
  const result = React.useMemo(() => {
    setError(null);
    if (mode === "to-date") {
      const v = ts.trim();
      if (!v) return null;
      const n = Number(v);
      if (isNaN(n)) { setError("Timestamp must be a number"); return null; }
      // Auto-detect seconds vs ms
      const ms = v.length > 10 ? n : n * 1000;
      const d = new Date(ms);
      if (isNaN(d.getTime())) { setError("Invalid timestamp"); return null; }
      return {
        utc: fmtUTC(d),
        local: fmtLocal(d),
        iso: fmtISO(d),
        ms: ms,
      };
    } else {
      const v = dateStr.trim();
      if (!v) return null;
      const d = new Date(v);
      if (isNaN(d.getTime())) { setError("Invalid date — try ISO format like 2026-08-26T10:00:00Z"); return null; }
      return {
        seconds: Math.floor(d.getTime() / 1000),
        ms: d.getTime(),
      };
    }
  }, [ts, dateStr, mode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-brand/30 bg-brand-soft px-4 py-3 text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <Clock className="size-4 text-brand-strong" />
          <span className="font-mono tabular-nums">{Math.floor(now / 1000)}</span>
          <span className="text-muted-foreground">seconds (now)</span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="font-mono tabular-nums">{now}</span>
          <span className="text-muted-foreground">ms</span>
        </div>
      </div>

      <ToolSection
        title={mode === "to-date" ? "Unix timestamp" : "Date string"}
        subtitle={mode === "to-date" ? "Seconds or milliseconds — detected automatically." : "ISO 8601 (e.g. 2026-08-26T10:00:00Z) works best."}
        actions={
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
            {(["to-date", "to-timestamp"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded px-2.5 py-1 text-xs font-medium transition",
                  mode === m
                    ? "bg-brand-strong text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m === "to-date" ? "→ Date" : "→ Timestamp"}
              </button>
            ))}
          </div>
        }
      >
        <input
          type="text"
          value={mode === "to-date" ? ts : dateStr}
          onChange={(e) => (mode === "to-date" ? setTs(e.target.value) : setDateStr(e.target.value))}
          placeholder={mode === "to-date" ? "1774867200" : "2026-08-26T10:00:00Z"}
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-base shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : result ? (
        <div className="flex flex-col gap-3">
          {mode === "to-date" ? (
            <>
              <ToolSection title="UTC" actions={<CopyButton value={(result as { utc: string }).utc} />}>
                <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-sm text-foreground">
                  {(result as { utc: string }).utc}
                </code>
              </ToolSection>
              <ToolSection title="Local time" actions={<CopyButton value={(result as { local: string }).local} />}>
                <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-sm text-foreground">
                  {(result as { local: string }).local}
                </code>
              </ToolSection>
              <ToolSection title="ISO 8601" actions={<CopyButton value={(result as { iso: string }).iso} />}>
                <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-sm text-foreground">
                  {(result as { iso: string }).iso}
                </code>
              </ToolSection>
              <ToolSection title="Milliseconds" actions={<CopyButton value={String((result as { ms: number }).ms)} />}>
                <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-sm text-foreground">
                  {(result as { ms: number }).ms}
                </code>
              </ToolSection>
            </>
          ) : (
            <>
              <ToolSection title="Unix timestamp (seconds)" actions={<CopyButton value={String((result as { seconds: number }).seconds)} />}>
                <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-lg text-foreground">
                  {(result as { seconds: number }).seconds}
                </code>
              </ToolSection>
              <ToolSection title="Milliseconds" actions={<CopyButton value={String((result as { ms: number }).ms)} />}>
                <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-3 font-mono text-lg text-foreground">
                  {(result as { ms: number }).ms}
                </code>
              </ToolSection>
            </>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Calendar className="size-5" />}
          title="Result appears here"
          description="Enter a timestamp or date above to convert."
        />
      )}
    </div>
  );
}
