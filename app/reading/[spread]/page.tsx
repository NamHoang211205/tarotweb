import Link from "next/link";
import { auth } from "@/auth";
import { spreads, type SpreadId } from "@/lib/spreads";
import { getAllCards } from "@/lib/cards";
import { getTopicById } from "@/lib/topics";
import ReadingForm from "@/components/reading/ReadingForm";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ spread: string }>;
  searchParams: Promise<{ topic?: string }>;
};

export default async function ReadingPage({ params, searchParams }: Props) {
  const { spread: spreadParam } = await params;
  const spread = spreadParam in spreads ? spreads[spreadParam as SpreadId] : null;

  if (!spread) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center flex flex-col gap-4">
        <p className="text-foreground/80">Unknown spread type.</p>
        <Link href="/reading" className="text-accent underline underline-offset-4">
          Back to spread selection
        </Link>
      </div>
    );
  }

  const [{ topic: topicParam }, session, deck] = await Promise.all([
    searchParams,
    auth(),
    getAllCards(),
  ]);
  const initialQuestion = topicParam ? getTopicById(topicParam)?.question ?? "" : "";

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 flex flex-col gap-10">
      <div className="text-center flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft/70">
          {spread.positions.length} {spread.positions.length === 1 ? "card" : "cards"}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground text-balance">
          {spread.name}
        </h1>
        <p className="text-foreground/60 text-sm max-w-md">{spread.description}</p>
      </div>
      <ReadingForm
        spread={spread}
        deck={deck}
        isLoggedIn={!!session?.user}
        initialQuestion={initialQuestion}
      />
    </div>
  );
}
