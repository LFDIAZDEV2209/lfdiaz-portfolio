# Project knowledge

This file gives Freebuff context about your project: goals, commands, conventions, and gotchas.

## Overview
- **Project**: `lfdiaz-portfolio` — Personal portfolio website for Luis Diaz.
- **Stack**: Next.js 16.2.10 / React 19.2.4 / TypeScript 5 / Tailwind CSS 4 / ESLint 9
- **Package manager**: pnpm (`pnpm-lock.yaml` + `pnpm-workspace.yaml`)

## Quickstart
- **Install**: `pnpm install`
- **Dev**: `pnpm dev` (starts at http://localhost:3000)
- **Build**: `pnpm build`
- **Start (prod)**: `pnpm start`
- **Lint**: `pnpm lint`
- **Test**: No test framework configured yet.

## Architecture
- **Key directories**:
  - `app/` — Next.js App Router pages and layouts
  - `app/layout.tsx` — Root layout (Geist fonts, metadata)
  - `app/page.tsx` — Home page (currently the default starter)
  - `app/globals.css` — Global styles with Tailwind v4 `@import "tailwindcss"`
- **Tooling config**:
  - `next.config.ts` — Next.js configuration
  - `postcss.config.mjs` — PostCSS with `@tailwindcss/postcss`
  - `tsconfig.json` — Strict TS, `bundler` module resolution, `@/*` path alias
  - `eslint.config.mjs` — ESLint flat config

## Conventions
- **Formatting/linting**: ESLint via `pnpm lint` (Next.js ESLint config).
- **CSS**: Tailwind CSS v4 syntax (`@import "tailwindcss"` + `@theme inline`), NOT the old `@tailwind` directives.
- **Paths**: `@/*` alias maps to project root (e.g. `@/components/...`).
- **Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) via `next/font/google`.
- **Things to avoid**: Don't use `@tailwind` directives — Tailwind v4 uses `@import "tailwindcss"`. Don't add CSS custom properties without `@theme inline` or `@layer` in v4.

## Known Issues
- **Turbopack on Windows**: `@import "tailwindcss"` triggers a Turbopack panic on Windows (`nul` device error). **Fix**: The `dev` script uses `--webpack` flag as a workaround. Remove the flag once Vercel fixes [issue #90860](https://github.com/vercel/next.js/issues/90860).
- **Build** (`next build`) uses webpack by default and is not affected.
