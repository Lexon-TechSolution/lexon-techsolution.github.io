
import os
import pg8000.native
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import time

# Mipangilio kutoka Environment Variables
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

def main():
    print("Mfumo umeanza kwa kutumia pg8000...")
    while True:
        try:
            # Unganisha na Database kwa kutumia pg8000
            db = pg8000.native.Connection(
                user=DB_USER, host=DB_HOST, database=DB_NAME, password=DB_PASS, port=5432
            )
            
            # Tafuta wateja
            rows = db.run("SELECT email, name FROM customers WHERE email_sent = FALSE LIMIT 5")
            
            for row in rows:
                email, name = row
                send_email(email, name)
                db.run("UPDATE customers SET email_sent = TRUE WHERE email = :em", em=email)
            
            db.close()
        except Exception as e:
            print(f"Kosa: {e}")
            
        print("Nasubiri dakika 5...")
        time.sleep(300)

if __name__ == "__main__":
    main()
