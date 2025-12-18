import os
import pg8000.native
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import time
from flask import Flask
import threading

# --- SEHEMU YA WEB SERVER KWA AJILI YA KOYEB ---
app = Flask(__name__)

@app.route('/')
def home():
    return "Lexon Automation Engine is Running!"

def run_web_server():
    # Koyeb inahitaji port 8000 ili isizime
    app.run(host='0.0.0.0', port=8000)

# --- SEHEMU YA MAZINGIRA (CONFIG) ---
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASSWORD')
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')

def send_email(to_email, customer_name):
    message = Mail(
        from_email='info@lexon.co.tz', 
        to_emails=to_email,
        subject='Lexon Tech Solution - Karibu!',
        plain_text_content=f'Habari {customer_name},\n\nAsante kwa kuchagua Lexon Tech Solution.'
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
        print(f"Email imetumwa kwa {customer_name}")
    except Exception as e:
        print(f"Kosa la SendGrid: {e}")

def main_loop():
    print("Injini ya automation imeanza...")
    while True:
        try:
            db = pg8000.native.Connection(
                user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432
            )
            rows = db.run("SELECT email, name FROM customers WHERE email_sent = FALSE LIMIT 5")
            
            for row in rows:
                email, name = row
                send_email(email, name)
                db.run("UPDATE customers SET email_sent = TRUE WHERE email = :em", em=email)
            
            db.close()
        except Exception as e:
            print(f"Kosa la Database: {e}")
            
        print("Nasubiri dakika 5...")
        time.sleep(300)

if __name__ == "__main__":
    # Washa Web Server upande mmoja (Background)
    threading.Thread(target=run_web_server, daemon=True).start()
    # Washa Injini ya barua pepe upande wa pili
    main_loop()
