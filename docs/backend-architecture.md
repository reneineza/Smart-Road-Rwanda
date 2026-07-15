# Backend Architecture

The backend of SmartRoad Rwanda serves as the robust API layer that handles business logic, spatial queries, and data validation between the frontend and the database.

## Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js (or NestJS for stricter structural patterns)
- **Language:** JavaScript / TypeScript
- **ORM / Query Builder:** Prisma or Kysely (with PostGIS support), or direct SQL via `pg` for complex spatial queries.

## API Structure
The API will follow RESTful principles, organized around core transportation entities.
- `/api/v1/network`: Roads, segments, and nodes.
- `/api/v1/assets`: Bridges, culverts, road furniture.
- `/api/v1/traffic`: Counts, classifications.
- `/api/v1/safety`: Accidents, black spots.
- `/api/v1/analytics`: Aggregated metrics and reporting data.

## Folder Structure (Services & Controllers)
```
src/
├── controllers/          # Handle HTTP requests, validation, and responses
├── services/             # Core business logic and engineering calculations
├── models/               # Data access layer / ORM definitions
├── routes/               # API endpoint routing definitions
├── middlewares/          # Authentication, error handling, logging
├── utils/                # Helper functions (e.g., spatial data transformers)
└── config/               # Environment variables, DB connection setup
```

## Database Communication
- **Spatial Queries:** The backend will utilize PostGIS functions (e.g., `ST_Intersects`, `ST_Within`, `ST_Distance`) to handle geographic filtering directly in the database, minimizing the data payload sent to the Node.js server.
- **Transactions:** Complex operations (like adding a new road segment that splits an existing one) will use database transactions to ensure data integrity.

## Authentication Strategy
- **Mechanism:** JSON Web Tokens (JWT) for stateless, scalable authentication.
- **Implementation:** 
  - User logs in via `/auth/login` and receives an access token and a refresh token.
  - The frontend attaches the access token to the `Authorization` header as a Bearer token.
  - A middleware layer verifies the token before allowing access to protected routes.
- **Role-Based Access Control (RBAC):** The token payload or middleware will check user roles (e.g., Admin, Engineer, Inspector) to restrict access to specific endpoints (e.g., only Engineers can modify road classifications).
