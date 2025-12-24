import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- INFOBIP CONFIG (Kutoka kwenye kodi uliyopewa) ---
INFOBIP_API_KEY = "c2d7220f305487d6f7344c934d3740fc-4890475b-a39d-48dd-8588-9247da27b3ae"
# Tumia URL rasmi waliyokupa
INFOBIP_URL = "https://qw36gr.api.infobip.com/sms/2/text/advanced"

def send_infobip_sms(phone_number, full_name):
    # Safisha namba iwe 255...
    clean_phone = ''.join(filter(str.isdigit, str(phone_number)))
    if clean_phone.startswith("0"):
        clean_phone = "255" + clean_phone[1:]
    
    # Ujumbe wako wa kanisa
    ujumbe_wa_kanisa = f"Heshima kwako {full_name}! SHALOM. USHAJILI WAKO GGC FAMILY UMEKAMILIKA. KARIBU GRACE & GLORY. NAMBA YA POSTA 255779000015."
    
    payload = {
        "messages": [
            {
                "destinations": [{"to": clean_phone}],
                "from": "ServiceSMS", # Hii inakubaliwa moja kwa moja na Infobip
                "text": ujumbe_wa_kanisa
            }
        ]
    }
    
    headers = {
        "Authorization": f"App {INFOBIP_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    try:
        response = requests.post(INFOBIP_URL, json=payload, headers=headers, timeout=15)
        print(f"INFOBIP RESPONSE: {response.status_code} - {response.text}")
        return response.json()
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return None

@app.route('/')
def home():
    return "GGC SYSTEM READY", 200

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS':
        return make_response()
        
    data = request.json
    name = data.get('name', 'Mshirika')
    phone = data.get('whatsapp')
    
    if phone:
        send_infobip_sms(phone, name)
        return jsonify({"status": "success", "info": "SMS Sent via Infobip"}), 200
    
    return jsonify({"status": "error"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
