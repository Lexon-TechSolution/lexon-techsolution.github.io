from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app) # Hii inafungua milango yote

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon.db'
db = SQLAlchemy(app)

class Vendor(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vendor = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"status": "Lexon Engine Online", "port": 8000})

@app.route('/add_vendor_full', methods=['POST'])
def add_v():
    data = request.json
    v_id = data.get('id').lower()
    if not Vendor.query.get(v_id):
        db.session.add(Vendor(id=v_id, name=data.get('name')))
        db.session.commit()
    return jsonify({"status": "success"})

@app.route('/get_products')
def get_p():
    v_id = request.args.get('v').lower()
    v = Vendor.query.get(v_id)
    if not v: return jsonify({"status": "error"}), 404
    p = Product.query.filter_by(vendor=v_id).all()
    return jsonify({"status":"success", "vendor_name": v.name, "products": [{"name":i.name, "price":i.price} for i in p]})

@app.route('/add_product_full', methods=['POST'])
def add_p():
    data = request.json
    db.session.add(Product(vendor=data['vendor'], name=data['name'], price=data['price']))
    db.session.commit()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
