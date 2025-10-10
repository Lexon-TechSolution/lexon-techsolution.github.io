import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime
import os

# 1. Taja Majina Yako
# Jina la faili la ufunguo wa JSON ulilopakua
SERVICE_ACCOUNT_FILE = 'credentials.json' 
# Jina la Spreadsheet yako (lazima liwe sahihi)
SPREADSHEET_NAME = 'LEXON Email Subscribers Database' 
# Jina la Sheet ya kwanza (Sheet 1)
WORKSHEET_NAME = 'Sheet1' 

def setup_sheet_client():
    """Huanzisha muunganisho wa gspread."""
    try:
        # Aina ya ruhusa tunazoomba (Drive na Sheets)
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        
        # Inatumia faili la JSON kwa ajili ya uthibitisho (authentication)
        creds = ServiceAccountCredentials.from_json_keyfile_name(SERVICE_ACCOUNT_FILE, scope)
        client = gspread.authorize(creds)
        
        # Inafungua Spreadsheet kwa jina
        spreadsheet = client.open(SPREADSHEET_NAME)
        worksheet = spreadsheet.worksheet(WORKSHEET_NAME)
        
        return worksheet
    except FileNotFoundError:
        print(f"KOSA: File la '{SERVICE_ACCOUNT_FILE}' halikupatikana. Hakikisha liko kwenye folder hili.")
        return None
    except Exception as e:
        print(f"KOSA la Google Sheets: {e}")
        return None


def add_subscriber(email: str, jina: str = 'Mgeni'):
    """
    Inaandika email mpya kwenye Sheet ya Wateja.
    Inarudisha True kama imefanikiwa, False kama kuna kosa.
    """
    worksheet = setup_sheet_client()
    if worksheet is None:
        return False

    try:
        tarehe_leo = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Data ya kuingiza (katika mfumo wa orodha)
        new_row = [email, jina, tarehe_leo]
        
        # Inatumia append_row kuongeza data mwishoni mwa Sheet
        worksheet.append_row(new_row)
        
        print(f"FANIKIO: Email '{email}' imeongezwa kwenye Sheet.")
        return True
    except Exception as e:
        print(f"KOSA wakati wa kuandika kwenye Sheet: {e}")
        return False


# Mfumo wa kujaribu:
if __name__ == '__main__':
    # Jaribu kuongeza email bandia (TEST)
    test_email = f"test_user_{datetime.now().timestamp()}@lexon.com"
    test_name = "Juma Lexon"
    
    if add_subscriber(test_email, test_name):
        print("Tafadhali angalia Google Sheet yako ili kuona rekodi mpya.")
    else:
        print("Kujaribu kuandika kwenye Sheet KUSHINDWA.")