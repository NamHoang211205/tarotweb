import type { TarotCardData } from "./cards";

export type DrawnCard = {
  card: TarotCardData;
  reversed: boolean;
};

export function drawCards(deck: TarotCardData[], count: number): DrawnCard[] {
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    card,
    reversed: Math.random() < 0.5,
  }));
}
