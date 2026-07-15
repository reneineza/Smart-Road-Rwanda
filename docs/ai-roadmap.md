# AI & Machine Learning Roadmap — SmartRoad Rwanda

This document outlines the strategic implementation of Artificial Intelligence and Intelligent Transport Systems (ITS) within SmartRoad Rwanda.

## Foundation AI Modules (Milestone 8 - Active)
These modules establish the core predictive architecture using statistical modeling and explainable AI patterns.

1. **Predictive Pavement Maintenance**
   - **Methodology:** Statistical deterioration models based on traffic load, pavement age, and surface type.
   - **Output:** Estimated timeframe until pavement drops to "Poor" condition.

2. **Traffic Forecasting**
   - **Methodology:** Linear regression projecting historical AADT into the future, adjusted for road classification growth factors.
   - **Output:** 5-year and 10-year demand estimates.

3. **Safety Risk Prediction**
   - **Methodology:** Weighted risk scoring identifying corridors with high potential for future accidents based on geometric and traffic volume factors.
   - **Output:** Normalized risk score with intervention recommendations.

---

## Future Expansions

### 1. Computer Vision Pavement Assessment
**Opportunity:** Deploy dash-cams on public transport fleets (e.g., KBS buses). Process the video feeds through object detection models (YOLO, Faster R-CNN) to automatically detect potholes, faded lane markings, and damaged road signs.
**Benefit:** Continuous, low-cost, automated updates to the road inventory database.

### 2. Digital Twin & Micro-Simulation
**Opportunity:** Ingest real-world road geometries into traffic simulation engines (like SUMO or Vissim). Train Reinforcement Learning (RL) agents to optimize traffic light timings at major Kigali intersections.
**Benefit:** Virtual testing ground for infrastructure changes before physical construction.

### 3. Real-Time Congestion Prediction
**Opportunity:** Integrate real-time sensor data or floating car data (FCD) using Graph Neural Networks (GNNs) or spatial-temporal forecasting models (LSTMs) to predict congestion levels across the network 1-4 hours in advance.
**Benefit:** Enables dynamic routing, variable speed limits, and smarter traffic control.

### 4. Climate Impact Modelling
**Opportunity:** Integrate topographical data, drainage mapping, and rainfall predictions to model flood risk on the road network.
**Benefit:** Preventative infrastructure reinforcement for vulnerable corridors during rainy seasons.
