import Link from "next/link";
import { topics } from "@/lib/topics";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

export default function TopicsSection() {
  return (
    <section className="px-6 py-20 sm:py-28 border-t border-border-soft">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Read by topic"
            title="Not sure what to ask? Start here"
            description="Each topic opens a one-card reading with the question already written for you — edit it or draw as is."
          />
        </ScrollReveal>

        <div className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {topics.map((topic, i) => (
            <ScrollReveal
              key={topic.id}
              delay={i * 90}
              className="group lg:border-l lg:border-border-soft lg:first:border-l-0"
            >
              <Link
                href={`/reading/single?topic=${topic.id}`}
                className="flex flex-col items-center text-center gap-4 px-4 sm:px-6 h-full"
              >
                {/* Card face, built from the same visual language as the real deck */}
                <div className="relative w-28 h-42 sm:w-32 sm:h-48 rounded-xl border-2 border-accent/50 bg-linear-to-br from-[#241534] to-[#160c26] flex flex-col items-center justify-center gap-2 p-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-accent group-hover:-translate-y-1.5 group-hover:shadow-[0_0_28px_-6px_rgba(201,162,75,0.4)]">
                  <span className="absolute inset-2 rounded-md border border-accent-soft/25" />
                  <span className="absolute top-2.5 left-2.5 text-[9px] text-accent-soft/40">✧</span>
                  <span className="absolute top-2.5 right-2.5 text-[9px] text-accent-soft/40">✧</span>
                  <span className="absolute bottom-2.5 left-2.5 text-[9px] text-accent-soft/40">✧</span>
                  <span className="absolute bottom-2.5 right-2.5 text-[9px] text-accent-soft/40">✧</span>

                  <span className="text-3xl">{topic.cardSymbol}</span>
                  <span className="w-6 h-px bg-accent-soft/40" />
                  <span className="font-display text-sm font-semibold leading-tight text-foreground/90 px-1">
                    {topic.cardName}
                  </span>
                </div>

                <h3 className="font-display text-lg uppercase tracking-[0.15em] text-accent group-hover:text-accent-soft transition-colors">
                  {topic.title}
                </h3>

                <p className="text-sm text-foreground/60 leading-relaxed flex-1">
                  {topic.description}
                </p>

                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-soft/80 group-hover:text-accent-soft transition-colors inline-flex items-center gap-1.5">
                  <span className="text-accent">✦</span> Get the message
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
