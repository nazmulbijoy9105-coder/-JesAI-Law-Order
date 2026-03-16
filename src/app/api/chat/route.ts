import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, language } = await request.json();

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = language === "bn" 
      ? `তুমি JesAI, বাংলাদেশের আইনি সহকারী। বাংলাদেশের আইন সম্পর্কে প্রশ্নের উত্তর দাও। অন্য বিষয়ে বলো যে তুমি জান না।`
      : `You are JesAI, a legal information assistant for Bangladesh. Only answer questions about Bangladeshi law. If the question is not about law, politely decline.`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.3,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: "Groq API error", details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ 
      reply,
      source: "Groq AI",
      confidence: "medium"
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
