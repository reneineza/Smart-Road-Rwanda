# Road Safety Data Model — SmartRoad Rwanda

## Overview
The Road Safety Analytics module manages accident records across the Rwanda road network. The model is designed to support high-risk location identification (Black Spot analysis) and is structured for future compatibility with PostgreSQL + PostGIS.

## Core Entity: Accident Record

Represents a single traffic collision event.

### Fields

| Field | Type | Description |
|---|---|---|
| `id` | UUID String | Unique identifier |
| `road_id` | String | FK → roads.id |
| `accident_date` | ISO 8601 Date | Date of the accident |
| `accident_time` | String | Time of the accident (HH:MM) |
| `location_name` | String | Descriptive name of the location |
| `coordinates` | [lng, lat] | WGS84 point location |
| `accident_type` | String | Type of collision |
| `severity` | String | Classification of accident severity |
| `weather_condition` | String | Clear / Rain / Fog / Cloudy |
| `road_condition` | String | Dry / Wet / Muddy |
| `lighting_condition` | String | Daylight / Dark (Lit) / Dark (Unlit) |
| `number_of_vehicles` | Integer | Total vehicles involved |
| `number_of_people_involved`| Integer | Total people involved |

### Classifications

#### Accident Type
- Collision (Vehicle to Vehicle)
- Pedestrian accident
- Motorcycle accident
- Vehicle overturn
- Single vehicle (Fixed object)
- Other

#### Severity Levels
- **Fatal**: Collision resulting in one or more deaths.
- **Serious injury**: Collision resulting in severe injuries requiring hospitalization.
- **Minor injury**: Collision resulting in minor injuries.
- **Property damage only**: Collision with no human injuries.

## Future Engineering Computations (Black Spot Analysis)

### Accident Density
Calculating the number of accidents per kilometer along specific road segments.

### Kernel Density Estimation (KDE)
Spatial analysis technique to create a continuous surface of accident risk, identifying hot spots visually.

### Crash Prediction Models
Using traffic volume (AADT from Traffic module), road characteristics, and historical accident data to predict future risk.

## Data Flow (Current MVP)

```
sample_accidents.json
    ↓
safetyModel.js (getAllAccidents, getAccidentById, getAccidentsByRoadId)
    ↓
safetyService.js (Basic black spot aggregation placeholder)
    ↓
safetyController.js
    ↓
GET /api/safety
GET /api/safety/:id
GET /api/roads/:id/safety
    ↓
Frontend (SafetyLayer, Safety Dashboard, Road Detail Safety Tab)
```

## Migration Path
When PostgreSQL + PostGIS is ready:
- Replace JSON reading in `safetyModel.js` with `pg` queries.
- Use `ST_SetSRID(ST_MakePoint(lng, lat), 4326)` for spatial storage.
- Add spatial indices on coordinates and `road_id`.
