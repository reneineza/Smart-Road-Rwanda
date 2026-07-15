const TrafficModel = require('../models/trafficModel');

/**
 * TrafficService
 *
 * Business logic layer between controller and model.
 * Computes derived engineering fields before returning data.
 */
class TrafficService {
  static async getAllTraffic() {
    const records = await TrafficModel.getAllTraffic();
    return records.map(TrafficService._enrichRecord);
  }

  static async getTrafficById(id) {
    const record = await TrafficModel.getTrafficById(id);
    return record ? TrafficService._enrichRecord(record) : null;
  }

  static async getTrafficByRoadId(roadId) {
    const records = await TrafficModel.getTrafficByRoadId(roadId);
    return records.map(TrafficService._enrichRecord);
  }

  /**
   * _enrichRecord
   * Adds computed engineering metrics to raw survey data.
   * These will become DB computed columns or materialised views in future.
   */
  static _enrichRecord(record) {
    const { cars = 0, motorcycles = 0, buses = 0, trucks = 0 } = record.vehicleCounts || {};

    // Estimated AADT using simplified 12-hour factor (1.3 expansion)
    const estimatedAADT = record.aadt !== null
      ? record.aadt
      : Math.round(record.totalVehicles * 1.3);

    // Level of Service (simplified — placeholder logic, depends on road capacity)
    // Full HCM-based LOS calculation requires road capacity data (Milestone 5)
    const los = TrafficService._estimateLOS(record.peakHourVolume);

    return {
      ...record,
      computed: {
        estimatedAADT,
        los,
        losDescription: TrafficService._losDescription(los),
      }
    };
  }

  static _estimateLOS(peakHourVolume) {
    // Simplified thresholds for 2-lane national roads
    // Source: HCM 6th Edition — Two-Lane Highway LOS
    if (peakHourVolume < 400) return 'A';
    if (peakHourVolume < 750) return 'B';
    if (peakHourVolume < 1200) return 'C';
    if (peakHourVolume < 1600) return 'D';
    if (peakHourVolume < 2000) return 'E';
    return 'F';
  }

  static _losDescription(los) {
    const descriptions = {
      A: 'Free Flow — Excellent',
      B: 'Reasonably Free Flow — Good',
      C: 'Stable Flow — Acceptable',
      D: 'Approaching Unstable — Poor',
      E: 'Unstable Flow — Very Poor',
      F: 'Forced Breakdown — Critical',
    };
    return descriptions[los] || 'Unknown';
  }
}

module.exports = TrafficService;
