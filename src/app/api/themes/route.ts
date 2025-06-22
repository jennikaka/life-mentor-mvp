import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const entries = await prisma.entry.findMany({
      select: {
        keyThemes: true,
      },
    });

    // Aggregate themes across all entries
    const themeCounts: Record<string, number> = {};
    
    entries.forEach((entry: { keyThemes: unknown }) => {
      const themes = entry.keyThemes as string[];
      themes.forEach(theme => {
        themeCounts[theme] = (themeCounts[theme] || 0) + 1;
      });
    });

    return NextResponse.json(themeCounts);
  } catch (error) {
    console.error('Failed to fetch themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
} 