"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToolShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Common shell for an individual tool's UI. Provides consistent padding,
 * spacing, and a two-column responsive grid for input/output where helpful.
 */
export function ToolShell({ children, className }: ToolShellProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {children}
    </div>
  );
}

interface ToolSectionProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** A labeled panel within a tool — typically the input or output area. */
export function ToolSection({
  title,
  subtitle,
  actions,
  children,
  className,
}: ToolSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

interface ToolRowProps {
  children: React.ReactNode;
  className?: string;
}

/** Inline row of small controls (radio groups, toggles, sliders). */
export function ToolRow({ children, className }: ToolRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2",
        className
      )}
    >
      {children}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="max-w-md text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
