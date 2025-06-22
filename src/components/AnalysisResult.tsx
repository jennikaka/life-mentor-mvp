import React from "react";
import { ChapterResponse, TimelineEntry } from "@/types";
import { Card, Badge } from "@/components/ui";

interface AnalysisResultProps {
  result: ChapterResponse;
  entries: TimelineEntry[];
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  entries
}) => {
  const displaySummary = result.isNewChapter
    ? `Entering a new chapter: ${result.chapterSummary}`
    : `Steady progress in your current chapter: ${result.chapterSummary}`;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Insight:</span>{" "}
            <span className="text-gray-600">{displaySummary}</span>
          </p>
          
          <p>
            <span className="font-semibold text-gray-700">Emotion:</span>{" "}
            <span className="text-gray-600">{result.emotionTone}</span>
          </p>
          
          <div>
            <span className="font-semibold text-gray-700 mr-2">Themes:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {result.keyThemes.map((theme) => (
                <Badge key={theme}>{theme}</Badge>
              ))}
            </div>
          </div>
          
          <p>
            <span className="font-semibold text-gray-700">Reflect:</span>{" "}
            <span className="text-gray-600">{result.reflectionQuestion}</span>
          </p>
          
          <p>
            <span className="font-semibold text-gray-700">Next Step:</span>{" "}
            <span className="text-gray-600">{result.actionSuggestion}</span>
          </p>
          
          {result.watchOutFor && result.watchOutFor.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 rounded">
              <span className="font-semibold text-yellow-800">⚠️ Watch out for:</span>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {result.watchOutFor.map((warning, index) => (
                  <li key={index} className="text-yellow-700">{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {entries.length > 0 && (
        <Card className="p-4">
          <span className="font-semibold text-gray-700">Past Chapters:</span>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            {entries.map((entry, index) => (
              <li key={index} className="text-gray-600">{entry.summary}</li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}; 