# Life Mentor MVP

A thoughtful AI companion for life reflection and personal growth. This application helps users reflect on their thoughts and experiences by analyzing them through the lens of life chapters, themes, and emotional patterns.

## Features

- **Life Chapter Analysis**: AI-powered analysis of journal entries to identify new life chapters or ongoing progress
- **Theme Tracking**: Automatic extraction and sentiment analysis of key life themes
- **Timeline View**: Visual representation of your life journey over time
- **Theme Visualization**: Interactive theme blocks with sentiment-based color coding
- **Reflection Questions**: Personalized questions to deepen self-understanding
- **Action Suggestions**: Concrete next steps for personal growth
- **Balance Control**: Adjustable slider for validation vs. action-oriented feedback

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Anthropic Claude API
- **Database**: SQLite with Prisma ORM
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AnalysisResult.tsx
│   ├── ReflectionForm.tsx
│   ├── Sidebar.tsx
│   ├── Themes.tsx
│   └── Timeline.tsx
├── hooks/                # Custom React hooks
│   └── useChapterAnalysis.ts
├── lib/                  # Utility libraries
│   ├── anthropic.ts      # AI client
│   ├── prisma.ts         # Database client
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd life-mentor-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Anthropic API key to `.env.local`:
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

1. **Share Your Thoughts**: Type your reflections in the text area
2. **Adjust Feedback Style**: Use the slider to control validation vs. action-oriented feedback
3. **Analyze**: Click "Reflect Quietly" to get AI analysis
4. **Explore**: Switch between timeline and theme views in the sidebar
5. **Track Progress**: View your life chapters and theme patterns over time

## API Endpoints

### POST /api/chapters
Analyzes a journal entry and returns chapter insights.

**Request Body:**
```json
{
  "text": "Your journal entry",
  "previousChapter": "Previous chapter summary",
  "previousStages": ["Stage 1", "Stage 2"],
  "balance": 50
}
```

**Response:**
```json
{
  "isNewChapter": true,
  "chapterSummary": "Starting a new career journey",
  "emotionTone": "hopeful",
  "keyThemes": ["career", "new beginnings"],
  "themeSentiments": {
    "career": 75,
    "new beginnings": 80
  },
  "reflectionQuestion": "What excites you most about this new direction?",
  "actionSuggestion": "Research potential career paths and network with professionals in your target field",
  "watchOutFor": ["Don't rush into decisions without proper research"]
}
```

## Development

### Code Style
- Use TypeScript for type safety
- Follow React best practices with functional components and hooks
- Use Tailwind CSS for styling
- Implement proper error handling and loading states

### Key Components

- **useChapterAnalysis**: Custom hook managing analysis state and API calls
- **ReflectionForm**: Form component for user input
- **AnalysisResult**: Displays AI analysis results
- **Sidebar**: Navigation and content switching
- **Timeline**: Visual timeline of life chapters
- **Themes**: Interactive theme visualization

### Database Schema

The application uses a simple schema with an `Entry` table storing:
- User text input
- AI analysis results
- Timestamps and metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
