import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { spreads, type SpreadId } from "@/lib/spreads";
import { getCardById } from "@/lib/tarotDeck";
import CardResult from "@/components/CardResult";
import DeleteReadingButton from "@/components/DeleteReadingButton";

export const dynamic = "force-dynamic";

type StoredCard = { id: string; name: string; reversed: boolean; position?: string };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReadingDetailPage({ params }: Props) {
  const { id } = await params;
  const reading = await prisma.reading.findUnique({ where: { id } });

  if (!reading) notFound();

  const storedCards: StoredCard[] = JSON.parse(reading.cards);
  const spread =
    reading.spreadType in spreads ? spreads[reading.spreadType as SpreadId] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/history" className="text-sm text-accent-soft underline">
          ← Quay lại lịch sử
        </Link>
        <DeleteReadingButton id={reading.id} />
      </div>

      <div className="text-center flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">
          {reading.clientName || "Không rõ tên khách"}
        </h1>
        <p className="text-xs text-foreground/50">
          {new Date(reading.createdAt).toLocaleString("vi-VN")}
        </p>
        <p className="text-sm text-accent-soft">{spread?.name || reading.spreadType}</p>
        {reading.question && (
          <p className="text-sm text-foreground/70 italic mt-1">“{reading.question}”</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {storedCards.map((stored, i) => {
          const card = getCardById(stored.id);
          if (!card) return null;
          const positionDef = spread?.positions[i];
          return (
            <CardResult
              key={stored.id + i}
              drawn={{ card, reversed: stored.reversed }}
              positionLabel={stored.position || positionDef?.label}
              positionDescription={positionDef?.description}
            />
          );
        })}
      </div>
    </div>
  );
}
