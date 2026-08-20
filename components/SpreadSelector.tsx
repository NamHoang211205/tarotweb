import Link from "next/link";
import { spreads } from "@/lib/spreads";

export default function SpreadSelector() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Object.values(spreads).map((spread) => (
        <Link
          key={spread.id}
          href={`/reading?spread=${spread.id}`}
          className="group rounded-xl border border-border bg-background-alt/60 p-5 hover:border-accent transition-colors flex flex-col"
        >
          <span className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {spread.name}
          </span>
          <span className="text-sm text-foreground/70 mt-2 flex-1">
            {spread.description}
          </span>
          <span className="text-xs text-accent-soft mt-3">
            {spread.positions.length} lá bài
          </span>
        </Link>
      ))}
    </div>
  );
}
