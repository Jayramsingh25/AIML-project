from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# Enable CORS so your website can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
try:
    model = joblib.load("traffic_model.pkl")
except:
    model = None

@app.get("/")
def home():
    return {"status": "Online", "message": "Traffic Optimization API is running."}

@app.post("/predict")
def predict_timing(data: dict):
    if model is None:
        return {"error": "Model file not found on server."}
        
    # Create DataFrame from input JSON
    df = pd.DataFrame([[
        data['bikes'], 
        data['autos'], 
        data['cars'], 
        data['trucks']
    ]], columns=['Two_Wheelers', 'Auto_Rickshaws', 'Cars', 'Heavy_Vehicles'])
    
    # Predict
    prediction = model.predict(df)[0]
    
    # Apply IRC:93-1985 Constraints (Min 7s, Max 60s)
    green_time = int(round(max(7, min(60, prediction))))
    
    return {
        "green_light": green_time,
        "amber_light": 3,
        "pcu_count": float(round((data['bikes']*0.5) + data['autos'] + data['cars'] + (data['trucks']*3), 2))
    }