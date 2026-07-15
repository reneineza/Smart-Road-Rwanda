const TransitService = require('../services/transitService');

class TransitController {
  static async getAllRoutes(req, res) {
    try {
      const data = await TransitService.getAllRoutes();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transit routes' });
    }
  }

  static async getRouteById(req, res) {
    try {
      const record = await TransitService.getRouteById(req.params.id);
      if (!record) return res.status(404).json({ error: 'Transit route not found' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transit route' });
    }
  }

  static async getAllStops(req, res) {
    try {
      const data = await TransitService.getAllStops();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transit stops' });
    }
  }

  static async getAllOperators(req, res) {
    try {
      const data = await TransitService.getAllOperators();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transit operators' });
    }
  }
}

module.exports = TransitController;
