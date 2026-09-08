import requests


def fetch_city_data(city_name: str):
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": city_name, "count": 10}

    response = requests.get(url, params)
    response.raise_for_status()

    data = response.json()

    result = data.get("results")
    if not result:
        return []

    cities_list = []
    for city in result:
        cities_list.append(
            {
                "id": city.get("id"),
                "name": city.get("name"),
                "country": city.get("country"),
                "latitude": city.get("latitude"),
                "longitude": city.get("longitude"),
            }
        )
    return cities_list


def fetch_current_weather(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
    }

    response = requests.get(url, params)
    response.raise_for_status()

    data = response.json()

    current = data.get("current")
    if not current:
        return None

    return {
        "temperature": current.get("temperature_2m"),
        "humidity": current.get("relative_humidity_2m"),
        "wind_speed": current.get("wind_speed_10m"),
    }


def fetch_forecast(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["temperature_2m", "relative_humidity_2m", "wind_speed_10"],
    }

    response = requests.get(url, params)
    response.raise_for_status()

    data = response.json()
    daily = data.get("daily")
    if not daily:
        return []

    times = daily.get("time", [])
    temps_max = daily.get("temperature_2m_max", [])
    temps_min = daily.get("temperature_2m_min", [])

    forecasts_list = []
    for i in range(len(times)):
        forecasts_list.append(
            {"date": times[i], "temp_max": temps_max[i], "temp_min": temps_min[i]}
        )

    return forecasts_list
