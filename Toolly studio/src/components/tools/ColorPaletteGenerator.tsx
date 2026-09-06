"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Palette, RefreshCw } from "lucide-react";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const v = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(v * 255).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const lin = (v: number) => (v <= 8 ? v / 255 / 12.92 : Math.pow((v / 255 + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

type Scheme = "analogous" | "complementary" | "triadic" | "tetradic" | "monochromatic";

const SCHEMES: { id: Scheme; label: string; desc: string }[] = [
  { id: "analogous", label: "Analogous", desc: "Adjacent hues" },
  { id: "complementary", label: "Complementary", desc: "Opposite hue" },
  { id: "triadic", label: "Triadic", desc: "120° apart" },
  { id: "tetradic", label: "Tetradic", desc: "Rectangle of hues" },
  { id: "monochromatic", label: "Monochromatic", desc: "Same hue, varying L" },
];

function generatePalette(baseHue: number, scheme: Scheme): { hex: string; h: number; s: number; l: number }[] {
  const S = 65;
  const L = 55;
  switch (scheme) {
    case "analogous":
      return [-30, -15, 0, 15, 30].map((d) => {
        const h = (baseHue + d + 360) % 360;
        return { hex: hslToHex(h, S, L), h, s: S, l: L };
      });
    case "complementary":
      return [
        { hex: hslToHex(baseHue, S, 30), h: baseHue, s: S, l: 30 },
        { hex: hslToHex(baseHue, S, 50), h: baseHue, s: S, l: 50 },
        { hex: hslToHex(baseHue, S, 70), h: baseHue, s: S, l: 70 },
        { hex: hslToHex((baseHue + 180) % 360, S, 50), h: (baseHue + 180) % 360, s: S, l: 50 },
        { hex: hslToHex((baseHue + 180) % 360, S, 35), h: (baseHue + 180) % 360, s: S, l: 35 },
      ];
    case "triadic":
      return [0, 120, 240].map((d) => {
        const h = (baseHue + d) % 360;
        return { hex: hslToHex(h, S, L), h, s: S, l: L };
      }).concat([
        { hex: hslToHex(baseHue, S, 35), h: baseHue, s: S, l: 35 },
        { hex: hslToHex(baseHue, S, 75), h: baseHue, s: S, l: 75 },
      ]);
    case "tetradic":
      return [0, 90, 180, 270].map((d) => {
        const h = (baseHue + d) % 360;
        return { hex: hslToHex(h, S, L), h, s: S, l: L };
      }).concat([{ hex: hslToHex(baseHue, 30, 95), h: baseHue, s: 30, l: 95 }]);
    case "monochromatic":
      return [25, 40, 55, 70, 85].map((l) => ({ hex: hslToHex(baseHue, S, l), h: baseHue, s: S, l }));
  }
}

export function ColorPaletteGenerator() {
  const [hue, setHue] = React.useState(142);
  const [scheme, setScheme] = React.useState<Scheme>("analogous");
  const [seed, setSeed] = React.useState(0);

  const palette = React.useMemo(() => {
    // `seed` triggers a regenerate via the button
    void seed;
    return generatePalette(hue, scheme);
  }, [hue, scheme, seed]);

  const allHex = palette.map((p) => p.hex).join("\n");

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Base hue"
        actions={
          <button
            onClick={() => setHue(Math.floor(Math.random() * 360))}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-strong px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-brand"
          >
            <RefreshCw className="size-3.5" /> Random
          </button>
        }
      >
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={359}
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="flex-1 accent-[var(--brand-strong)]"
            aria-label="Hue"
          />
          <div className="w-12 text-right font-mono text-sm tabular-nums text-foreground">{hue}°</div>
        </div>
        <div
          className="mt-3 h-3 rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(0,80%,55%), hsl(60,80%,55%), hsl(120,80%,40%), hsl(180,80%,50%), hsl(240,80%,60%), hsl(300,80%,55%), hsl(360,80%,55%))" }}
        />
      </ToolSection>

      <ToolSection title="Scheme">
        <div role="radiogroup" aria-label="Scheme" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {SCHEMES.map((s) => {
            const active = s.id === scheme;
            return (
              <button
                key={s.id}
                role="radio"
                aria-checked={active}
                onClick={() => setScheme(s.id)}
                className={`flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left shadow-sm transition-all ${
                  active
                    ? "border-brand-strong bg-brand-soft shadow-brand-glow"
                    : "border-border bg-background hover:border-brand/60 hover:bg-accent"
                }`}
              >
                <span className="text-sm font-semibold">{s.label}</span>
                <span className="text-[10px] text-muted-foreground">{s.desc}</span>
              </button>
            );
          })}
        </div>
      </ToolSection>

      <ToolSection title="Palette" actions={<CopyButton value={allHex} label="Copy all" />}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {palette.map((p, i) => {
            const lum = luminance(hexToRgb(p.hex));
            const text = lum > 0.5 ? "#000000" : "#ffffff";
            return (
              <button
                key={i}
                onClick={() => navigator.clipboard.writeText(p.hex).then(() => toastCopy(p.hex))}
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl border border-border p-3 text-left shadow-premium transition hover:scale-[1.02]"
                style={{ backgroundColor: p.hex, color: text }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Swatch {i + 1}</span>
                <div>
                  <div className="font-mono text-sm font-bold">{p.hex.toUpperCase()}</div>
                  <div className="text-[10px] opacity-80">H {p.h}°</div>
                </div>
              </button>
            );
          })}
        </div>
      </ToolSection>

      <EmptyState
        title="Tip"
        description="Click any swatch to copy its hex code. Use the random button to roll a new base hue."
      />
    </div>
  );
}

function toastCopy(v: string) {
  if (typeof window !== "undefined") {
    // Quick local toast — we don't import sonner here to keep the component light
    import("sonner").then((m) => m.toast.success(`Copied ${v}`));
  }
}
