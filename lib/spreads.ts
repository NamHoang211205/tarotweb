export type SpreadId = "single" | "three" | "celtic-cross";

export type SpreadPosition = {
  label: string;
  description: string;
};

export type SpreadDef = {
  id: SpreadId;
  name: string;
  description: string;
  positions: SpreadPosition[];
};

export const spreads: Record<SpreadId, SpreadDef> = {
  single: {
    id: "single",
    name: "One Card",
    description: "Draw a single card for a quick read on the energy or answer to your current question.",
    positions: [{ label: "Message", description: "What you need to know right now" }],
  },
  three: {
    id: "three",
    name: "Three Card: Past, Present, Future",
    description: "A classic spread to see how a situation is flowing over time.",
    positions: [
      { label: "Past", description: "The foundation or cause behind the present" },
      { label: "Present", description: "The current situation or energy" },
      { label: "Future", description: "The likely trend or outcome" },
    ],
  },
  "celtic-cross": {
    id: "celtic-cross",
    name: "Celtic Cross (10 Cards)",
    description: "An in-depth, comprehensive spread for a complex issue that needs careful analysis.",
    positions: [
      { label: "Present", description: "The heart of the matter" },
      { label: "Challenge", description: "The immediate obstacle or conflict" },
      { label: "Foundation", description: "The root cause, deep down" },
      { label: "Recent Past", description: "A recent event shaping the present" },
      { label: "Goal", description: "What you're aiming for or hoping for" },
      { label: "Near Future", description: "What's coming up next" },
      { label: "Yourself", description: "Your attitude or role in the situation" },
      { label: "External Influences", description: "Influences from your environment or people around you" },
      { label: "Hopes & Fears", description: "What you hope for or fear about the outcome" },
      { label: "Outcome", description: "The likely result if things continue as they are" },
    ],
  },
};

export function getSpread(id: SpreadId): SpreadDef {
  return spreads[id];
}
