import React from "react";
import { TabType, ThemeData, TimelineEntry } from "@/types";
import { Timeline, Themes } from "@/components";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  entries: TimelineEntry[];
  themeData: ThemeData;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  entries,
  themeData
}) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: "time", label: "By Time" },
    { id: "theme", label: "By Theme" }
  ];

  return (
    <aside className="w-1/3 p-6 border-r border-gray-100">
      <nav className="flex flex-col space-y-6 text-lg text-gray-600 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "focus:outline-none transition-colors duration-200 text-left",
              activeTab === tab.id 
                ? "text-indigo-600 font-medium" 
                : "hover:text-indigo-500"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      
      <div className="mt-8">
        {activeTab === "time" ? (
          <Timeline entries={entries} />
        ) : (
          <Themes counts={themeData.counts} scores={themeData.scores} />
        )}
      </div>
    </aside>
  );
}; 