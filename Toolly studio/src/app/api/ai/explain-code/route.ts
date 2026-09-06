import { NextRequest, NextResponse } from "next/server";
import { runChat } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

interface ExplainBody {
  code?: string;
  language?: string;
  detail?: "short" | "detailed";
}

const DETAIL_HINT: Record<string, string> = {
  short: "Keep the explanation under 200 words. Cover the purpose, inputs, outputs, and any non-obvious behaviour.",
  detailed: "Provide a structured explanation: purpose, how it works (step-by-step), inputs/outputs, key concepts, edge cases, and possible improvements.",
};

export async function POST(req: NextRequest) {
  let body: ExplainBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const code = (body.code ?? "").trim();
  if (!code) return NextResponse.json({ error: "Code is required" }, { status: 400 });
  if (code.length > 12000)
    return NextResponse.json({ error: "Code is too long (max 12,000 characters)" }, { status: 400 });

  const language = (body.language ?? "auto").trim() || "auto";
  const detail = body.detail === "detailed" ? "detailed" : "short";

  try {
    const out = await runChat(
      [
        {
          role: "system",
          content:
            "You are Toolly's Code Explainer. Explain code clearly for a developer who may be unfamiliar with the language or domain. Be accurate, do not invent behaviour that is not present in the code. Use Markdown: H2 headings, short paragraphs, and bullet lists where helpful. Preserve code identifiers in backticks.",
        },
        {
          role: "user",
          content: `Explain the following ${language === "auto" ? "" : language + " "}code.\n${DETAIL_HINT[detail]}\n\nCODE:\n\`\`\`\n${code}\n\`\`\``,
        },
      ],
      { temperature: 0.3, maxTokens: 1000 }
    );
    return NextResponse.json({ explanation: out });
  } catch (err) {
    console.error("[ai/explain-code] error:", err);
    return NextResponse.json(
      { error: "The AI service is unavailable right now. Please try again in a moment." },
      { status: 503 }
    );
  }
}
