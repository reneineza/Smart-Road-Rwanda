const express = require('express');
const router = express.Router();
const RoadController = require('../controllers/roadController');

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'SmartRoad Rwanda API running',
    timestamp: new Date().toISOString()
  });
});

// Roads endpoints
router.get('/roads', RoadController.getAllRoads);
router.get('/roads/:id', RoadController.getRoadById);
router.post('/roads', RoadController.createRoad);

// Placeholders for future routes
router.get('/assets', (req, res) => res.json({ message: 'Assets endpoint placeholder' }));
router.get('/traffic', (req, res) => res.json({ message: 'Traffic endpoint placeholder' }));
router.get('/safety', (req, res) => res.json({ message: 'Safety endpoint placeholder' }));

module.exports = router;
