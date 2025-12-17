import os
import psycopg2
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import time

# 1. Mipangilio ya Database kutoka kwenye Environment Variables
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASSWORD')
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')

def send_email(to_email, customer_name):
    message = Mail(
        from_email='info@lexon.co.tz',  # Badilisha iwe email yako iliyothibitishwa SendGrid
        to_emails=to_email,
        subject='Lexon Tech Solution - Karibu!',
        plain_text_content=f'Habari {customer_name},\n\nAsante kwa kuchagua Lexon Tech Solution. Tunafurahi kukusaidia kwenye safari yako ya kiteknolojia.'
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Email imetumwa kwa {customer_name} ({to_email})")
    except Exception as e:
        print(f"Kosa la SendGrid: {e}")

def main():
    print("Mfumo umeanza kufanya kazi...")
    while True:
        try:
            # Unganisha na Database
            conn = psycopg2.connect(
                host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS
            )
            cur = conn.cursor()
            
            # Tafuta wateja ambao hawajatumiwa email (Mfano wa kodi)
            cur.execute("SELECT email, name FROM customers WHERE email_sent = FALSE LIMIT 5")
            rows = cur.fetchall()
            
            for row in rows:
                email, name = row
                send_email(email, name)
                # Update database kuwa email imetumwa
                cur.execute("UPDATE customers SET email_sent = TRUE WHERE email = %s", (email,))
            
            conn.commit()
            cur.close()
            conn.close()
            
        except Exception as e:
            print(f"Kosa la Database: {e}")
            
        print("Nasubiri dakika 5 kabla ya kuangalia tena...")
        time.sleep(300)  # Inasubiri sekunde 300 (dakika 5)

if __name__ == "__main__":
    main()
