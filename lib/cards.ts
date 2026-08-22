import { prisma } from "./db";

export type Suit = "wands" | "cups" | "swords" | "pentacles";

export type TarotCardData = {
  id: string;
  name: string;
  nameEn: string;
  arcana: "major" | "minor";
  suit?: Suit;
  symbol: string;
  keywords: string[];
  upright: string;
  reversed: string;
};

export async function getAllCards(): Promise<TarotCardData[]> {
  const cards = await prisma.card.findMany();
  return cards.map(toTarotCardData);
}

export async function getCardById(id: string): Promise<TarotCardData | null> {
  const card = await prisma.card.findUnique({ where: { id } });
  return card ? toTarotCardData(card) : null;
}

type DbCard = {
  id: string;
  name: string;
  nameEn: string;
  arcana: string;
  suit: string | null;
  symbol: string;
  keywords: string[];
  upright: string;
  reversed: string;
};

function toTarotCardData(card: DbCard): TarotCardData {
  return {
    id: card.id,
    name: card.name,
    nameEn: card.nameEn,
    arcana: card.arcana as "major" | "minor",
    suit: card.suit as Suit | undefined,
    symbol: card.symbol,
    keywords: card.keywords,
    upright: card.upright,
    reversed: card.reversed,
  };
}
