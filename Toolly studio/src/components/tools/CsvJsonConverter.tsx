"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Table2, ArrowLeftRight, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "csv-to-json" | "json-to-csv";

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

function csvToJson(csv: string): { value: string; error: string | null } {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (!lines.length) return { value: "", error: null };
  const headers = parseCsvLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = cells[i] ?? ""; });
    return obj;
  });
  return { value: JSON.stringify(rows, null, 2), error: null };
}

function jsonToCsv(json: string): { value: string; error: string | null } {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { value: "", error: "Invalid JSON" };
  }
  const arr = Array.isArray(data) ? data : [data];
  if (!arr.length) return { value: "", error: null };
  const keys = Array.from(
    arr.reduce((set, row) => {
      if (row && typeof row === "object") {
        Object.keys(row as Record<string, unknown>).forEach((k) => set.add(k));
      }
      return set;
    }, new Set<string>())
  );
  if (!keys.length) return { value: "", error: "JSON must be an array of objects" };

  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const lines = [keys.join(",")];
  for (const row of arr) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    lines.push(keys.map((k) => esc(r[k])).join(","));
  }
  return { value: lines.join("\n"), error: null };
}

export function CsvJsonConverter() {
  const [text, setText] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("csv-to-json");
  const result = React.useMemo(() => {
    if (!text.trim()) return { value: "", error: null as string | null };
    return mode === "csv-to-json" ? csvToJson(text) : jsonToCsv(text);
  }, [text, mode]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title={mode === "csv-to-json" ? "CSV input" : "JSON input"}
        subtitle={mode === "csv-to-json" ? "First row should contain headers. Quoted fields are supported." : "Paste a JSON array of objects (or a single object)."}
        actions={
          <>
            <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm">
              {(["csv-to-json", "json-to-csv"] as Mode[]).map((m) => (
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
                  {m === "csv-to-json" ? "CSV → JSON" : "JSON → CSV"}
                </button>
              ))}
            </div>
            {text && (
              <button
                onClick={() => setText("")}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Clear"
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
          placeholder={mode === "csv-to-json" ? "name,age,city\nAlice,30,London\nBob,25,Paris" : '[\n  {"name":"Alice","age":30,"city":"London"},\n  {"name":"Bob","age":25,"city":"Paris"}\n]'}
          spellCheck={false}
          className="min-h-[160px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {result.error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {result.error}
        </div>
      ) : result.value ? (
        <ToolSection
          title={mode === "csv-to-json" ? "JSON output" : "CSV output"}
          actions={
            <>
              <CopyButton value={result.value} />
              <DownloadButton
                value={result.value}
                filename={mode === "csv-to-json" ? "data.json" : "data.csv"}
                mime={mode === "csv-to-json" ? "application/json" : "text/csv"}
              />
            </>
          }
        >
          <pre className="max-h-[400px] min-h-[80px] w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all">
            {result.value}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Table2 className="size-5" />}
          title="Converted output appears here"
          description="Paste your CSV or JSON above to convert."
        />
      )}
    </div>
  );
}
