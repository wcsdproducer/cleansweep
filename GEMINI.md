# CleanSweep — Agent Instructions

Read this entire file before starting any task.

## Project Identity

**CleanSweep** is the Customer-facing booking app for the CleanSweep cleaning services platform. It allows homeowners, property managers, and Airbnb hosts to browse, book, and manage professional cleaning services.

- **Stack**: Next.js + TypeScript + Firebase (currently archived in Firebase Studio — needs code export)
- **Firebase Project**: `studio-3673070449-f277c` (shared with CleanSweep Connect provider app)
- **GitHub Repo**: `wcsdproducer/cleansweep` (code needs to be pushed from Firebase Studio)
- **Hosting Backend**: `studio` on Firebase App Hosting
- **Status**: Archived in Firebase Studio — needs code migration to this workspace

## Architecture

This is one of **two** CleanSweep apps (Customer + Provider) that share the same Firestore database:

| App | Workspace | Role |
|---|---|---|
| **CleanSweep** | `CleanSweep/` | Customer-facing booking app |
| **CleanSweep Connect** | `CleanSweep Connect/` | Service provider management app |
| **Admin** | Mission Control (GravityClaw) | Business admin — bookings, clients, analytics |

> **IMPORTANT**: Both apps read/write the same Firestore database. Schema changes affect both apps.

## Business Context

- Target audience: Homeowners, property managers, Airbnb hosts
- Value prop: Easy booking of professional cleaning services
- Content tone: Friendly, satisfying, visual — let results speak
- Website: cleansweepclean.com

## Owner

- **Jack Freeman** (John Freeman / wcsdproducer)
- Part of the GravityClaw ecosystem
- Mission Control monitors this workspace

## Self-Correcting Rules Engine

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section below.
2. Format: `N. [CATEGORY] Never/Always do X — because Y.`
3. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`
4. Before starting any task, scan all rules for relevant constraints.
5. Higher-numbered rules win over lower-numbered ones.

---

## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->
1. [DATA] Always coordinate schema changes with CleanSweep Connect — both apps share the same Firestore database.
2. [CODE] Always use `npm` — project uses package-lock.json.
