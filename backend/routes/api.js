const express = require('express');
const router = express.Router();
const RoadController = require('../controllers/roadController');
const TrafficController = require('../controllers/trafficController');

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

// Placeholders
router.get('/assets', (req, res) => res.json({ message: 'Assets endpoint placeholder' }));
router.get('/safety', (req, res) => res.json({ message: 'Safety endpoint placeholder' }));

module.exports = router;
