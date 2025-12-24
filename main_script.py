import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- DATA STORAGE (Hapa ndipo Admin/Finance wataona data) ---
ggc_database = []

# --- NEXTSMS CONFIG ---
NEXTSMS_TOKEN = "d983d9d1d54176047e68547aba079ba4"

def trigger_nextsms(phone, name):
    # Hii itafanya kazi NextSMS wakimaliza 'Processing'
    url = "https://messaging-service.co.tz/api/v1/sms/single"
    clean_phone = ''.join(filter(str.isdigit, str(phone)))
    if clean_phone.startswith("0"): clean_phone = "255" + clean_phone[1:]
    
    payload = {
        "from": "GGC FAMILY",
        "to": clean_phone,
        "text": f"SHALOM {name}! Usajili wako GGC FAMILY umekamilika. Karibu Grace & Glory."
    }
    try:
        import requests
        requests.post(url, json=payload, headers={"Authorization": f"Bearer {NEXTSMS_TOKEN}"}, timeout=2)
    except:
        pass

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS': return make_response()
    
    data = request.json
    # Professional Data Structure (V61)
    new_entry = {
        "id": len(ggc_database) + 1,
        "category": data.get('category'), # Mshirika au Mgeni
        "full_name": data.get('name'),
        "email": data.get('email'),
        "phone": data.get('whatsapp'),
        "reg_date": datetime.now().strftime("%d/%m/%Y %H:%M"),
        "status": "Verified"
    }
    
    ggc_database.append(new_entry)
    
    # Tuma SMS (Itasubiri approval ya NextSMS kimya kimya)
    trigger_nextsms(new_entry['phone'], new_entry['full_name'])
    
    # Hapa Email yako itaendelea kwenda (Inafanya kazi tayari)
    return jsonify({"status": "success", "data": new_entry}), 200

@app.route('/api/admin/data', methods=['GET'])
def get_admin_data():
    # Hii ndio API ya Dashboard ya Finance/Admin
    return jsonify(ggc_database)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
