import Link from "next/link";
import { prisma } from "@/lib/db";
import { spreads, type SpreadId } from "@/lib/spreads";
import DeleteReadingButton from "@/components/DeleteReadingButton";

export const dynamic = "force-dynamic";

type StoredCard = { name: string; reversed: boolean; position?: string };

export default async function HistoryPage() {
  const readings = await prisma.reading.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground text-center">Lịch Sử Xem Bài</h1>

      {readings.length === 0 && (
        <p className="text-center text-foreground/60">
          Chưa có lượt xem nào được lưu.{" "}
          <Link href="/" className="text-accent underline">
            Bắt đầu một lượt xem
          </Link>
        </p>
      )}

      <div className="flex flex-col gap-3">
        {readings.map((reading) => {
          const cards: StoredCard[] = JSON.parse(reading.cards);
          const spreadName =
            reading.spreadType in spreads
              ? spreads[reading.spreadType as SpreadId].name
              : reading.spreadType;

          return (
            <div
              key={reading.id}
              className="rounded-lg border border-border bg-background-alt/60 p-4 flex items-start justify-between gap-3"
            >
              <Link href={`/history/${reading.id}`} className="flex-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="font-semibold text-foreground hover:text-accent transition-colors">
                    {reading.clientName || "Không rõ tên khách"}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {new Date(reading.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <p className="text-xs text-accent-soft mt-1">{spreadName}</p>
                {reading.question && (
                  <p className="text-sm text-foreground/70 mt-1 italic">“{reading.question}”</p>
                )}
                <p className="text-xs text-foreground/50 mt-1">
                  {cards.map((c) => c.name).join(", ")}
                </p>
              </Link>
              <DeleteReadingButton id={reading.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
