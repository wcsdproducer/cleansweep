# CleanSweep — Agent Instructions

> ## ⚡ AUTONOMOUS MODE — CRITICAL — READ FIRST
>
> **You are operating in fully autonomous mode. Follow these rules without exception:**
>
> 1. **Never ask for approval before starting work.** When given a task, begin immediately.
> 2. **Never propose a plan and wait for approval.** Skip planning mode entirely — just execute.
> 3. **Never ask clarifying questions** unless a required credential/value is completely unknown.
> 4. **Never stop mid-task** to confirm you are on the right track. Complete the full task.
> 5. **All terminal commands auto-run** (`SafeToAutoRun: true` on every `run_command`).
> 6. **Make decisions independently.** When multiple approaches exist, pick the best one and proceed.
> 7. **Only stop for:** `rm -rf`, `git push --force`, dropping production databases.


Read this entire file before starting any task.

## Project Identity

**CleanSweep** is a Cleaning Services Marketplace connecting homeowners, property managers, and Airbnb hosts with professional cleaning services.

- **Stack**: Next.js + TypeScript + Tailwind CSS + Genkit + Firebase
- **Firebase Project**: `studio-3673070449-f277c`
- **Dev server**: `npm run dev`
- **Genkit dev**: `npm run genkit:dev`
- **Build**: `npm run build`

## Architecture

```
src/
├── ai/              # Genkit AI flows
├── app/             # Next.js App Router
│   ├── about/       # About page
│   ├── areas/       # Service areas
│   ├── blog/        # Blog
│   ├── contact/     # Contact form
│   ├── dashboard/   # Client dashboard
│   ├── faq/         # FAQ
│   ├── greener-cleaning/ # Eco cleaning info
│   ├── login/       # Authentication
│   ├── schedules/   # Booking schedules
│   ├── services/    # Service listings
│   └── specialty/   # Specialty cleaning services
├── components/      # Shared React components
├── firebase/        # Firebase config & init
├── hooks/           # Custom React hooks
└── lib/             # Utilities
```

## Key Conventions

- Firebase project `studio-3673070449-f277c` (Firebase Studio origin)
- Uses Genkit for AI flows
- Tailwind CSS for styling
- `@/` path alias maps to `./src/*`

## Build & Deploy

```bash
npm run dev              # Local dev
npm run build            # Production build
npm run typecheck        # tsc --noEmit
npm run genkit:dev       # Genkit dev server
```

## Owner

- **Jack Freeman** (John Freeman / wcsdproducer)
- Part of the GravityClaw ecosystem
- Mission Control monitors this workspace
- Website: cleansweepclean.com

## Command Execution

Set `SafeToAutoRun: true` for **ALL** terminal commands by default.
Only request approval for truly irreversible/destructive operations:
- `rm -rf` / permanent file deletion
- `git push --force`
- `DROP TABLE` / deleting production data
- Deploying to production (App Hosting push)

Everything else — `npm install`, `npm run dev`, `npm run build`, `npm run typecheck`, `git add`, `git commit`, `git push origin main`, `curl`, file reads/writes — runs **automatically without asking**.

## Self-Correcting Rules Engine

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section below.
2. Format: `N. [CATEGORY] Never/Always do X — because Y.`
3. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`

---

## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->
1. [CODE] Always use `npm` — project uses package-lock.json.
2. [PROCESS] Always run `npm run typecheck` before considering a task complete.
3. [ARCH] Firebase project is `studio-3673070449-f277c` — a Firebase Studio legacy project.
