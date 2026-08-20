"use client";

import { DrawnCard } from "@/lib/draw";

type Props = {
  drawn: DrawnCard;
  flipped: boolean;
  onFlip: () => void;
  positionLabel?: string;
};

export default function TarotCard({ drawn, flipped, onFlip, positionLabel }: Props) {
  const { card, reversed } = drawn;

  return (
    <div className="flex flex-col items-center gap-2">
      {positionLabel && (
        <span className="text-xs uppercase tracking-wider text-accent-soft">
          {positionLabel}
        </span>
      )}
      <button
        type="button"
        onClick={onFlip}
        disabled={flipped}
        className="card-flip-perspective w-32 h-48 sm:w-36 sm:h-56 focus:outline-none"
        aria-label={flipped ? card.name : "Lật lá bài"}
      >
        <div className={`card-flip-inner ${flipped ? "is-flipped" : ""}`}>
          <div className="card-flip-face card-flip-front rounded-xl border-2 border-accent/60 bg-gradient-to-br from-[#2a1a45] to-[#120a1f] flex items-center justify-center shadow-lg cursor-pointer hover:border-accent transition-colors">
            <div className="w-3/4 h-3/4 rounded-lg border border-accent-soft/50 flex items-center justify-center">
              <span className="text-3xl">✦</span>
            </div>
          </div>
          <div
            className={`card-flip-face card-flip-back rounded-xl border-2 border-accent bg-gradient-to-br from-[#241534] to-[#160c26] flex flex-col items-center justify-center p-3 text-center shadow-lg ${
              reversed ? "rotate-180" : ""
            }`}
          >
            <span className="text-3xl mb-1">{card.symbol}</span>
            <span className="text-sm font-semibold leading-tight">{card.name}</span>
          </div>
        </div>
      </button>
      {flipped && (
        <span className={`text-xs font-medium ${reversed ? "text-amber-400" : "text-emerald-400"}`}>
          {reversed ? "Ngược" : "Xuôi"}
        </span>
      )}
    </div>
  );
}
