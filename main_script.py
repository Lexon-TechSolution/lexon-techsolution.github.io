import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# CORS imefunguliwa kikamilifu ili Netlify iweze kuongea na Koyeb bila kizuizi
CORS(app, resources={r"/*": {"origins": "*"}})

# Database Setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_final_v9.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))

with app.app_context():
    db.create_all()

# SMS Engine
def send_vision_sms(phone, name):
    SECRET = os.getenv("SMS_API_SECRET", "35fe159f0ffe1465e6153080caeb61495782ce0c52f79655")
    D_ID = os.getenv("SMS_DEVICE_ID", "1")
    ujumbe = f"Heshima kwako {name}! Usajili wa Vision 103 umekamilika. Karibu Grace & Glory."
    namba = phone.strip().replace("+", "")
    if namba.startswith("0"): namba = "255" + namba[1:]
    url = f"https://sms.vickybonick.com/api/send/sms?secret={SECRET}&mode=devices&device={D_ID}&sim=1&phone={namba}&message={ujumbe}"
    try:
        requests.get(url, timeout=5)
    except:
        pass

@app.route('/')
def status():
    return jsonify({"engine": "Vision 103", "status": "Online"}), 200

@app.route('/api/auth', methods=['POST', 'OPTIONS'])
def auth():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    data = request.json
    s_id = data.get('id', '').lower().strip()
    m = Merchant.query.get(s_id)
    if not m:
        m = Merchant(id=s_id, name=data.get('name', s_id), whatsapp=data.get('whatsapp', "255700000000"))
        db.session.add(m)
        db.session.commit()
        send_vision_sms(m.whatsapp, m.name)
    return jsonify({"id": m.id, "name": m.name, "whatsapp": m.whatsapp})

@app.route('/api/office/stats', methods=['GET'])
def get_stats():
    merchants = Merchant.query.order_by(Merchant.created_at.desc()).all()
    return jsonify({
        "total_merchants": len(merchants),
        "total_products": Product.query.count(),
        "recent_merchants": [{"id": m.id, "name": m.name, "phone": m.whatsapp, "date": m.created_at.strftime("%Y-%m-%d")} for m in merchants]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
