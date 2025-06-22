"use client";
import React from "react";
import { TimelineEntry } from "@/types";

interface TimelineProps {
  entries: TimelineEntry[];
}

export const Timeline: React.FC<TimelineProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No reflections yet</p>
        <p className="text-sm mt-1">Start sharing your thoughts to see your journey</p>
      </div>
    );
  }

  const renderGroup = (group: React.ReactElement[]) => {
    if (group.length === 0) return null;
    return (
      <div className="space-y-4">
        {group}
      </div>
    );
  };

  let currentGroup: React.ReactElement[] = [];
  const timelineElements: React.ReactElement[] = [];

  entries.forEach((entry, i) => {
    if (entry.isNew) {
      // Flush previous group
      if (currentGroup.length > 0) {
        timelineElements.push(
          <div key={`group-${i}`} className="mb-6">
            {renderGroup(currentGroup)}
          </div>
        );
        currentGroup = [];
      }
      // Render chapter header
      timelineElements.push(
        <h3 key={`header-${i}`} className="mt-6 text-indigo-600 font-semibold text-lg">
          {entry.summary}
        </h3>
      );
    } else {
      currentGroup.push(
        <div key={i} className="relative flex items-start">
          <span className="absolute -left-1 w-2 h-2 bg-indigo-300 rounded-full mt-1.5" />
          <p className="ml-4 text-gray-700 leading-relaxed">{entry.summary}</p>
        </div>
      );
    }
  });

  // Flush last group
  if (currentGroup.length > 0) {
    timelineElements.push(
      <div key="final-group" className="mb-6">
        {renderGroup(currentGroup)}
      </div>
    );
  }

  return (
    <div className="relative pl-4">
      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300" />
      {timelineElements}
    </div>
  );
};
