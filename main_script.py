import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_pro_v8.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20))
    logo = db.Column(db.String(500))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    desc = db.Column(db.Text)
    img1 = db.Column(db.String(500))
    is_sold_out = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.json
    s_id = data.get('id').lower()
    m = Merchant.query.get(s_id)
    if not m:
        m = Merchant(id=s_id, name=data.get('name', s_id), whatsapp=data.get('whatsapp', '255'), logo="")
        db.session.add(m)
        db.session.commit()
    return jsonify({"id": m.id, "name": m.name, "whatsapp": m.whatsapp, "logo": m.logo})

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.json
        new_p = Product(merchant_id=data['id'], name=data['name'], price=data['price'], desc=data.get('desc',''), img1=data.get('img1'))
        db.session.add(new_p)
        db.session.commit()
        return jsonify({"status": "success"})
    
    s_id = request.args.get('v','').lower()
    m = Merchant.query.get(s_id)
    if not m: return jsonify({"error": "Not found"}), 404
    items = Product.query.filter_by(merchant_id=s_id).all()
    return jsonify({
        "vendor": {"name": m.name, "whatsapp": m.whatsapp, "logo": m.logo},
        "products": [{"id": i.id, "name": i.name, "price": i.price, "desc": i.desc, "img": i.img1, "sold": i.is_sold_out} for i in items]
    })

@app.route('/api/products/delete/<int:pid>', methods=['DELETE'])
def delete_p(pid):
    p = Product.query.get(pid)
    if p:
        db.session.delete(p)
        db.session.commit()
    return jsonify({"status": "deleted"})

@app.route('/api/products/soldout/<int:pid>', methods=['POST'])
def sold_p(pid):
    p = Product.query.get(pid)
    if p:
        p.is_sold_out = not p.is_sold_out
        db.session.commit()
    return jsonify({"status": "updated"})

@app.route('/api/profile/update', methods=['POST'])
def update_profile():
    data = request.json
    m = Merchant.query.get(data['id'].lower())
    if m:
        m.name = data.get('name', m.name)
        m.whatsapp = data.get('whatsapp', m.whatsapp)
        m.logo = data.get('logo', m.logo)
        db.session.commit()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
