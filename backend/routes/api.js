const express = require('express');
const router = express.Router();
const RoadController = require('../controllers/roadController');
const TrafficController = require('../controllers/trafficController');
const SafetyController = require('../controllers/safetyController');

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'SmartRoad Rwanda API running', timestamp: new Date().toISOString() });
});

// Roads
router.get('/roads', RoadController.getAllRoads);
router.get('/roads/:id', RoadController.getRoadById);
router.post('/roads', RoadController.createRoad);

// Road-specific traffic (nested resource)
router.get('/roads/:id/traffic', TrafficController.getTrafficByRoadId);

// Traffic
router.get('/traffic', TrafficController.getAllTraffic);
router.get('/traffic/:id', TrafficController.getTrafficById);

// Safety
router.get('/safety', SafetyController.getAllAccidents);
router.get('/safety/high-risk', SafetyController.getHighRiskLocations);
router.get('/safety/:id', SafetyController.getAccidentById);
router.get('/roads/:id/safety', SafetyController.getAccidentsByRoadId);

// Placeholders
router.get('/assets', (req, res) => res.json({ message: 'Assets endpoint placeholder' }));

module.exports = router;
