const GisService = require('../services/gisService');

class GisController {
  static async getDistricts(req, res) {
    try {
      const data = await GisService.getAdminBoundaries('District');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve districts' });
    }
  }

  static async getSectors(req, res) {
    try {
      const data = await GisService.getAdminBoundaries('Sector');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve sectors' });
    }
  }

  static async getLakes(req, res) {
    try {
      const data = await GisService.getHydrography('Lake');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve lakes' });
    }
  }

  static async getRivers(req, res) {
    try {
      const data = await GisService.getHydrography('River');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve rivers' });
    }
  }

  static async getMarkets(req, res) {
    try {
      const data = await GisService.getPOI('Market');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve markets' });
    }
  }
}

module.exports = GisController;
