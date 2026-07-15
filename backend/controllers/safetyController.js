const SafetyService = require('../services/safetyService');

class SafetyController {
  static async getAllAccidents(req, res) {
    try {
      const data = await SafetyService.getAllAccidents();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve accident data' });
    }
  }

  static async getAccidentById(req, res) {
    try {
      const record = await SafetyService.getAccidentById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Accident record not found' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve accident record' });
    }
  }

  static async getAccidentsByRoadId(req, res) {
    try {
      const records = await SafetyService.getAccidentsByRoadId(req.params.id);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve accident data for road' });
    }
  }

  static async getHighRiskLocations(req, res) {
    try {
      const locations = await SafetyService.getHighRiskLocations();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve high risk locations' });
    }
  }
}

module.exports = SafetyController;
