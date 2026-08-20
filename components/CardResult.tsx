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
    <div className="rounded-lg border border-border bg-background-alt/60 p-4">
      <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
        <h3 className="font-semibold text-foreground">
          {card.symbol} {card.name}{" "}
          <span className="text-sm text-accent-soft font-normal">({card.nameEn})</span>
        </h3>
        <span className={`text-xs font-medium ${reversed ? "text-amber-400" : "text-emerald-400"}`}>
          {reversed ? "Ngược" : "Xuôi"}
        </span>
      </div>
      {positionLabel && (
        <p className="text-xs text-accent mb-2">
          {positionLabel}
          {positionDescription ? ` — ${positionDescription}` : ""}
        </p>
      )}
      <p className="text-sm text-foreground/90 leading-relaxed">{meaning}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {card.keywords.map((k) => (
          <span
            key={k}
            className="text-[11px] px-2 py-0.5 rounded-full bg-accent-soft/15 text-accent-soft border border-accent-soft/30"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
