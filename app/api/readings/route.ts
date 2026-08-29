import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const readings = await prisma.reading.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(readings);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { spreadType, clientName, question, cards, messages } = body;

  if (!spreadType || !Array.isArray(cards)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const chatMessages: { role: string; content: string }[] = Array.isArray(messages)
    ? messages.filter(
        (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
      )
    : [];

  const reading = await prisma.reading.create({
    data: {
      userId: session.user.id,
      spreadType,
      clientName: clientName || null,
      question: question || null,
      cards: JSON.stringify(cards),
      messages: { create: chatMessages },
    },
  });

  return NextResponse.json(reading, { status: 201 });
}
