import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# Tunaruhusu Frontend (Netlify) iwasiliane na Backend (Koyeb)
CORS(app)

# 1. DATABASE CONFIG (Vision 103 Standard)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_final_v9.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 2. ENV VARIABLES (Usalama kwanza - tunavuta siri kutoka Koyeb Settings)
SMS_SECRET = os.getenv("SMS_API_SECRET", "35fe159f0ffe1465e6153080caeb61495782ce0c52f79655")
DEVICE_ID = os.getenv("SMS_DEVICE_ID", "1")

# 3. MODELS (Muundo wa Database yako v9)
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
    desc = db.Column(db.Text, default="")
    img1 = db.Column(db.String(500))
    is_sold_out = db.Column(db.Boolean, default=False)

# Tengeneza Database kama haipo
with app.app_context():
    db.create_all()

# 4. SMS ENGINE (Vision 103 Gateway)
def send_vision_sms(phone, name):
    ujumbe = f"Heshima kwako {name}! Karibu Grace & Glory Church. Usajili wako Vision 103 umekamilika."
    
    # Safisha namba (iondoe + na nafasi)
    clean_phone = phone.strip().replace("+", "")
    if clean_phone.startswith("0"):
        clean_phone = "255" + clean_phone[1:]
        
    url = f"https://sms.vickybonick.com/api/send/sms?secret={SMS_SECRET}&mode=devices&device={DEVICE_ID}&sim=1&phone={clean_phone}&message={ujumbe}"
    
    try:
        requests.get(url, timeout=5)
        print(f"SMS imetumwa kwa: {clean_phone}")
    except Exception as e:
        print(f"SMS Error: {e}")

# 5. ROUTES (Vipengele vya Ofisi na Usajili)

@app.route('/')
def health_check():
    return jsonify({
        "status": "Vision 103 Online", 
        "engine": "Python 3.9",
        "database": "v9_active"
    }), 200

# Endpoint ya Usajili na SMS
@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.json
    s_id = data.get('id', '').lower().strip()
    
    if not s_id:
        return jsonify({"error": "ID inahitajika"}), 400

    m = Merchant.query.get(s_id)
    if not m:
        # Msajili mpya
        jina = data.get('name', s_id)
        simu = data.get('whatsapp', '255000000000')
        
        m = Merchant(id=s_id, name=jina, whatsapp=simu)
        db.session.add(m)
        db.session.commit()
        
        # Tuma SMS ya Vision 103
        send_vision_sms(simu, jina)
            
    return jsonify({"id": m.id, "name": m.name, "whatsapp": m.whatsapp, "logo": m.logo})

# Endpoint ya Ripoti za Ofisi ya Finance
@app.route('/api/office/stats', methods=['GET'])
def office_stats():
    merchants = Merchant.query.order_by(Merchant.created_at.desc()).all()
    products_count = Product.query.count()
    
    return jsonify({
        "total_merchants": len(merchants),
        "total_products": products_count,
        "recent_merchants": [{
            "id": m.id, 
            "name": m.name, 
            "phone": m.whatsapp,
            "date": m.created_at.strftime("%Y-%m-%d %H:%M")
        } for m in merchants]
    })

# Endpoint ya Bidhaa (Vipengele vya SGR)
@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.json
        new_p = Product(
            merchant_id=data['id'].lower().strip(), 
            name=data['name'], 
            price=data['price'], 
            desc=data.get('desc', ''), 
            img1=data.get('img1')
        )
        db.session.add(new_p)
        db.session.commit()
        return jsonify({"status": "success"})
    
    s_id = request.args.get('v', '').lower().strip()
    m = Merchant.query.get(s_id)
    if not m: return jsonify({"error": "Store not found"}), 404
    items = Product.query.filter_by(merchant_id=s_id).all()
    return jsonify({
        "vendor": {"name": m.name, "whatsapp": m.whatsapp, "logo": m.logo},
        "products": [{"id": i.id, "name": i.name, "price": i.price, "desc": i.desc, "img": i.img1, "sold": i.is_sold_out} for i in items]
    })

if __name__ == '__main__':
    # Vision 103 inawaka kwenye Port 8000
    app.run(host='0.0.0.0', port=8000)
