# GEMINI.md - TECHURJA 2K26

## Project Overview
**TECHURJA 2K26** is a high-performance, full-stack event platform built for a technical festival. It features a distinct **Cyberpunk + Controlled Brutalist** aesthetic, leveraging modern web technologies to provide an immersive experience for event exploration and registration.

### Core Tech Stack
- **Frontend:** Next.js 16.2.0 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS 4 (Beta/Experimental), Framer Motion for animations, Lucide React for icons.
- **3D Graphics:** Spline (@splinetool/react-spline) for interactive scenes.
- **Backend:** Next.js Route Handlers (API).
- **Database & ORM:** MySQL with Prisma ORM.
- **Validation:** Zod for schema validation.

## Architecture & Directory Structure
- `src/app/`: Next.js App Router pages and API endpoints.
  - `api/register/`: Endpoint for handling event registrations.
  - `events/`: Event listing and dynamic detail pages (`[slug]`).
- `src/components/`: Modular UI components (e.g., `event-card.tsx`, `navbar.tsx`, and section-specific components).
- `src/lib/`: 
  - `event-data.ts`: Source of truth for event details (currently hardcoded for fast iteration).
  - `prisma.ts`: Singleton Prisma client configuration.
- `prisma/`: Database schema (`schema.prisma`) and SQL scripts.
- `docs/`: Original planning and design documentation (PRD, tech stack, design docs).
- `public/`: Static assets, including coordinator images and data CSVs.

## Building and Running

### Prerequisites
- Node.js (Latest LTS recommended)
- MySQL Database

### Key Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start the development server at `http://localhost:3000`.
- `npm run build`: Generate Prisma client and create a production build.
- `npm run lint`: Run ESLint for code quality checks.
- `npm run prisma:generate`: Regenerate the Prisma client after schema changes.
- `npm run prisma:migrate -- --name <name>`: Create and apply a new database migration.
- `npm run prisma:studio`: Open a GUI to browse and manage database records.

### Environment Configuration
Ensure a `.env` file exists with the following variable:
```text
PROD_DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/techurja2k26"
```

## Development Conventions

### Styling & UI
- **Aesthetic:** Strictly follow the Cyberpunk/Brutalist theme. Key elements include:
  - **CRT Noise Overlay:** Implemented via the `.crt-noise` class in `globals.css` (active in `layout.tsx`).
  - **Status Ticker Bars:** Two persistent animated tickers (Magenta at top, Cyan at bottom) displaying system notices and status data.
  - **Terminal Panels:** All UI blocks should use the `terminal-panel` and `neon-border` classes.
- **Typography:**
  - **Display:** Orbitron (via `--font-display`).
  - **Body/Terminal:** Rajdhani (via `--font-body`).
- **Tailwind:** Use the custom design tokens (e.g., `cyan-electric`, `magenta-cyber`, `yellow-nuclear`) defined in `globals.css`.
- **Animations:** Use `framer-motion` for entry animations and hover states to maintain the "high-tech" feel.

### Data Management
- **Event Catalog:** Currently managed in `src/lib/event-data.ts`. Updates to event details should be made here.
- **Registrations:** Stored in the `Registration` model in MySQL. Use Zod for validating registration payloads in API routes.
- **Type Safety:** Always define and export TypeScript interfaces for new data structures in `src/lib/`.

### API Patterns
- Use Next.js Route Handlers (`route.ts`) for all backend logic.
- Implement proper error handling and status codes (e.g., 201 for successful registration, 400 for validation errors).

## Testing & Validation
- **Linting:** Ensure all changes pass `npm run lint`.
- **Manual Verification:** Verify new components across mobile and desktop views, as the layout is highly responsive and visual.
- **Database:** After schema changes, always run `prisma generate` to update types.
