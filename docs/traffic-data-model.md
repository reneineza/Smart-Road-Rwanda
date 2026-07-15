# Traffic Data Model — SmartRoad Rwanda

## Overview
The Traffic Engineering module manages traffic observation data collected through manual and automated surveys along Rwanda's road network. The model is designed to be compatible with future PostgreSQL + PostGIS migration.

## Core Entity: Traffic Observation Point

Represents a physical location where a traffic survey was conducted.

### Fields

| Field | Type | Description |
|---|---|---|
| `id` | UUID String | Unique identifier |
| `roadId` | String | FK → roads.id |
| `locationName` | String | Descriptive name of survey point |
| `coordinates` | [lng, lat] | WGS84 point location |
| `surveyDate` | ISO 8601 | Date survey was conducted |
| `surveyPeriod` | String | e.g., "07:00–18:00 (11hrs)" |
| `observer` | String | Name of survey organization |
| `weatherCondition` | String | Clear / Cloudy / Rainy |
| `direction` | String | Both directions / One-way |

### Vehicle Classification Counts (per survey)

| Field | Type | Description |
|---|---|---|
| `cars` | Integer | Light passenger vehicles |
| `motorcycles` | Integer | Motorcycles / Mototaxis |
| `buses` | Integer | Minibuses + coaches |
| `trucks` | Integer | Light + heavy trucks |
| `bicycles` | Integer | Non-motorised pedal |
| `pedestrians` | Integer | Walking count |

### Computed / Engineering Fields

| Field | Type | Description |
|---|---|---|
| `totalVehicles` | Integer | Sum of motorised categories |
| `peakHour` | String | e.g., "07:00–08:00" |
| `peakHourVolume` | Integer | Vehicles in peak hour |
| `heavyVehiclePct` | Float | (buses+trucks) / total × 100 |
| `motorcyclePct` | Float | motorcycles / total × 100 |
| `aadt` | Integer | Annual Average Daily Traffic (future calculation) |

## Future Engineering Computations (Not Yet Implemented)

### AADT Estimation
```
AADT = Survey Volume × Seasonal Factor × Day-of-Week Factor
```

### Peak Hour Factor (PHF)
```
PHF = Peak Hour Volume / (4 × Peak 15-min Volume)
```

### Volume-to-Capacity Ratio (v/c)
```
v/c = Peak Hour Volume / Road Capacity
```
Where capacity depends on lanes, road class, and signal conditions.

### Level of Service (LOS)
Using HCM (Highway Capacity Manual) thresholds:

| LOS | v/c Ratio | Description |
|---|---|---|
| A | ≤ 0.35 | Free flow |
| B | ≤ 0.54 | Reasonably free flow |
| C | ≤ 0.77 | Stable flow |
| D | ≤ 0.90 | Approaching unstable |
| E | ≤ 1.00 | Unstable flow |
| F | > 1.00 | Forced / breakdown |

### Traffic Growth Model
```
Future Volume = Present Volume × (1 + r)^n
```
Where `r` = annual growth rate, `n` = years.

## Data Flow (Current MVP)

```
sample_traffic.json
    ↓
trafficModel.js (getAllTraffic, getTrafficById, getTrafficByRoadId)
    ↓
trafficService.js
    ↓
trafficController.js
    ↓
GET /api/traffic
GET /api/traffic/:id
GET /api/roads/:id/traffic
    ↓
Frontend (TrafficLayer, TrafficCard, TrafficChart)
```

## Migration Path
When PostgreSQL + PostGIS is ready:
- Replace JSON reading in `trafficModel.js` with `pg` queries
- Use `ST_SetSRID(ST_MakePoint(lng, lat), 4326)` for spatial storage
- Add spatial index on coordinates column
- No changes required to controllers, services, or frontend
