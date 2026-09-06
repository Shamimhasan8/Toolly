"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Ruler, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "length" | "weight" | "temperature" | "volume" | "speed" | "data" | "time";

interface Unit {
  id: string;
  label: string;
  // factor relative to a base unit
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const CATEGORIES: { id: Category; label: string; base: string; units: Unit[] }[] = [
  {
    id: "length",
    label: "Length",
    base: "m",
    units: [
      { id: "km", label: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "m", label: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
      { id: "cm", label: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "mm", label: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mi", label: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "yd", label: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: "ft", label: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "in", label: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: "nmi", label: "Nautical mile (nmi)", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    ],
  },
  {
    id: "weight",
    label: "Weight",
    base: "kg",
    units: [
      { id: "t", label: "Metric ton (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "kg", label: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
      { id: "g", label: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mg", label: "Milligram (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      { id: "lb", label: "Pound (lb)", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: "oz", label: "Ounce (oz)", toBase: (v) => v * 0.028349523, fromBase: (v) => v / 0.028349523 },
      { id: "st", label: "Stone (st)", toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    base: "C",
    units: [
      { id: "C", label: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
      { id: "F", label: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
      { id: "K", label: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    base: "L",
    units: [
      { id: "kL", label: "Kiloliter (kL)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "L", label: "Liter (L)", toBase: (v) => v, fromBase: (v) => v },
      { id: "mL", label: "Milliliter (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "gal", label: "US gallon (gal)", toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      { id: "qt", label: "US quart (qt)", toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
      { id: "pt", label: "US pint (pt)", toBase: (v) => v * 0.473176473, fromBase: (v) => v / 0.473176473 },
      { id: "cup", label: "US cup", toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
      { id: "floz", label: "US fl ounce (fl oz)", toBase: (v) => v * 0.0295735296, fromBase: (v) => v / 0.0295735296 },
      { id: "tbsp", label: "US tablespoon (tbsp)", toBase: (v) => v * 0.0147867648, fromBase: (v) => v / 0.0147867648 },
      { id: "tsp", label: "US teaspoon (tsp)", toBase: (v) => v * 0.00492892159, fromBase: (v) => v / 0.00492892159 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    base: "m/s",
    units: [
      { id: "ms", label: "Meter/second (m/s)", toBase: (v) => v, fromBase: (v) => v },
      { id: "kmh", label: "Kilometer/hour (km/h)", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: "mph", label: "Mile/hour (mph)", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: "kn", label: "Knot (kn)", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { id: "fts", label: "Foot/second (ft/s)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    ],
  },
  {
    id: "data",
    label: "Data size",
    base: "bytes",
    units: [
      { id: "b", label: "Byte (B)", toBase: (v) => v, fromBase: (v) => v },
      { id: "kb", label: "Kilobyte (KB) [1,000]", toBase: (v) => v * 1e3, fromBase: (v) => v / 1e3 },
      { id: "mb", label: "Megabyte (MB) [1,000,000]", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: "gb", label: "Gigabyte (GB) [1e9]", toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
      { id: "tb", label: "Terabyte (TB) [1e12]", toBase: (v) => v * 1e12, fromBase: (v) => v / 1e12 },
      { id: "kib", label: "Kibibyte (KiB) [1,024]", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: "mib", label: "Mebibyte (MiB) [1,048,576]", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: "gib", label: "Gibibyte (GiB) [2^30]", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: "tib", label: "Tebibyte (TiB) [2^40]", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      { id: "bit", label: "Bit (bit)", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { id: "kbit", label: "Kilobit (Kbit) [1,000]", toBase: (v) => v * 125, fromBase: (v) => v / 125 },
      { id: "mbit", label: "Megabit (Mbit) [1e6]", toBase: (v) => v * 125000, fromBase: (v) => v / 125000 },
    ],
  },
  {
    id: "time",
    label: "Time",
    base: "s",
    units: [
      { id: "ms", label: "Millisecond (ms)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "s", label: "Second (s)", toBase: (v) => v, fromBase: (v) => v },
      { id: "min", label: "Minute (min)", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: "h", label: "Hour (h)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: "d", label: "Day (d)", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: "wk", label: "Week (wk)", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: "yr", label: "Year (365 days)", toBase: (v) => v * 31557600, fromBase: (v) => v / 31557600 },
    ],
  },
];

export function UnitConverter() {
  const [cat, setCat] = React.useState<Category>("length");
  const current = CATEGORIES.find((c) => c.id === cat)!;
  const [fromId, setFromId] = React.useState(current.units[0].id);
  const [toId, setToId] = React.useState(current.units[1]?.id ?? current.units[0].id);
  const [value, setValue] = React.useState("1");

  // Reset units when category changes
  React.useEffect(() => {
    const c = CATEGORIES.find((c) => c.id === cat)!;
    setFromId(c.units[0].id);
    setToId(c.units[1]?.id ?? c.units[0].id);
  }, [cat]);

  const result = React.useMemo(() => {
    const from = current.units.find((u) => u.id === fromId);
    const to = current.units.find((u) => u.id === toId);
    const v = parseFloat(value);
    if (!from || !to || isNaN(v)) return null;
    const base = from.toBase(v);
    const out = to.fromBase(base);
    // pretty number
    const abs = Math.abs(out);
    let str: string;
    if (abs === 0) str = "0";
    else if (abs >= 1e12 || abs < 1e-6) str = out.toExponential(6);
    else if (Number.isInteger(out)) str = out.toLocaleString();
    else if (abs >= 1) str = out.toLocaleString(undefined, { maximumFractionDigits: 6 });
    else str = out.toLocaleString(undefined, { maximumFractionDigits: 12 });
    return str;
  }, [value, fromId, toId, current]);

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
    if (result) setValue(result.replace(/,/g, ""));
  };

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Category">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                cat === c.id
                  ? "border-brand-strong bg-brand-strong text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-accent"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </ToolSection>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <ToolSection title="From">
          <div className="flex flex-col gap-2">
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              {current.units.map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-lg font-semibold shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </ToolSection>

        <button
          onClick={swap}
          className="mx-auto mb-1 flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-premium transition hover:bg-accent hover:text-accent-foreground"
          aria-label="Swap units"
        >
          <ArrowRightLeft className="size-4" />
        </button>

        <ToolSection title="To">
          <div className="flex flex-col gap-2">
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              {current.units.map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
            <div className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-lg font-semibold text-foreground tabular-nums">
              {result ?? "—"}
            </div>
          </div>
        </ToolSection>
      </div>

      {result ? (
        <ToolSection
          title="Result"
          actions={<CopyButton value={result} />}
        >
          <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-premium">
            <span className="text-muted-foreground">
              {value} {current.units.find((u) => u.id === fromId)?.label.split(" ")[0]}
            </span>
            {" = "}
            <strong className="font-semibold">
              {result} {current.units.find((u) => u.id === toId)?.label.split(" ")[0]}
            </strong>
          </div>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Ruler className="size-5" />}
          title="Enter a value to convert"
          description="Pick a category above and enter a value in any unit."
        />
      )}
    </div>
  );
}
