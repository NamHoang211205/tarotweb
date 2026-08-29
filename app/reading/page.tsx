import SpreadSelector from "@/components/reading/SpreadSelector";

export default function ReadingHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16">
      <div className="text-center flex flex-col items-center gap-5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft/80">
          Practice solo · No judgment
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight text-balance max-w-xl">
          Listen to what the <em className="italic text-accent">cards</em> want to say
        </h1>
        <div className="flex items-center gap-3 text-accent-soft/50" aria-hidden>
          <span className="w-10 h-px bg-current" />
          <span className="text-sm">✦</span>
          <span className="w-10 h-px bg-current" />
        </div>
        <p className="text-foreground/60 max-w-md leading-relaxed">
          Pick a spread below, draw your cards, and practice reading their meaning like a real reader.
        </p>
      </div>
      <SpreadSelector />
    </div>
  );
}
