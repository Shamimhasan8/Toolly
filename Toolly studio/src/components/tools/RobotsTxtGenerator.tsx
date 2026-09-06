"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Bot, Plus, Trash2 } from "lucide-react";

interface Rule {
  id: string;
  userAgent: string;
  allow: string;
  disallow: string;
}

let ruleId = 1;
const newRule = (): Rule => ({ id: `r${ruleId++}`, userAgent: "*", allow: "", disallow: "" });

export function RobotsTxtGenerator() {
  const [rules, setRules] = React.useState<Rule[]>([
    { id: "r0", userAgent: "*", allow: "", disallow: "/admin\n/private" },
  ]);
  const [sitemap, setSitemap] = React.useState("https://toolly.tech/sitemap.xml");
  const [crawlDelay, setCrawlDelay] = React.useState("");

  const add = () => setRules((r) => [...r, newRule()]);
  const remove = (id: string) => setRules((r) => r.filter((x) => x.id !== id));
  const update = (id: string, patch: Partial<Rule>) =>
    setRules((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const text = React.useMemo(() => {
    const lines: string[] = [];
    for (const rule of rules) {
      lines.push(`User-agent: ${rule.userAgent || "*"}`);
      if (rule.allow) {
        for (const p of rule.allow.split(/\n/).map((s) => s.trim()).filter(Boolean))
          lines.push(`Allow: ${p}`);
      }
      if (rule.disallow) {
        for (const p of rule.disallow.split(/\n/).map((s) => s.trim()).filter(Boolean))
          lines.push(`Disallow: ${p}`);
      }
      if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
      lines.push("");
    }
    if (sitemap) lines.push(`Sitemap: ${sitemap}`);
    return lines.join("\n").replace(/\s+\n/g, "\n").trim() + "\n";
  }, [rules, sitemap, crawlDelay]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Rules"
        actions={
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
          >
            <Plus className="size-3.5" /> Add rule
          </button>
        }
      >
        <div className="flex flex-col gap-3">
          {rules.map((rule) => (
            <div key={rule.id} className="rounded-xl border border-border bg-background p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rule</h4>
                <button
                  onClick={() => remove(rule.id)}
                  disabled={rules.length <= 1}
                  className="rounded p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Remove rule"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">User-agent</span>
                  <input
                    type="text"
                    value={rule.userAgent}
                    onChange={(e) => update(rule.id, { userAgent: e.target.value })}
                    placeholder="*"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Allow (one per line)</span>
                  <textarea
                    value={rule.allow}
                    onChange={(e) => update(rule.id, { allow: e.target.value })}
                    placeholder="/public"
                    className="min-h-[80px] resize-y rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Disallow (one per line)</span>
                  <textarea
                    value={rule.disallow}
                    onChange={(e) => update(rule.id, { disallow: e.target.value })}
                    placeholder="/admin"
                    className="min-h-[80px] resize-y rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </ToolSection>

      <ToolSection title="Sitemap & crawl delay">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Sitemap URL</span>
            <input
              type="url"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Crawl-delay (seconds, optional)</span>
            <input
              type="number"
              min={0}
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              placeholder="e.g. 10"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>
      </ToolSection>

      {text ? (
        <ToolSection
          title="robots.txt"
          actions={
            <>
              <CopyButton value={text} label="Copy" />
              <DownloadButton value={text} filename="robots.txt" />
            </>
          }
        >
          <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap">
            {text}
          </pre>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Bot className="size-5" />}
          title="Generated robots.txt appears here"
          description="Configure rules above to generate a robots.txt file."
        />
      )}
    </div>
  );
}
