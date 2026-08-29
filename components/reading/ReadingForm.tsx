"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SpreadDef } from "@/lib/spreads";
import type { TarotCardData } from "@/lib/cards";
import { drawCards, DrawnCard } from "@/lib/draw";
import TarotCard from "./TarotCard";
import CardResult from "./CardResult";
import ChatPanel, { type ChatMessage } from "./ChatPanel";
import QuickTopics from "./QuickTopics";

type Props = {
  spread: SpreadDef;
  deck: TarotCardData[];
  isLoggedIn: boolean;
  /** Pre-filled when arriving from a topic link (e.g. /reading/single?topic=love). */
  initialQuestion?: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export default function ReadingForm({
  spread,
  deck,
  isLoggedIn,
  initialQuestion = "",
}: Props) {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [question, setQuestion] = useState(initialQuestion);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const allFlipped = drawnCards !== null && flipped.every(Boolean);

  function handleDraw() {
    const cards = drawCards(deck, spread.positions.length);
    setDrawnCards(cards);
    setFlipped(new Array(cards.length).fill(false));
    setSaveState("idle");
    setChatMessages([]);
  }

  function handleFlip(index: number) {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  async function handleSave() {
    if (!drawnCards) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/readings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spreadType: spread.id,
          clientName: clientName || null,
          question: question || null,
          cards: drawnCards.map((d, i) => ({
            id: d.card.id,
            name: d.card.name,
            reversed: d.reversed,
            position: spread.positions[i]?.label,
          })),
          messages: chatMessages,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {!drawnCards && (
        <div className="rounded-2xl border border-border bg-linear-to-b from-background-alt/70 to-background-alt/30 p-7 sm:p-8 flex flex-col gap-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-faint mb-2">
              Client name <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-lg bg-background/60 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-faint/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors"
              placeholder="e.g. Alex, Sam..."
            />
          </div>
          <QuickTopics onSelect={setQuestion} />
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-faint mb-2">
              Question <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-lg bg-background/60 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-faint/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors resize-none"
              rows={2}
              placeholder="What would you like to ask?"
            />
          </div>
          <button
            onClick={handleDraw}
            className="self-center mt-2 rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold px-8 py-3 text-sm tracking-wide shadow-[0_10px_30px_-8px_rgba(201,162,75,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(201,162,75,0.65)] hover:-translate-y-0.5 transition-all"
          >
            ✦ Draw Cards
          </button>
        </div>
      )}

      {drawnCards && (
        <>
          <p className="font-mono text-xs uppercase tracking-wider text-foreground-faint text-center">
            Tap each card to flip it and reveal its meaning
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {drawnCards.map((drawn, i) => (
              <TarotCard
                key={drawn.card.id + i}
                drawn={drawn}
                flipped={flipped[i]}
                onFlip={() => handleFlip(i)}
                positionLabel={spread.positions[i]?.label}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {drawnCards.map((drawn, i) =>
              flipped[i] ? (
                <CardResult
                  key={drawn.card.id + i}
                  drawn={drawn}
                  positionLabel={spread.positions[i]?.label}
                  positionDescription={spread.positions[i]?.description}
                />
              ) : null
            )}
          </div>

          {allFlipped && (
            <ChatPanel
              spread={spread}
              drawnCards={drawnCards}
              question={question}
              messages={chatMessages}
              onMessagesChange={setChatMessages}
            />
          )}

          <div className="flex flex-wrap items-center gap-4 justify-center pt-4 border-t border-border-soft">
            <button
              onClick={handleDraw}
              className="rounded-full border border-border px-5 py-2.5 text-sm text-foreground/80 hover:border-accent-soft hover:text-accent-soft transition-colors"
            >
              Draw Again
            </button>
            {isLoggedIn ? (
              <button
                onClick={handleSave}
                disabled={!allFlipped || saveState === "saving" || saveState === "saved"}
                className="rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold px-7 py-2.5 text-sm shadow-[0_10px_30px_-8px_rgba(201,162,75,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {saveState === "saving"
                  ? "Saving..."
                  : saveState === "saved"
                  ? "Saved ✓"
                  : "Save This Reading"}
              </button>
            ) : (
              <Link
                href="/login"
                className="font-mono text-xs uppercase tracking-wider text-accent-soft/80 hover:text-accent-soft transition-colors"
              >
                Log in to save this reading
              </Link>
            )}
            {saveState === "saved" && (
              <button
                onClick={() => router.push("/history")}
                className="text-sm text-accent-soft underline underline-offset-4 decoration-accent-soft/40 hover:decoration-accent-soft transition-colors"
              >
                View history
              </button>
            )}
            {saveState === "error" && (
              <span className="text-sm text-red-400">Failed to save, please try again.</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
