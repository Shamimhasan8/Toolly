"use client";

import * as React from "react";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Landmark } from "lucide-react";

function fmt(n: number) {
  if (!isFinite(n) || isNaN(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function LoanCalculator() {
  const [principal, setPrincipal] = React.useState("250000");
  const [rate, setRate] = React.useState("7.5");
  const [years, setYears] = React.useState("20");

  const result = React.useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const Y = parseFloat(years);
    if (!P || !r || !Y || P <= 0 || r < 0 || Y <= 0) return null;
    const n = Y * 12;
    const i = r / 100 / 12;
    if (i === 0) {
      const emi = P / n;
      const total = P;
      return { emi, total, interest: 0, months: n };
    }
    const factor = Math.pow(1 + i, n);
    const emi = (P * i * factor) / (factor - 1);
    const total = emi * n;
    return { emi, total, interest: total - P, months: n };
  }, [principal, rate, years]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Loan details">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Principal</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="250000"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Annual rate (%)</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="7.5"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Tenure (years)</span>
            <input
              type="number"
              min={0}
              step="0.5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="20"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>
      </ToolSection>

      {result ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft px-6 py-5 text-center shadow-premium">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly payment</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground tabular-nums">
              {fmt(result.emi)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{result.months} payments</p>
          </div>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Principal</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(parseFloat(principal) || 0)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total interest</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.interest)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total paid</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.total)}</div>
            </div>
          </section>

          <p className="text-xs text-muted-foreground">
            Uses the standard amortization formula: EMI = P · i · (1 + i)<sup>n</sup> / ((1 + i)<sup>n</sup> − 1), where i = annual rate / 12 / 100 and n = number of monthly payments.
          </p>
        </div>
      ) : (
        <EmptyState
          icon={<Landmark className="size-5" />}
          title="Monthly payment appears here"
          description="Enter your loan amount, rate, and tenure above."
        />
      )}
    </div>
  );
}
