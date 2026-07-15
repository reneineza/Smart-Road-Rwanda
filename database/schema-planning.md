# Database Schema Planning

This document serves as the initial schema documentation for the PostgreSQL/PostGIS database.

## Tables

### `users`
- id (UUID, PK)
- name (VARCHAR)
- email (VARCHAR, Unique)
- password_hash (VARCHAR)
- role (VARCHAR)
- organization_id (UUID, FK)

### `roads`
- id (UUID, PK)
- name (VARCHAR)
- class (VARCHAR)
- length_km (DECIMAL)

### `road_segments`
- id (UUID, PK)
- road_id (UUID, FK)
- geom (Geometry: LineString, 4326)
- surface_type (VARCHAR)
- width_m (DECIMAL)

### `assets`
- id (UUID, PK)
- segment_id (UUID, FK)
- type (VARCHAR)
- geom (Geometry: Point/Polygon, 4326)
- condition_rating (INT)

### `traffic_records`
- id (UUID, PK)
- segment_id (UUID, FK)
- aadt (INT)
- collection_date (DATE)

### `accidents`
- id (UUID, PK)
- segment_id (UUID, FK)
- geom (Geometry: Point, 4326)
- severity (VARCHAR)
- date (TIMESTAMP)

### `inspections`
- id (UUID, PK)
- entity_id (UUID, FK)
- entity_type (VARCHAR)
- inspector_id (UUID, FK)
- condition_score (DECIMAL)
- date (TIMESTAMP)
