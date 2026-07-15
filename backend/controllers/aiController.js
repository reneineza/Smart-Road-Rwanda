const AIService = require('../services/aiService');

class AIController {
  static async getRoadConditionPrediction(req, res) {
    try {
      const data = await AIService.getRoadConditionPrediction(req.params.id);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate road condition prediction' });
    }
  }

  static async getTrafficForecast(req, res) {
    try {
      const data = await AIService.getTrafficForecast(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate traffic forecast' });
    }
  }

  static async getSafetyRisk(req, res) {
    try {
      const data = await AIService.getSafetyRisk(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate safety risk prediction' });
    }
  }
}

module.exports = AIController;
