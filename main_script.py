import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# DATABASE - Hii ndio inafanya mfumo ukukumbuke
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_pro_v4.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Lexon SaaS Engine Pro Online"

@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.json
    s_id = data.get('id').lower()
    merchant = Merchant.query.get(s_id)
    if not merchant:
        merchant = Merchant(id=s_id, name=data.get('name', s_id))
        db.session.add(merchant)
        db.session.commit()
    return jsonify({"status": "success", "name": merchant.name})

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.json
        new_p = Product(merchant_id=data['id'], name=data['name'], price=data['price'])
        db.session.add(new_p)
        db.session.commit()
        return jsonify({"status": "success"})
    
    s_id = request.args.get('v').lower()
    items = Product.query.filter_by(merchant_id=s_id).all()
    return jsonify([{"name": i.name, "price": i.price} for i in items])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
