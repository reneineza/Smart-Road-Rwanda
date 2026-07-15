from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.road_condition import predict_road_condition
from models.traffic_forecast import predict_traffic
from models.safety_risk import predict_safety_risk

app = FastAPI(title="SmartRoad Rwanda - AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RoadConditionInput(BaseModel):
    road_id: str
    road_name: str
    current_condition: str
    age_years: int = 5
    traffic_volume: int
    heavy_vehicle_pct: float
    surface_type: str

class TrafficForecastInput(BaseModel):
    road_id: str
    location_name: str
    current_volume: int
    classification: str

class SafetyRiskInput(BaseModel):
    road_id: str
    location_name: str
    historical_accidents: int
    traffic_volume: int
    classification: str

@app.post("/predict/road-condition")
def api_predict_road_condition(data: RoadConditionInput):
    return predict_road_condition(data.dict())

@app.post("/predict/traffic-forecast")
def api_predict_traffic(data: TrafficForecastInput):
    return predict_traffic(data.dict())

@app.post("/predict/safety-risk")
def api_predict_safety_risk(data: SafetyRiskInput):
    return predict_safety_risk(data.dict())

@app.get("/health")
def health_check():
    return {"status": "AI Engine is running"}
