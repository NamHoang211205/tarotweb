# Tarot Practice

A full-stack tarot reading web app where users draw a spread, interpret each card, and then talk through the reading with an AI reader that is grounded in the app's own card database rather than free-associating.

Built with Next.js 16, TypeScript, PostgreSQL, and the Anthropic API.

> **Live demo:** _add your Vercel URL here_

---

## What it does

- **Three tarot spreads** — One Card, Three Card (Past / Present / Future), and the ten-card Celtic Cross. Each spread assigns every position a distinct meaning, so the same card reads differently depending on where it lands.
- **Full 78-card deck** — all Major and Minor Arcana, each with upright and reversed interpretations plus keywords, served from PostgreSQL.
- **Interactive draw** — cards are dealt face-down at random (including orientation) and flipped individually with a CSS 3D animation. Reversed cards render upside-down, as in a physical reading.
- **AI reader** — once every card is flipped, a Claude-powered reader streams in a single interpretation connecting the whole spread, then stays available for follow-up questions.
- **Quick topics** — one-click prompts (love, career, money, health, guidance) that pre-fill the question for users who aren't sure what to ask.
- **Accounts and history** — email/password auth; every saved reading is stored with its full AI conversation and is visible only to the user who created it.

Drawing and interpreting cards is open to everyone. Signing in is only required to save a reading.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon), Prisma ORM |
| Auth | Auth.js v5 (NextAuth) — Credentials provider, bcrypt, JWT sessions |
| AI | Anthropic API (`claude-haiku-4-5`), streamed responses |
| Hosting | Vercel |

---

## Architecture highlights

These were the decisions that shaped the codebase.

### Grounded AI, not an open-ended chatbot

The reader never invents card meanings. On each request the server builds a system prompt from the exact cards drawn — name, orientation, position in the spread, and the interpretation text already stored in PostgreSQL — and instructs the model to synthesise only from that material. This keeps the AI's output consistent with the rest of the app instead of contradicting the card meanings shown directly above it.

### Streaming without shipping the provider protocol to the browser

`app/api/chat/route.ts` consumes the Anthropic SDK's stream server-side and re-emits only text deltas through a `ReadableStream`. The client reads plain UTF-8 chunks and appends them to the active message, so the browser never has to parse Anthropic's event format and the API contract stays swappable.

The Messages API requires an alternating history beginning with a `user` turn, but the opening interpretation is auto-triggered with no user message. The route resolves this by synthesising the opening turn server-side whenever the incoming history is empty or starts with `assistant` — keeping the client free to send only real conversation turns.

### Edge-safe auth configuration

Next.js middleware runs on the Edge Runtime, which cannot load Prisma. The Auth.js setup is therefore split in two:

- `auth.config.ts` — Edge-compatible, no database imports. Used by `proxy.ts` for route protection.
- `auth.ts` — the full configuration including the Prisma-backed credential check. Used by route handlers and Server Components.

### Defence in depth on user data

Protected routes are enforced in three independent places: middleware redirects unauthenticated requests, Server Components re-check the session before querying, and API routes verify ownership before reading or mutating. Deletions are scoped by `userId` in the query itself, so one account cannot reach another's records even with a guessed ID.

### Reference data in the database, not in source

The 78-card deck lives in a `Card` table, loaded once per page render and passed down to client components. `prisma/seedData.ts` exists solely to seed it. Card interpretations can be corrected through the database without a redeploy, and the deck is queryable alongside everything else.

### Atomic writes

Saving a reading persists the reading and its entire AI conversation in a single nested Prisma create, so a reading can never be stored without the conversation that accompanied it.

### Component architecture

Components are grouped by domain rather than by type:

- `components/reading/` — the reading experience (draw, flip, results, chat), reused by both live readings and saved history.
- `components/landing/` — marketing page sections, each a single self-contained section.
- `components/` — cross-cutting UI (navigation, ambient background).

The landing page composes six section components and contains no markup of its own. Scroll reveals use a single `IntersectionObserver` wrapper that fires once and disconnects.

### Motion and accessibility

Every animation — the twinkling starfield, the rotating zodiac wheel, the card flip, the scroll reveals — is disabled under `prefers-reduced-motion`. The hero renders visible immediately so no content depends on JavaScript to appear.

---

## Project structure

```
app/
  page.tsx                  Landing page (composes six sections)
  login/                    Authentication
  reading/                  Spread selection
  reading/[spread]/         Draw, flip, interpret, chat, save
  history/                  Saved readings (auth required)
  history/[id]/             A single reading with its AI conversation
  api/chat/                 Streaming AI interpretation
  api/readings/             Reading CRUD, scoped to the session user
  api/signup/               Account creation
  api/auth/[...nextauth]/   Auth.js handlers

components/
  reading/                  Reading experience
  landing/                  Landing page sections
  *.tsx                     Cross-cutting UI

lib/
  cards.ts                  Card queries against PostgreSQL
  spreads.ts                Spread definitions and position meanings
  draw.ts                   Shuffle and draw logic
  topics.ts                 Quick-topic definitions
  anthropic.ts / db.ts      API clients

auth.ts, auth.config.ts     Auth.js configuration (split for Edge)
proxy.ts                    Route protection middleware
prisma/                     Schema, migrations, seed
```

---

## Running locally

**Prerequisites:** Node.js 20+, a PostgreSQL database ([Neon](https://neon.tech) has a free tier), and an [Anthropic API key](https://console.anthropic.com/settings/keys).

```bash
git clone https://github.com/NamHoang211205/tarotweb.git
cd tarotweb
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Pooled connection string (hostname contains `-pooler`) |
| `DIRECT_URL` | Direct connection string — used for migrations |
| `AUTH_SECRET` | Session signing key: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `ANTHROPIC_API_KEY` | Powers the AI reader |

Then set up the database and start the dev server:

```bash
npx prisma migrate dev     # create tables
npx prisma db seed         # load the 78-card deck
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Deployed on Vercel. Import the repository, set the four environment variables above, and deploy — `prisma generate` runs automatically via `postinstall`.

After a schema change, apply it to production with `npx prisma migrate deploy`.

---

## Known limitations

Honest notes on what this project does not yet do:

- **No rate limiting.** The chat endpoint calls a paid API on every request and account creation is unthrottled. Both would need limits before opening the app to significant traffic.
- **No password reset.** There is no email delivery configured, so a forgotten password cannot currently be recovered.
- **Deliberately bilingual.** The interface is in English while card interpretations and AI responses are in Vietnamese — the app was built for a Vietnamese-speaking audience and the card corpus was authored in Vietnamese.

---

## Credits

Built by [Nam Hoang](https://github.com/NamHoang211205). Card interpretations written by hand; all visuals (the zodiac wheel, card backs, ornamentation) are drawn in SVG and CSS, with no third-party tarot artwork.
