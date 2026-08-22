-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "spreadType" TEXT NOT NULL,
    "clientName" TEXT,
    "question" TEXT,
    "cards" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);
