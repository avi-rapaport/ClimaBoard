from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.cities_router import router as cities_router

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(cities_router, prefix="/weather")
