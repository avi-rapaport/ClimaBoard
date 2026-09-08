from fastapi import APIRouter, Query, HTTPException, status
from servisces.weather_service import fetch_current_weather, fetch_forecast

router = APIRouter(tags=["Weather"])


@router.get("/current")
def get_current_weather(lat: float, lon: float):
    current_data = fetch_current_weather(lat, lon)
    if not current_data:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Weather provider returned invalid or empty data",
        )
    return current_data


@router.get("/forecast")
def get_forecast(lat: float, lon: float):
    forecast_data = fetch_current_weather(lat, lon)
    if not forecast_data:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Weather provider returned invalid or empty data",
        )
    return forecast_data
