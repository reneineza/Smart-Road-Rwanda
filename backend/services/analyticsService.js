const RoadService = require('./roadService');
const TrafficService = require('./trafficService');
const SafetyService = require('./safetyService');
const TransitService = require('./transitService');

class AnalyticsService {
  static async getNetworkSummary() {
    const roads = await RoadService.getAllRoads();
    const features = roads.features || [];

    const totalLength = features.reduce((sum, f) => sum + (f.properties.length || 0), 0);
    const classificationCounts = features.reduce((acc, f) => {
      const cls = f.properties.classification || 'Unknown';
      acc[cls] = (acc[cls] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRoads: features.length,
      totalLength: parseFloat(totalLength.toFixed(1)),
      classificationDistribution: classificationCounts
    };
  }

  static async getTrafficSummary() {
    const traffic = await TrafficService.getAllTraffic();
    if (!traffic || traffic.length === 0) return null;

    const totalSurveys = traffic.length;
    const totalVolume = traffic.reduce((sum, r) => sum + (r.totalVehicles || 0), 0);
    const avgDailyVolume = Math.round(totalVolume / totalSurveys);

    const sortedByVolume = [...traffic].sort((a, b) => b.totalVehicles - a.totalVehicles);
    const highestCorridors = sortedByVolume.slice(0, 3).map(r => ({
      location: r.locationName,
      volume: r.totalVehicles
    }));

    const avgHeavyPct = traffic.reduce((sum, r) => sum + (r.heavyVehiclePct || 0), 0) / totalSurveys;

    return {
      surveyStations: totalSurveys,
      averageDailyVolume: avgDailyVolume,
      highestCorridors,
      averageHeavyVehiclePercentage: parseFloat(avgHeavyPct.toFixed(1))
    };
  }

  static async getSafetySummary() {
    const accidents = await SafetyService.getAllAccidents();
    if (!accidents || accidents.length === 0) return null;

    const totalAccidents = accidents.length;
    const severityDistribution = accidents.reduce((acc, r) => {
      acc[r.severity] = (acc[r.severity] || 0) + 1;
      return acc;
    }, {});

    const highRisk = await SafetyService.getHighRiskLocations();

    return {
      totalAccidents,
      severityDistribution,
      highRiskLocationsCount: highRisk.length
    };
  }

  static async getTransitSummary() {
    const routes = await TransitService.getAllRoutes();
    const stops = await TransitService.getAllStops();

    if (!routes || !stops) return null;

    const totalRoutes = routes.length;
    const activeRoutes = routes.filter(r => r.active).length;
    const totalStops = stops.length;

    return {
      totalRoutes,
      activeRoutes,
      totalStops
    };
  }

  static async getPriorityLocations() {
    // Aggregation of data for Priority Scoring
    const roads = await RoadService.getAllRoads();
    const traffic = await TrafficService.getAllTraffic();
    const accidents = await SafetyService.getAllAccidents();
    const routes = await TransitService.getAllRoutes();

    if (!roads.features) return [];

    // Max values for normalization
    const maxTraffic = traffic.reduce((max, r) => Math.max(max, r.totalVehicles), 1) || 1;

    const priorities = roads.features.map(f => {
      const roadId = f.properties.id;
      
      // 1. Traffic Factor (0-40)
      const roadTraffic = traffic.filter(t => t.roadId === roadId);
      const avgRoadVol = roadTraffic.length > 0 
        ? roadTraffic.reduce((sum, t) => sum + t.totalVehicles, 0) / roadTraffic.length 
        : 0;
      const trafficScore = (avgRoadVol / maxTraffic) * 40;

      // 2. Safety Factor (0-40)
      const roadAccidents = accidents.filter(a => a.road_id === roadId).length;
      const safetyScore = Math.min((roadAccidents * 15), 40); // 15 points per accident, max 40

      // 3. Transit Factor (0-20)
      // Check if any route geometry or stops associate with this road (simplified to route name matching for MVP)
      // In a real spatial DB, this is a ST_Intersects query. Here we mock it by checking if we have transit data.
      // We will assign a flat 10 or 20 if routes exist, or randomly for the MVP to show variation.
      // Better: let's see if the road ID is in our transit mock. The mock transit doesn't have road_ids.
      // We will simulate it based on classification.
      let transitScore = 0;
      if (f.properties.classification === 'National Road') transitScore = 20;
      else if (f.properties.classification === 'District Road') transitScore = 10;

      const totalScore = Math.round(trafficScore + safetyScore + transitScore);
      
      // Build Reasons
      const reasons = [];
      if (trafficScore > 20) reasons.push('High traffic volume');
      if (safetyScore > 0) reasons.push(`${roadAccidents} recorded accidents`);
      if (transitScore > 0) reasons.push('Public transport corridor');
      if (reasons.length === 0) reasons.push('Routine monitoring');

      return {
        roadId,
        roadName: f.properties.name,
        classification: f.properties.classification,
        priorityScore: totalScore,
        reasons,
        geometry: f.geometry // Include geometry for mapping
      };
    });

    // Sort descending by score
    return priorities.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 10);
  }
}

module.exports = AnalyticsService;
