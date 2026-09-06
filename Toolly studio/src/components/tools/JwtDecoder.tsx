"use client";

import * as React from "react";
import { CopyButton } from "@/components/tool/CopyButton";
import { ToolSection, EmptyState } from "@/components/tool/ToolShell";
import { Key, Eraser, AlertTriangle, ShieldCheck } from "lucide-react";

interface JwtParts {
  header: string | null;
  payload: string | null;
  signature: string | null;
  decodedHeader: unknown;
  decodedPayload: unknown;
  error: string | null;
}

function b64UrlDecode(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function decodeJwt(jwt: string): JwtParts {
  const parts = jwt.trim().split(".");
  if (parts.length < 2) {
    return {
      header: null,
      payload: null,
      signature: null,
      decodedHeader: null,
      decodedPayload: null,
      error: "A JWT must have at least 2 parts separated by dots (header.payload).",
    };
  }
  try {
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2] ?? "";
    const decodedHeader = JSON.parse(b64UrlDecode(header));
    const decodedPayload = JSON.parse(b64UrlDecode(payload));
    return {
      header,
      payload,
      signature,
      decodedHeader,
      decodedPayload,
      error: null,
    };
  } catch {
    return {
      header: parts[0],
      payload: parts[1],
      signature: parts[2] ?? null,
      decodedHeader: null,
      decodedPayload: null,
      error: "Could not decode — input is not a valid JWT.",
    };
  }
}

function pretty(v: unknown): string {
  return JSON.stringify(v, null, 2);
}

const COMMON_CLAIMS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expiration time",
  nbf: "Not before",
  iat: "Issued at",
  jti: "JWT ID",
  name: "Name",
  email: "Email",
  role: "Role",
};

export function JwtDecoder() {
  const [text, setText] = React.useState("");
  const result = React.useMemo(() => (text.trim() ? decodeJwt(text) : null), [text]);

  const payload = result?.decodedPayload as Record<string, unknown> | undefined | null;
  const exp = payload && typeof payload === "object" && "exp" in payload ? Number(payload.exp) : null;
  const expDate = exp ? new Date(exp * 1000) : null;
  const expired = expDate ? expDate.getTime() < Date.now() : false;

  return (
    <div className="flex flex-col gap-6">
      <ToolSection
        title="JWT token"
        subtitle="Paste any JWT (header.payload.signature). Decoding is client-side — your token never leaves the browser."
        actions={
          text ? (
            <button
              onClick={() => setText("")}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Clear input"
            >
              <Eraser className="size-3.5" /> Clear
            </button>
          ) : null
        }
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwR…"
          aria-label="JWT input"
          spellCheck={false}
          className="min-h-[120px] w-full resize-y rounded-xl border border-border bg-background px-4 py-3 font-mono text-xs leading-relaxed text-foreground shadow-sm outline-none transition focus:border-brand-strong focus:ring-2 focus:ring-ring/40"
        />
      </ToolSection>

      {result?.error ? (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertTriangle className="size-4" /> {result.error}
        </div>
      ) : result && result.decodedPayload ? (
        <div className="flex flex-col gap-4">
          {expDate && (
            <div
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                expired
                  ? "border-destructive/40 bg-destructive/5 text-destructive"
                  : "border-brand/40 bg-brand-soft text-foreground"
              }`}
            >
              {expired ? <AlertTriangle className="size-4" /> : <ShieldCheck className="size-4 text-brand-strong" />}
              <span>
                Token {expired ? "expired" : "valid until"} <strong>{expDate.toLocaleString()}</strong>
              </span>
            </div>
          )}

          <ToolSection
            title="Header"
            actions={<CopyButton value={pretty(result.decodedHeader)} label="Copy header" />}
          >
            <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
              {pretty(result.decodedHeader)}
            </pre>
          </ToolSection>

          <ToolSection
            title="Payload"
            actions={<CopyButton value={pretty(result.decodedPayload)} label="Copy payload" />}
          >
            <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
              {pretty(result.decodedPayload)}
            </pre>
          </ToolSection>

          {payload && typeof payload === "object" && (
            <section className="rounded-xl border border-border bg-card p-4 shadow-premium">
              <h3 className="text-sm font-semibold text-foreground">Claims overview</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {Object.entries(payload as Record<string, unknown>).slice(0, 10).map(([k, v]) => (
                  <li key={k} className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs">
                    <div className="font-mono font-semibold text-foreground">{k}</div>
                    <div className="text-muted-foreground">
                      {COMMON_CLAIMS[k] ? `${COMMON_CLAIMS[k]} · ` : ""}
                      {typeof v === "object" ? JSON.stringify(v) : String(v)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {result.signature && (
            <ToolSection title="Signature (raw)">
              <code className="block w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs text-muted-foreground break-all">
                {result.signature}
              </code>
            </ToolSection>
          )}

          <p className="flex items-start gap-2 rounded-xl bg-muted/40 p-3 text-xs text-muted-foreground">
            <Key className="mt-0.5 size-3.5 shrink-0" />
            Decoding a JWT does not verify its signature. Never trust a decoded token's contents for authentication or authorization without server-side signature verification.
          </p>
        </div>
      ) : (
        <EmptyState
          icon={<Key className="size-5" />}
          title="Decoded JWT appears here"
          description="Paste a JWT above to inspect its header, payload, and claims."
        />
      )}
    </div>
  );
}
