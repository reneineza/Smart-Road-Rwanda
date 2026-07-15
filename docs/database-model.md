# Database Model

This document defines the core entities and their relationships for the SmartRoad Rwanda MVP. The primary database is PostgreSQL extended with PostGIS for handling spatial geometries.

## Core Entities

### Users
- **Purpose:** Represents individuals accessing the system.
- **Important Fields:** UserID, Name, Email, PasswordHash, Role, OrganizationID, IsActive.

### Organizations
- **Purpose:** Represents government bodies, agencies, or consultancies managing the data.
- **Important Fields:** OrganizationID, Name, Type (Government, Private, Academic), ContactInfo.

### Roads
- **Purpose:** Logical grouping representing an entire route.
- **Important Fields:** RoadID, Name/Number (e.g., "RN1"), Class (National, District), TotalLength.

### Road Segments
- **Purpose:** The physical, atomic sections of a road.
- **Important Fields:** SegmentID, RoadID, StartNode, EndNode, Length, Width, SurfaceType, NumLanes.
- **GIS Geometry:** `LineString` representing the segment path.

### Infrastructure Assets
- **Purpose:** Point or polygon assets attached to the network (Bridges, Culverts, Signs).
- **Important Fields:** AssetID, SegmentID, Type, ConstructionYear, ConditionRating, Material.
- **GIS Geometry:** `Point` or `Polygon`.

### Traffic Records
- **Purpose:** Data logs for vehicle counts and classifications.
- **Important Fields:** RecordID, SegmentID, Date, AADT, PeakHourVolume, %HeavyVehicles, CollectionMethod (Manual, Sensor).

### Accidents
- **Purpose:** Records of traffic crashes for safety analysis.
- **Important Fields:** AccidentID, SegmentID, Date, Severity (Fatal, Serious, Slight), WeatherConditions, VehiclesInvolved.
- **GIS Geometry:** `Point` representing the exact crash location.

### Inspections
- **Purpose:** Records of field assessments for assets or road segments.
- **Important Fields:** InspectionID, EntityType (Segment/Asset), EntityID, InspectorID (User), Date, ConditionScore, Notes, PhotoURL.

### Maintenance Records
- **Purpose:** Historical log of interventions performed on the network.
- **Important Fields:** MaintenanceID, SegmentID, Date, WorkType (Patching, Overlay, Reconstruction), Cost, Contractor.

### Locations / Nodes
- **Purpose:** Junctions, intersections, or significant reference points.
- **Important Fields:** NodeID, Name, Type (Roundabout, T-Junction).
- **GIS Geometry:** `Point`.

## Relationships
- **Organizations -> Users:** One-to-Many.
- **Roads -> Road Segments:** One-to-Many.
- **Road Segments -> Infrastructure Assets:** One-to-Many (Assets belong to or are located along a segment).
- **Road Segments -> Traffic Records:** One-to-Many.
- **Road Segments -> Accidents:** One-to-Many (Accidents are snapped to the nearest segment).
- **Users (Inspectors) -> Inspections:** One-to-Many.
- **Road Segments/Assets -> Inspections:** One-to-Many.
