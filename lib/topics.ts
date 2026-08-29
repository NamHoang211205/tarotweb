export type Topic = {
  id: string;
  label: string;
  icon: string;
  question: string;
  /** Shown on the landing page topic showcase. */
  title: string;
  description: string;
  /** A card from the deck that embodies this topic, used as the topic's visual. */
  cardSymbol: string;
  cardName: string;
};

export const topics: Topic[] = [
  {
    id: "love",
    label: "Love",
    icon: "💗",
    question: "Chuyện tình cảm của tôi sẽ như thế nào?",
    title: "Love",
    description:
      "Look deeper into a relationship — what is really being felt, what is unsaid, and where it is heading.",
    cardSymbol: "💞",
    cardName: "The Lovers",
  },
  {
    id: "career",
    label: "Career",
    icon: "💼",
    question: "Sự nghiệp của tôi nên đi theo hướng nào?",
    title: "Career",
    description:
      "Find direction in your work — the move worth making, the skill worth trusting, the door worth opening.",
    cardSymbol: "🎩",
    cardName: "The Magician",
  },
  {
    id: "money",
    label: "Money",
    icon: "💰",
    question: "Tài chính của tôi sắp tới sẽ ra sao?",
    title: "Money",
    description:
      "Read the turning of your finances — what is shifting, what is steady, and what deserves caution.",
    cardSymbol: "☸️",
    cardName: "Wheel of Fortune",
  },
  {
    id: "health",
    label: "Health",
    icon: "🌿",
    question: "Tôi cần chú ý gì về sức khoẻ lúc này?",
    title: "Health",
    description:
      "Listen to what your body and mind are asking for, and where your energy is quietly running low.",
    cardSymbol: "🦁",
    cardName: "Strength",
  },
  {
    id: "general",
    label: "General",
    icon: "✨",
    question: "Điều gì tôi cần biết ngay lúc này?",
    title: "Guidance",
    description:
      "No fixed question — just open the deck and let it name the thing you most need to hear right now.",
    cardSymbol: "⭐",
    cardName: "The Star",
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}
