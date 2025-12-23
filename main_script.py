import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vision103_final.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

def send_vision_sms(phone, name):
    # CHUKUA SECRET TOKA KOYEB ENV AU TUMIA HII YA ZAMANI KAMA DEFAULT
    SECRET = os.getenv("SMS_API_SECRET", "35fe159f0ffe1465e6153080caeb61495782ce0c52f79655")
    D_ID = os.getenv("SMS_DEVICE_ID", "1")
    
    # 1. Safisha namba iwe 255...
    namba = ''.join(filter(str.isdigit, str(phone)))
    if namba.startswith("0"): namba = "255" + namba[1:]
    elif namba.startswith("7") or namba.startswith("6"): namba = "255" + namba
    
    ujumbe = f"Heshima kwako {name}! Usajili wako Vision 103 umekamilika. Karibu Grace & Glory."
    
    url = f"https://sms.vickybonick.com/api/send/sms?secret={SECRET}&mode=devices&device={D_ID}&sim=1&phone={namba}&message={requests.utils.quote(ujumbe)}"
    
    try:
        r = requests.get(url, timeout=10)
        print(f"SMS LOG: Namba: {namba} | Response: {r.text}")
    except Exception as e:
        print(f"SMS ERROR: {e}")

@app.route('/')
def status(): return jsonify({"status": "Vision 103 Active"}), 200

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS': return make_response()
    data = request.json
    s_id = data.get('id', '').lower().strip()
    m = Merchant.query.get(s_id)
    if not m:
        m = Merchant(id=s_id, name=data.get('name'), whatsapp=data.get('whatsapp'))
        db.session.add(m)
        db.session.commit()
        # RUSH SMS
        send_vision_sms(m.whatsapp, m.name)
    return jsonify({"status": "success", "name": m.name})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
