"use client";

import * as React from "react";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Activity } from "lucide-react";

type System = "metric" | "imperial";

function round(n: number, d = 1) {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
}

function bmiCategory(bmi: number): { label: string; className: string } {
  if (bmi < 18.5) return { label: "Underweight", className: "text-amber-600" };
  if (bmi < 25) return { label: "Healthy", className: "text-brand-strong" };
  if (bmi < 30) return { label: "Overweight", className: "text-amber-600" };
  return { label: "Obese", className: "text-destructive" };
}

export function BmiCalculator() {
  const [system, setSystem] = React.useState<System>("metric");
  const [weight, setWeight] = React.useState("");
  const [heightCm, setHeightCm] = React.useState("");
  const [ft, setFt] = React.useState("");
  const [inch, setInch] = React.useState("");

  const result = React.useMemo(() => {
    if (system === "metric") {
      const w = parseFloat(weight);
      const h = parseFloat(heightCm);
      if (!w || !h || w <= 0 || h <= 0) return null;
      const m = h / 100;
      const bmi = w / (m * m);
      return { bmi: round(bmi, 1), weightKg: w, heightCm: h };
    } else {
      const w = parseFloat(weight);
      const f = parseFloat(ft) || 0;
      const i = parseFloat(inch) || 0;
      const totalInches = f * 12 + i;
      if (!w || totalInches <= 0 || w <= 0) return null;
      // BMI = 703 * lb / in^2
      const bmi = (703 * w) / (totalInches * totalInches);
      return { bmi: round(bmi, 1), weightKg: w * 0.45359237, heightCm: totalInches * 2.54 };
    }
  }, [system, weight, heightCm, ft, inch]);

  const cat = result ? bmiCategory(result.bmi) : null;

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Measurement system">
        <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shadow-sm w-fit">
          {(["metric", "imperial"] as System[]).map((s) => (
            <button
              key={s}
              onClick={() => setSystem(s)}
              className={`rounded px-3 py-1.5 text-xs font-medium capitalize transition ${
                system === s
                  ? "bg-brand-strong text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolSection title="Your measurements">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Weight ({system === "metric" ? "kg" : "lb"})
            </span>
            <input
              type="number"
              min={0}
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={system === "metric" ? "70" : "154"}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>

          {system === "metric" ? (
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Height (cm)</span>
              <input
                type="number"
                min={0}
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="175"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
              />
            </label>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Feet</span>
                <input
                  type="number"
                  min={0}
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                  placeholder="5"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Inches</span>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={inch}
                  onChange={(e) => setInch(e.target.value)}
                  placeholder="9"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
                />
              </label>
            </div>
          )}
        </div>
      </ToolSection>

      {result && cat ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brand/30 bg-brand-soft px-6 py-5 text-center shadow-premium">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">BMI</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground tabular-nums">
              {result.bmi.toFixed(1)}
            </p>
            <p className={`mt-2 text-sm font-semibold ${cat.className}`}>{cat.label}</p>
          </div>

          <section className="rounded-xl border border-border bg-card p-4 shadow-premium">
            <h3 className="text-sm font-semibold text-foreground">BMI categories</h3>
            <ul className="mt-2 grid gap-1 text-xs text-muted-foreground">
              <li>Under 18.5 — Underweight</li>
              <li>18.5 – 24.9 — Healthy</li>
              <li>25 – 29.9 — Overweight</li>
              <li>30 and above — Obese</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              BMI is a screening tool — it does not measure body fat directly. Consult a healthcare professional for personal advice.
            </p>
          </section>
        </div>
      ) : (
        <EmptyState
          icon={<Activity className="size-5" />}
          title="Your BMI appears here"
          description="Enter your weight and height above."
        />
      )}
    </div>
  );
}
