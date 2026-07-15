# Contributing to SmartRoad Rwanda

We welcome contributions from software engineers, transportation engineers, and data scientists. Please follow these guidelines to ensure a high standard of code and engineering rigor.

## Branch Naming Convention
Use the following format for branch names:
`[type]/[issue-number]-[short-description]`

**Types:**
- `feat/`: New feature or module (e.g., `feat/12-traffic-count-upload`)
- `fix/`: Bug fix (e.g., `fix/34-pavement-condition-calc`)
- `docs/`: Documentation updates
- `chore/`: Maintenance, dependency updates, or configuration
- `model/`: AI or mathematical model updates

## Commit Message Standards
We follow Conventional Commits.
Format: `type(scope): subject`

Examples:
- `feat(gis): implement PostGIS spatial queries for road segments`
- `fix(analytics): correct ESAL calculation in pavement degradation model`
- `docs(architecture): update database schema for road safety module`

## Code Quality Expectations
- **Engineering Accuracy:** Algorithms related to transportation engineering (e.g., capacity, Level of Service, PCI) must reference established manuals (e.g., HCM, AASHTO) where applicable.
- **Testing:** Include unit tests for all business logic, particularly data transformation and mathematical models.
- **Typing:** Use strict typing for all API payloads and database models.
- **Performance:** Ensure geospatial queries are optimized using spatial indexes.

## Documentation Requirements
- Document all new API endpoints.
- Provide inline comments for complex engineering calculations explaining the formula and units used.
- Update architectural diagrams and markdown files in the `/docs` directory if systemic changes are made.
