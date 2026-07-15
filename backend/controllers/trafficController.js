const TrafficService = require('../services/trafficService');

class TrafficController {
  static async getAllTraffic(req, res) {
    try {
      const data = await TrafficService.getAllTraffic();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve traffic data' });
    }
  }

  static async getTrafficById(req, res) {
    try {
      const record = await TrafficService.getTrafficById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Traffic record not found' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve traffic record' });
    }
  }

  static async getTrafficByRoadId(req, res) {
    try {
      const records = await TrafficService.getTrafficByRoadId(req.params.id);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve traffic data for road' });
    }
  }
}

module.exports = TrafficController;
