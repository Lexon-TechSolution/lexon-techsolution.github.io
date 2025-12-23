import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# Inaruhusu browser yoyote kuongea na server yako
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

# --- BEEM CONFIGURATION ---
BEEM_API_KEY = "1aefe53a86b4e997"
BEEM_SECRET_KEY = "NjM3Mjc1ZDRiYTBiYTZhZWUxMWNhNDU0ZWI1YjkyMDBmNmVmNzkwY2U3NGMyNTU0Mzg1NjQzYTkxMTI4ZTIzMA=="
SENDER_ID = "INFO" # Badilisha hapa uweke jina lako likishakuwa 'Approved'

# --- DATABASE SETUP ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vision103_final.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

def send_beem_sms(phone_number, full_name):
    # Safisha namba ianze na 255
    clean_phone = ''.join(filter(str.isdigit, str(phone_number)))
    if clean_phone.startswith("0"):
        clean_phone = "255" + clean_phone[1:]
    elif not clean_phone.startswith("255"):
        clean_phone = "255" + clean_phone

    message = f"Heshima kwako {full_name}! Usajili wako wa Vision 103 umekamilika kikamilifu. Karibu Grace & Glory."
    
    payload = {
        "source_addr": SENDER_ID,
        "schedule_time": "",
        "encoding": "0",
        "message": message,
        "recipients": [{"recipient_id": 1, "dest_addr": clean_phone}]
    }
    
    try:
        response = requests.post(
            "https://api.beem.africa/v1/send",
            auth=(BEEM_API_KEY, BEEM_SECRET_KEY),
            json=payload,
            headers={'Content-Type': 'application/json'},
            verify=False
        )
        print(f"BEEM RESPONSE: {response.status_code} | {response.text}")
        return response.json()
    except Exception as e:
        print(f"BEEM ERROR: {e}")
        return None

@app.route('/')
def home():
    return jsonify({"message": "Vision 103 Engine is Online"}), 200

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS':
        return make_response()
        
    data = request.json
    m_id = data.get('id', '').lower().strip()
    
    # Angalia kama mshirika tayari yupo
    merchant = Merchant.query.get(m_id)
    if not merchant:
        merchant = Merchant(
            id=m_id,
            name=data.get('name'),
            phone=data.get('whatsapp'),
            email=data.get('email')
        )
        db.session.add(merchant)
        db.session.commit()
        
        # RUSHASHA SMS KUPITIA BEEM
        send_beem_sms(merchant.phone, merchant.name)
    
    return jsonify({"status": "success", "name": merchant.name})

@app.route('/api/office/stats', methods=['GET'])
def get_stats():
    all_data = Merchant.query.order_by(Merchant.created_at.desc()).all()
    results = []
    for m in all_data:
        results.append({
            "id": m.id,
            "name": m.name,
            "phone": m.phone,
            "date": m.created_at.strftime("%Y-%m-%d %H:%M")
        })
    return jsonify({"total": len(results), "merchants": results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
