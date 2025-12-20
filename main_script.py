import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# DATABASE SETUP - Inatunza taarifa zote za duka na bidhaa
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_pro_final.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    img1 = db.Column(db.String(500))

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Lexon SaaS Engine Pro is Online"

@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.json
    s_id = data.get('id').lower()
    m = Merchant.query.get(s_id)
    if not m:
        m = Merchant(id=s_id, name=data.get('name', s_id), whatsapp=data.get('whatsapp', '255'))
        db.session.add(m)
        db.session.commit()
    return jsonify({"status": "success", "id": m.id, "name": m.name, "whatsapp": m.whatsapp})

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.json
        new_p = Product(
            merchant_id=data['id'], 
            name=data['name'], 
            price=data['price'], 
            img1=data.get('img1')
        )
        db.session.add(new_p)
        db.session.commit()
        return jsonify({"status": "success"})
    
    s_id = request.args.get('v', '').lower()
    m = Merchant.query.get(s_id)
    if not m: return jsonify({"status": "error", "message": "Duka halipo"}), 404
    items = Product.query.filter_by(merchant_id=s_id).all()
    return jsonify({
        "status": "success", 
        "vendor_name": m.name, 
        "whatsapp": m.whatsapp,
        "products": [{"name": i.name, "price": i.price, "img1": i.img1} for i in items]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
