import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { spreads, type SpreadId } from "@/lib/spreads";
import DeleteReadingButton from "@/components/DeleteReadingButton";

export const dynamic = "force-dynamic";

type StoredCard = { name: string; reversed: boolean; position?: string };

const spreadIcons: Record<string, string> = {
  single: "✦",
  three: "☾",
  "celtic-cross": "✧",
};

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const readings = await prisma.reading.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft/70">
          {readings.length} saved {readings.length === 1 ? "reading" : "readings"}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
          Reading History
        </h1>
      </div>

      {readings.length === 0 && (
        <p className="text-center text-foreground/60">
          No readings saved yet.{" "}
          <Link href="/reading" className="text-accent underline underline-offset-4">
            Start a reading
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
              className="group rounded-xl border border-border bg-background-alt/50 hover:bg-background-alt/80 hover:border-accent-soft/40 transition-colors p-5 flex items-start gap-4"
            >
              <span className="flex-none w-10 h-10 rounded-full border border-border-soft bg-background/60 flex items-center justify-center text-accent-soft text-lg mt-0.5">
                {spreadIcons[reading.spreadType] ?? "✦"}
              </span>
              <Link href={`/history/${reading.id}`} className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {reading.clientName || "Unknown client"}
                  </span>
                  <span className="font-mono text-[11px] text-foreground-faint">
                    {new Date(reading.createdAt).toLocaleString("en-US")}
                  </span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent-soft/80 mt-1.5">
                  {spreadName}
                </p>
                {reading.question && (
                  <p className="text-sm text-foreground/70 mt-2 italic">“{reading.question}”</p>
                )}
                <p className="text-xs text-foreground-faint mt-1.5">
                  {cards.map((c) => c.name).join(" · ")}
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
