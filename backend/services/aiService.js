const RoadService = require('./roadService');
const TrafficService = require('./trafficService');
const SafetyService = require('./safetyService');
const axios = require('axios'); // We can use fetch or axios if available, node 18+ has fetch natively

class AIService {
  static async getRoadConditionPrediction(roadId) {
    // 1. Gather context from existing services
    const roads = await RoadService.getAllRoads();
    const road = roads.features.find(f => f.properties.id === roadId);
    if (!road) throw new Error('Road not found');

    const p = road.properties;
    const traffic = await TrafficService.getAllTraffic();
    const roadTraffic = traffic.filter(t => t.roadId === roadId);
    const avgVol = roadTraffic.length > 0 ? roadTraffic.reduce((s, t) => s + t.totalVehicles, 0) / roadTraffic.length : 0;
    const avgHeavy = roadTraffic.length > 0 ? roadTraffic.reduce((s, t) => s + t.heavyVehiclePct, 0) / roadTraffic.length : 0;

    const payload = {
      road_id: roadId,
      road_name: p.name,
      current_condition: p.condition,
      age_years: 5,
      traffic_volume: Math.round(avgVol),
      heavy_vehicle_pct: avgHeavy,
      surface_type: p.surfaceType || 'Asphalt'
    };

    // 2. Query Python AI Engine
    try {
      // Trying to reach the FastAPI python server
      const response = await fetch('http://localhost:8000/predict/road-condition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Python AI Engine unreachable (port 8000). Falling back to Node.js proxy logic.');
    }

    // 3. Fallback logic if Python is not installed on the host machine
    return this.fallbackRoadCondition(payload);
  }

  static async getTrafficForecast(roadId) {
    const roads = await RoadService.getAllRoads();
    const road = roads.features.find(f => f.properties.id === roadId);
    if (!road) throw new Error('Road not found');
    
    const p = road.properties;
    const traffic = await TrafficService.getAllTraffic();
    const roadTraffic = traffic.filter(t => t.roadId === roadId);
    const avgVol = roadTraffic.length > 0 ? roadTraffic.reduce((s, t) => s + t.totalVehicles, 0) / roadTraffic.length : 0;

    const payload = {
      road_id: roadId,
      location_name: p.name,
      current_volume: Math.round(avgVol),
      classification: p.classification
    };

    try {
      const response = await fetch('http://localhost:8000/predict/traffic-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Python AI Engine unreachable. Falling back to Node.js proxy logic.');
    }

    return this.fallbackTrafficForecast(payload);
  }

  static async getSafetyRisk(roadId) {
    const roads = await RoadService.getAllRoads();
    const road = roads.features.find(f => f.properties.id === roadId);
    if (!road) throw new Error('Road not found');
    
    const p = road.properties;
    const traffic = await TrafficService.getAllTraffic();
    const roadTraffic = traffic.filter(t => t.roadId === roadId);
    const avgVol = roadTraffic.length > 0 ? roadTraffic.reduce((s, t) => s + t.totalVehicles, 0) / roadTraffic.length : 0;

    const accidents = await SafetyService.getAllAccidents();
    const roadAccidents = accidents.filter(a => a.road_id === roadId).length;

    const payload = {
      road_id: roadId,
      location_name: p.name,
      historical_accidents: roadAccidents,
      traffic_volume: Math.round(avgVol),
      classification: p.classification
    };

    try {
      const response = await fetch('http://localhost:8000/predict/safety-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Python AI Engine unreachable. Falling back to Node.js proxy logic.');
    }

    return this.fallbackSafetyRisk(payload);
  }

  // ==========================================
  // FALLBACKS (Mirrors Python Models exactly)
  // ==========================================
  static fallbackRoadCondition(data) {
    let rate = 10;
    if (data.traffic_volume > 20000) rate += 30;
    else if (data.traffic_volume > 10000) rate += 15;
    
    if (data.heavy_vehicle_pct > 15) rate += 25;
    else if (data.heavy_vehicle_pct > 5) rate += 10;
    
    if (data.surface_type === "Dirt" || data.surface_type === "Gravel") rate += 20;
    if (data.current_condition === "Poor") rate += 20;

    let prediction = "Good";
    let timeframe = "5+ years";
    let risk = "Low";
    let action = "Routine monitoring";
    let reasons = [];

    if (rate > 70) {
      prediction = "Poor"; timeframe = "1-2 years"; risk = "High";
      action = "Schedule immediate inspection and budget for rehabilitation";
      reasons.push("High traffic load exceeding design capacity");
      if (data.heavy_vehicle_pct > 15) reasons.push("Significant heavy vehicle stress on pavement");
    } else if (rate > 40) {
      prediction = "Fair"; timeframe = "3 years"; risk = "Medium";
      action = "Schedule surface treatment within 12-18 months";
      reasons.push("Moderate wear expected from traffic volume");
      if (data.surface_type !== "Asphalt") reasons.push("Unpaved surface accelerates degradation");
    } else {
      reasons.push("Traffic volumes within acceptable limits");
      reasons.push("Stable surface type");
    }

    return {
      road_id: data.road_id,
      prediction: `${prediction} in ${timeframe}`,
      risk_level: risk,
      reasons,
      recommended_action: action,
      deterioration_score: rate
    };
  }

  static fallbackTrafficForecast(data) {
    let rate = 0.02;
    if (data.classification === "National Road") rate = 0.055;
    else if (data.classification === "District Road") rate = 0.032;
    
    const projected = Math.round(data.current_volume * Math.pow((1 + rate), 5));
    const limit = data.classification === "National Road" ? 40000 : 15000;
    
    let reasons = [
      `Historical growth factor for ${data.classification} applied (${(rate*100).toFixed(1)}%)`,
      "Assumes sustained economic development"
    ];
    let action = "Monitor volume annually";
    let trend = "Stable Growth";
    
    if (projected > limit) {
      trend = "Critical Congestion Risk";
      action = "Initiate feasibility study for lane expansion";
      reasons.push(`Projected volume (${projected}) exceeds optimal capacity (${limit})`);
    } else if (projected > (limit * 0.8)) {
      trend = "Approaching Capacity";
      action = "Plan for junction improvements";
      reasons.push("Volumes will reach 80% of design capacity within 5 years");
    }

    return {
      road_id: data.road_id,
      current_volume: data.current_volume,
      projected_volume_5yr: projected,
      trend,
      reasons,
      recommended_action: action
    };
  }

  static fallbackSafetyRisk(data) {
    let score = 10;
    score += Math.min(data.historical_accidents * 15, 60);
    
    if (data.traffic_volume > 30000) score += 20;
    else if (data.traffic_volume > 15000) score += 10;
    
    if (data.classification === "National Road") score += 10;
    score = Math.min(score, 100);
    
    let reasons = [];
    if (data.historical_accidents > 0) reasons.push(`History of ${data.historical_accidents} recorded incidents`);
    if (data.traffic_volume > 15000) reasons.push("High traffic volume increases conflict opportunities");
    if (data.classification === "National Road") reasons.push("High-speed corridor increases potential severity");
    if (reasons.length === 0) reasons.push("No significant risk factors identified");
        
    let action = "Standard safety monitoring";
    let risk_level = "Low";
    
    if (score >= 75) {
      risk_level = "Critical";
      action = "Deploy immediate safety audit; consider traffic calming";
    } else if (score >= 50) {
      risk_level = "High";
      action = "Review signage and road markings; plan for improvements";
    } else if (score >= 30) {
      risk_level = "Medium";
      action = "Increase enforcement patrols during peak hours";
    }

    return {
      road_id: data.road_id,
      risk_score: score,
      risk_level,
      reasons,
      recommended_action: action
    };
  }
}

module.exports = AIService;
