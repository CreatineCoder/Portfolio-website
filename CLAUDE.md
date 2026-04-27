# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + build for production
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture

React 19 + TypeScript SPA built with Vite. Routing via `react-router-dom` with four pages: `/`, `/about`, `/projects`, `/contact`.

**Entry:** `src/main.tsx` → `src/App.tsx` — App holds dark mode state and passes it to `Header`. Routes render page components from `src/pages/`.

**Pages** (`src/pages/`) compose section components from `src/components/`. Each page is a thin wrapper:
- `Home` — `LetterGlitch` (WebGL canvas background) + `Hero`
- `ProjectsPage` — `Projects` component with `InfiniteMenu` 3D carousel
- `AboutPage`, `ContactPage` — layout wrappers for their respective components

**Visual/animation components:**
- `LetterGlitch` — WebGL canvas with GLSL shader for the home background glitch effect
- `InfiniteMenu` — Three.js-based 3D infinite scroll carousel for the projects grid
- `LogoLoop` — CSS marquee of tech stack logos
- `ScrambledText` — text scramble animation on hover
- `TrueFocus` — blur/focus text reveal effect

**Styling:** each component has a co-located `.css` file; global styles in `src/index.css` and `src/App.css`. No CSS framework — custom properties for theming.

**Project data** lives as a hardcoded array in `src/components/Projects.tsx`, typed by `src/types/project.ts`. To add a project, edit that array.

## Key dependencies

| Package | Purpose |
|---|---|
| `three` | 3D rendering in `InfiniteMenu` |
| `gsap` | Animation in `InfiniteMenu` and elsewhere |
| `motion` | Framer Motion v12 for page/component transitions |
| `react-icons` | Icon set used in `Hero`, `Contact`, `Footer` |
