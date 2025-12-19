import os
import pg8000.native
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# DATABASE & API KEYS (Zitoke Koyeb Environment Variables)
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASSWORD')
SENDGRID_KEY = os.environ.get('SENDGRID_API_KEY')

def get_db_conn():
    return pg8000.native.Connection(user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# --- AUTOMATION: TUMA RISITI ---
def send_professional_receipt(customer_email, customer_name, cart_items, total, vendor_name):
    items_list = "".join([f"<li>{item['name']} (x{item['qty']}) - Tsh {item['price']}</li>" for item in cart_items])
    content = f"""
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;'>
        <h2 style='color: #2563eb; text-align: center;'>RISITI YA MALIPO - {vendor_name}</h2>
        <p>Habari <b>{customer_name}</b>,</p>
        <p>Agizo lako limepokelewa na linashughulikiwa. Hapa ni mchanganuo wa ununuzi wako:</p>
        <hr style='border: 0; border-top: 1px solid #eee;'>
        <ul style='list-style: none; padding: 0;'>{items_list}</ul>
        <hr style='border: 0; border-top: 1px solid #eee;'>
        <p style='font-size: 18px;'><b>JUMLA KUU: Tsh {total}</b></p>
        <p style='margin-top: 20px; font-size: 12px; color: #666; text-align: center;'>Asante kwa kuchagua Lexon Tech Solutions.</p>
    </div>
    """
    message = Mail(
        from_email='support@lexontech.com', # Hakikisha email hii ume-verify kule SendGrid
        to_emails=customer_email,
        subject=f'Agizo Lako Kutoka {vendor_name}',
        html_content=content
    )
    try:
        sg = SendGridAPIClient(SENDGRID_KEY)
        sg.send(message)
    except Exception as e:
        print(f"SendGrid Error: {e}")

# --- API ROUTES ---
@app.route('/')
def home():
    return jsonify({"status": "Lexon SaaS Engine Pro Online", "version": "3.1"})

@app.route('/add_vendor_full', methods=['POST', 'OPTIONS'])
def add_vendor_full():
    if request.method == 'OPTIONS': return make_response()
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
        if row: return jsonify({"business_name": row[0][0], "whatsapp_number": row[0][1], "logo_url": row[0][2]})
        return jsonify({"error": "Vendor not found"}), 404
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/add_product_full', methods=['POST', 'OPTIONS'])
def add_product_full():
    if request.method == 'OPTIONS': return make_response()
    try:
        data = request.json
        db = get_db_conn()
        db.run("""
            INSERT INTO products (vendor_id, product_name, price, description, img1, img2, img3) 
            VALUES (:vid, :n, :pr, :desc, :i1, :i2, :i3)
        """, vid=data['vendor'], n=data['name'], pr=data['price'], desc=data['desc'], i1=data['img1'], i2=data['img2'], i3=data['img3'])
        db.close()
        return jsonify({"status": "success"}), 200
    except Exception as e: return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_products', methods=['GET'])
def get_products():
    try:
        vid = request.args.get('vendor_id')
        db = get_db_conn()
        rows = db.run("SELECT id, product_name, price, description, img1, img2, img3 FROM products WHERE vendor_id = :id ORDER BY id DESC", id=vid)
        db.close()
        return jsonify([{"id": r[0], "product_name": r[1], "price": float(r[2]), "description": r[3], "img1": r[4], "img2": r[5], "img3": r[6]} for r in rows])
    except Exception as e: return jsonify({"error": str(e)}), 500

@app.route('/process_checkout', methods=['POST', 'OPTIONS'])
def process_checkout():
    if request.method == 'OPTIONS': return make_response()
    try:
        data = request.json
        # Tuma Email kiotomatiki
        send_professional_receipt(data['email'], data['name'], data['cart'], data['total'], data['vendor_name'])
        return jsonify({"status": "success", "message": "Automation: Email sent!"}), 200
    except Exception as e: return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_stats', methods=['GET'])
def get_stats():
    try:
        db = get_db_conn()
        count = db.run("SELECT COUNT(*) FROM products")[0][0]
        total = db.run("SELECT SUM(price) FROM products")[0][0] or 0
        db.close()
        return jsonify({"total_items": count, "total_value": float(total)})
    except: return jsonify({"total_items": 0, "total_value": 0})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
