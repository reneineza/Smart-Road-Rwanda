# AI & Machine Learning Roadmap — SmartRoad Rwanda

While the current architecture (Milestone 7) relies on deterministic algorithms, rule-based scoring, and declarative data layers, SmartRoad Rwanda is designed to serve as the foundation for Intelligent Transport Systems (ITS) and advanced Machine Learning (ML) models.

This document outlines the strategic opportunities for introducing AI into the platform in future phases.

## 1. Predictive Pavement Maintenance
**Current State:** Road conditions are manually entered (Good, Fair, Poor).
**AI Opportunity:** Ingest historical degradation data, traffic volume, and weather patterns into a time-series forecasting model (e.g., ARIMA or LSTMs) to predict *when* a road segment will degrade to a "Poor" state.
**Benefit:** Shifts maintenance from reactive to proactive, saving capital expenditure.

## 2. Traffic Congestion Prediction
**Current State:** Traffic volumes represent static survey snapshots (AADT).
**AI Opportunity:** Integrate real-time sensor data or floating car data (FCD) and use Graph Neural Networks (GNNs) or spatial-temporal forecasting models to predict congestion levels across the network 1-4 hours in advance.
**Benefit:** Enables dynamic routing, variable speed limits, and smarter traffic light control.

## 3. Accident Risk Prediction
**Current State:** Black spots are identified retrospectively based on historical crash clusters.
**AI Opportunity:** Train a classification model (Random Forest, XGBoost) on historical accidents, correlating them with geometric features (curvature), traffic volume, lighting, and real-time weather forecasts to identify segments with high *potential* for accidents before they occur.
**Benefit:** Allows targeted deployment of safety interventions and patrols.

## 4. Public Transport Optimization
**Current State:** Transit routes and stops are mapped statically.
**AI Opportunity:** Use clustering algorithms and demand-prediction models based on mobile phone network data or smart-card taps to identify underserved populations and dynamically optimize bus routing and scheduling.
**Benefit:** Increases ridership and reduces wait times.

## 5. Automated Infrastructure Assessment (Computer Vision)
**Current State:** Asset inventory requires physical surveying.
**AI Opportunity:** Deploy dash-cams on public transport fleets. Process the video feeds through object detection models (YOLO, Faster R-CNN) to automatically detect potholes, faded lane markings, and damaged road signs.
**Benefit:** Continuous, low-cost, automated updates to the road inventory database.

---

*Note: Implementation of these features requires migrating the current JSON-based data layer to PostgreSQL/PostGIS, followed by deploying dedicated Python microservices (FastAPI + PyTorch/Scikit-Learn) alongside the existing Node.js architecture.*
