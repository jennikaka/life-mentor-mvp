import dotenv from 'dotenv';
dotenv.config();

import { NextRequest, NextResponse } from 'next/server';
import { callClaude } from '@/lib/anthropic';
import { prisma } from '@/lib/prisma';
import { ChapterRequest, ChapterResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const { text, previousChapter, previousStages, balance } =
      (await request.json()) as ChapterRequest;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Missing or empty 'text' in request body" },
        { status: 400 }
      );
    }

    // Build prompt
    let prompt = `You are a thoughtful life-mentor AI.

Given a snippet of user journaling, do the following **and nothing else**:
1. Decide if it starts a new major life chapter or continues a previous one.
2. Summarize that chapter (or the larger chapter it belongs to) in 1–2 sentences.
3. Identify the **primary emotional tone** (e.g. hopeful, anxious, reflective).
4. Extract **2–4 key themes** (e.g. change, resilience, identity).
4.a. Normalize all themes into one of these categories only:
– new beginnings
– education
– career
– relationships
– personal growth
– well-being
– adaptation
5. For each theme, provide a **sentiment score** (0-100) where:
   - 0-30: Negative/struggling (e.g., failing school, relationship problems)
   - 31-70: Neutral/mixed (e.g., challenges but also progress)
   - 71-100: Positive/thriving (e.g., achievements, growth, success)
6. Suggest one **deep reflection question** for the user.
7. Give one **concrete action** they could take next.
8. **Only if you detect a truly critical life-balance gap that the user seems unaware of**, include a "watchOutFor" array with 1–3 concise warnings. Otherwise omit that field entirely.

**IMPORTANT**: Respond **exactly** with a single JSON object—no extra text. It must start with '{' and end with '}'.

\`\`\`json
{
  "isNewChapter": <true|false>,
  "chapterSummary": "…",
  "emotionTone": "…",
  "keyThemes": ["new beginnings","career","well-being",…],
  "themeSentiments": {
    "new beginnings": <0-100>,
    "career": <0-100>,
    "well-being": <0-100>
  },
  "reflectionQuestion": "…",
  "actionSuggestion": "…",
  "watchOutFor": [ "…", "…" ]
}
\`\`\`
`;

    // Tone-action slider
    if (balance !== undefined) {
      prompt += `

Adjust tone according to slider (0 = soft validation, 100 = action-oriented critique): ${balance}`;
    }

    // Include history
    if (previousChapter) {
      prompt += `

Previous chapter summary:
${previousChapter}`;
    }
    if (previousStages && previousStages.length) {
      prompt += `

Previous life milestones:
${previousStages.map((s, i) => `${i+1}. ${s}`).join('\n')}`;
    }

    // Finally the user text
    prompt += `

User text:
${text}`;

    const reply = await callClaude(prompt);
    if (!reply) {
      return NextResponse.json(
        { error: 'No response from Claude' },
        { status: 500 }
      );
    }

    let data: ChapterResponse;
    try {
      data = JSON.parse(reply);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', parseError);
      // Fallback – should rarely happen now
      const m = reply.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          data = JSON.parse(m[0]);
        } catch {
          return NextResponse.json(
            { error: 'Invalid response format from Claude' },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Invalid response format from Claude' },
          { status: 500 }
        );
      }
    }

    // Validate required fields
    const requiredFields = ['isNewChapter', 'chapterSummary', 'emotionTone', 'keyThemes', 'themeSentiments', 'reflectionQuestion', 'actionSuggestion'];
    for (const field of requiredFields) {
      if (!(field in data)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 500 }
        );
      }
    }

    // Save entry to database
    try {
      await prisma.entry.create({
        data: {
          text: text.trim(),
          chapterSummary: data.chapterSummary,
          emotionTone: data.emotionTone,
          keyThemes: data.keyThemes,
          themeSentiments: data.themeSentiments,
          reflectionQuestion: data.reflectionQuestion,
          actionSuggestion: data.actionSuggestion,
          watchOutFor: data.watchOutFor,
          balance: balance ?? 50,
        },
      });
    } catch (dbError) {
      console.error('Failed to save entry to database:', dbError);
      // Continue with the response even if database save fails
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error('Chapter analysis error:', err);
    return NextResponse.json(
      { 
        error: 'Chapter analysis failed', 
        details: err instanceof Error ? err.message : String(err) 
      },
      { status: 500 }
    );
  }
}
