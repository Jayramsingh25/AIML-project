# 🚦 Smart Traffic Light Optimizer (IRC:93-1985 Standard)

A machine learning-based traffic management system designed for Indian road conditions. This project uses **Random Forest Regression** to predict optimal green light durations based on real-time vehicle density and Passenger Car Unit (PCU) values.

## 🛠️ Features
- **ML-Driven Timing:** Predicts green time based on heterogeneous traffic (Bikes, Autos, Cars, Trucks).
- **Indian Standards:** Adheres to **IRC:93-1985** (7s minimum green, 3s amber).
- **Full-Stack Implementation:** FastAPI backend, Vanilla JS frontend, and Random Forest ML model.
- **PCU Aware:** Automatically calculates lane saturation using standard PCU weights.

## 📐 The Formula (Webster's Method Logic)
The model targets an optimal cycle length $C_o$ based on:
$$C_o = \frac{1.5L + 5}{1 - Y}$$
Where:
- $L$ = Total lost time per cycle (startup delay).
- $Y$ = Sum of critical flow ratios.

## 🚀 Deployment
- **Backend:** Hosted on Render (FastAPI).
- **Frontend:** Hosted on GitHub Pages (HTML/CSS/JS).

## 📂 Project Structure
- `app.py`: FastAPI backend handling model inference.
- `traffic_model.pkl`: Trained Random Forest Regressor.
- `index.html`: Dashboard UI.
- `script.js`: Logic for API calls and signal animations.