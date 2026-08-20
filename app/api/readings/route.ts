import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const readings = await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(readings);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { spreadType, clientName, question, cards } = body;

  if (!spreadType || !Array.isArray(cards)) {
    return NextResponse.json({ error: "Thiếu dữ liệu bắt buộc" }, { status: 400 });
  }

  const reading = await prisma.reading.create({
    data: {
      spreadType,
      clientName: clientName || null,
      question: question || null,
      cards: JSON.stringify(cards),
    },
  });

  return NextResponse.json(reading, { status: 201 });
}
