import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalSessions, sessionsToday, streak, weeklyData, lastStudyDate } = body;

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY not configured. Get a free key at console.groq.com' }, { status: 500 });
    }

    const weekSummary = weeklyData
      ?.map((d: { label: string; sessions: number }) => `${d.label}: ${d.sessions} session(s)`)
      .join(', ') ?? 'no data';

    const prompt = `You are an AI study coach analyzing a student's study habits.

Study data:
- Total sessions completed: ${totalSessions}
- Sessions completed today: ${sessionsToday}
- Current study streak: ${streak} day(s)
- Last 7 days breakdown: ${weekSummary}
- Last study date: ${lastStudyDate ?? 'unknown'}

Generate exactly 3 short, personalized study insights for this student.
Each insight should be 1 sentence, actionable, and specific to their data.

Respond ONLY with valid JSON (no markdown, no fences):
{
  "insights": [
    { "icon": "📈", "text": "...", "type": "positive" },
    { "icon": "💡", "text": "...", "type": "tip" },
    { "icon": "📊", "text": "...", "type": "neutral" }
  ]
}

Types: "positive" (celebrating progress), "tip" (actionable advice), "neutral" (observation).
Icons: use relevant emojis. Keep each insight under 15 words.`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 400,
        temperature: 0.4,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Groq error:', errorText);
      throw new Error(errorText);
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content ?? '';
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ insights: parsed.insights });
  } catch (e) {
    console.error('insights error:', e);
    return NextResponse.json({
      insights: [
        { icon: '📈', text: 'Keep building your streak — consistency is your superpower.', type: 'positive' },
        { icon: '💡', text: 'Try studying at the same time each day to build a strong habit.', type: 'tip' },
        { icon: '🎯', text: 'Short, focused sessions beat long, distracted ones every time.', type: 'neutral' },
      ],
    });
  }
}