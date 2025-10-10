import os
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

# **1. IMPORT MUHIMU:** Tunatumia function ya add_subscriber kutoka kwenye sheet_manager.py
from sheet_manager import add_subscriber 

# 2. Configuration (Load environment variables & Sender)
load_dotenv()
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
SENDER_EMAIL = 'saidimohamedisaidi7@gmail.com' # Email yako iliyothibitishwa na SendGrid

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
        <p>Kuanzia sasa, tutakutumia habari za karibuni na fursa za kujifunza kuhusu miradi ya code na biashara za kidijitali.</p>
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
        
        if response.status_code == 202:
            print(f"FANIKIO LA EMAIL: Welcome Email imetumwa kwa {recipient_email}. ✅")
            return True
        else:
            print(f"KUSHINDWA KUTUMA EMAIL: Status Code {response.status_code}")
            return False

    except Exception as e:
        print(f"KOSA LA MUUNGANISHO WA SENDGRID: {e}")
        return False

# --- 4. MAIN LOGIC (Kuunganisha Sheet na Email) ---
def process_new_subscriber(email: str, name: str):
    """Inahifadhi data kwenye Google Sheet kisha inatuma Welcome Email."""
    
    print(f"\n--- INAANZA KAZI kwa: {email} ---")
    
    # Hatua ya 1: Hifadhi kwenye Google Sheet
    if add_subscriber(email, name):
        print("Hatua ya 1: Kuhifadhi data kwenye Sheet IMESHINDA. ")
        
        # Hatua ya 2: Tuma Welcome Email
        if send_welcome_email(email, name):
            print("Hatua ya 2: Kutuma Welcome Email IMESHINDA. ")
            print(f"\nMFUMO MZIMA KWA {name} UMEKAMILIKA KWA MAFANIKIO! 🥳")
            return True
        else:
            print("MFUMO ULISHINDWA KUKAMILIKA: Email haikutumwa.")
            return False
    else:
        print("MFUMO ULISHINDWA KUKAMILIKA: Data haikuhifadhiwa.")
        return False

# --- 5. RUN TEST ---
if __name__ == '__main__':
    # >>>>>>>>>>>>>>>>>> WEKA DATA MPYA HAPA <<<<<<<<<<<<<<<<<<<<
    # Email unayotaka kuingiza kwenye sheet na kumtumia email ya jaribio
    client_email = "saidiifm@gmail.com" 
    client_name = "Saidi Lexson" 
    
    process_new_subscriber(client_email, client_name)
