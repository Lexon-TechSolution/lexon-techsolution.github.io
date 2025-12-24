import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- BEEM CONFIG ---
# Funguo zako za Beem (Ziko sahihi)
BEEM_API_KEY = "1aefe53a86b4e997"
BEEM_SECRET_KEY = "NjM3Mjc1ZDRiYTBiYTZhZWUxMWNhNDU0ZWI1YjkyMDBmNmVmNzkwY2U3NGMyNTU0Mzg1NjQzYTkxMTI4ZTIzMA=="

# --- DATABASE CONFIG ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vision103.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Tengeneza Database
with app.app_context():
    db.create_all()

def send_beem_sms(phone_number, full_name):
    # Safisha namba ya simu iwe format ya 255...
    clean_phone = ''.join(filter(str.isdigit, str(phone_number)))
    if clean_phone.startswith("0"):
        clean_phone = "255" + clean_phone[1:]
    
    # Payload ya Beem kwa kutumia "Sms Mtandao" (Kuepuka Pending)
    payload = {
        "source_addr": "Sms Mtandao",
        "schedule_time": "",
        "encoding": "0",
        "message": f"Heshima kwako {full_name}! Usajili wako wa Vision 103 umekamilika. Karibu Grace & Glory.",
        "recipients": [
            {
                "recipient_id": 1,
                "dest_addr": clean_phone
            }
        ]
    }
    
    try:
        response = requests.post(
            "https://api.beem.africa/v1/send",
            auth=(BEEM_API_KEY, BEEM_SECRET_KEY),
            json=payload,
            timeout=15
        )
        # Hii itatusaidia kuona jibu la Beem kwenye logs za Koyeb
        print(f"BEEM RESPONSE: {response.status_code} - {response.text}")
        return response.json()
    except Exception as e:
        print(f"SMS SENDING ERROR: {str(e)}")
        return None

@app.route('/')
def home():
    return jsonify({"status": "Online", "gateway": "Sms Mtandao"}), 200

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
        
        # TUMA SMS KWA BEEM
        send_beem_sms(merchant.phone, merchant.name)
    
    return jsonify({"status": "success", "message": "SMS processed"}), 200

if __name__ == '__main__':
    # Koyeb inahitaji port 8000
    app.run(host='0.0.0.0', port=8000)
