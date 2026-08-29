import SpreadSelector from "@/components/reading/SpreadSelector";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

export default function SpreadsSection() {
  return (
    <section className="px-6 py-20 sm:py-28 border-t border-border-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The spreads"
            title="Pick the shape of your question"
            description="Every spread gives each card a role, so the same card can mean something different depending on where it lands."
          />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <SpreadSelector />
        </ScrollReveal>
      </div>
    </section>
  );
}
