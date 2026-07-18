# AGENTS.md

## Project

Personal portfolio site. Vanilla HTML/CSS/JS served by Vite (no framework).

## Commands

- `npm run dev` — Vite dev server
- `npm run preview` — preview production build

No lint, typecheck, test, or formatter configured.

## Architecture

SPA via custom client-side router. `src/js/router.js` fetches HTML fragments from `src/pages/` and injects them into `#main-content`.

- `src/js/pages.js` — route registry (path → HTML file mapping). Add new pages here first.
- `src/js/navigation.js` — sidebar click handling, `data-page` attribute drives routing.
- `src/js/animation.js` — cursor glow effect.
- `src/pages/*.html` — page content fragments (not full HTML documents).
- `src/style/` — CSS organized by concern (base, components, layout, animation, pages-style).

Entry point: `index.html` → `src/js/main.js`.

## Gotchas

- `package-lock.json` is gitignored. Run `npm install` after clone.
- Pages are fetched via `fetch()` — they won't work with `file://` protocol.
- SVG icons use a sprite at `assets/icon/sprite.svg`.
