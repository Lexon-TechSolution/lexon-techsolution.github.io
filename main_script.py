import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- NEXTSMS CONFIG ---
NEXTSMS_TOKEN = "d983d9d1d54176047e68547aba079ba4"

def send_nextsms_internet(phone_number, full_name):
    # Kusafisha namba iwe format ya 255...
    clean_phone = ''.join(filter(str.isdigit, str(phone_number)))
    if clean_phone.startswith("0"):
        clean_phone = "255" + clean_phone[1:]
    
    # URL ya Internet SMS (Haitumii simu yako)
    url = "https://messaging-service.co.tz/api/v1/sms/single"
    
    ujumbe = f"Heshima kwako {full_name}! SHALOM MTUMISHI KATIKA BWANA UMESAJILIWA KIKAMILIFU KUWA MSHIRIKA WA GGC FAMILY. PASTOR ANS ANAKUTAKIA HERI YA MWAKA MPYA NA USHINDI TELEEE. Karibu Grace & Glory. NAMBA YA POSTA 255779000015."
    
    payload = {
        "from": "NEXTSMS", # Jina la kitaalamu litakaloonekana kwa mteja
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
        # Hii itaonesha kama SMS imetoka kwenye logs za Koyeb
        print(f"INTERNET SMS LOG: {response.status_code} - {response.text}")
        return response.json()
    except Exception as e:
        print(f"SMS ERROR: {str(e)}")
        return None

@app.route('/')
def home():
    return "VISION 103 SMS ENGINE READY", 200

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS':
        return make_response()
        
    data = request.json
    name = data.get('name', 'Mshirika')
    phone = data.get('whatsapp')
    
    if phone:
        send_nextsms_internet(phone, name)
        return jsonify({"status": "success", "message": "Professional SMS Sent"}), 200
    
    return jsonify({"status": "error"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
