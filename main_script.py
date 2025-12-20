import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# DATABASE SETUP
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_saas_pro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# MODELS (Enterprise Structure)
class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    plan = db.Column(db.String(20), default="Standard")

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    category = db.Column(db.String(50), default="General")

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"status": "Lexon SaaS Engine Pro Online", "version": "3.5", "port": 8000})

# SAJILI DUKA (Onboarding)
@app.route('/add_vendor_full', methods=['POST', 'OPTIONS'])
def add_vendor_full():
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
    data = request.json
    v_id = data.get('id').lower()
    v_name = data.get('name')
    
    if not Merchant.query.get(v_id):
        new_v = Merchant(id=v_id, name=v_name)
        db.session.add(new_v)
        db.session.commit()
    return jsonify({"status": "success", "vendor_id": v_id, "vendor_name": v_name})

# WEKA BIDHAA (Inventory)
@app.route('/add_product_full', methods=['POST', 'OPTIONS'])
def add_product():
    if request.method == 'OPTIONS': return jsonify({"status": "ok"}), 200
    data = request.json
    new_p = Product(merchant_id=data['vendor_id'], name=data['name'], price=data['price'])
    db.session.add(new_p)
    db.session.commit()
    return jsonify({"status": "success"})

# PATA BIDHAA (Store View)
@app.route('/get_products', methods=['GET'])
def get_products():
    v_id = request.args.get('v').lower()
    merchant = Merchant.query.get(v_id)
    if not merchant: return jsonify({"status": "error"}), 404
    prods = Product.query.filter_by(merchant_id=v_id).all()
    return jsonify({
        "status": "success",
        "vendor_name": merchant.name,
        "products": [{"name": p.name, "price": p.price} for p in prods]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
