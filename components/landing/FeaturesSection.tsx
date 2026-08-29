import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: "🔮",
    title: "An AI reader that listens",
    description:
      "Not a canned paragraph per card. The reader connects your cards into one reading and answers whatever you ask about it.",
  },
  {
    icon: "📖",
    title: "All 78 cards, fully explained",
    description:
      "Major and Minor Arcana, with upright and reversed meanings and keywords for each — so you learn while you practice.",
  },
  {
    icon: "🕯️",
    title: "Your readings, kept",
    description:
      "Sign in and every reading is saved with its conversation, so you can look back and see how it actually played out.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 sm:py-28 border-t border-border-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeading eyebrow="What you get" title="Built for practicing, not guessing" />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-border bg-linear-to-b from-background-alt/60 to-background-alt/25 p-6 flex flex-col gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
