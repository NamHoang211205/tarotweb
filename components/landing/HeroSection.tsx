import Link from "next/link";
import MysticWheel from "./MysticWheel";

export default function HeroSection() {
  return (
    <section className="relative px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-soft/80">
            Free tarot practice · No sign-up needed
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance text-foreground">
            Read the cards the way a{" "}
            <em className="italic text-accent">real reader</em> would
          </h1>

          <p className="text-foreground/60 leading-relaxed max-w-md">
            Pick a spread, draw your cards, and let their meanings unfold. An AI reader
            weaves the whole spread into one story and answers whatever you ask next.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start pt-2">
            <Link
              href="/reading"
              className="rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold px-8 py-3.5 text-sm tracking-wide shadow-[0_10px_30px_-8px_rgba(201,162,75,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(201,162,75,0.65)] hover:-translate-y-0.5 transition-all"
            >
              ✦ Start a Reading
            </Link>
            <Link
              href="/login"
              className="font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors"
            >
              Sign in to save →
            </Link>
          </div>
        </div>

        <div>
          <MysticWheel />
        </div>
      </div>
    </section>
  );
}
