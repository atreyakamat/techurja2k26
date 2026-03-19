# PRD: Cyberpunk Tech Event Website

## 1. Product Overview

The Cyberpunk Tech Event Website is a centralized digital platform designed to showcase, manage, and promote a multi-category technical festival. The platform will feature events across domains such as Robotics, Computer Science, Puzzles, and School-Level competitions, all wrapped in a visually immersive cyberpunk-themed UI.

The objective is to create an engaging, futuristic, and highly functional platform that enables users to explore events, register seamlessly, and experience the festival digitally.

---

## 2. Objectives

* Provide a visually striking cyberpunk-themed event platform
* Enable easy discovery of events by category
* Allow seamless event registration
* Support both college-level and school-level participants
* Provide admin control for managing events and registrations

---

## 3. Target Users

### Primary Users:

* College students (engineering / tech)
* School students (junior competitions)
* Tech enthusiasts

### Secondary Users:

* Event organizers
* Admin team

---

## 4. Core Features

### 4.1 Event Discovery

Users should be able to:

* View all events in a grid/list format
* Filter events by category:

  * Robotics
  * Computer Science
  * Puzzle / Logic
  * School-Level Events
* Search events by name

---

### 4.2 Event Detail Page

Each event should include:

* Event name
* Description
* Rules and guidelines
* Date & time
* Venue (or online)
* Category tag
* Eligibility (school / college)
* Registration button

---

### 4.3 Registration System

* User fills form:

  * Name
  * Email
  * Phone
  * College / School
* Data stored in MySQL
* Confirmation message shown
* Optional: Email confirmation (future)

---

### 4.4 Category-Based Navigation

Dedicated sections:

* Robo Wars / Robotics
* Coding & Tech Events
* Puzzle / Brain Games
* School Competitions

Each category has:

* Themed UI variation
* Filtered event listing

---

### 4.5 Admin Panel (Optional MVP+)

* Add / edit / delete events
* View registrations
* Export data (CSV)

---

## 5. UI/UX Requirements (Cyberpunk Theme)

### Visual Direction:

* Dark background (black / deep navy)
* Neon accents (cyan, magenta, purple)
* Glow effects
* Glassmorphism / futuristic cards

### Key Elements:

* Animated hero section
* Glowing buttons
* Hover interactions
* Particle / grid backgrounds

---

## 6. Page Structure

### 6.1 Landing Page

* Hero section (cyberpunk animated)
* Event categories preview
* Featured events
* CTA (Register Now)

---

### 6.2 Events Page

* All events listed
* Filters (category, level)
* Search bar

---

### 6.3 Event Detail Page

* Full event information
* Register button

---

### 6.4 Registration Page

* Form submission
* Success state

---

### 6.5 Admin Dashboard (Optional)

* Event CRUD
* Registrations table

---

## 7. Technical Stack

### Frontend:

* Next.js (React)
* Tailwind CSS

### Backend:

* Next.js API Routes / Server Actions

### Database:

* MySQL

### ORM:

* Prisma

---

## 8. Database Schema (High-Level)

### Users / Registrations Table:

* id
* name
* email
* phone
* institution
* event_id

### Events Table:

* id
* name
* description
* category
* level (school / college)
* date
* venue

---

## 9. User Flow

1. User lands on homepage
2. Explores categories
3. Clicks an event
4. Reads details
5. Clicks register
6. Submits form
7. Receives confirmation

---

## 10. Non-Functional Requirements

* Fast load time (<2s)
* Mobile responsive
* SEO optimized
* Secure API endpoints
* Input validation

---

## 11. Future Enhancements

* Online payments (ticketing)
* Leaderboards
* Live event updates
* AI chatbot assistant
* Certificate generation

---

## 12. Success Metrics

* Number of registrations
* Time spent on site
* Event page engagement
* Conversion rate (view → register)

---

## 13. Summary

This platform combines strong technical architecture with a unique cyberpunk visual identity to deliver an engaging event experience. It is designed to scale, adapt, and support both technical and creative event formats across multiple user segments.

---
