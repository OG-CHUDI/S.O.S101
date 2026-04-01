# ⚡ S.O.S — Study Operating System

> A distraction-free productivity platform with Pomodoro sessions, streak tracking, and AI-powered study insights.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| ⏱ **Pomodoro Timer** | 25-min focus / 5-min break with circular ring animation |
| 🔥 **Streak Tracking** | Consecutive study days, auto-calculated from sessions |
| 📊 **Progress Stats** | Sessions today, total sessions, weekly bar chart |
| 🤝 **Co-Study Mode** | Live mock count of students studying alongside you |
| 🤖 **AI Insights** | Claude analyses your habits and surfaces personalised observations |
| 📅 **AI Study Planner** | Enter goal + timeframe + subjects → get a structured daily plan |
| 💾 **Auto-saved** | All data persists in `localStorage` — no account needed |

---

## 🚀 Getting Started

### 1. Install

```bash
npm install
```

### 2. Set up your API key

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at [console.anthropic.com](https://console.anthropic.com/).

> **Note:** The AI features (Insights + Planner) require the API key.
> The Pomodoro timer, streak tracking, and stats work fully offline without it.

### 3. Run

```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Structure

```
sos/
├── app/
│   ├── layout.tsx                        # Root layout + StudyProvider
│   ├── page.tsx                          # Landing page
│   ├── globals.css                       # Design system (lime on black)
│   └── dashboard/
│       └── page.tsx                      # Main dashboard
│   └── api/
│       ├── generate-insights/route.ts    # AI insights endpoint
│       └── generate-plan/route.ts        # AI study plan endpoint
├── components/
│   ├── landing/
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   └── sections.tsx                  # Features + How It Works + Footer
│   └── dashboard/
│       ├── pomodoro-timer.tsx            # Core timer with SVG ring
│       ├── session-stats.tsx             # Stat cards + weekly bar chart
│       ├── ai-insights.tsx              # AI insights panel
│       └── study-planner.tsx            # AI plan form + plan display
├── context/
│   └── study-context.tsx                # useReducer + localStorage
└── lib/
    ├── types.ts                          # All TypeScript types
    └── utils.ts                          # Stats, date helpers, formatting
```

---

## 🎨 Design

Electric lime `#C8FF00` on near-black — late-night study hustle energy.

- **Syne** — bold geometric display font for headings and UI labels
- **Space Mono** — monospace for the timer digits and data
- **Nunito** — warm body font for descriptions
- SVG ring timer with smooth `stroke-dashoffset` animation
- Animated pulse ring behind timer during active sessions
- Grain texture overlay on body
- Grid-line hero background on landing

---

## ⚙️ Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Anthropic Claude Haiku** — fast, cheap AI for insights and plans
- **localStorage** — zero-backend persistence
- CSS custom properties — no component library

---

## 🔧 Troubleshooting

```bash
rm -rf .next node_modules/.cache && npm run dev
```

| Problem | Fix |
|---------|-----|
| `autoprefixer` not found | Ensure you ran `npm install` — it's in `devDependencies` |
| AI features not working | Add `ANTHROPIC_API_KEY` to `.env.local` |
| Stats not persisting | Check browser allows `localStorage` (not in incognito with restrictions) |

---

## 📋 PRD Compliance

- ✅ Pomodoro timer (25 min focus / 5 min break, start/pause/reset)
- ✅ Co-study indicator (mock active students count)
- ✅ Session tracking (today, total, streak)
- ✅ Weekly progress chart
- ✅ Streak system
- ✅ AI Study Insights (Claude Haiku, auto-triggers after sessions)
- ✅ AI Study Planner (goal + timeframe + subjects → daily plan)
- ✅ localStorage persistence
- ✅ All UX states (empty, active, completed, AI loading, error)
- ✅ No auth, no database, no complex pipelines
