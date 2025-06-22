export interface ChapterResponse {
  isNewChapter: boolean;
  chapterSummary: string;
  emotionTone: string;
  keyThemes: string[];
  themeSentiments: Record<string, number>;
  reflectionQuestion: string;
  actionSuggestion: string;
  watchOutFor?: string[];
}

export interface ChapterRequest {
  text: string;
  previousChapter?: string;
  previousStages?: string[];
  balance?: number;
}

export interface TimelineEntry {
  summary: string;
  isNew: boolean;
  createdAt: string;
}

export interface ThemeHistory {
  themes: string[];
  sentiments: Record<string, number>;
}

export interface ThemeData {
  counts: Record<string, number>;
  scores: Record<string, number>;
}

export type TabType = "time" | "theme"; 