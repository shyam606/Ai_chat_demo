import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Message {
  role: "user" | "bot";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop()?.content;

    if (!lastUserMessage) {
      return NextResponse.json({ reply: "⚠️ No user message" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(lastUserMessage);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    console.error("Gemini API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
