# Architecture Decisions

## Decision 1: Temporary JSON Data Layer for MVP

**Decision:**
We will use a temporary local JSON file (`sample_roads.json`) within the backend to act as our database for the Minimum Viable Product phase.

**Reason:**
This allows for significantly faster development and UX validation. By bypassing the immediate setup of Docker, PostgreSQL, and PostGIS, we can focus our engineering efforts on the Map visualization, Road inventory UI, Data flow architecture, and User Experience.

**Future Architecture Compatibility:**
To ensure this decision does not incur technical debt, we are strictly enforcing an API and Model layer abstraction:

```
Frontend
    | (HTTP REST)
API Layer (Controllers)
    |
Road Service / Model Layer
    | (fs / internal logic)
sample_roads.json
```

The Model Layer (`roadModel.js`) exposes functions identical to what a database driver would require (`getAllRoads()`, `getRoadById()`, etc.). When we transition to PostgreSQL + PostGIS, we will simply replace the internal logic of the model layer methods to use `pg` queries; the rest of the application (API controllers, frontend components) will remain completely unchanged.
