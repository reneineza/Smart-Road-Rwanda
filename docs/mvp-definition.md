# MVP Definition: SmartRoad Rwanda

The Minimum Viable Product (MVP) of SmartRoad Rwanda focuses on establishing the core data infrastructure and visualization capabilities necessary to transition from fragmented spreadsheets to a centralized, GIS-first digital platform. 

## 1. Transportation GIS Platform
**Purpose:** Create a digital map-based view of the entire transportation infrastructure, serving as the central workspace for all engineering activities.

**Features:**
- Interactive map of Rwanda using reliable basemaps (e.g., OpenStreetMap, Mapbox).
- Dynamic rendering of the road network with visual cues for road classifications.
- Overlay of district and sector administrative boundaries.
- Toggleable infrastructure layers (e.g., show/hide bridges, traffic signs, accident locations).
- Spatial search and filtering (e.g., find all paved roads in Kigali).
- Map-based navigation (pan, zoom, click-to-select).

## 2. Road Asset Management
**Purpose:** Establish a comprehensive digital inventory of the physical transportation infrastructure.

**Assets Tracked:**
- **Roads & Road Segments:** The primary links.
- **Bridges & Culverts:** Key crossing structures.
- **Drainage Systems:** Side drains and outfalls.
- **Road Furniture:** Traffic signs, signals, guardrails, and markings.

**For each asset:**
- **Required Data Fields:** Unique ID, location (geometry), classification, surface material, construction year, last inspection date, current condition rating.
- **User Interactions:** Create new asset (via map click or coordinate entry), edit attributes, attach inspection photos, change status.
- **Display Information:** Summary cards on the map popup, detailed tabular view, and color-coding on the map based on condition.

## 3. Traffic Engineering Module
**Purpose:** Manage transportation demand and traffic operational data to support capacity and Level of Service (LoS) analysis.

**Included Components:**
- **Traffic Counts:** Raw manual or automated vehicle count data.
- **Vehicle Classification:** Categorization of traffic streams (e.g., motorcycles, passenger cars, HGVs).
- **AADT (Annual Average Daily Traffic):** Baseline volume metrics for road segments.
- **Peak Hour Analysis:** Identification of AM/PM peak volumes and directional distribution.
- **Traffic Locations:** Georeferenced count stations on the map.
- **Traffic Trends:** Historical comparison to calculate growth factors.

## 4. Road Safety Module
**Purpose:** Support data-driven road safety analysis and hazard mitigation.

**Included Components:**
- **Accident Locations:** Precise geocoding of crash events.
- **Black Spots:** Algorithmic or manual identification of high-risk clusters.
- **Accident Severity:** Classification of incidents (fatal, serious, slight, property damage only).
- **Safety Statistics:** Aggregated reports by road segment or district.
- **Map Visualization:** Heatmaps showing crash density to guide engineering interventions.

## 5. Analytics Dashboard
**Purpose:** Provide high-level decision support for transport managers and policy makers.

**Included Components:**
- **Network Overview:** Total network length, percentage paved vs. unpaved, asset counts.
- **Condition Summaries:** Distribution of network condition (e.g., % Good, Fair, Poor).
- **Traffic Statistics:** Network-wide vehicle-kilometers traveled (VKT), busiest corridors.
- **Safety Indicators:** Total fatalities, crash rates per 100 million VKT.
- **Priority Areas:** Top 10 road segments requiring immediate maintenance based on condition and traffic volume.
