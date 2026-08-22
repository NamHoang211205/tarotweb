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
    <div className="flex flex-col items-center gap-3">
      {positionLabel && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent-soft/80">
          {positionLabel}
        </span>
      )}
      <button
        type="button"
        onClick={onFlip}
        disabled={flipped}
        className="card-flip-perspective w-32 h-48 sm:w-36 sm:h-56 focus:outline-none group"
        aria-label={flipped ? card.name : "Flip card"}
      >
        <div className={`card-flip-inner ${flipped ? "is-flipped" : ""}`}>
          <div className="card-flip-face card-flip-front rounded-xl border-2 border-accent/50 bg-linear-to-br from-[#2a1a45] to-[#120a1f] flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_24px_-4px_rgba(201,162,75,0.4)] group-hover:-translate-y-1">
            <div className="absolute inset-2 rounded-md border border-accent-soft/30" />
            <span className="absolute top-2.5 left-2.5 text-[10px] text-accent-soft/40">✧</span>
            <span className="absolute top-2.5 right-2.5 text-[10px] text-accent-soft/40">✧</span>
            <span className="absolute bottom-2.5 left-2.5 text-[10px] text-accent-soft/40">✧</span>
            <span className="absolute bottom-2.5 right-2.5 text-[10px] text-accent-soft/40">✧</span>
            <span className="text-3xl text-accent-soft/80">✦</span>
          </div>
          <div
            className={`card-flip-face card-flip-back rounded-xl border-2 border-accent bg-linear-to-br from-[#241534] to-[#160c26] flex flex-col items-center justify-center gap-1.5 p-3 text-center shadow-[0_0_24px_-6px_rgba(201,162,75,0.35)] ${
              reversed ? "rotate-180" : ""
            }`}
          >
            <span className="text-3xl">{card.symbol}</span>
            <span className="w-6 h-px bg-accent-soft/40" />
            <span className="font-display text-base font-semibold leading-tight text-foreground">
              {card.name}
            </span>
          </div>
        </div>
      </button>
      {flipped && (
        <span
          className={`font-mono text-[11px] uppercase tracking-wider ${
            reversed ? "text-amber-400" : "text-emerald-400"
          }`}
        >
          {reversed ? "Reversed" : "Upright"}
        </span>
      )}
    </div>
  );
}
