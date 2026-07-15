def predict_road_condition(data: dict) -> dict:
    """
    Predicts future road condition based on statistical deterioration factors.
    """
    current_condition = data.get("current_condition", "Good")
    traffic = data.get("traffic_volume", 0)
    heavy_pct = data.get("heavy_vehicle_pct", 0.0)
    surface = data.get("surface_type", "Asphalt")
    
    # Base deterioration score (0 to 100) - Higher means faster deterioration
    deterioration_rate = 10
    
    # Traffic impact
    if traffic > 20000:
        deterioration_rate += 30
    elif traffic > 10000:
        deterioration_rate += 15
        
    # Heavy vehicle impact
    if heavy_pct > 15:
        deterioration_rate += 25
    elif heavy_pct > 5:
        deterioration_rate += 10
        
    # Surface vulnerability
    if surface == "Dirt" or surface == "Gravel":
        deterioration_rate += 20
        
    # Adjust based on current state
    if current_condition == "Poor":
        deterioration_rate += 20
        
    # Determine prediction
    prediction = "Good"
    timeframe = "5+ years"
    risk = "Low"
    action = "Routine monitoring"
    reasons = []

    if deterioration_rate > 70:
        prediction = "Poor"
        timeframe = "1-2 years"
        risk = "High"
        action = "Schedule immediate inspection and budget for rehabilitation"
        reasons.append("High traffic load exceeding design capacity")
        if heavy_pct > 15:
            reasons.append("Significant heavy vehicle stress on pavement")
    elif deterioration_rate > 40:
        prediction = "Fair"
        timeframe = "3 years"
        risk = "Medium"
        action = "Schedule surface treatment within 12-18 months"
        reasons.append("Moderate wear expected from traffic volume")
        if surface != "Asphalt":
            reasons.append("Unpaved surface accelerates degradation")
    else:
        reasons.append("Traffic volumes within acceptable limits")
        reasons.append("Stable surface type")

    return {
        "road_id": data.get("road_id"),
        "prediction": f"{prediction} in {timeframe}",
        "risk_level": risk,
        "reasons": reasons,
        "recommended_action": action,
        "deterioration_score": deterioration_rate
    }
