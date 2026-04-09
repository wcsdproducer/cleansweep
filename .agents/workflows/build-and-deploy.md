---
description: Build and deploy CleanSweep
---

# /build-and-deploy — CleanSweep

// turbo-all

## Steps

1. **Typecheck**:
   - `npm run typecheck` (if available)

2. **Build**:
   - `npm run build`
   - If errors → fix them before proceeding.

3. **Deploy**:
   - `git add -A && git commit -m "deploy: <description>" && git push`
   - Firebase App Hosting auto-deploys on push to main.

4. **Verify**:
   - Check Firebase App Hosting console for build status.
