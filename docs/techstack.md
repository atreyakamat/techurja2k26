# Event Website – Technical Stack Document

## 1. Overview

This document defines the complete technical architecture and stack for the Event Website platform. The goal is to build a scalable, modern, and high-performance system capable of handling event listings, user registrations, and administrative workflows efficiently.

The system follows a full-stack web architecture where the frontend, backend, and database are cleanly structured but can be managed within a unified development framework.

---

## 2. Core Architecture

The application follows a three-layer architecture:

* **Frontend (Client Layer)** – Handles UI/UX and user interaction
* **Backend (Application Layer)** – Processes logic, APIs, authentication
* **Database (Data Layer)** – Stores and manages persistent data

### Data Flow:

User → Frontend → Backend API → Database (MySQL) → Response → Frontend

---

## 3. Frontend Stack

### Framework: Next.js (React-based)

Next.js is used as the primary frontend framework to build a fast, SEO-friendly, and scalable user interface.

### Key Features:

* Server-Side Rendering (SSR) for SEO optimization
* Static Site Generation (SSG) for performance
* Component-based architecture
* Built-in routing system

### Styling:

* **Tailwind CSS**

  * Utility-first styling
  * Rapid UI development
  * Consistent design system

### UI Capabilities:

* Dynamic event pages
* Interactive registration forms
* Responsive design (mobile-first)
* Smooth animations and transitions

---

## 4. Backend Stack

### Runtime: Node.js

### Framework: Next.js API Routes / Server Actions

The backend is handled within Next.js itself, eliminating the need for a separate Express server.

### Responsibilities:

* API endpoint handling
* Business logic (registrations, validation, etc.)
* Authentication & authorization
* Database interaction

### Benefits:

* Unified codebase (frontend + backend)
* Faster development cycle
* Simplified deployment

---

## 5. Database Layer

### Database: MySQL

MySQL is used as the primary relational database for storing structured data.

### Use Cases:

* User data management
* Event details and schedules
* Registrations and ticketing
* Admin data

### Advantages:

* Reliable and widely supported
* Scalable for production workloads
* Strong relational integrity

---

## 6. ORM (Database Management)

### Tool: Prisma ORM

Prisma is used to interact with the MySQL database in a type-safe and developer-friendly way.

### Benefits:

* Clean and readable queries
* Auto-generated database client
* Schema-based structure
* Easy migrations and updates

---

## 7. Authentication System

### Approach:

* Session-based or JWT-based authentication

### Features:

* User login and signup
* Protected routes (admin/user)
* Role-based access control (optional)

---

## 8. Deployment & Hosting

### Recommended Setup:

#### Application Hosting:

* Vercel (preferred for Next.js)
  or
* Self-hosted via Docker (aligned with local server setup)

#### Database Hosting:

* Managed MySQL (PlanetScale / Railway / AWS RDS)
  or
* Local/self-hosted MySQL server

---

## 9. DevOps & Tooling

### Version Control:

* Git + GitHub

### Package Manager:

* npm / pnpm

### Environment Management:

* `.env` files for sensitive configs

### Optional Enhancements:

* Docker for containerization
* Nginx as reverse proxy
* Tailscale for secure remote access

---

## 10. Future Scalability

The system is designed to scale with future requirements:

* Migration from MySQL → PostgreSQL (via Prisma)
* Integration with payment gateways
* AI automation workflows (n8n)
* Custom CRM/dashboard expansion
* API exposure for mobile apps

---

## 11. Summary

The proposed stack ensures:

* Fast development using modern tools
* Scalable backend with MySQL
* Clean and maintainable codebase
* High-performance frontend with Next.js
* Flexibility for future expansion

This architecture is ideal for building a production-ready event platform with room for growth and advanced features.

---

## 12. Final Stack Snapshot

* **Frontend:** Next.js + Tailwind CSS
* **Backend:** Next.js API Routes / Server Actions
* **Database:** MySQL
* **ORM:** Prisma
* **Deployment:** Vercel / Docker
* **Version Control:** GitHub

---
# Cyberpunk Event Website – Tech Stack (with 3D Hero)

This platform is built as a modern full-stack web application designed to deliver a highly immersive cyberpunk-themed experience while still maintaining performance and scalability. The frontend is developed using Next.js with Tailwind CSS, allowing for fast rendering, smooth transitions, and a highly customizable UI system that supports the bold neon-heavy design language of the website.

To achieve the 3D cyberpunk hero section, the project integrates Three.js (via React Three Fiber) for rendering real-time 3D graphics directly in the browser. This enables the creation of an interactive character or scene that can respond to user scroll and movement. GSAP (GreenSock Animation Platform) is used alongside this to control scroll-based animations, allowing the 3D character to animate, rotate, or “emerge” dynamically as the user navigates the page. For faster iteration or design-first workflows, tools like Spline can be used to design the 3D scene visually and embed it into the frontend.

The backend is handled within Next.js using API routes or server actions, which manage business logic such as event fetching, registrations, and validation. This removes the need for a separate backend server while keeping the architecture clean and scalable. The database layer uses MySQL to store structured data such as events, categories, users, and registrations, ensuring reliability and scalability for high traffic during the event.

Prisma ORM is used to interact with the MySQL database in a clean and type-safe manner, simplifying queries, migrations, and schema management. This also makes it easier to scale or switch databases in the future if needed.

For 3D assets, models are created in Blender or sourced from platforms like Sketchfab or CGTrader, then optimized and exported in GLB format for efficient web usage. These assets are compressed and optimized to ensure smooth performance across devices, with fallbacks for lower-end systems where necessary.

Deployment can be handled via Vercel for the frontend and API layer, while the MySQL database can be hosted on services like PlanetScale, Railway, or a self-hosted server depending on infrastructure needs. Optional enhancements include Docker for containerization, Nginx for reverse proxying, and Tailscale for secure remote access.

Overall, this stack combines modern web technologies with real-time 3D rendering capabilities to create a visually striking, interactive event platform that stands out from traditional websites while remaining performant and maintainable.
