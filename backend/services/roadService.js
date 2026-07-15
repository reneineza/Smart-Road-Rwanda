const RoadModel = require('../models/roadModel');

class RoadService {
  static async getAllRoads() {
    return await RoadModel.getAllRoads();
  }

  static async getRoadById(id) {
    return await RoadModel.getRoadById(id);
  }

  static async createRoad(data) {
    return await RoadModel.createRoad(data);
  }

  static async updateRoad(id, data) {
    return await RoadModel.updateRoad(id, data);
  }

  static async deleteRoad(id) {
    return await RoadModel.deleteRoad(id);
  }
}

module.exports = RoadService;
