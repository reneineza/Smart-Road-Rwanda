# Database Schema Planning v1

This document formalizes the entities for the SmartRoad Rwanda database, targeting PostgreSQL extended with PostGIS.

## Tables

### 1. `roads`
**Purpose:** Represent transportation corridors as logical groupings.
- `id` (UUID, Primary Key)
- `road_name` (VARCHAR)
- `road_code` (VARCHAR)
- `road_class` (VARCHAR) (e.g., National, District)
- `surface_type` (VARCHAR) (e.g., Asphalt, Gravel, Earth)
- `length` (DECIMAL)
- `number_of_lanes` (INTEGER)
- `construction_year` (INTEGER)
- `responsible_authority` (VARCHAR)
- `district` (VARCHAR)
- `geometry` (Geometry: LineString, SRID=4326)

### 2. `road_segments`
**Purpose:** Allow detailed analysis by sections.
- `id` (UUID, Primary Key)
- `road_id` (UUID, Foreign Key)
- `segment_number` (INTEGER)
- `start_location` (VARCHAR)
- `end_location` (VARCHAR)
- `length` (DECIMAL)
- `geometry` (Geometry: LineString, SRID=4326)

### 3. `infrastructure_assets`
**Purpose:** Represent transportation infrastructure (Bridges, Culverts, Signs).
- `id` (UUID, Primary Key)
- `asset_type` (VARCHAR)
- `name` (VARCHAR)
- `condition` (VARCHAR)
- `installation_year` (INTEGER)
- `geometry` (Geometry: Point/Polygon, SRID=4326)

### 4. `traffic_observation_points`
**Purpose:** Store traffic survey locations.
- `id` (UUID, Primary Key)
- `location_name` (VARCHAR)
- `survey_date` (DATE)
- `vehicle_count` (INTEGER)
- `vehicle_classification` (JSONB)
- `coordinates` (Geometry: Point, SRID=4326)

### 5. `accident_locations`
**Purpose:** Prepare road safety analysis.
- `id` (UUID, Primary Key)
- `location` (VARCHAR)
- `date` (TIMESTAMP)
- `severity` (VARCHAR) (e.g., Fatal, Serious, Slight)
- `accident_type` (VARCHAR)
- `geometry` (Geometry: Point, SRID=4326)
