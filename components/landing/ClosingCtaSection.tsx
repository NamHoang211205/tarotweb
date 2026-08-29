import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function ClosingCtaSection() {
  return (
    <section className="px-6 py-20 sm:py-28 border-t border-border-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-linear-to-b from-background-alt/70 to-background-alt/25 px-8 py-14 sm:py-16 text-center flex flex-col items-center gap-5">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-accent/8 blur-3xl rounded-full"
            />

            <span className="relative font-mono text-[11px] uppercase tracking-[0.25em] text-accent-soft/80">
              The deck is shuffled
            </span>
            <h2 className="relative font-display text-3xl sm:text-4xl font-semibold text-foreground text-balance max-w-lg">
              Whatever you came here to ask — ask it now
            </h2>
            <p className="relative text-foreground/60 text-sm max-w-sm leading-relaxed">
              No account needed to draw. Sign in only when you want to keep what the cards said.
            </p>
            <Link
              href="/reading"
              className="relative mt-2 rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold px-8 py-3.5 text-sm tracking-wide shadow-[0_10px_30px_-8px_rgba(201,162,75,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(201,162,75,0.65)] hover:-translate-y-0.5 transition-all"
            >
              ✦ Start a Reading
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
