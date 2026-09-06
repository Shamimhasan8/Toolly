"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Share2, ExternalLink } from "lucide-react";

export function OpenGraphGenerator() {
  const [title, setTitle] = React.useState("Toolly — Free Online Tools for Text, Code, Calculators & AI");
  const [description, setDescription] = React.useState("Powerful free tools for everyday work — text, developer, converters, calculators, generators, and AI. Simple experience. Free to use.");
  const [url, setUrl] = React.useState("https://toolly.tech");
  const [image, setImage] = React.useState("https://toolly.tech/og-image.png");
  const [siteName, setSiteName] = React.useState("Toolly");
  const [type, setType] = React.useState<"website" | "article" | "product">("website");

  const tags = React.useMemo(() => {
    const lines: string[] = [];
    if (title) lines.push(`<meta property="og:title" content="${title}" />`);
    if (description) lines.push(`<meta property="og:description" content="${description}" />`);
    if (url) lines.push(`<meta property="og:url" content="${url}" />`);
    lines.push(`<meta property="og:type" content="${type}" />`);
    if (siteName) lines.push(`<meta property="og:site_name" content="${siteName}" />`);
    if (image) {
      lines.push(`<meta property="og:image" content="${image}" />`);
      lines.push(`<meta property="og:image:width" content="1200" />`);
      lines.push(`<meta property="og:image:height" content="630" />`);
      lines.push(`<meta property="og:image:alt" content="${title || siteName}" />`);
    }
    return lines.join("\n");
  }, [title, description, url, image, siteName, type]);

  let domain = url;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    /* keep raw */
  }

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Open Graph fields">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-medium text-muted-foreground">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-medium text-muted-foreground">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              className="min-h-[80px] w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Page URL</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Image URL (1200×630)</span>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Site name</span>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
            </select>
          </label>
        </div>
      </ToolSection>

      <ToolSection title="Social preview">
        <div className="max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
          {image && (
            <img
              src={image}
              alt={title}
              className="aspect-[1200/630] w-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <div className="flex flex-col gap-1 p-4">
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              <ExternalLink className="size-3" /> {domain}
            </div>
            <h3 className="line-clamp-2 text-base font-semibold text-foreground">{title || "Your title"}</h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">{description || "Your description"}</p>
          </div>
        </div>
      </ToolSection>

      <ToolSection title="Generated tags" actions={<CopyButton value={tags} label="Copy tags" />}>
        <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all">
          {tags}
        </pre>
      </ToolSection>

      <EmptyState
        icon={<Share2 className="size-5" />}
        title="How to use"
        description="Paste these tags inside your <head>. Social platforms like Facebook, LinkedIn, and Twitter will use them to render a rich share preview."
      />
    </div>
  );
}
