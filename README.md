# TECHURJA 2K26 - Cyberpunk Event Website

Full-stack event platform built from the provided PRD and design docs.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Next.js Route Handlers (API)
- MySQL
- Prisma ORM

## Implemented Features

- Cyberpunk + controlled brutalist landing page
- Event listing with category, level, and text search filters
- Event detail pages (rules, timing, venue, eligibility)
- Registration flow with form validation
- Registration API persisted to MySQL via Prisma
- Event API endpoint for filtered listings
- Responsive layout for desktop and mobile

## Project Structure

- `docs/` - original planning docs (`prd.md`, `design-doc.md`, `hero.md`, `techstack.md`)
- `src/app/` - pages and route handlers
- `src/components/` - reusable UI blocks
- `src/lib/` - event data and Prisma client
- `prisma/` - schema and migrations

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/techurja2k26"
```

3. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

4. Run development server

```bash
npm run dev
```

5. Open app

```text
http://localhost:3000
```

## Useful Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run lint` - ESLint checks
- `npm run prisma:generate` - regenerate Prisma client
- `npm run prisma:migrate -- --name <migration-name>` - create/apply migration
- `npm run prisma:studio` - browse database records

## API Endpoints

- `GET /api/events` with optional query params:
	- `search`
	- `category`
	- `level`
- `POST /api/register`
	- Body: `name`, `email`, `phone`, `institution`, `eventSlug`

## Notes

- The event catalog is seeded in code for fast iteration (`src/lib/event-data.ts`).
- Registrations are persisted in MySQL (`Registration` model).
