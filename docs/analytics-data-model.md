# Analytics Data Model — SmartRoad Rwanda

## Overview
The Analytics Module aggregates data from four core domains (Road Network, Traffic, Safety, and Transit) to provide decision-support indicators and priority rankings for interventions.

## 1. Network Performance Indicators
Metrics defining the physical scope and quality of the road network.
- **Total Road Length:** Sum of distances for all managed road segments.
- **Road Classification Distribution:** Percentage breakdown of National vs. District roads.
- **Infrastructure Condition Index (Future):** Aggregated score of surface quality and asset conditions.

## 2. Traffic Indicators
Metrics defining transportation demand and utilization.
- **Average Traffic Volume:** Mean AADT across all survey stations.
- **Highest Traffic Corridors:** Top 3-5 segments ranked by AADT.
- **Vehicle Composition:** Percentage breakdown (e.g., Passenger vs. Heavy Goods vs. Motorcycles).
- **Peak Demand Locations (Future):** Identification of segments operating at LOS D, E, or F.

## 3. Safety Indicators
Metrics defining risk and incident history.
- **Total Accidents:** Gross count of incidents in the database.
- **Accident Severity Distribution:** Breakdown of Fatal, Serious, Minor, and Property Damage.
- **High-Risk Locations:** Corridors flagged by the Black Spot analysis algorithm.

## 4. Public Transport Indicators
Metrics defining transit accessibility.
- **Active Routes:** Total operational bus/transit lines.
- **Total Stops:** Count of designated boarding/alighting locations.
- **Route Coverage (Future):** Spatial buffer analysis of population within 500m of a transit stop.

---

## Priority Analysis Scoring

The core of the decision-support system is the **Priority Ranking Algorithm**. It identifies which road segments require immediate attention or investment.

### Formula Structure (MVP)
The Priority Score (0-100) is a weighted sum of normalized factors:

`Priority Score = (Traffic Factor * 0.4) + (Safety Factor * 0.4) + (Transit Factor * 0.2)`

#### 1. Traffic Factor (Weight: 40%)
Evaluates demand. Higher volume = higher priority.
- Calculation: `(Segment Volume / Network Max Volume) * 100`

#### 2. Safety Factor (Weight: 40%)
Evaluates risk based on accident history.
- Calculation: `MIN((Accident Count on Segment * 20), 100)`
*(Each accident adds 20 points to the safety factor, maxing out at 5 accidents).*

#### 3. Transit Factor (Weight: 20%)
Evaluates public importance.
- Calculation: `(Number of Transit Routes on Segment > 0) ? 100 : 0`
*(Binary flag for MVP: Does this road carry public transport?)*

### Priority Levels
- **Critical (80-100):** Immediate intervention required. High volume, high risk.
- **High (60-79):** Requires review and planned intervention.
- **Medium (40-59):** Monitor conditions.
- **Low (0-39):** Normal operational state.
