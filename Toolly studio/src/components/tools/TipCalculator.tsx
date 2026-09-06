"use client";

import * as React from "react";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Receipt } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function TipCalculator() {
  const [bill, setBill] = React.useState("50");
  const [tipPct, setTipPct] = React.useState("15");
  const [people, setPeople] = React.useState("1");
  const [roundUp, setRoundUp] = React.useState(false);

  const result = React.useMemo(() => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPct);
    const p = parseInt(people, 10);
    if (!b || !t || !p || b <= 0 || t < 0 || p <= 0) return null;
    const tip = (b * t) / 100;
    const total = b + tip;
    let perPerson = total / p;
    let tipPerPerson = tip / p;
    if (roundUp) {
      const rounded = Math.ceil(perPerson);
      tipPerPerson = (rounded * p) - b;
      perPerson = rounded;
    }
    return {
      tip,
      total,
      perPerson,
      tipPerPerson,
    };
  }, [bill, tipPct, people, roundUp]);

  const tipPresets = [10, 15, 18, 20, 25];

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Bill details">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Bill amount</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="50"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Tip (%)</span>
            <input
              type="number"
              min={0}
              step="0.5"
              value={tipPct}
              onChange={(e) => setTipPct(e.target.value)}
              placeholder="15"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
            <div className="flex gap-1">
              {tipPresets.map((p) => (
                <button
                  key={p}
                  onClick={() => setTipPct(String(p))}
                  className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${
                    tipPct === String(p)
                      ? "bg-brand-strong text-primary-foreground"
                      : "border border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">People</span>
            <input
              type="number"
              min={1}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="1"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="size-4 rounded border-border text-brand-strong focus:ring-ring"
          />
          <span>Round up each share to the next whole unit</span>
        </label>
      </ToolSection>

      {result ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft px-6 py-5 text-center shadow-premium">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Each person pays</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground tabular-nums">
              {fmt(result.perPerson)}
            </p>
          </div>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tip</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.tip)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tip / person</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.tipPerPerson)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Bill total</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.total)}</div>
            </div>
          </section>
        </div>
      ) : (
        <EmptyState
          icon={<Receipt className="size-5" />}
          title="Tip and totals appear here"
          description="Enter your bill amount, tip %, and number of people."
        />
      )}
    </div>
  );
}
