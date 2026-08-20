import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const reading = await prisma.reading.findUnique({ where: { id } });

  if (!reading) {
    return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });
  }

  return NextResponse.json(reading);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.reading.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
