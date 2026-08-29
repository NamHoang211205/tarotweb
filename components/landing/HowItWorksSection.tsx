import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    title: "Choose a spread",
    description:
      "One card for a quick answer, three for how a situation is moving, or the full Celtic Cross when you need depth.",
  },
  {
    title: "Draw and flip",
    description:
      "Cards are drawn at random, upright or reversed. Turn them over one at a time and read what each position is saying.",
  },
  {
    title: "Ask the reader",
    description:
      "An AI reader ties the whole spread into a single narrative, then stays to answer your follow-up questions.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-20 sm:py-28 border-t border-border-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeading eyebrow="How it works" title="Three steps, start to insight" />
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 120}>
              <div className="flex flex-col gap-3">
                <span className="font-display text-4xl text-accent/40 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
