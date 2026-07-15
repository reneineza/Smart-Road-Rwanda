def predict_traffic(data: dict) -> dict:
    """
    Predicts 5-year traffic growth based on historical counts and road class.
    """
    current_vol = data.get("current_volume", 0)
    classification = data.get("classification", "District Road")
    
    # Growth rates based on classification (simulated economic growth factors)
    if classification == "National Road":
        annual_growth_rate = 0.055  # 5.5% annual growth
    elif classification == "District Road":
        annual_growth_rate = 0.032  # 3.2% annual growth
    else:
        annual_growth_rate = 0.020  # 2.0% baseline
        
    # 5-year projection using compound interest formula A = P(1 + r)^t
    projected_vol = int(current_vol * ((1 + annual_growth_rate) ** 5))
    
    # Analyze capacity
    capacity_limit = 40000 if classification == "National Road" else 15000
    
    reasons = [
        f"Historical growth factor for {classification} applied ({annual_growth_rate*100}%)",
        "Assumes sustained economic development in adjacent sectors"
    ]
    
    action = "Monitor volume annually"
    trend = "Stable Growth"
    
    if projected_vol > capacity_limit:
        trend = "Critical Congestion Risk"
        action = "Initiate feasibility study for lane expansion or alternative routing"
        reasons.append(f"Projected volume ({projected_vol}) exceeds optimal capacity ({capacity_limit})")
    elif projected_vol > (capacity_limit * 0.8):
        trend = "Approaching Capacity"
        action = "Plan for junction improvements and transit alternatives"
        reasons.append("Volumes will reach 80% of design capacity within 5 years")

    return {
        "road_id": data.get("road_id"),
        "current_volume": current_vol,
        "projected_volume_5yr": projected_vol,
        "trend": trend,
        "reasons": reasons,
        "recommended_action": action
    }
