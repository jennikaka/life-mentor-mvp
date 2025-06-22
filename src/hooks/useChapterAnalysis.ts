import { useState, useEffect } from "react";
import { ChapterResponse, TimelineEntry, ThemeHistory, ThemeData } from "@/types";

export const useChapterAnalysis = () => {
  const [text, setText] = useState("");
  const [prevChapter, setPrevChapter] = useState("");
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [themeHistory, setThemeHistory] = useState<ThemeHistory[]>([]);
  const [themeData, setThemeData] = useState<ThemeData>({ counts: {}, scores: {} });
  const [result, setResult] = useState<ChapterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(50);

  // Calculate theme statistics whenever theme history changes
  useEffect(() => {
    const counts: Record<string, number> = {};
    const sums: Record<string, number> = {};
    
    themeHistory.forEach(({ themes, sentiments }) => {
      themes.forEach(theme => {
        counts[theme] = (counts[theme] || 0) + 1;
        sums[theme] = (sums[theme] || 0) + (sentiments[theme] || 50);
      });
    });

    const scores = Object.fromEntries(
      Object.entries(counts).map(([theme, count]) => [
        theme, 
        Math.round(sums[theme] / count)
      ])
    );

    setThemeData({ counts, scores });
  }, [themeHistory]);

  const detectChapter = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/chapters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          previousChapter: prevChapter,
          previousStages: entries.map(e => e.summary),
          balance,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChapterResponse = await response.json();
      setResult(data);

      // Update entries
      const now = new Date().toISOString();
      setPrevChapter(data.chapterSummary);
      setEntries(prev => [
        ...prev,
        { 
          summary: data.chapterSummary,
          isNew: data.isNewChapter,
          createdAt: now 
        }
      ]);

      // Update theme history
      if (data.keyThemes && data.keyThemes.length > 0) {
        setThemeHistory(prev => [
          ...prev, 
          { themes: data.keyThemes, sentiments: data.themeSentiments }
        ]);
      }
    } catch (error) {
      console.error("Failed to analyze chapter:", error);
      // You could add error state handling here
    } finally {
      setLoading(false);
    }
  };

  const clearText = () => {
    setText("");
  };

  return {
    text,
    setText,
    entries,
    themeData,
    result,
    loading,
    balance,
    setBalance,
    detectChapter,
    clearText,
  };
}; 