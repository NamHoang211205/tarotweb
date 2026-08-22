import Link from "next/link";
import { spreads, type SpreadId } from "@/lib/spreads";

const spreadIcons: Record<SpreadId, string> = {
  single: "✦",
  three: "☾",
  "celtic-cross": "✧",
};

export default function SpreadSelector() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {Object.values(spreads).map((spread) => (
        <Link
          key={spread.id}
          href={`/reading/${spread.id}`}
          className="group relative rounded-2xl border border-border bg-linear-to-b from-background-alt/70 to-background-alt/30 p-7 flex flex-col overflow-hidden transition-all duration-300 hover:border-accent/60 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(201,162,75,0.35)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-6 text-8xl text-accent-soft/10 group-hover:text-accent/10 transition-colors duration-300 font-display"
          >
            {spreadIcons[spread.id]}
          </span>

          <span className="text-2xl text-accent-soft mb-5">{spreadIcons[spread.id]}</span>

          <span className="font-display text-2xl font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
            {spread.name}
          </span>
          <span className="text-sm text-foreground/60 mt-3 flex-1 leading-relaxed">
            {spread.description}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent-soft/80 mt-5 pt-4 border-t border-border-soft">
            {spread.positions.length} {spread.positions.length === 1 ? "card" : "cards"}
          </span>
        </Link>
      ))}
    </div>
  );
}
