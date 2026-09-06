"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { KeyRound, RefreshCw } from "lucide-react";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}<>?,.;:/|";
const SIMILAR = "Il1O0o";

function secureRandomInt(max: number): number {
  const arr = new Uint32Array(1);
  // Rejection sampling for uniform distribution
  const limit = Math.floor(0xFFFFFFFF / max) * max;
  while (true) {
    crypto.getRandomValues(arr);
    if (arr[0] < limit) return arr[0] % max;
  }
}

function shuffle(arr: string[]): string[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generatePassword(opts: {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  avoidSimilar: boolean;
}): string {
  let pools: string[] = [];
  if (opts.lower) {
    let p = LOWER;
    if (opts.avoidSimilar) p = p.split("").filter((c) => !SIMILAR.includes(c)).join("");
    pools.push(p);
  }
  if (opts.upper) {
    let p = UPPER;
    if (opts.avoidSimilar) p = p.split("").filter((c) => !SIMILAR.includes(c)).join("");
    pools.push(p);
  }
  if (opts.digits) {
    let p = DIGITS;
    if (opts.avoidSimilar) p = p.split("").filter((c) => !SIMILAR.includes(c)).join("");
    pools.push(p);
  }
  if (opts.symbols) pools.push(SYMBOLS);

  if (pools.length === 0) return "";

  const all = pools.join("");
  const out: string[] = [];

  // Ensure at least one from each pool
  for (const p of pools) {
    if (out.length >= opts.length) break;
    out.push(p[secureRandomInt(p.length)]);
  }
  // Fill the rest randomly from the combined pool
  while (out.length < opts.length) {
    out.push(all[secureRandomInt(all.length)]);
  }
  return shuffle(out).join("");
}

function strength(pw: string): { score: number; label: string; className: string } {
  let score = 0;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (pw.length >= 20) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong", "Excellent"];
  const cls = ["text-destructive", "text-destructive", "text-amber-600", "text-amber-600", "text-brand-strong", "text-brand-strong", "text-brand-strong"];
  return { score, label: labels[Math.min(score, labels.length - 1)], className: cls[Math.min(score, cls.length - 1)] };
}

export function PasswordGenerator() {
  const [length, setLength] = React.useState(16);
  const [lower, setLower] = React.useState(true);
  const [upper, setUpper] = React.useState(true);
  const [digits, setDigits] = React.useState(true);
  const [symbols, setSymbols] = React.useState(true);
  const [avoidSimilar, setAvoidSimilar] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const generate = React.useCallback(() => {
    const pw = generatePassword({ length, lower, upper, digits, symbols, avoidSimilar });
    setPassword(pw);
  }, [length, lower, upper, digits, symbols, avoidSimilar]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  const st = password ? strength(password) : null;
  const canGenerate = lower || upper || digits || symbols;

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Password" subtitle="Generated locally using crypto.getRandomValues — never sent anywhere.">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-stretch gap-2">
            <code className="flex-1 overflow-auto rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-base leading-relaxed text-foreground break-all">
              {password || "—"}
            </code>
            <CopyButton value={password} label="Copy" />
            <button
              onClick={generate}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-strong px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-brand"
            >
              <RefreshCw className="size-3.5" /> Regenerate
            </button>
          </div>
          {st && (
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full ${st.className}`}
                  style={{
                    width: `${((st.score + 1) / 7) * 100}%`,
                    background: "currentColor",
                    transition: "width 0.3s",
                  }}
                />
              </div>
              <span className={`text-xs font-medium ${st.className}`}>{st.label}</span>
            </div>
          )}
        </div>
      </ToolSection>

      <ToolSection title="Options">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground w-32">Length: {length}</span>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-1 accent-[var(--brand-strong)]"
            />
            <input
              type="number"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value) || 16)}
              className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { state: lower, set: setLower, label: "Lowercase (a-z)" },
              { state: upper, set: setUpper, label: "Uppercase (A-Z)" },
              { state: digits, set: setDigits, label: "Digits (0-9)" },
              { state: symbols, set: setSymbols, label: "Symbols (!@#$)" },
              { state: avoidSimilar, set: setAvoidSimilar, label: "Avoid similar (Il1O0)" },
            ].map((opt) => (
              <label
                key={opt.label}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm transition-all cursor-pointer ${
                  opt.state
                    ? "border-brand-strong bg-brand-soft"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={opt.state}
                  onChange={() => opt.set(!opt.state)}
                  className="size-4 rounded border-border text-brand-strong focus:ring-ring"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </ToolSection>

      {!canGenerate && (
        <EmptyState
          icon={<KeyRound className="size-5" />}
          title="Select at least one character set"
          description="Enable at least one of lowercase, uppercase, digits, or symbols."
        />
      )}
    </div>
  );
}
