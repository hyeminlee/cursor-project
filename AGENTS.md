# AGENTS.md

## Cursor Cloud specific instructions

This is a client-side-only React SPA (no backend, no database, no external services).

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite, serves at `http://localhost:5173/lovesmeornot/`) |
| Type-check | `npx tsc -b` |
| Production build | `npm run build` |

### Notes

- The Vite base path is `/lovesmeornot/` (matching GitHub Pages deployment), so the dev server URL is `http://localhost:5173/lovesmeornot/` — not the root.
- No linter (ESLint) is configured in the project. TypeScript type-checking (`tsc -b`) is the primary static analysis tool.
- No automated test framework is configured. Manual browser testing is the way to verify changes.
- The app UI is in Korean. Flower types are Daisy (데이지), Rose (장미), and Hydrangea (수국).
