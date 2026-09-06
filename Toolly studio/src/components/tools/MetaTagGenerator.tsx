"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Tags } from "lucide-react";

export function MetaTagGenerator() {
  const [title, setTitle] = React.useState("Toolly — Free Online Tools for Text, Code, Calculators & AI");
  const [description, setDescription] = React.useState("Powerful free tools for everyday work — text, developer, converters, calculators, generators, and AI. Simple experience. Free to use.");
  const [url, setUrl] = React.useState("https://toolly.tech");
  const [image, setImage] = React.useState("https://toolly.tech/og-image.png");
  const [siteName, setSiteName] = React.useState("Toolly");
  const [twitter, setTwitter] = React.useState("@toolly");
  const [keywords, setKeywords] = React.useState("free tools, online tools, developer tools, AI tools");

  const tags = React.useMemo(() => {
    const lines: string[] = [];
    if (title) lines.push(`<title>${title}</title>`);
    if (description) lines.push(`<meta name="description" content="${description}" />`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}" />`);
    lines.push(`<link rel="canonical" href="${url}" />`);
    if (title) lines.push(`<meta property="og:title" content="${title}" />`);
    if (description) lines.push(`<meta property="og:description" content="${description}" />`);
    lines.push(`<meta property="og:url" content="${url}" />`);
    lines.push(`<meta property="og:type" content="website" />`);
    if (siteName) lines.push(`<meta property="og:site_name" content="${siteName}" />`);
    if (image) lines.push(`<meta property="og:image" content="${image}" />`);
    if (twitter) lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (title) lines.push(`<meta name="twitter:title" content="${title}" />`);
    if (description) lines.push(`<meta name="twitter:description" content="${description}" />`);
    if (image) lines.push(`<meta name="twitter:image" content="${image}" />`);
    if (twitter) lines.push(`<meta name="twitter:site" content="${twitter}" />`);
    return lines.join("\n");
  }, [title, description, url, image, siteName, twitter, keywords]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Page information">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-medium text-muted-foreground">Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={70}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
            <span className="text-[10px] text-muted-foreground">{title.length}/60 recommended</span>
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-medium text-muted-foreground">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              className="min-h-[80px] w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
            <span className="text-[10px] text-muted-foreground">{description.length}/155 recommended</span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Canonical URL</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">OG image URL</span>
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
            <span className="text-xs font-medium text-muted-foreground">Twitter handle</span>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="@handle"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-medium text-muted-foreground">Keywords (comma-separated)</span>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>
      </ToolSection>

      <ToolSection title="Generated tags" actions={<CopyButton value={tags} label="Copy tags" />}>
        <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all">
          {tags}
        </pre>
      </ToolSection>

      <EmptyState
        icon={<Tags className="size-5" />}
        title="Tip"
        description="Paste these tags inside your <head> tag. Title and description carry the most SEO weight — keep them descriptive and unique per page."
      />
    </div>
  );
}
