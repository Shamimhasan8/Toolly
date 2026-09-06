import { NextRequest, NextResponse } from "next/server";
import { runChat } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

interface SummarizeBody {
  text?: string;
  mode?: "concise" | "bullets" | "key-points";
  length?: "short" | "medium" | "long";
}

const LENGTH_HINT: Record<string, string> = {
  short: "around 2–3 sentences (or 3 bullets)",
  medium: "around 4–6 sentences (or 5 bullets)",
  long: "around 8–12 sentences (or 8 bullets)",
};

const MODE_HINT: Record<string, string> = {
  concise: "Write a single flowing paragraph.",
  bullets: "Use clear bullet points starting with •.",
  "key-points": "Use clear bullet points starting with •, each point a single complete idea.",
};

export async function POST(req: NextRequest) {
  let body: SummarizeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });
  if (text.length > 12000)
    return NextResponse.json({ error: "Text is too long (max 12,000 characters)" }, { status: 400 });

  const mode = body.mode ?? "concise";
  const length = body.length ?? "medium";

  try {
    const out = await runChat(
      [
        {
          role: "system",
          content:
            "You are Toolly's Summarizer. Produce a faithful, accurate, neutral summary of the user's text. Do not invent facts. Do not add commentary. Preserve names, numbers, and proper nouns.",
        },
        {
          role: "user",
          content: `Summarize the following text. Format: ${MODE_HINT[mode]} Length: ${LENGTH_HINT[length]}. Preserve every important fact and figure.\n\nTEXT:\n${text}`,
        },
      ],
      { temperature: 0.3, maxTokens: 600 }
    );
    return NextResponse.json({ summary: out });
  } catch (err) {
    console.error("[ai/summarize] error:", err);
    return NextResponse.json(
      { error: "The AI service is unavailable right now. Please try again in a moment." },
      { status: 503 }
    );
  }
}
