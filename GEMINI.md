# CleanSweep — Agent Instructions

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
