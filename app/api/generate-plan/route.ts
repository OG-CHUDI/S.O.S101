import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goal, timeframe, subjects, totalSessions } = body;

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY not configured. Get a free key at console.groq.com' }, { status: 500 });
    }

    const prompt = `You are an expert study planner creating a personalized schedule.

Student details:
- Goal: ${goal}
- Timeframe: ${timeframe}
- Subjects/topics: ${Array.isArray(subjects) ? subjects.join(', ') : subjects}
- Past experience: ${totalSessions} study sessions completed

Create a practical 7-day study plan (or fewer days if timeframe is shorter).
Each day should have 2-4 focused Pomodoro sessions (25 min each).
Distribute subjects intelligently based on the goal.

Respond ONLY with valid JSON (no markdown, no code fences):
{
  "notes": "One sentence overview of the plan strategy",
  "totalSessionsPerDay": 3,
  "days": [
    {
      "day": "Day 1 — Monday",
      "sessions": [
        { "subject": "Subject name", "duration": "25 min", "focus": "Brief focus description" }
      ]
    }
  ]
}

Keep focus descriptions under 8 words. Be specific and actionable.`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1200,
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

    return NextResponse.json({
      plan: {
        goal,
        timeframe,
        subjects: Array.isArray(subjects) ? subjects : [subjects],
        generatedAt: new Date().toISOString(),
        ...parsed,
      },
    });
  } catch (e) {
    console.error('plan error:', e);
    return NextResponse.json({ error: 'Failed to generate plan. Please try again.' }, { status: 500 });
  }
}