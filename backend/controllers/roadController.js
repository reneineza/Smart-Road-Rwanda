const RoadService = require('../services/roadService');

class RoadController {
  static async getAllRoads(req, res) {
    try {
      const roads = await RoadService.getAllRoads();
      res.json(roads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve roads' });
    }
  }

  static async getRoadById(req, res) {
    try {
      const road = await RoadService.getRoadById(req.params.id);
      if (!road) {
        return res.status(404).json({ error: 'Road not found' });
      }
      res.json(road);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve road' });
    }
  }

  static async createRoad(req, res) {
    try {
      const newRoad = await RoadService.createRoad(req.body);
      res.status(201).json(newRoad);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create road' });
    }
  }
}

module.exports = RoadController;
