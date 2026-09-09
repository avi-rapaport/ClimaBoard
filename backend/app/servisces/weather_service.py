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
        "current": [
            "weather_code",
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation",
        ],
    }

    response = requests.get(url, params)
    response.raise_for_status()

    data = response.json()

    current = data.get("current")
    if not current:
        return None

    return {
        "code": current.get("weather_code"),
        "temperature": current.get("temperature_2m"),
        "precipitation": current.get("precipitation"),
        "humidity": current.get("relative_humidity_2m"),
        "wind_speed": current.get("wind_speed_10m"),
    }


def fetch_forecast(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "relative_humidity_2m_min",
            "relative_humidity_2m_max",
            "wind_speed_10m_max",
            "precipitation_probability_max",
        ],
    }

    response = requests.get(url, params)
    response.raise_for_status()

    data = response.json()
    daily = data.get("daily")
    if not daily:
        return []

    times = daily.get("time", [])
    codes = daily.get("weather_code", [])
    print(codes)
    temps_max = daily.get("temperature_2m_max", [])
    temps_min = daily.get("temperature_2m_min", [])
    humidity_max = daily.get("relative_humidity_2m_min", [])
    humidity_min = daily.get("relative_humidity_2m_max", [])
    winds = daily.get("wind_speed_10m_max", [])
    precipitation = daily.get("precipitation_probability_max", [])

    forecasts_list = []
    for i in range(len(times)):
        forecasts_list.append(
            {
                "date": times[i],
                "code": codes[i],
                "temp_max": temps_max[i],
                "temp_min": temps_min[i],
                "prep": precipitation[i],
                "humidity": (humidity_max[i] + humidity_min[i]) / 2,
                "wind": winds[i],
            }
        )

    return forecasts_list
