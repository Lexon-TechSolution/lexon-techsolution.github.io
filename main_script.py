import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- NEXTSMS CONFIG ---
NEXTSMS_TOKEN = "d983d9d1d54176047e68547aba079ba4"

def send_nextsms_internet(phone_number, full_name):
    clean_phone = ''.join(filter(str.isdigit, str(phone_number)))
    if clean_phone.startswith("0"):
        clean_phone = "255" + clean_phone[1:]
    
    url = "https://messaging-service.co.tz/api/v1/sms/single"
    
    # HAPA NDIPO UNAPOWEKA UJUMBE WAKO
    ujumbe = f"Heshima kwako {full_name}! Usajili wako wa Vision 103 umekamilika. Karibu Grace & Glory."
    
    payload = {
        "from": "NEXTSMS", # Tumia jina hili la bure sasa hivi
        "to": clean_phone,
        "text": ujumbe
    }
    
    headers = {
        "Authorization": f"Bearer {NEXTSMS_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=15)
        print(f"NEXTSMS PUSH: {response.status_code} - {response.text}")
        return response.json()
    except Exception as e:
        print(f"SMS ERROR: {str(e)}")
        return None

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS':
        return make_response()
    data = request.json
    # Hapa inatuma SMS kwa mshirika
    send_nextsms_internet(data.get('whatsapp'), data.get('name'))
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
