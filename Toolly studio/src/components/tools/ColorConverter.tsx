"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Palette, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type Format = "hex" | "rgb" | "hsl" | "hsv" | "cmyk";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

// #RRGGBB → {r,g,b}
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function rgbToCmyk(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

function luminance(r: number, g: number, b: number) {
  // WCAG relative luminance
  const linear = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * linear(r / 255) + 0.7152 * linear(g / 255) + 0.0722 * linear(b / 255);
}

export function ColorConverter() {
  const [hex, setHex] = React.useState("#B0DB9C");
  const rgb = hexToRgb(hex);
  const valid = !!rgb;

  const data = React.useMemo(() => {
    if (!rgb) return null;
    const { r, g, b } = rgb;
    const hsl = rgbToHsl(r, g, b);
    const hsv = rgbToHsv(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);
    const lum = luminance(r, g, b);
    const contrastWhite = (1 + 0.05) / (lum + 0.05);
    const contrastBlack = (lum + 0.05) / 0.05;
    const bestText = contrastWhite >= contrastBlack ? "#ffffff" : "#000000";
    return {
      hex: rgbToHex(r, g, b),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsv: `${hsv.h}°, ${hsv.s}%, ${hsv.v}%`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      hslVals: hsl,
      bestText,
      contrastWhite: contrastWhite.toFixed(2),
      contrastBlack: contrastBlack.toFixed(2),
    };
  }, [rgb]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="Pick a color"
        actions={
          valid ? (
            <button
              onClick={() => setHex("")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Clear input"
            >
              <Eraser className="size-3.5" /> Clear
            </button>
          ) : null
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="color"
            value={valid ? hex : "#000000"}
            onChange={(e) => setHex(e.target.value)}
            className="size-12 cursor-pointer rounded-lg border border-border bg-background p-1 shadow-sm"
            aria-label="Color picker"
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#B0DB9C"
            spellCheck={false}
            className="w-40 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            aria-label="Hex code"
          />
          {!valid && (
            <span className="text-xs text-destructive">Enter a valid hex color (#RGB or #RRGGBB)</span>
          )}
        </div>
      </ToolSection>

      {data && (
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-center rounded-xl border border-border px-6 py-8 text-2xl font-semibold shadow-premium"
            style={{ backgroundColor: data.hex, color: data.bestText }}
          >
            {data.hex.toUpperCase()}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ["HEX", data.hex.toUpperCase()],
              ["RGB", data.rgb],
              ["HSL", data.hsl],
              ["HSV", data.hsv],
              ["CMYK", data.cmyk],
            ] as [string, string][]).map(([label, value]) => (
              <ToolSection
                key={label}
                title={label}
                actions={<CopyButton value={value} />}
              >
                <code className="block w-full overflow-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-sm text-foreground break-all">
                  {value}
                </code>
              </ToolSection>
            ))}
          </div>

          <section className="rounded-xl border border-border bg-card p-4 shadow-premium">
            <h3 className="text-sm font-semibold text-foreground">Accessibility</h3>
            <div className="mt-2 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
              <div>
                <div className="text-foreground">Contrast on white</div>
                {data.contrastWhite} : 1 {Number(data.contrastWhite) >= 4.5 ? "✓ AA text" : Number(data.contrastWhite) >= 3 ? "AA large" : "fail"}
              </div>
              <div>
                <div className="text-foreground">Contrast on black</div>
                {data.contrastBlack} : 1 {Number(data.contrastBlack) >= 4.5 ? "✓ AA text" : Number(data.contrastBlack) >= 3 ? "AA large" : "fail"}
              </div>
              <div>
                <div className="text-foreground">Recommended text color</div>
                <span className="font-mono">{data.bestText}</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {!data && (
        <EmptyState
          icon={<Palette className="size-5" />}
          title="Color values appear here"
          description="Pick a color above to convert it across HEX, RGB, HSL, HSV, and CMYK."
        />
      )}
    </div>
  );
}
