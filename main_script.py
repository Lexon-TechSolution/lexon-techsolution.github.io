import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database v9 - Vision 103 Standard
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_final_v9.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- ENGINE: SMS GATEWAY (VISION 103) ---
def send_office_sms(phone, name, msg_type):
    api_secret = "35fe159f0ffe1465e6153080caeb61495782ce0c52f79655"
    if msg_type == "welcome":
        ujumbe = f"Heshima kwako {name}! Karibu Grace & Glory. Usajili wako umekamilika kikamilifu."
    else:
        ujumbe = f"Habari {name}, Ofisi ya Finance imethibitisha muamala wako. Baraka ziwe nawe."
    
    url = f"https://sms.vickybonick.com/api/send/sms?secret={api_secret}&mode=devices&device=1&sim=1&phone={phone}&message={ujumbe}"
    try:
        requests.get(url, timeout=5)
    except:
        pass

# --- MODELS ---
class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20))
    logo = db.Column(db.String(500), default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    is_sold_out = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

# --- ROUTES ZA OFISI (FINANCE & ADMIN) ---

@app.route('/api/office/stats', methods=['GET'])
def get_stats():
    # Hii inavuta data kwa ajili ya Dashboard ya Vision 103
    m_count = Merchant.query.count()
    p_count = Product.query.count()
    recent = Merchant.query.order_by(Merchant.created_at.desc()).limit(5).all()
    
    return jsonify({
        "status": "Vision 103 Online",
        "total_merchants": m_count,
        "total_products": p_count,
        "recent_merchants": [{"id": m.id, "name": m.name, "phone": m.whatsapp} for m in recent]
    })

@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.json
    s_id = data.get('id').lower().strip()
    m = Merchant.query.get(s_id)
    
    if not m:
        m = Merchant(
            id=s_id, 
            name=data.get('name', s_id), 
            whatsapp=data.get('whatsapp', "255700000000")
        )
        db.session.add(m)
        db.session.commit()
        # Tuma SMS ya Vision Welcome
        send_office_sms(m.whatsapp, m.name, "welcome")
        
    return jsonify({"id": m.id, "name": m.name, "whatsapp": m.whatsapp})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
