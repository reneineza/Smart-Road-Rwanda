const SafetyModel = require('../models/safetyModel');

/**
 * SafetyService
 *
 * Business logic layer between controller and model.
 * Prepares data and computes risk indicators (Black Spot framework).
 */
class SafetyService {
  static async getAllAccidents() {
    const records = await SafetyModel.getAllAccidents();
    return records.map(SafetyService._enrichRecord);
  }

  static async getAccidentById(id) {
    const record = await SafetyModel.getAccidentById(id);
    return record ? SafetyService._enrichRecord(record) : null;
  }

  static async getAccidentsByRoadId(roadId) {
    const records = await SafetyModel.getAccidentsByRoadId(roadId);
    return records.map(SafetyService._enrichRecord);
  }

  /**
   * Basic Black Spot Analysis Framework
   * 
   * In the future, this will use spatial queries (PostGIS ST_DWithin)
   * or Kernel Density Estimation. For now, it aggregates accidents by location_name
   * and identifies locations with multiple accidents as high risk.
   */
  static async getHighRiskLocations() {
    const records = await SafetyModel.getAllAccidents();
    
    // Group by location_name
    const locationCounts = records.reduce((acc, record) => {
      acc[record.location_name] = (acc[record.location_name] || 0) + 1;
      return acc;
    }, {});

    // Filter to locations with > 1 accident and enrich
    const highRisk = Object.entries(locationCounts)
      .filter(([_, count]) => count > 1)
      .map(([location, count]) => {
        // Find a representative record to grab coordinates
        const rep = records.find(r => r.location_name === location);
        return {
          location_name: location,
          accident_count: count,
          coordinates: rep.coordinates,
          road_id: rep.road_id,
          risk_level: count >= 3 ? 'Critical' : 'High'
        };
      });

    return highRisk;
  }

  /**
   * _enrichRecord
   * Adds derived metadata (like simplified severity score for sorting/charts)
   */
  static _enrichRecord(record) {
    const severityScores = {
      'Fatal': 4,
      'Serious injury': 3,
      'Minor injury': 2,
      'Property damage only': 1
    };

    return {
      ...record,
      computed: {
        severityScore: severityScores[record.severity] || 0
      }
    };
  }
}

module.exports = SafetyService;
