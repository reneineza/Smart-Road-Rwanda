# System Architecture

The SmartRoad Rwanda platform utilizes a modern, decoupled architecture designed to handle geospatial transportation data, engineering analytics, and AI modeling.

## 2. Architecture Components

### Data Storage (Neon Serverless PostgreSQL + PostGIS)
- **Spatial Engine:** PostGIS handles all spatial operations (bounding boxes, intersections).
- **Engineering Schema:** Roads table stores `geom` for spatial data and a JSONB column `properties` representing engineering metadata.
- **Optimization:** A `GIST` index on the `geom` column guarantees high-performance spatial queries, enabling lazy loading on the frontend map.

### Backend (Node.js + Express)
- **DataSource Abstraction:** The backend uses an Adapter Pattern (`DataSourceFactory`, `OsmAdapter`) to decouple raw GIS data (like OpenStreetMap) from the core transportation platform logic.
- **Engineering Intelligence:** Raw road geometry is separated from engineering attributes. The API serves `{ geometry, engineering: { classification, lanes, surface, ... } }`.
- **Modular APIs:** Separation of concerns via route-specific controllers (Traffic, Safety, AI).
- **Authentication:** Token-based authentication with robust authorization rules for different administrative roles.
- **Business Logic:** Handles CRUD operations for road assets, coordinates data validation, and acts as a gateway between the frontend and the database/analytics layers.

## Frontend
- **Framework:** Next.js (React)
- **Language:** Javascript
- **UI:** Modern UI component library
- **Role:** Delivers a responsive, highly interactive user interface for dashboards, data entry, and map visualization.


## AI / Data Layer
- **Language/Environment:** Python
- **Role:** Dedicated microservices for heavy computational tasks such as analytics services, pavement degradation forecasting, and machine learning models.

## GIS & Mapping
- **Technologies:** Leaflet / MapLibre
- **Role:** Renders the transportation network, traffic heatmaps, pavement condition overlays, and safety black spots directly in the browser.

## Data Flow
1. **User Interaction:** The user interacts with the Next.js frontend, requesting a map view of pavement conditions or traffic analytics.
2. **API Request:** The frontend requests spatial or statistical data via the Backend API.
3. **Database Query:** The API queries PostgreSQL/PostGIS for the relevant road segments and their condition attributes within the selected region.
4. **Analytics Processing:** For predictive or complex data, the API interfaces with Python analytics services to calculate forecasted conditions based on historical trends.
5. **Response & Rendering:** The API aggregates the results and returns formatted data (e.g., GeoJSON) to the frontend, which is rendered by the GIS mapping component.
