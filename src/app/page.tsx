"use client";

import { useState } from "react";
import { TabType } from "@/types";
import { useChapterAnalysis } from "@/hooks/useChapterAnalysis";
import { Sidebar, ReflectionForm, AnalysisResult } from "@/components";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("time");
  const {
    text,
    setText,
    entries,
    themeData,
    result,
    loading,
    balance,
    setBalance,
    detectChapter,
  } = useChapterAnalysis();

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        entries={entries}
        themeData={themeData}
      />

      <section className="flex-1 p-8 flex flex-col items-center">
        <ReflectionForm
          text={text}
          onTextChange={setText}
          balance={balance}
          onBalanceChange={setBalance}
          onSubmit={detectChapter}
          loading={loading}
        />

        {result && (
          <div className="mt-6 w-full max-w-xl">
            <AnalysisResult result={result} entries={entries} />
          </div>
        )}
      </section>
    </main>
  );
}
