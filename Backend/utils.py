import requests

BASE_URL = "http://localhost:8000"


def fetch_hospital_data(hospital_id):
    response = requests.get(f"{BASE_URL}/hospitals/{hospital_id}")
    if response.status_code == 200:
        return response.json()
    else:
        return None
