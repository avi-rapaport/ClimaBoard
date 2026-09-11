from fastapi import APIRouter, Query, HTTPException
from servisces.weather_service import fetch_city_data

router = APIRouter(tags=["Cities"])


@router.get("/search")
def search_city(name: str = Query(..., min_length=2, description="city name search")):
    city_data = fetch_city_data(name)
    if not city_data:
        raise HTTPException(status_code=404, detail="City not found")
    return city_data
