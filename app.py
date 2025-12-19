from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid

app = Flask(__name__)
# Inaruhusu GitHub yako bila masharti yoyote
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_hub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024 
db = SQLAlchemy(app)

# Database Models
class Vendor(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    logo = db.Column(db.Text)

class Product(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    vendor = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    desc = db.Column(db.Text)
    img1 = db.Column(db.Text)

with app.app_context():
    db.create_all()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def home():
    return jsonify({"message":"Karibu kwenye Mfumo wa Lexon","status":"Lexon SaaS Engine Pro Online"})

@app.route('/add_vendor_full', methods=['POST', 'OPTIONS'])
def add_vendor():
    if request.method == 'OPTIONS': return make_response('', 200)
    data = request.json
    v_id = data.get('id').lower()
    if Vendor.query.get(v_id):
        return jsonify({"status": "exists"}), 200
    new_v = Vendor(id=v_id, name=data.get('name'), phone=data.get('phone'), logo=data.get('logo', ''))
    db.session.add(new_v)
    db.session.commit()
    return jsonify({"status": "success"}), 201

@app.route('/get_products', methods=['GET'])
def get_products():
    v_id = request.args.get('v').lower()
    vendor = Vendor.query.get(v_id)
    if not vendor: return jsonify({"status": "error"}), 404
    prods = Product.query.filter_by(vendor=v_id).all()
    return jsonify({
        "status": "success",
        "vendor_name": vendor.name,
        "products": [{"id": p.id, "name": p.name, "price": p.price, "img1": p.img1} for p in prods]
    })

@app.route('/add_product_full', methods=['POST', 'OPTIONS'])
def add_product():
    if request.method == 'OPTIONS': return make_response('', 200)
    data = request.json
    p_id = str(uuid.uuid4())[:8]
    new_p = Product(id=p_id, vendor=data['vendor'], name=data['name'], price=data['price'], desc=data.get('desc',''), img1=data.get('img1',''))
    db.session.add(new_p)
    db.session.commit()
    return jsonify({"status": "success", "id": p_id})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
