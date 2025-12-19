from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid

app = Flask(__name__)

# --- FIX KUBWA YA CORS (Nguvu ya ziada) ---
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_hub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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

@app.route('/')
def home():
    return "Server is Live!"

@app.route('/add_product_full', methods=['POST', 'OPTIONS'])
def add_product():
    if request.method == 'OPTIONS':
        return make_response('', 200)
    
    data = request.json
    p_id = str(uuid.uuid4())[:8]
    new_p = Product(
        id=p_id, 
        vendor=data.get('vendor'), 
        name=data.get('name'), 
        price=data.get('price'), 
        desc=data.get('desc', ''),
        img1=""
    )
    db.session.add(new_p)
    db.session.commit()
    return jsonify({"status": "success", "id": p_id})

@app.route('/get_products', methods=['GET'])
def get_products():
    v_id = request.args.get('v')
    prods = Product.query.filter_by(vendor=v_id).all()
    # Tunarudisha data kidogo tu kwa ajili ya test
    return jsonify({
        "status": "success",
        "vendor_name": "Duka Moja",
        "products": [{"id": p.id, "name": p.name, "price": p.price} for p in prods]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
