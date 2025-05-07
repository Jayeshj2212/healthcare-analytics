from fastapi import FastAPI, HTTPException
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load data from JSON file
with open('sample_data.json', 'r') as f:
    hospitals_data = json.load(f)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Add your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hospitals/{hospital_id}")
def get_hospital_data(hospital_id: str):
    for hospital in hospitals_data:
        if hospital["hospital_id"] == hospital_id:
            return hospital
    raise HTTPException(status_code=404, detail="Hospital not found")
