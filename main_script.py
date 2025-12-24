import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- NEXTSMS CONFIG ---
NEXTSMS_TOKEN = "d983d9d1d54176047e68547aba079ba4"

# --- DATA STORAGE (Kwa sasa tunatumia list, kwenye production tumia Database) ---
registrations = []

def send_nextsms(phone, name):
    url = "https://messaging-service.co.tz/api/v1/sms/single"
    clean_phone = ''.join(filter(str.isdigit, str(phone)))
    if clean_phone.startswith("0"): clean_phone = "255" + clean_phone[1:]
    
    payload = {
        "from": "GGC FAMILY",
        "to": clean_phone,
        "text": f"SHALOM {name}! Usajili wako GGC FAMILY umekamilika. Karibu Grace & Glory."
    }
    headers = {
        "Authorization": f"Bearer {NEXTSMS_TOKEN}",
        "Content-Type": "application/json"
    }
    try:
        # Hii itajaribu kutuma, kama NextSMS bado ni 'Pending', haitaleta error kwenye Email
        requests.post(url, json=payload, headers=headers, timeout=5)
    except:
        pass

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS': return make_response()
    
    data = request.json
    # Kuchukua Data za V61
    entry = {
        "id": len(registrations) + 1,
        "type": data.get('type'), # Mshirika au Mgeni
        "name": data.get('name'),
        "email": data.get('email'),
        "phone": data.get('whatsapp'),
        "date": data.get('date', datetime.now().strftime("%Y-%m-%d")),
        "amount": data.get('amount', 0) # Kwa ajili ya Finance
    }
    
    registrations.append(entry)
    
    # 1. Tuma SMS (Itaanza kufanya kazi NextSMS wakikubali)
    send_nextsms(entry['phone'], entry['name'])
    
    # 2. Hapa kodi yako ya Email (Inafanya kazi tayari)
    # send_email_logic(entry)
    
    return jsonify({"status": "success", "message": "Usajili Umekamilika"}), 200

@app.route('/api/admin/dashboard', methods=['GET'])
def dashboard():
    # Hapa ndipo Finance na Admin wanaona data zote
    return jsonify(registrations)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
