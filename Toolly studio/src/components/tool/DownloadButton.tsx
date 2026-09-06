"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DownloadButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** The text content to save as a file */
  value: string;
  /** Suggested file name (e.g. "result.json") */
  filename?: string;
  /** MIME type — defaults to text/plain */
  mime?: string;
  label?: string;
}

export function DownloadButton({
  value,
  filename = "toolly-output.txt",
  mime = "text/plain",
  label = "Download",
  className,
  ...props
}: DownloadButtonProps) {
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const blob = new Blob([value], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success(`Saved as ${filename}`);
  };

  return (
    <button
      type="button"
      onClick={handle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Download className="size-3.5" />
      <span>{label}</span>
    </button>
  );
}
