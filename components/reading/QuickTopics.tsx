"use client";

import { topics } from "@/lib/topics";

type Props = {
  onSelect: (question: string) => void;
};

export default function QuickTopics({ onSelect }: Props) {
  return (
    <div>
      <span className="block font-mono text-[11px] uppercase tracking-wider text-foreground-faint mb-2">
        Quick topics
      </span>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelect(topic.question)}
            className="flex items-center gap-1.5 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-3.5 py-1.5 text-xs text-foreground/80 hover:border-accent-teal/60 hover:bg-accent-teal/20 hover:text-foreground transition-colors"
          >
            <span>{topic.icon}</span>
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
}
