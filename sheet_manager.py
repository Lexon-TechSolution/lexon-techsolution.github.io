# Kwanza kabisa, hakikisha mistari hii ipo juu ya faili
import os
from datetime import datetime
import gspread 
from dotenv import load_dotenv

load_dotenv()

# Anwani ya service account (Credentials.json)
SERVICE_ACCOUNT_FILE = 'credentials.json'

def setup_sheet_client():
    """Inarudisha client wa Google Sheet baada ya authentication."""
    try:
        client = gspread.service_account(filename=SERVICE_ACCOUNT_FILE)
        
        # BADILISHA JINA LA SHEET HAPA NA JINA ULILOLITUMIA MWANZO
        sheet = client.open("Google Sheets Automation") 
        
        # Chagua Worksheet ya kwanza (Sheet 1)
        return sheet.get_worksheet(0)
    except Exception as e:
        print(f"KOSA (Setup): Imeshindwa kuunganisha na Google Sheet: {e}")
        return None

# Kisha function ya Smart-Trigger inafuata hapa:
def add_subscriber(email: str, jina: str = 'Mgeni'):
    """
    Inaandika email mpya kwenye Sheet ya Wateja.
    Inatumia Smart-Trigger Logic: Validation na Duplicate Check.
    """
    worksheet = setup_sheet_client()
    if worksheet is None:
        return False

    try:
        # 1. DATA VALIDATION: Kwanza, angalia muundo wa email ni sahihi
        if "@" not in email or "." not in email:
            print(f"KOSA (Validation): Muundo wa email '{email}' si sahihi. Haikupitishwa.")
            return False

        # 2. DUPLICATE CHECK: Angalia kama email tayari ipo
        existing_emails = worksheet.col_values(1)
        if email in existing_emails:
            print(f"ONYO (Duplicate Check): Email '{email}' tayari ipo. Haikuongezwa tena.")
            return True 

        # Ikiwa email ni mpya na sahihi, ndipo tunaendelea na kuandika:
        tarehe_leo = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Data ya kuingiza
        new_row = [email, jina, tarehe_leo]
        
        # Inatumia append_row kuongeza data mwishoni mwa Sheet
        worksheet.append_row(new_row)
        
        print(f"FANIKIO: Email '{email}' imeongezwa kwenye Sheet. Iko tayari kwa 'trigger' ya email.")
        return True
    except Exception as e:
        print(f"KOSA wakati wa kuandika kwenye Sheet: {e}")
        return False
