"use client";

import * as React from "react";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { TrendingUp } from "lucide-react";

type Mode = "compound" | "calculate-principal" | "calculate-rate";

function fmt(n: number) {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1e15) return n.toExponential(4);
  return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState("10000");
  const [rate, setRate] = React.useState("8");
  const [years, setYears] = React.useState("10");
  const [freq, setFreq] = React.useState("12"); // compounding periods per year
  const [contrib, setContrib] = React.useState("0"); // per period
  const [contribFreq, setContribFreq] = React.useState<"monthly" | "yearly">("monthly");

  const result = React.useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const Y = parseFloat(years) || 0;
    const n = parseFloat(freq) || 1;
    const C = parseFloat(contrib) || 0;
    if (Y <= 0 || n <= 0) return null;
    const i = r / 100 / n;
    const periods = Y * n;
    // Future value of principal
    const fvP = P * Math.pow(1 + i, periods);
    // Future value of contributions (annuity)
    let fvC = 0;
    if (C > 0) {
      const cf = contribFreq === "monthly" ? 1 : n; // contributions per period relative to compounding
      const c = C * cf;
      if (i === 0) fvC = c * periods;
      else fvC = c * ((Math.pow(1 + i, periods) - 1) / i);
    }
    const totalContributions = (contribFreq === "monthly" ? C * 12 : C) * Y;
    const fv = fvP + fvC;
    const interest = fv - P - totalContributions;
    return {
      futureValue: fv,
      principalGrowth: fvP,
      contributionsGrowth: fvC,
      totalContributions,
      interest,
      years: Y,
    };
  }, [principal, rate, years, freq, contrib, contribFreq]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Investment parameters">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Principal</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
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
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Years</span>
            <input
              type="number"
              min={0}
              step="0.5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Compounding periods / year</span>
            <select
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              <option value="1">Annual (1)</option>
              <option value="2">Semi-annual (2)</option>
              <option value="4">Quarterly (4)</option>
              <option value="12">Monthly (12)</option>
              <option value="365">Daily (365)</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Recurring contribution</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={contrib}
              onChange={(e) => setContrib(e.target.value)}
              placeholder="0"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Contribution frequency</span>
            <select
              value={contribFreq}
              onChange={(e) => setContribFreq(e.target.value as "monthly" | "yearly")}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
        </div>
      </ToolSection>

      {result ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft px-6 py-5 text-center shadow-premium">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Future value in {result.years} yr</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground tabular-nums">
              {fmt(result.futureValue)}
            </p>
          </div>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Principal grows to</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.principalGrowth)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Contributions grow to</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.contributionsGrowth)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Total contributions</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-foreground">{fmt(result.totalContributions)}</div>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-premium">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Interest earned</div>
              <div className="mt-1 text-lg font-semibold tabular-nums text-brand-strong">{fmt(result.interest)}</div>
            </div>
          </section>

          <p className="text-xs text-muted-foreground">
            Formula: FV = P · (1 + r/n)<sup>n·t</sup> + C · [((1 + r/n)<sup>n·t</sup> − 1) / (r/n)]. Educational estimates only — actual returns and tax treatment vary.
          </p>
        </div>
      ) : (
        <EmptyState
          icon={<TrendingUp className="size-5" />}
          title="Future value appears here"
          description="Enter your investment parameters above."
        />
      )}
    </div>
  );
}
