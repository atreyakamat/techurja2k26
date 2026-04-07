# Techurja 2K26 Admin Platform - Implementation Guide

This document provides crucial technical details for building the Techurja 2K26 Admin Verification Platform. Use the builder prompt at the bottom to initialize the next development phase.

## 1. Technical Context

### 1.1 Database (MySQL)
The database is hosted remotely and managed via **Prisma ORM**. 
- **Environment Variable**: `PROD_DATABASE_URL`
- **Schema**: Located in `prisma/schema.prisma`. It contains the `Registration` model with 12+ contact fields, `transactionId`, `paymentScreenshot` (FTP path status), and `needsAccommodation`.
- **Resetting**: To clear and recreate tables, use `npx prisma db push --force-reset`. Note that the `Event` model in the DB is currently unused as event data is statically managed in `src/lib/event-data.ts` for performance.

### 1.2 FTP Storage Node
Payment screenshots and registration CSVs are stored on a separate FTP server.
- **Root Directory**: `/registrations/{registration_id}/`
- **Files**: 
  - `{original_filename}`: The payment screenshot.
  - `details.csv`: A machine-readable backup of all registration fields.
- **Security**: DO NOT expose FTP credentials to the client. All FTP operations must happen server-side via basic-ftp or similar.

### 1.3 Registration Statuses
- `pending`: Default.
- `UPLOADED_TO_FTP: ...`: Success. The string contains the relative path to the image.
- `FTP_UPLOAD_FAILED`: Error during transmission.
- `NO_SCREENSHOT`: Free events or missing data.

## 2. Crucial Security & Logic
- **Verification Proxy**: Admins need to see screenshots. Since FTP is private, create a Next.js Route Handler (e.g., `/api/admin/ftp/fetch`) that:
  1. Authenticates the admin session.
  2. Connects to the FTP server using `basic-ftp`.
  3. Navigates to `/registrations/{id}/`.
  4. Calls `client.list()` to find the image file (handles dynamic names).
  5. Streams the image buffer with the correct `Content-Type`.
- **Structured Logging**: All FTP operations MUST be logged with the following prefixes for monitoring:
  - `[FTP_CONNECT]`, `[FTP_DISCONNECT]`
  - `[FTP_UPLOAD_INIT]`, `[FTP_UPLOAD_SUCCESS]`
  - `[FTP_FETCH_INIT]`, `[FTP_FETCH_SUCCESS]`
  - `[FTP_ERROR_XXX]` (where XXX is the FTP status code).
- **Secret Access**: Use an environment variable `ADMIN_SECRET` for simple dashboard access or implement full NextAuth.

---

## 3. BUILDER PROMPT (Copy-Paste this to start development)

> **Context**: I am building the Admin Verification Dashboard for Techurja 2K26. The project is a Next.js 16 (App Router) application using Prisma (MySQL) and an external FTP server for storage.
>
> **Objective**: Create a secure dashboard at `/admin` that allows organizers to verify registrations.
>
> **Requirements**:
> 1. **Authentication**: Implement a simple landing page that asks for an `ADMIN_SECRET`. Store the session in a secure cookie or use NextAuth.
> 2. **Registration Grid**:
>    - Fetch all records from the `Registration` table using Prisma.
>    - Display a table with: ID, Event Name, Team Name, Lead Name, Transaction ID, and Status.
>    - Add a "View Details" button for each row.
> 3. **Detail Modal/Page**:
>    - Display ALL 4 participants' names, emails, and phones.
>    - Show the `needsAccommodation` flag prominently for Robowar categories.
>    - **Payment Verification**: Fetch and display the payment screenshot. You MUST create a server-side API proxy to stream the image from the FTP server (path is stored in the `paymentScreenshot` field) to the UI.
> 4. **Actions**:
>    - Simple buttons to update status to "VERIFIED" or "REJECTED".
>    - An `adminNotes` text field to provide reasons for rejection.
> 5. **Export**: 
>    - Add a button to export the current filtered grid to a Master Excel/CSV.
> 6. **Style**: Follow the "Arena Master" aesthetic: Dark mode, neon borders (`#29F4FF`, `#FF2CDE`), and monospace fonts (Rajdhani/Orbitron).
>
> **Files to reference**:
> - `prisma/schema.prisma`: The source of truth for the data model.
> - `src/lib/event-data.ts`: The source of truth for event details.
> - `src/app/api/register/route.ts`: Reference this for how data is currently saved.
