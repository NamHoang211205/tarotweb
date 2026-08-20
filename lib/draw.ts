import { tarotDeck, type TarotCardData } from "./tarotDeck";

export type DrawnCard = {
  card: TarotCardData;
  reversed: boolean;
};

export function drawCards(count: number): DrawnCard[] {
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((card) => ({
    card,
    reversed: Math.random() < 0.5,
  }));
}
