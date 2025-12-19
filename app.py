from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid

app = Flask(__name__)

# --- FIX YA CORS IMEONGEZWA HAPA ---
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_hub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Kuongeza uwezo wa kupokea data kubwa
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024 

db = SQLAlchemy(app)

# Models (Hizi zinabaki vilevile)
class Vendor(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    logo = db.Column(db.Text)
    products = db.relationship('Product', backref='vendor_ref', lazy=True)

class Product(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    vendor = db.Column(db.String(50), db.ForeignKey('vendor.id'))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    desc = db.Column(db.Text)
    img1 = db.Column(db.Text)
    img2 = db.Column(db.Text)
    img3 = db.Column(db.Text)

with app.app_context():
    db.create_all()

# --- HANDLE OPTIONS REQUESTS (Muhimu kwa CORS) ---
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = jsonify({"status": "ok"})
        res.headers.add("Access-Control-Allow-Origin", "*")
        res.headers.add("Access-Control-Allow-Headers", "*")
        res.headers.add("Access-Control-Allow-Methods", "*")
        return res

@app.route('/')
def home():
    return jsonify({"status": "success", "message": "Backend Connected Successfully"})

@app.route('/add_vendor_full', methods=['POST'])
def add_vendor():
    data = request.json
    if Vendor.query.get(data['id']):
        return jsonify({"status": "error", "message": "ID Exists"}), 400
    new_v = Vendor(id=data['id'], name=data['name'], phone=data['phone'], logo=data.get('logo'))
    db.session.add(new_v)
    db.session.commit()
    return jsonify({"status": "success"})

@app.route('/add_product_full', methods=['POST'])
def add_product():
    data = request.json
    p_id = str(uuid.uuid4())[:8]
    new_p = Product(id=p_id, vendor=data['vendor'], name=data['name'], price=data['price'], desc=data.get('desc',''))
    db.session.add(new_p)
    db.session.commit()
    return jsonify({"status": "success", "id": p_id})

@app.route('/update_product_image', methods=['POST'])
def update_image():
    data = request.json
    product = Product.query.get(data['id'])
    if not product: return jsonify({"status": "error"}), 404
    field = data['field']
    if field == 'img1': product.img1 = data['image']
    elif field == 'img2': product.img2 = data['image']
    elif field == 'img3': product.img3 = data['image']
    db.session.commit()
    return jsonify({"status": "success"})

@app.route('/get_products', methods=['GET'])
def get_products():
    v_id = request.args.get('v')
    vendor = Vendor.query.get(v_id)
    if not vendor: return jsonify({"status": "error"}), 404
    prods = Product.query.filter_by(vendor=v_id).all()
    return jsonify({
        "status": "success", "vendor_name": vendor.name,
        "vendor_logo": vendor.logo,
        "products": [{"id":p.id,"name":p.name,"price":p.price,"img1":p.img1} for p in prods]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
