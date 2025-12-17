# email_sender.py - INATUMIA SENDGRID KUTUMA UJUMBE

import os
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

# **1. HAKUNA IMPORT INAHITAJIKA HAPA TENA (Logic ya add_subscriber ipo kwenye sql_manager)**

# 2. Configuration (Load environment variables & Sender)
load_dotenv()
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
# Kumbuka: Hii inapaswa kubadilishwa na domain yako (mfano: info@lexontech.com)
SENDER_EMAIL = 'saidimohamedisaidi7@gmail.com' 

# --- 3. SENDGRID FUNCTION ---
def send_welcome_email(recipient_email, recipient_name):
    """Inatuma email ya kukaribisha (Welcome Email) kwa kutumia SendGrid."""
    if not SENDGRID_API_KEY:
        print("KOSA: SENDGRID_API_KEY haijapatikana.")
        return False

    subject = f"Karibu, {recipient_name}! Mafunzo ya Teknolojia ya LEXON"

    # Hiki ndicho kitakachoonekana kwenye email (HTML)
    html_content = f"""
    <html>
    <body>
        <h2>Hongera, {recipient_name}!</h2>
        <p>Tunakukaribisha rasmi kwenye orodha LEXON TECH SOLUTION.</p>
        <p>Kuanzia sasa, tutakutumia habari za karibuni na fursa za kujifunza kuhusu miradi ya code na teknolojia.</p>
        <p>Asante kwa kujiunga nasi!</p>
        <br>
        <p>Salamu,</p>
        <p>Timu ya LEXON TECH SOLUTION</p>
    </body>
    </html>
    """

    message = Mail(
        from_email=SENDER_EMAIL,
        to_emails=recipient_email,
        subject=subject,
        html_content=html_content
    )

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"EMAIL FANIKIO: Email imetumiwa kwa {recipient_email}. Status Code: {response.status_code}")
        return True
    except Exception as e:
        print(f"EMAIL KOSA: Imeshindwa kutuma email: {e}")
        return False
