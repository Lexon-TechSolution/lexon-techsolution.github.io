import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Set up environment variables
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')


SENDER_EMAIL = 'saidimohamedisaidi7@gmail.com'  
RECEIVER_EMAIL = 'saidiifm@gmail.com' # 

# --- FUNCTION TO SEND EMAIL ---
def send_test_email(receiver_email):
    """
    Inatuma email ya kujaribia kwa kutumia SendGrid API.
    """
    if not SENDGRID_API_KEY:
        print("KOSA: SENDGRID_API_KEY haijapatikana kwenye faili la .env. Tafadhali rejesha Hatua ya 5A.")
        return

    # Ujumbe wa Email
    message = Mail(
        from_email=SENDER_EMAIL,
        to_emails=receiver_email,
        subject='Jaribio: Muunganisho wa Mfumo wa Email wa LEXON',
        html_content='<strong>Hongera!</strong> Huu ni ujumbe wa jaribio. Inamaanisha SendGrid na code yako vimeunganishwa kikamilifu. Uko tayari kwa uzinduzi!'
    )

    try:
        # Inatuma email
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        # Inathibitisha kama imetumwa
        print("--- MATOKEO YA SENDGRID ---")
        print(f"STATUS CODE: {response.status_code}")
        print(f"JIBU LA SERVER: {response.body}")
        
        if response.status_code == 202:
            print(f"\nFANIKIO: Email ya jaribio imetumwa kwa {receiver_email}. Tafadhali angalia SPAM/Inbox.")
        else:
             print(f"\nKUSHINDWA: Email haikutumwa. Angalia status code na logi ya SendGrid.")

    except Exception as e:
        print(f"\nKOSA LA JUMLA: Kuna hitilafu kwenye muunganisho wa SendGrid. {e}")

# --- RUN TEST ---
if __name__ == '__main__':
    # MUHIMU: Badilisha email hizi mbili na email yako ya kutuma na kupokea
    print(f"Inajaribu kutuma email kutoka {SENDER_EMAIL} kwenda {RECEIVER_EMAIL}...")
    send_test_email(RECEIVER_EMAIL)
