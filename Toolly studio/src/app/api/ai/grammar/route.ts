import { NextRequest, NextResponse } from "next/server";
import { runChat } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

interface GrammarBody {
  text?: string;
  tone?: "neutral" | "professional" | "casual" | "academic";
}

const TONE_HINT: Record<string, string> = {
  neutral: "Keep the original tone.",
  professional: "Use a clear, professional tone.",
  casual: "Use a friendly, conversational tone.",
  academic: "Use a precise, academic tone.",
};

export async function POST(req: NextRequest) {
  let body: GrammarBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });
  if (text.length > 12000)
    return NextResponse.json({ error: "Text is too long (max 12,000 characters)" }, { status: 400 });

  const tone = body.tone ?? "neutral";

  try {
    const out = await runChat(
      [
        {
          role: "system",
          content:
            "You are Toolly's Grammar Improver. Fix grammar, spelling, punctuation, and awkward phrasing. Preserve the user's meaning, voice, and language. Do not invent new facts or rewrite beyond what is needed for correctness. Return ONLY the corrected text — no explanations, no preamble.",
        },
        {
          role: "user",
          content: `Improve this text. ${TONE_HINT[tone]}\n\nTEXT:\n${text}`,
        },
      ],
      { temperature: 0.4, maxTokens: 1500 }
    );
    return NextResponse.json({ improved: out });
  } catch (err) {
    console.error("[ai/grammar] error:", err);
    return NextResponse.json(
      { error: "The AI service is unavailable right now. Please try again in a moment." },
      { status: 503 }
    );
  }
}
