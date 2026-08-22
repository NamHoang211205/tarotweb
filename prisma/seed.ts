import { PrismaClient } from "../app/generated/prisma/client";
import { tarotDeck } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  for (const card of tarotDeck) {
    await prisma.card.upsert({
      where: { id: card.id },
      update: card,
      create: card,
    });
  }
  console.log(`Seeded ${tarotDeck.length} cards.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
