import { DrawnCard } from "@/lib/draw";

type Props = {
  drawn: DrawnCard;
  positionLabel?: string;
  positionDescription?: string;
};

export default function CardResult({ drawn, positionLabel, positionDescription }: Props) {
  const { card, reversed } = drawn;
  const meaning = reversed ? card.reversed : card.upright;

  return (
    <div className="rounded-xl border border-border bg-linear-to-b from-background-alt/60 to-background-alt/25 p-5 sm:p-6">
      {positionLabel && (
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent mb-3">
          {positionLabel}
          {positionDescription ? (
            <span className="text-foreground-faint normal-case tracking-normal"> — {positionDescription}</span>
          ) : null}
        </p>
      )}
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
        <h3 className="font-display text-xl font-semibold text-foreground flex items-baseline gap-2">
          <span className="text-lg">{card.symbol}</span>
          {card.name}
          <span className="text-sm text-accent-soft/70 font-body font-normal italic">
            {card.nameEn}
          </span>
        </h3>
        <span
          className={`font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
            reversed
              ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
              : "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
          }`}
        >
          {reversed ? "Reversed" : "Upright"}
        </span>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{meaning}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {card.keywords.map((k) => (
          <span
            key={k}
            className="text-[11px] px-2.5 py-1 rounded-full bg-accent-soft/10 text-accent-soft border border-accent-soft/25"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
