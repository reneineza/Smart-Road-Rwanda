# UX Architecture

SmartRoad Rwanda breaks away from traditional, clunky civil engineering software (like HDM-4) by adopting a modern, intuitive, and highly visual approach. 

## Core Principle: GIS-First Interaction
The map is not just a visualization tool; it is the central workspace. Every piece of tabular data—whether it's an accident report, a traffic count, or a pavement condition index—must be spatially anchored. Users should be able to navigate the system by interacting with the map rather than navigating deep nested menus.

## Main Navigation
The application features a clean sidebar or top navbar with the following primary modules:
- **Dashboard:** High-level analytics and network status.
- **Map Explorer:** The primary GIS interface for interacting with the network.
- **Assets:** Tabular lists and management tools for the physical inventory.
- **Traffic:** Data entry and analysis for traffic counts and classifications.
- **Safety:** Accident logging and black spot analysis.
- **Analytics:** Deeper dives into engineering metrics and trends.
- **Reports:** Automated generation of standard engineering documents.

## User Flows

### Example: Engineer Workflow (Condition Analysis)
1. **Login:** Authenticates and lands on the main Dashboard.
2. **Open Map:** Clicks on "Map Explorer" to view the national network.
3. **Select Road:** Uses the filter to highlight "National Roads" and clicks on segment "RN1-A".
4. **View Data:** A side panel slides out displaying the road's attributes, latest PCI, and recent traffic volume.
5. **Analyze Condition:** The engineer opens the "Condition History" tab within the panel to see deterioration over the last 5 years.
6. **Create Report:** Clicks an "Export Segment Report" button to generate a PDF summary for maintenance planning.

### Example: Field Inspector Workflow (Data Collection)
1. **Login:** Authenticates on a mobile tablet.
2. **Locate:** Device GPS centers the map on the inspector's current location.
3. **Select Asset:** Taps on the nearest bridge icon on the map.
4. **Log Inspection:** Taps "New Inspection", fills out a digital form rating structural components.
5. **Attach Evidence:** Takes a photo of a cracked abutment directly through the app.
6. **Submit:** Data syncs instantly to the central database, immediately updating the bridge's status on the main Map Explorer.

## Information Hierarchy
- **Level 1 (Macro):** National dashboards, aggregated metrics, full network map view.
- **Level 2 (Meso):** District-level filtering, corridor analysis, specific layer toggles (e.g., only viewing traffic heatmaps).
- **Level 3 (Micro):** Individual asset details, specific traffic count stations, single accident reports, inspection histories.
