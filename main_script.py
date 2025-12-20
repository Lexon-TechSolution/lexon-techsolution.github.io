import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# Tumeongeza maboresho ya CORS hapa ili kuzuia kosa la "Imeshindwa kusoma bidhaa"
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Tunabaki na Database yako v9 kama ulivyoelekeza
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lexon_final_v9.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Merchant(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100))
    whatsapp = db.Column(db.String(20))
    logo = db.Column(db.String(500), default="")

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    merchant_id = db.Column(db.String(50))
    name = db.Column(db.String(100))
    price = db.Column(db.String(50))
    desc = db.Column(db.Text, default="")
    img1 = db.Column(db.String(500))
    is_sold_out = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return jsonify({"status": "Lexon Engine Online", "version": "9.0"}), 200

@app.route('/api/auth', methods=['POST'])
def auth():
    data = request.json
    # .strip() inahakikisha hata mteja akibonyeza "space" kwa bahati mbaya ID inasomeka
    s_id = data.get('id').lower().strip()
    m = Merchant.query.get(s_id)
    if not m:
        m = Merchant(id=s_id, name=data.get('name', s_id), whatsapp="255700000000")
        db.session.add(m)
        db.session.commit()
    return jsonify({"id": m.id, "name": m.name, "whatsapp": m.whatsapp, "logo": m.logo})

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.json
        new_p = Product(
            merchant_id=data['id'].lower().strip(), 
            name=data['name'], 
            price=data['price'], 
            desc=data.get('desc', ''), 
            img1=data.get('img1')
        )
        db.session.add(new_p)
        db.session.commit()
        return jsonify({"status": "success"})
    
    s_id = request.args.get('v', '').lower().strip()
    m = Merchant.query.get(s_id)
    if not m: return jsonify({"error": "Store not found"}), 404
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
    return jsonify({"status": "not found"}), 404

@app.route('/api/products/soldout/<int:pid>', methods=['POST'])
def sold_p(pid):
    p = Product.query.get(pid)
    if p:
        p.is_sold_out = not p.is_sold_out
        db.session.commit()
        return jsonify({"status": "updated", "sold": p.is_sold_out})
    return jsonify({"status": "error"}), 404

@app.route('/api/profile/update', methods=['POST'])
def update_profile():
    data = request.json
    m = Merchant.query.get(data['id'].lower().strip())
    if m:
        if 'name' in data: m.name = data['name']
        if 'whatsapp' in data: m.whatsapp = data['whatsapp']
        if 'logo' in data: m.logo = data['logo']
        db.session.commit()
        return jsonify({"status": "success"})
    return jsonify({"status": "failed"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
