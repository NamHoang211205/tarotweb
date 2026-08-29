type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-3 mb-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-soft/80">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground text-balance max-w-xl">
        {title}
      </h2>
      <div className="flex items-center gap-3 text-accent-soft/40" aria-hidden>
        <span className="w-8 h-px bg-current" />
        <span className="text-xs">✦</span>
        <span className="w-8 h-px bg-current" />
      </div>
      {description && (
        <p className="text-foreground/60 text-sm max-w-md leading-relaxed">{description}</p>
      )}
    </div>
  );
}
