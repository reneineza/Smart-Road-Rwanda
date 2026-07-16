const express = require('express');
const router = express.Router();
const RoadController = require('../controllers/roadController');
const TrafficController = require('../controllers/trafficController');
const SafetyController = require('../controllers/safetyController');
const TransitController = require('../controllers/transitController');
const AnalyticsController = require('../controllers/analyticsController');
const AIController = require('../controllers/aiController');
const GisController = require('../controllers/gisController');

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'SmartRoad Rwanda API running', timestamp: new Date().toISOString() });
});

// Road Inventory Routes
router.get('/roads', RoadController.getAllRoads);
router.get('/roads/:id', RoadController.getRoadById);
router.post('/roads', RoadController.createRoad);

// GIS Layers Routes
router.get('/gis/districts', GisController.getDistricts);
router.get('/gis/sectors', GisController.getSectors);
router.get('/gis/lakes', GisController.getLakes);
router.get('/gis/rivers', GisController.getRivers);
router.get('/gis/markets', GisController.getMarkets);

// Transit Network Routes
router.get('/roads/:id/traffic', TrafficController.getTrafficByRoadId);

// Traffic
router.get('/traffic', TrafficController.getAllTraffic);
router.get('/traffic/:id', TrafficController.getTrafficById);

// Safety
router.get('/safety', SafetyController.getAllAccidents);
router.get('/safety/high-risk', SafetyController.getHighRiskLocations);
router.get('/safety/:id', SafetyController.getAccidentById);
router.get('/roads/:id/safety', SafetyController.getAccidentsByRoadId);

// Transit
router.get('/transit/routes', TransitController.getAllRoutes);
router.get('/transit/routes/:id', TransitController.getRouteById);
router.get('/transit/stops', TransitController.getAllStops);
router.get('/transit/operators', TransitController.getAllOperators);

// Analytics
router.get('/analytics/summary', AnalyticsController.getNetworkSummary);
router.get('/analytics/traffic', AnalyticsController.getTrafficSummary);
router.get('/analytics/safety', AnalyticsController.getSafetySummary);
router.get('/analytics/transit', AnalyticsController.getTransitSummary);
router.get('/analytics/priorities', AnalyticsController.getPriorityLocations);

// AI Intelligence Layer
router.get('/ai/road-condition/:id', AIController.getRoadConditionPrediction);
router.get('/ai/traffic-forecast/:id', AIController.getTrafficForecast);
router.get('/ai/safety-risk/:id', AIController.getSafetyRisk);

// Placeholders
router.get('/assets', (req, res) => res.json({ message: 'Assets endpoint placeholder' }));

module.exports = router;
