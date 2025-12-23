import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- BEEM CONFIG ---
BEEM_API_KEY = "1aefe53a86b4e997"
BEEM_SECRET_KEY = "NjM3Mjc1ZDRiYTBiYTZhZWUxMWNhNDU0ZWI1YjkyMDBmNmVmNzkwY2U3NGMyNTU0Mzg1NjQzYTkxMTI4ZTIzMA=="

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vision103.db'
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
    clean_phone = ''.join(filter(str.isdigit, str(phone_number)))
    if clean_phone.startswith("0"): clean_phone = "255" + clean_phone[1:]
    
    payload = {
        "source_addr": "255621887100", # WEKA NAMBA YAKO YA BEEM HAPA ILI SMS ITOKE HARAKA
        "schedule_time": "",
        "encoding": "0",
        "message": f"Heshima kwako {full_name}! Usajili wako Vision 103 umekamilika. Karibu Grace & Glory.",
        "recipients": [{"recipient_id": 1, "dest_addr": clean_phone}]
    }
    try:
        r = requests.post("https://api.beem.africa/v1/send", 
                      auth=(BEEM_API_KEY, BEEM_SECRET_KEY), 
                      json=payload, timeout=15)
        print(f"BEEM STATUS: {r.status_code} - {r.text}")
    except Exception as e: 
        print(f"SMS Error: {e}")

@app.route('/')
def home(): return jsonify({"status": "Online"}), 200

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS': return make_response()
    data = request.json
    m_id = data.get('id', '').lower().strip()
    
    merchant = Merchant.query.get(m_id)
    if not merchant:
        merchant = Merchant(id=m_id, name=data.get('name'), phone=data.get('whatsapp'), email=data.get('email'))
        db.session.add(merchant)
        db.session.commit()
        send_beem_sms(merchant.phone, merchant.name) # Hapa SMS inatumwa
    
    return jsonify({"status": "success", "name": merchant.name})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
