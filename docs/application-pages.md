# Application Pages

This document outlines the core pages required for the SmartRoad Rwanda MVP, detailing their purpose and constituent components.

## 1. Dashboard Page
**Purpose:** Serve as the landing page providing a comprehensive, high-level overview of the transportation network's status.

**Components:**
- **Summary Cards:** Quick metrics (Total Network Length, Paved vs. Unpaved %, Average Network PCI, Total Accidents YTD).
- **Charts:** Visual trends (e.g., Traffic Growth over time, Asset Condition Distribution bar chart).
- **Map Preview:** A static or simplified interactive map highlighting critical network segments or recent severe accidents.
- **Alerts/Notifications:** Actionable items (e.g., "5 Bridges require overdue inspections", "New high-risk black spot identified").

## 2. Map Explorer Page
**Purpose:** The main GIS workspace where engineers spend the majority of their time analyzing spatial relationships.

**Components:**
- **Interactive Map:** Full-screen or large-pane map canvas (Leaflet/MapLibre) with robust zoom/pan capabilities.
- **Layers Panel:** Controls to toggle basemaps (Satellite, Street) and operational layers (Road Classes, Traffic Stations, Accident Heatmap).
- **Search:** Global search bar for road names, asset IDs, or district names.
- **Filters:** Advanced querying tools (e.g., "Show roads where condition = Poor AND Traffic > 5000 AADT").
- **Asset Popup/Sidebar:** Clicking an element on the map slides out a detailed panel with key metrics without leaving the map context.

## 3. Road Details Page (Asset View)
**Purpose:** A deep dive into a specific road segment or infrastructure asset, combining all related data into a single view.

**Components:**
- **Road Information:** Basic attributes (ID, Name, Class, Length, Width, Surface Type).
- **Condition History:** Timeline or chart showing past inspections and degradation curves.
- **Traffic Data:** Recent AADT, peak hour volumes, and vehicle classification breakdown.
- **Safety Information:** List of accidents recorded on this specific segment.
- **Maintenance History:** Log of past works (e.g., patching, overlay) and associated costs.

## 4. Data Collection Page
**Purpose:** A streamlined, mobile-friendly interface for field engineers and inspectors to input data on-site.

**Components:**
- **Map/GPS Locator:** Automatically finds the user's location to associate data with the correct spatial coordinates.
- **Dynamic Forms:** Easy-to-use input fields for condition ratings, traffic counts, or accident details.
- **Photo Upload:** Integration with device camera or file system to attach visual evidence.
- **Inspection Records:** A brief history of recent submissions by the user.
- **Offline Sync Status:** Indicator showing if data is saved locally (pending connection) or synced to the server.
