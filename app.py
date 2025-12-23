import requests # Muhimu kwa SMS
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- SMS GATEWAY FUNCTION ---
def send_lexon_sms(phone, name):
    # Hizi ndio ID tulizohakiki na zikakubali
    api_secret = "35fe159f0ffe1465e6153080caeb61495782ce0c52f79655"
    device_id = "1" 
    
    ujumbe = f"Hongera {name}! Karibu Grace & Glory. Mfumo wako wa SGR umewashwa kikamilifu."
    
    # Tunatumia GET kwa sababu ni rahisi zaidi
    url = f"https://sms.vickybonick.com/api/send/sms?secret={api_secret}&mode=devices&device={device_id}&sim=1&phone={phone}&message={ujumbe}"
    
    try:
        requests.get(url, timeout=5)
    except Exception as e:
        print(f"SMS Error: {e}")

# --- MODELS ---
class Vendor(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20)) # Tumeongeza hii kwa ajili ya SMS

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vendor = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"status": "Lexon Engine Online", "port": 8000, "sms_gateway": "Active"})

@app.route('/add_vendor_full', methods=['POST'])
def add_v():
    data = request.json
    v_id = data.get('id').lower().strip()
    v_name = data.get('name')
    v_phone = data.get('whatsapp', v_id) # Inatumia ID kama simu isipopatikana

    if not Vendor.query.get(v_id):
        new_v = Vendor(id=v_id, name=v_name, whatsapp=v_phone)
        db.session.add(new_v)
        db.session.commit()
        
        # --- HAPA NDIPO SMS INARUSHWA ---
        send_lexon_sms(v_phone, v_name)
        
    return jsonify({"status": "success", "message": "Vendor added and SMS triggered"})

@app.route('/get_products')
def get_p():
    v_id = request.args.get('v').lower().strip()
    v = Vendor.query.get(v_id)
    if not v: return jsonify({"status": "error"}), 404
    p = Product.query.filter_by(vendor=v_id).all()
    return jsonify({
        "status":"success", 
        "vendor_name": v.name, 
        "products": [{"name":i.name, "price":i.price} for i in p]
    })

@app.route('/add_product_full', methods=['POST'])
def add_p():
    data = request.json
    db.session.add(Product(vendor=data['vendor'].lower().strip(), name=data['name'], price=data['price']))
    db.session.commit()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
