import os
import pg8000.native
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import time
from flask import Flask
import threading

# --- WEB SERVER KWA AJILI YA KOYEB HEALTH CHECK ---
app = Flask(__name__)

@app.route('/')
def home():
    return "Lexon Multi-Vendor Engine is Online!"

def run_web_server():
    app.run(host='0.0.0.0', port=8000)

# --- MIPANGILIO YA DATABASE ---
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASSWORD')
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')

def main_loop():
    print("Injini inakagua Database na kutengeneza Tables...")
    while True:
        try:
            db = pg8000.native.Connection(
                user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432
            )
            
            # 1. Tengeneza Table ya Wauzaji (Vendors)
            db.run("""
                CREATE TABLE IF NOT EXISTS vendors (
                    vendor_id TEXT PRIMARY KEY,
                    business_name TEXT,
                    whatsapp_number TEXT,
                    email TEXT
                );
            """)

            # 2. Tengeneza Table ya Bidhaa (Products)
            db.run("""
                CREATE TABLE IF NOT EXISTS products (
                    id SERIAL PRIMARY KEY,
                    vendor_id TEXT REFERENCES vendors(vendor_id),
                    product_name TEXT,
                    price DECIMAL,
                    image_url TEXT
                );
            """)

            # 3. Weka mteja wako wa kwanza wa majaribio (Nguo)
            db.run("""
                INSERT INTO vendors (vendor_id, business_name, whatsapp_number)
                VALUES ('nguo_store', 'Lexon Fashion Juju', '255712345678')
                ON CONFLICT (vendor_id) DO NOTHING;
            """)

            print("Database ipo tayari na Tables zimeundwa!")
            
            # 4. Hapa ndipo injini inasoma kama kuna barua pepe za kutuma
            # (Inategemea kama una table ya 'customers')
            try:
                rows = db.run("SELECT email, name FROM customers WHERE email_sent = FALSE LIMIT 5")
                # ... (Kodi ya kutuma email inaweza kuendelea hapa kama kawaida)
            except:
                print("Table ya 'customers' haijaonekana bado, tunasubiri...")

            db.close()
        except Exception as e:
            print(f"Kosa la Database: {e}")
            
        print("Nasubiri dakika 5 kabla ya kukagua tena...")
        time.sleep(300)

if __name__ == "__main__":
    # Washa Flask background
    threading.Thread(target=run_web_server, daemon=True).start()
    # Washa Injini ya Database
    main_loop()
