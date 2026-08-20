"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpreadDef } from "@/lib/spreads";
import { drawCards, DrawnCard } from "@/lib/draw";
import TarotCard from "./TarotCard";
import CardResult from "./CardResult";

type Props = {
  spread: SpreadDef;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export default function ReadingForm({ spread }: Props) {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const allFlipped = drawnCards !== null && flipped.every(Boolean);

  function handleDraw() {
    const cards = drawCards(spread.positions.length);
    setDrawnCards(cards);
    setFlipped(new Array(cards.length).fill(false));
    setSaveState("idle");
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
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {!drawnCards && (
        <div className="rounded-xl border border-border bg-background-alt/60 p-5 flex flex-col gap-4">
          <div>
            <label className="block text-sm text-foreground/80 mb-1">
              Tên khách (không bắt buộc)
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder="Ví dụ: Lan, Minh..."
            />
          </div>
          <div>
            <label className="block text-sm text-foreground/80 mb-1">
              Câu hỏi (không bắt buộc)
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
              rows={2}
              placeholder="Bạn/khách muốn hỏi điều gì?"
            />
          </div>
          <button
            onClick={handleDraw}
            className="self-start rounded-md bg-accent text-background font-semibold px-5 py-2 text-sm hover:brightness-110 transition"
          >
            Rút Bài
          </button>
        </div>
      )}

      {drawnCards && (
        <>
          <p className="text-sm text-foreground/70 text-center">
            Nhấn vào từng lá bài để lật và xem ý nghĩa.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
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

          <div className="flex flex-col gap-3">
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

          <div className="flex flex-wrap items-center gap-3 justify-center pt-2">
            <button
              onClick={handleDraw}
              className="rounded-md border border-border px-4 py-2 text-sm hover:border-accent transition"
            >
              Rút Lại
            </button>
            <button
              onClick={handleSave}
              disabled={!allFlipped || saveState === "saving" || saveState === "saved"}
              className="rounded-md bg-accent text-background font-semibold px-5 py-2 text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saveState === "saving"
                ? "Đang lưu..."
                : saveState === "saved"
                ? "Đã lưu ✓"
                : "Lưu Lượt Xem Này"}
            </button>
            {saveState === "saved" && (
              <button
                onClick={() => router.push("/history")}
                className="text-sm text-accent-soft underline"
              >
                Xem lịch sử
              </button>
            )}
            {saveState === "error" && (
              <span className="text-sm text-red-400">Lưu thất bại, thử lại.</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
