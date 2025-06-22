-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "chapterSummary" TEXT NOT NULL,
    "emotionTone" TEXT NOT NULL,
    "keyThemes" JSONB NOT NULL,
    "reflectionQuestion" TEXT NOT NULL,
    "actionSuggestion" TEXT NOT NULL,
    "watchOutFor" JSONB,
    "balance" INTEGER NOT NULL
);
