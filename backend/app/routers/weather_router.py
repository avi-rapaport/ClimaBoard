from fastapi import APIRouter, Query, HTTPException, status
from servisces.weather_service import fetch_current_weather, fetch_forecast

router = APIRouter(tags=["Weather"])


@router.get("/current")
def get_current_weather(
    lat: float = Query(..., ge=-90.0, le=90.0),
    lon: float = Query(..., ge=-180.0, le=180.0),
):
    current_data = fetch_current_weather(lat, lon)
    if not current_data:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Weather provider returned invalid or empty data",
        )
    return current_data


@router.get("/forecast")
def get_forecast(
    lat: float = Query(..., ge=-90.0, le=90.0),
    lon: float = Query(..., ge=-180.0, le=180.0),
):
    forecast_data = fetch_forecast(lat, lon)
    if not forecast_data:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Weather provider returned invalid or empty data",
        )
    return forecast_data


@router.get("/forecast-comparison")
def forecast_comparison(
    lat1: float = Query(..., ge=-90.0, le=90.0),
    lon1: float = Query(..., ge=-180.0, le=180.0),
    lat2: float = Query(..., ge=-90.0, le=90.0),
    lon2: float = Query(..., ge=-180.0, le=180.0),
):
    forecast_data1 = fetch_current_weather(lat1, lon1)
    forecast_data2 = fetch_current_weather(lat2, lon2)

    if not forecast_data1 or not forecast_data2:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Weather provider returned invalid or empty data",
        )
    return {"city1": forecast_data1, "city2": forecast_data2}
