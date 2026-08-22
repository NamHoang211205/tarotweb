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
  const { spreadType, clientName, question, cards } = body;

  if (!spreadType || !Array.isArray(cards)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const reading = await prisma.reading.create({
    data: {
      userId: session.user.id,
      spreadType,
      clientName: clientName || null,
      question: question || null,
      cards: JSON.stringify(cards),
    },
  });

  return NextResponse.json(reading, { status: 201 });
}
