import os
import pg8000.native
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import time

app = Flask(__name__)
CORS(app)

# MIPANGILIO YA DATABASE (Inatoka Koyeb Environment Variables)
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASSWORD')

def get_db_conn():
    return pg8000.native.Connection(user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432)

@app.route('/')
def home():
    return "Lexon Multi-Vendor Engine is Online!"

# --- API YA KUSAJILI DUKA (HAPA NDIPO MLIKWAMA) ---
@app.route('/add_vendor_full', methods=['POST'])
def add_vendor_full():
    try:
        data = request.json
        db = get_db_conn()
        db.run("""
            INSERT INTO vendors (vendor_id, business_name, whatsapp_number, logo_url) 
            VALUES (:id, :n, :p, :l) 
            ON CONFLICT (vendor_id) DO UPDATE SET business_name = :n, whatsapp_number = :p, logo_url = :l
        """, id=data['id'], n=data['name'], p=data['phone'], l=data['logo'])
        db.close()
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_vendor', methods=['GET'])
def get_vendor():
    try:
        vid = request.args.get('id')
        db = get_db_conn()
        row = db.run("SELECT business_name, whatsapp_number, logo_url FROM vendors WHERE vendor_id = :id", id=vid)
        db.close()
        if row:
            return jsonify({"business_name": row[0][0], "whatsapp_number": row[0][1], "logo_url": row[0][2]})
        return jsonify({"error": "Vendor not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- API ZA BIDHAA ---
@app.route('/add_product_full', methods=['POST'])
def add_product_full():
    try:
        data = request.json
        db = get_db_conn()
        db.run("""
            INSERT INTO products (vendor_id, product_name, price, description, img1, img2, img3, in_stock) 
            VALUES (:vid, :n, :pr, :desc, :i1, :i2, :i3, TRUE)
        """, vid=data['vendor'], n=data['name'], pr=data['price'], desc=data['desc'], i1=data['img1'], i2=data['img2'], i3=data['img3'])
        db.close()
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_products', methods=['GET'])
def get_products():
    try:
        vid = request.args.get('vendor_id')
        db = get_db_conn()
        rows = db.run("SELECT id, product_name, price, description, img1, img2, img3, in_stock FROM products WHERE vendor_id = :id ORDER BY id DESC", id=vid)
        db.close()
        return jsonify([{"id": r[0], "product_name": r[1], "price": float(r[2]), "description": r[3], "img1": r[4], "img2": r[5], "img3": r[6], "in_stock": r[7]} for r in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_stats', methods=['GET'])
def get_stats():
    try:
        db = get_db_conn()
        count = db.run("SELECT COUNT(*) FROM products")[0][0]
        total = db.run("SELECT SUM(price) FROM products")[0][0] or 0
        db.close()
        return jsonify({"total_items": count, "total_value": float(total)})
    except:
        return jsonify({"total_items": 0, "total_value": 0})

def setup_db():
    try:
        db = get_db_conn()
        db.run("CREATE TABLE IF NOT EXISTS vendors (vendor_id TEXT PRIMARY KEY, business_name TEXT, whatsapp_number TEXT, logo_url TEXT);")
        db.run("CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, vendor_id TEXT REFERENCES vendors(vendor_id), product_name TEXT, price DECIMAL, description TEXT, img1 TEXT, img2 TEXT, img3 TEXT, in_stock BOOLEAN DEFAULT TRUE);")
        db.close()
        print("Database Tables: OK")
    except Exception as e:
        print(f"DB Setup Error: {e}")

if __name__ == "__main__":
    setup_db()
    app.run(host='0.0.0.0', port=8000)
