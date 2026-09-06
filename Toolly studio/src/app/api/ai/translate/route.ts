import { NextRequest, NextResponse } from "next/server";
import { runChat } from "@/lib/ai";

export const runtime = "nodejs";
export const maxDuration = 60;

interface TranslateBody {
  text?: string;
  to?: string;
  from?: string;
}

const LANG_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  nl: "Dutch",
  ru: "Russian",
  zh: "Simplified Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  hi: "Hindi",
  bn: "Bengali",
  ur: "Urdu",
  tr: "Turkish",
  pl: "Polish",
  sv: "Swedish",
  id: "Indonesian",
  vi: "Vietnamese",
  th: "Thai",
  auto: "the source language (auto-detect)",
};

export async function POST(req: NextRequest) {
  let body: TranslateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  const to = (body.to ?? "en").toLowerCase();
  const from = (body.from ?? "auto").toLowerCase();

  if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 });
  if (text.length > 8000)
    return NextResponse.json({ error: "Text is too long (max 8,000 characters)" }, { status: 400 });

  const toName = LANG_NAMES[to] ?? to;
  const fromName = LANG_NAMES[from] ?? from;

  try {
    const out = await runChat(
      [
        {
          role: "system",
          content:
            "You are Toolly's Translator. Translate the user's text accurately and naturally. Preserve meaning, names, numbers, formatting, and tone. Do not add explanations or commentary. Return ONLY the translated text.",
        },
        {
          role: "user",
          content: `Translate the following text from ${fromName} into ${toName}.\n\nTEXT:\n${text}`,
        },
      ],
      { temperature: 0.3, maxTokens: 2000 }
    );
    return NextResponse.json({ translation: out });
  } catch (err) {
    console.error("[ai/translate] error:", err);
    return NextResponse.json(
      { error: "The AI service is unavailable right now. Please try again in a moment." },
      { status: 503 }
    );
  }
}
