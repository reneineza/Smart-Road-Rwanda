# Initial Development Roadmap

This document captures the initial set of development issues for the SmartRoad Rwanda project.

## Issue 1: Setup project architecture
**Description:** Initialize the fundamental technology stack based on the System Architecture documentation.
**Tasks:**
- Initialize Next.js project for the frontend.
- Setup Node.js/NestJS project for the backend.
- Configure linting and code formatting rules.
- Set up Docker-compose for local development with PostgreSQL and PostGIS.

## Issue 2: Design database schema
**Description:** Translate the conceptual database design into actual SQL schema using PostGIS.
**Tasks:**
- Define schemas for Transportation Network, Traffic, Infrastructure, Safety, and Users.
- Implement spatial tables for Roads and Locations using `geometry` types.
- Set up initial migration scripts.
- Establish relationships and constraints.

## Issue 3: Implement GIS map foundation
**Description:** Create the core map visualization component on the frontend.
**Tasks:**
- Integrate Leaflet or MapLibre GL JS into the Next.js application.
- Set up basemaps.
- Create utility functions to render GeoJSON payloads.
- Ensure the map is responsive and performant.

## Issue 4: Create road inventory module
**Description:** Build the CRUD interfaces and backend endpoints for managing road assets.
**Tasks:**
- Backend API endpoints to create, read, update, and delete road segments.
- Frontend forms for data entry with validation.
- Display tabular data alongside the map interface.
- Ensure proper mapping of engineering attributes (e.g., surface type, width).

## Issue 5: Create transportation dashboard
**Description:** Develop the initial analytics dashboard providing high-level insights.
**Tasks:**
- Implement key metric cards (e.g., total network length, percentage paved vs. unpaved).
- Integrate simple charts for traffic or condition distributions.
- Ensure the dashboard acts as the main landing page post-login.
