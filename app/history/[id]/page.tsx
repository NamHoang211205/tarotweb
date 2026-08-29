import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { spreads, type SpreadId } from "@/lib/spreads";
import { getCardById } from "@/lib/cards";
import CardResult from "@/components/reading/CardResult";
import DeleteReadingButton from "@/components/DeleteReadingButton";
import ChatBubble from "@/components/reading/ChatBubble";

export const dynamic = "force-dynamic";

type StoredCard = { id: string; name: string; reversed: boolean; position?: string };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReadingDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const reading = await prisma.reading.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!reading || reading.userId !== session.user.id) notFound();

  const storedCards: StoredCard[] = JSON.parse(reading.cards);
  const spread =
    reading.spreadType in spreads ? spreads[reading.spreadType as SpreadId] : null;
  const cards = await Promise.all(storedCards.map((s) => getCardById(s.id)));

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          href="/history"
          className="font-mono text-xs uppercase tracking-wider text-accent-soft hover:text-accent transition-colors"
        >
          ← History
        </Link>
        <DeleteReadingButton id={reading.id} />
      </div>

      <div className="text-center flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft/70">
          {new Date(reading.createdAt).toLocaleString("en-US")}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
          {reading.clientName || "Unknown client"}
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent-soft">
          {spread?.name || reading.spreadType}
        </p>
        {reading.question && (
          <p className="text-sm text-foreground/70 italic mt-1 max-w-md">
            “{reading.question}”
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {storedCards.map((stored, i) => {
          const card = cards[i];
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

      {reading.messages.length > 0 && (
        <div className="rounded-2xl border border-border bg-linear-to-b from-background-alt/50 to-background-alt/20 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-accent-soft">🔮</span>
            <h3 className="font-display text-lg font-semibold text-foreground">Reader&apos;s Notes</h3>
          </div>
          <div className="flex flex-col gap-3">
            {reading.messages.map((m) => (
              <ChatBubble
                key={m.id}
                role={m.role === "user" ? "user" : "assistant"}
                content={m.content}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
