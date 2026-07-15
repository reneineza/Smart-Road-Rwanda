def predict_safety_risk(data: dict) -> dict:
    """
    Calculates a safety risk score based on historical accidents and exposure (traffic volume).
    """
    accidents = data.get("historical_accidents", 0)
    traffic = data.get("traffic_volume", 1) # avoid div by zero
    classification = data.get("classification", "Unknown")
    
    # Base risk score (0-100)
    score = 10
    
    # 1. Historical factor (Heavily weighted)
    score += min(accidents * 15, 60)
    
    # 2. Exposure factor (High traffic = higher risk of multi-vehicle incidents)
    if traffic > 30000:
        score += 20
    elif traffic > 15000:
        score += 10
        
    # 3. Speed/Class factor
    if classification == "National Road":
        score += 10 # Higher speeds = higher severity risk
        
    # Cap at 100
    score = min(score, 100)
    
    reasons = []
    if accidents > 0:
        reasons.append(f"History of {accidents} recorded incidents at this location")
    if traffic > 15000:
        reasons.append("High traffic volume increases conflict opportunities")
    if classification == "National Road":
        reasons.append("High-speed corridor increases potential severity")
        
    if not reasons:
        reasons.append("No significant risk factors identified")
        
    action = "Standard safety monitoring"
    risk_level = "Low"
    
    if score >= 75:
        risk_level = "Critical"
        action = "Deploy immediate safety audit; consider traffic calming or signalization"
    elif score >= 50:
        risk_level = "High"
        action = "Review signage and road markings; plan for targeted safety improvements"
    elif score >= 30:
        risk_level = "Medium"
        action = "Increase enforcement patrols during peak hours"

    return {
        "road_id": data.get("road_id"),
        "risk_score": score,
        "risk_level": risk_level,
        "reasons": reasons,
        "recommended_action": action
    }
