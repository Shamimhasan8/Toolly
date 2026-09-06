"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Binary, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type Base = "bin" | "oct" | "dec" | "hex";

const BASES: { id: Base; label: string; radix: number; placeholder: string }[] = [
  { id: "bin", label: "Binary", radix: 2, placeholder: "101010" },
  { id: "oct", label: "Octal", radix: 8, placeholder: "52" },
  { id: "dec", label: "Decimal", radix: 10, placeholder: "42" },
  { id: "hex", label: "Hexadecimal", radix: 16, placeholder: "2A" },
];

const REGEX: Record<Base, RegExp> = {
  bin: /^[01]+$/,
  oct: /^[0-7]+$/,
  dec: /^\d+$/,
  hex: /^[0-9a-fA-F]+$/,
};

export function NumberBaseConverter() {
  const [values, setValues] = React.useState<Record<Base, string>>({
    bin: "",
    oct: "",
    dec: "42",
    hex: "",
  });
  const [error, setError] = React.useState<string | null>(null);

  const update = (base: Base, value: string) => {
    const v = value.trim();
    if (!v) {
      setValues({ bin: "", oct: "", dec: "", hex: "" });
      setError(null);
      return;
    }
    if (!REGEX[base].test(v)) {
      setError(`Invalid ${base} value`);
      const cleared = { ...values, [base]: value } as Record<Base, string>;
      // clear others
      (Object.keys(cleared) as Base[]).forEach((k) => { if (k !== base) cleared[k] = ""; });
      setValues(cleared);
      return;
    }
    setError(null);
    let num: bigint;
    try {
      num = BigInt(v);
    } catch {
      try {
        num = BigInt(parseInt(v, BASES.find((b) => b.id === base)!.radix));
      } catch {
        setError("Could not parse number");
        return;
      }
    }
    setValues({
      bin: num.toString(2),
      oct: num.toString(8),
      dec: num.toString(10),
      hex: num.toString(16).toUpperCase(),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Convert between number bases"
        subtitle="Enter a value in any field — all the others update live. Supports arbitrarily large integers (BigInt)."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {BASES.map((b) => (
            <label key={b.id} className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                {b.label} (base {b.radix})
              </span>
              <input
                type="text"
                value={values[b.id]}
                onChange={(e) => update(b.id, e.target.value)}
                placeholder={b.placeholder}
                spellCheck={false}
                className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
              />
            </label>
          ))}
        </div>
      </ToolSection>

      {error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {values.dec && !error ? (
        <ToolSection
          title="Decimal value"
          actions={<CopyButton value={values.dec} />}
        >
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <code className="font-mono text-lg font-semibold text-foreground">
              {parseInt(values.dec).toLocaleString()}
            </code>
          </div>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<Binary className="size-5" />}
          title="Enter a value above"
          description="Type a binary, octal, decimal, or hexadecimal number to convert."
        />
      )}
    </div>
  );
}
