"use client";

import * as React from "react";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Cake, Calendar } from "lucide-react";

function parseDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prev = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

interface ComputeResult {
  result: {
    years: number; months: number; days: number;
    totalDays: number; totalHours: number; totalMinutes: number;
    weeks: number; monthsTotal: number; daysToNext: number;
  } | null;
  error: string | null;
}

function compute(birth: string, target: string): ComputeResult {
  const from = parseDate(birth);
  const to = parseDate(target);
  if (!from || !to) return { result: null, error: null };
  if (to < from) return { result: null, error: "Target date must be after the birth date" };

  const { years, months, days } = diffYMD(from, to);
  const totalDays = Math.floor((to.getTime() - from.getTime()) / 86400000);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const weeks = Math.floor(totalDays / 7);
  const monthsTotal = years * 12 + months;

  let nextBMonth = from.getMonth();
  let nextBDay = from.getDate();
  let nextBYear = to.getFullYear();
  if (nextBMonth < to.getMonth() || (nextBMonth === to.getMonth() && nextBDay <= to.getDate())) {
    nextBYear += 1;
  }
  const nextB = new Date(nextBYear, nextBMonth, nextBDay);
  const daysToNext = Math.ceil((nextB.getTime() - to.getTime()) / 86400000);

  return {
    result: {
      years, months, days,
      totalDays, totalHours, totalMinutes,
      weeks, monthsTotal,
      daysToNext: Math.max(0, daysToNext),
    },
    error: null,
  };
}

export function AgeCalculator() {
  const [birth, setBirth] = React.useState("");
  const [target, setTarget] = React.useState(() => new Date().toISOString().slice(0, 10));
  const { result, error } = React.useMemo(() => compute(birth, target), [birth, target]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Birth date">
        <input
          type="date"
          value={birth}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setBirth(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      <ToolSection title="Age at date" subtitle="Defaults to today.">
        <input
          type="date"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : result ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft px-6 py-5 text-center shadow-premium">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your age</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              {result.years}<span className="text-base font-normal text-muted-foreground"> yr</span>{" "}
              {result.months}<span className="text-base font-normal text-muted-foreground"> mo</span>{" "}
              {result.days}<span className="text-base font-normal text-muted-foreground"> d</span>
            </p>
          </div>

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Total months", value: result.monthsTotal.toLocaleString() },
              { label: "Total weeks", value: result.weeks.toLocaleString() },
              { label: "Total days", value: result.totalDays.toLocaleString() },
              { label: "Total hours", value: result.totalHours.toLocaleString() },
              { label: "Total minutes", value: result.totalMinutes.toLocaleString() },
              { label: "Next birthday in", value: `${result.daysToNext} day${result.daysToNext === 1 ? "" : "s"}` },
            ].map((t) => (
              <div key={t.label} className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{t.label}</div>
                <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{t.value}</div>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <EmptyState
          icon={<Cake className="size-5" />}
          title="Age appears here"
          description="Enter a birth date above to calculate age."
        />
      )}
    </div>
  );
}
