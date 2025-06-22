import dotenv from 'dotenv';
dotenv.config();

import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;

export const anthropic = new Anthropic({
  apiKey: apiKey || "",
});

// Helper function for Claude 3 calls only
export async function callClaude(prompt: string) {
  const res = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 512,
    temperature: 0.7,
    messages: [
      { role: 'user', content: prompt }
    ]
  });
  return res.content
    .filter((block: { type: string; text?: string }) => block.type === 'text')
    .map((block: { type: string; text?: string }) => block.text)
    .join('\n');
}