from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid

app = Flask(__name__)
# Ruhusu mawasiliano yote bila vizuizi
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_hub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Models
class Vendor(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))

class Product(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    vendor = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"message":"Lexon SaaS Engine Pro Online", "port": 8000})

@app.route('/add_vendor_full', methods=['POST', 'OPTIONS'])
def add_vendor():
    if request.method == 'OPTIONS': return make_response('', 200)
    data = request.json
    v_id = data.get('id').lower()
    if Vendor.query.get(v_id):
        return jsonify({"status": "exists"}), 200
    new_v = Vendor(id=v_id, name=data.get('name'), phone=data.get('phone'))
    db.session.add(new_v)
    db.session.commit()
    return jsonify({"status": "success"}), 201

@app.route('/get_products', methods=['GET'])
def get_products():
    v_id = request.args.get('v', '').lower()
    vendor = Vendor.query.get(v_id)
    if not vendor: return jsonify({"status": "error"}), 404
    prods = Product.query.filter_by(vendor=v_id).all()
    return jsonify({
        "status": "success",
        "vendor_name": vendor.name,
        "products": [{"id": p.id, "name": p.name, "price": p.price} for p in prods]
    })

@app.route('/add_product_full', methods=['POST', 'OPTIONS'])
def add_product():
    if request.method == 'OPTIONS': return make_response('', 200)
    data = request.json
    p_id = str(uuid.uuid4())[:8]
    new_p = Product(id=p_id, vendor=data['vendor'], name=data['name'], price=data['price'])
    db.session.add(new_p)
    db.session.commit()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    # HAPA NDIYO MABADILIKO MAKUU: Port 8000
    app.run(host='0.0.0.0', port=8000)
