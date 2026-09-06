"use client";

import * as React from "react";
import QRCode from "qrcode";
import { CopyButton } from "@/components/tool/CopyButton";
import { DownloadButton } from "@/components/tool/DownloadButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { QrCode } from "lucide-react";

const PRESETS = [
  { label: "URL", value: "https://toolly.tech" },
  { label: "Email", value: "mailto:hello@example.com" },
  { label: "Phone", value: "tel:+15551234567" },
  { label: "SMS", value: "smsto:+15551234567:Hello" },
  { label: "WiFi", value: "WIFI:T:WPA;S:MyNetwork;P:secret;;" },
  { label: "vCard", value: "BEGIN:VCARD\nVERSION:3.0\nFN:Jane Doe\nORG:Toolly\nTEL:+15551234567\nEMAIL:jane@toolly.tech\nEND:VCARD" },
];

export function QrCodeGenerator() {
  const [text, setText] = React.useState("https://toolly.tech");
  const [size, setSize] = React.useState(256);
  const [fg, setFg] = React.useState("#1e293b");
  const [bg, setBg] = React.useState("#ffffff");
  const [ecc, setEcc] = React.useState<"L" | "M" | "Q" | "H">("M");
  const [dataUrl, setDataUrl] = React.useState("");

  React.useEffect(() => {
    if (!text.trim()) {
      setDataUrl("");
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: ecc,
      color: { dark: fg, light: bg },
    })
      .then((url) => { if (!cancelled) setDataUrl(url); })
      .catch(() => { if (!cancelled) setDataUrl(""); });
    return () => { cancelled = true; };
  }, [text, size, fg, bg, ecc]);

  return (
    <div className="flex flex-col gap-6">
      <ToolSection title="Content to encode" subtitle="Type any text, URL, or contact info.">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://toolly.tech"
          className="min-h-[100px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setText(p.value)}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              {p.label}
            </button>
          ))}
        </div>
      </ToolSection>

      <ToolSection title="Customize">
        <div className="grid gap-3 sm:grid-cols-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Size (px)</span>
            <input
              type="number"
              min={64}
              max={1024}
              step={16}
              value={size}
              onChange={(e) => setSize(Number(e.target.value) || 256)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Foreground</span>
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg border border-border bg-background p-1 shadow-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Background</span>
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-lg border border-border bg-background p-1 shadow-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Error correction</span>
            <select
              value={ecc}
              onChange={(e) => setEcc(e.target.value as typeof ecc)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </label>
        </div>
      </ToolSection>

      {dataUrl ? (
        <ToolSection
          title="QR code"
          actions={
            <>
              <CopyButton value={dataUrl} label="Copy data URL" />
              <DownloadButton
                value={dataUrl}
                filename="toolly-qr.png"
                mime="image/png"
              />
            </>
          }
        >
          <div className="flex justify-center rounded-xl border border-border bg-card p-6 shadow-premium">
            <img
              src={dataUrl}
              alt={`QR code for ${text.slice(0, 60)}`}
              width={size}
              height={size}
              className="rounded-md"
            />
          </div>
        </ToolSection>
      ) : (
        <EmptyState
          icon={<QrCode className="size-5" />}
          title="Your QR code appears here"
          description="Enter text or a URL above to generate a downloadable QR code."
        />
      )}
    </div>
  );
}
