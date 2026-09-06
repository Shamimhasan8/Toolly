"use client";

import * as React from "react";

interface State<T> {
  loading: boolean;
  result?: T;
  error?: string;
}

/**
 * Simple fetch hook for AI tool endpoints.
 * Returns { state, run } where run(body) triggers a POST request to the given URL.
 */
export function useAiTool<T>(url: string) {
  const [state, setState] = React.useState<State<T>>({ loading: false });
  const abortRef = React.useRef<AbortController | null>(null);

  const run = React.useCallback(
    async (body: unknown) => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setState({ loading: true });
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ac.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          setState({ loading: false, error: data?.error ?? "Request failed" });
          return;
        }
        setState({ loading: false, result: data as T });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({
          loading: false,
          error: err instanceof Error ? err.message : "Network error",
        });
      }
    },
    [url]
  );

  const reset = React.useCallback(() => setState({ loading: false }), []);
  React.useEffect(() => () => abortRef.current?.abort(), []);
  return { state, run, reset };
}
