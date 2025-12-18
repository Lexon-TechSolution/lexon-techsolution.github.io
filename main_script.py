import os
import pg8000.native
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading

# --- WEB SERVER NA API (MACHO YA MFUMO) ---
app = Flask(__name__)
CORS(app)  # Hii inaruhusu admin.html kuongea na Koyeb bila kuzuiliwa

# MIPANGILIO YA DATABASE (Inatoka kwenye Environment Variables)
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASSWORD')
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')

@app.route('/')
def home():
    return "Lexon Multi-Vendor Engine is Online!"

# 1. API ya Kusajili Duka Jipya (Vendor)
@app.route('/add_vendor', methods=['POST'])
def add_vendor():
    try:
        data = request.json
        db = pg8000.native.Connection(user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432)
        db.run("""
            INSERT INTO vendors (vendor_id, business_name, whatsapp_number) 
            VALUES (:id, :n, :p) 
            ON CONFLICT (vendor_id) DO UPDATE SET business_name = :n, whatsapp_number = :p
        """, id=data['id'], n=data['name'], p=data['phone'])
        db.close()
        return jsonify({"status": "success", "message": "Duka limesajiliwa!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 2. API ya Kuongeza Bidhaa
@app.route('/add_product', methods=['POST'])
def add_product():
    try:
        data = request.json
        db = pg8000.native.Connection(user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432)
        db.run("""
            INSERT INTO products (vendor_id, product_name, price, image_url) 
            VALUES (:vid, :n, :pr, :img)
        """, vid=data['vendor'], n=data['name'], pr=data['price'], img=data['img'])
        db.close()
        return jsonify({"status": "success", "message": "Bidhaa imeongezwa!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def run_web_server():
    app.run(host='0.0.0.0', port=8000)

# --- INJINI YA NYUMA (BACKEND LOOP) ---
def main_loop():
    print("Injini inakagua Database na kutengeneza Tables...")
    while True:
        try:
            db = pg8000.native.Connection(
                user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432
            )
            
            # Hakikisha Tables zipo
            db.run("CREATE TABLE IF NOT EXISTS vendors (vendor_id TEXT PRIMARY KEY, business_name TEXT, whatsapp_number TEXT, email TEXT);")
            db.run("CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, vendor_id TEXT REFERENCES vendors(vendor_id), product_name TEXT, price DECIMAL, image_url TEXT);")
            
            print("Database ipo tayari!")
            db.close()
        except Exception as e:
            print(f"Kosa la Database kwenye Loop: {e}")
            
        time.sleep(300)

if __name__ == "__main__":
    # Washa kila kitu kwa mpigo
    threading.Thread(target=run_web_server, daemon=True).start()
    main_loop()
