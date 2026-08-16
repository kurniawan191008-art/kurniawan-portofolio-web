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

Design system: see `DESIGN.md` for palette, typography, spacing, borders, layout rules.

## Utility Classes

`src/style/base/utilities.css` contains reusable utility classes (Tailwind-inspired). Prefer using these instead of writing new inline/one-off CSS:

- `.uppercase` — text-transform: uppercase
- `.scroll-area` — overflow-y auto, no scrollbar, smooth scroll
- `.sticky-top` — sticky positioning, z-index 10000
- `.navbar-sticky` — styled sticky navbar with neobrutalism theme
- `.anchor-list` / `.anchor-link` — horizontal nav link list with hover effects

When adding new styles, check `utilities.css` first — if a utility already exists, use it. If a new common pattern emerges, add it there instead of creating one-off rules.

## Gotchas

- `package-lock.json` is gitignored. Run `npm install` after clone.
- Pages are fetched via `fetch()` — they won't work with `file://` protocol.
- SVG icons use a sprite at `assets/icon/sprite.svg`.
- `home-style.css` is loaded via `<link>` in `index.html`, NOT imported in `main.css`. Other page styles (about, overview, error) are imported in `main.css`. Check both places when editing CSS.
- Page fragments must not contain `<html>`, `<head>`, or `<body>` — they inject into `#main-content` via `innerHTML`.
- Router treats any fetched HTML containing `id="main-parent"` as a 404 fallback. Don't reuse that ID in page fragments.
- CSS import order in `main.css`: reset → variables → typography → components → layout → animation → page-specific. Page styles come last.
