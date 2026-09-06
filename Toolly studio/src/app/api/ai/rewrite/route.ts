import { NextRequest, NextResponse } from "next/server";
import { runChat } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

interface RewriteBody {
  text?: string;
  style?: "simpler" | "formal" | "concise" | "expand" | "persuasive";
}

const STYLE_HINT: Record<string, string> = {
  simpler: "Rewrite using simpler words and shorter sentences so a 12-year-old can understand.",
  formal: "Rewrite in a formal, professional register suitable for business writing.",
  concise: "Rewrite to be shorter and more direct, removing redundancy.",
  expand: "Rewrite to be richer and more detailed, adding helpful context without changing the meaning.",
  persuasive: "Rewrite to be more persuasive and engaging while staying truthful.",
};

export async function POST(req: NextRequest) {
  let body: RewriteBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });
  if (text.length > 12000)
    return NextResponse.json({ error: "Text is too long (max 12,000 characters)" }, { status: 400 });

  const style = body.style ?? "concise";

  try {
    const out = await runChat(
      [
        {
          role: "system",
          content:
            "You are Toolly's Rewriter. Paraphrase the user's text according to the requested style. Preserve meaning, names, numbers, and the original language. Do not invent new facts. Return ONLY the rewritten text — no preamble, no explanations.",
        },
        {
          role: "user",
          content: `${STYLE_HINT[style]}\n\nTEXT:\n${text}`,
        },
      ],
      { temperature: 0.6, maxTokens: 1500 }
    );
    return NextResponse.json({ rewritten: out });
  } catch (err) {
    console.error("[ai/rewrite] error:", err);
    return NextResponse.json(
      { error: "The AI service is unavailable right now. Please try again in a moment." },
      { status: 503 }
    );
  }
}
