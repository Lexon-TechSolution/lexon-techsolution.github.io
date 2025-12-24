import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app) # Muhimu ili Netlify iweze kutuma data hapa

# --- CONFIG ZA INFOBIP ---
INFOBIP_API_KEY = "c2d7220f305487d6f7344c934d3740fc-4890475b-a39d-48dd-8588-9247da27b3ae"
INFOBIP_URL = "https://qw36gr.api.infobip.com/sms/2/text/advanced"

# --- DATABASE YA MUDA (Inatunza washirika waliojisajili) ---
# Kila Engine ikiamka, list hii inaanza upya. Baadaye tutaweka SQL database.
ggc_members_db = []

def send_infobip_sms(phone, name):
    clean_phone = ''.join(filter(str.isdigit, str(phone)))
    if clean_phone.startswith("0"): clean_phone = "255" + clean_phone[1:]
    
    payload = {
        "messages": [{
            "destinations": [{"to": clean_phone}],
            "from": "ServiceSMS",
            "text": f"SHALOM {name}! Usajili wako GGC FAMILY umekamilika. Karibu Grace & Glory."
        }]
    }
    headers = {
        "Authorization": f"App {INFOBIP_API_KEY}",
        "Content-Type": "application/json"
    }
    try:
        res = requests.post(INFOBIP_URL, json=payload, headers=headers, timeout=10)
        print(f"ENGINE SMS LOG: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"ENGINE ERROR: {str(e)}")

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register_engine():
    if request.method == 'OPTIONS': return make_response()
    
    data = request.json
    # Hapa Engine inarekodi kila kitu kinachokuja kutoka kwa muonekano
    member = {
        "id": len(ggc_members_db) + 1,
        "name": data.get('name'),
        "email": data.get('email'),
        "phone": data.get('whatsapp'),
        "category": data.get('category', 'MSHIRIKA'), # Mshirika au Mgeni
        "date": datetime.now().strftime("%d-%m-%Y %H:%M")
    }
    
    ggc_members_db.append(member)
    
    # Engine inarusha SMS
    send_infobip_sms(member['phone'], member['name'])
    
    return jsonify({"status": "success", "engine_status": "data_recorded", "data": member}), 200

@app.route('/api/admin/all', methods=['GET'])
def get_all_data():
    # Hii ndio itatumiwa na Admin Dashboard na Finance Office
    return jsonify(ggc_members_db)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
