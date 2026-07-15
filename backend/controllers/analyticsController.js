const AnalyticsService = require('../services/analyticsService');

class AnalyticsController {
  static async getNetworkSummary(req, res) {
    try {
      const data = await AnalyticsService.getNetworkSummary();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve network summary' });
    }
  }

  static async getTrafficSummary(req, res) {
    try {
      const data = await AnalyticsService.getTrafficSummary();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve traffic summary' });
    }
  }

  static async getSafetySummary(req, res) {
    try {
      const data = await AnalyticsService.getSafetySummary();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve safety summary' });
    }
  }

  static async getTransitSummary(req, res) {
    try {
      const data = await AnalyticsService.getTransitSummary();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve transit summary' });
    }
  }

  static async getPriorityLocations(req, res) {
    try {
      const data = await AnalyticsService.getPriorityLocations();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve priority locations' });
    }
  }
}

module.exports = AnalyticsController;
