# Conceptual Database Design

This document outlines the conceptual data model for SmartRoad Rwanda, focusing on transportation engineering entities. No SQL is defined at this stage; this serves as a blueprint for the structural relationship of the data.

## 1. Transportation Network
The foundational geospatial network representing the physical infrastructure.
- **Roads:** Logical groupings of road segments (e.g., "RN1", "KG 11 Ave").
- **Road Segments (Links):** The atomic units of the road network with defined start and end nodes, lengths, widths, and surface types.
- **Locations (Nodes/Intersections):** Junctions connecting road segments or key points of interest.
- **Districts:** Administrative boundaries for spatial filtering, planning, and reporting.

## 2. Traffic
Data representing the utilization of the transportation network.
- **Traffic Counts:** Volume of vehicles passing specific locations over time.
- **Vehicle Classifications:** Breakdown of traffic by vehicle type (e.g., motorcycles, passenger cars, heavy goods vehicles).
- **Travel Time Data:** Average speeds and travel times along specific corridors.

## 3. Infrastructure & Condition
Data relating to the structural and functional state of assets.
- **Pavement Condition:** Periodic structural and functional assessments (e.g., Pavement Condition Index, roughness, cracking).
- **Bridges:** Structural inventory, characteristics, and inspection records.
- **Drainage:** Inventory of side drains, culverts, their conditions, and capacity.
- **Road Furniture:** Signage, markings, street lighting, and guardrails.

## 4. Road Safety
Data for traffic safety and hazard analysis.
- **Accidents:** Geocoded records of traffic crashes, including severity, weather conditions, and involved entities.
- **Black Spots:** Identified high-risk locations requiring targeted engineering interventions.

## 5. Users
System access and organization data.
- **Organizations:** Government agencies, municipalities, transport authorities, or contractor firms.
- **Roles:** Access profiles defining what actions a user can perform (e.g., Data Entry, Engineer, Administrator, Viewer).
- **Permissions:** Granular access controls mapping roles to specific modules or data scopes.
