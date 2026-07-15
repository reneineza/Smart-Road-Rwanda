# Public Transport Data Model — SmartRoad Rwanda

## Overview
The Public Transport Module manages transit networks, including routes, stops, and operators. This data model establishes the foundation for future Intelligent Transport Systems (ITS) such as smart ticketing, real-time vehicle tracking, and dynamic passenger information.

## Entities

### 1. Transport Route
Represents a specific path taken by public transport vehicles.

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier (e.g., `rt-104`) |
| `route_name` | String | Descriptive name (e.g., `Kigali CBD - Kicukiro`) |
| `route_code` | String | Public-facing code (e.g., `104`) |
| `transport_type` | String | Bus, Minibus, Taxi, Motorcycle taxi |
| `operator_id` | String | FK → operators.id |
| `start_location` | String | Origin node name |
| `end_location` | String | Destination node name |
| `distance` | Float | Route length in kilometers |
| `geometry` | GeoJSON (LineString) | The spatial path of the route |
| `active` | Boolean | Whether the route is currently operating |

### 2. Transport Stop
Represents a physical location where passengers can board or alight.

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier |
| `stop_name` | String | Name of the stop (e.g., `Sonatubes`) |
| `route_ids` | Array[String] | FKs → routes.id (Routes serving this stop) |
| `coordinates` | [lng, lat] | WGS84 point location |
| `passenger_capacity` | Integer | Estimated holding capacity |
| `facilities` | Array[String] | e.g., `['Shelter', 'Bench', 'Lighting']` |
| `is_terminus` | Boolean | Is this the start or end of a route? |

### 3. Transport Operator
Represents the company or cooperative running the transport service.

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier |
| `operator_name` | String | Name (e.g., `KBS`, `Royal Express`) |
| `contact_information` | String | Phone/Email |
| `fleet_size` | Integer | Number of vehicles operated |

---

## Future Mobility Data (ITS Preparation)
*Note: These are planned structures for subsequent milestones.*

### Passenger Demand & Ticketing
- **Boarding Counts:** `stop_id`, `route_id`, `timestamp`, `count_in`, `count_out`.
- **Peak Demand Periods:** Derived analytical metrics defining rush hours per route.

### Real-Time GPS Tracking
- **Vehicle Location Ping:** `vehicle_id`, `route_id`, `coordinates`, `speed`, `timestamp`.
- **Travel Time Monitoring:** Dynamic updates of expected vs actual trip duration.

## Data Flow (Current MVP)

```
sample_transit.json
    ↓
transitModel.js (getAllRoutes, getRouteById, getStops, getOperators)
    ↓
transitService.js (Enriches relations, calculates network summaries)
    ↓
transitController.js
    ↓
GET /api/transit/routes
GET /api/transit/routes/:id
GET /api/transit/stops
GET /api/transit/operators
    ↓
Frontend (TransitLayer, Transit Dashboard)
```
