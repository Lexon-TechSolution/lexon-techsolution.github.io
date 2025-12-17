# main_script.py - INAENDESHA LEXON SMART-TRIGGER KWA KUTUMIA SQL

import os
import time
from dotenv import load_dotenv

# Hii inatumwa kwa ajili ya Email (Tunaacha kwa backup)
from email_sender import send_welcome_email

# HII inachukua nafasi ya sheet_manager na kuleta Inventory/Loans Logic
from sql_manager import get_product_menu, record_client_identity 

load_dotenv()

# --- MFUMO WA KUENDESHA (Msimamo wa sasa) ---
if __name__ == "__main__":
    print("LEXON SMART-TRIGGER / WHATSAPP STORE INAANZA...")
    
    # Huu ni mfano tu wa jinsi ya kutumia functions mpya:

    # 1. MFUMO WA WHATSAPP STORE (Inaonyesha bidhaa)
    print("\n--- INVENTORY TEST ---")
    product_list = get_product_menu()
    if product_list:
        print("Orodha ya Bidhaa Kutoka SQL (WhatsApp Menu):")
        for item in product_list:
            print(f"- {item}")
    else:
        print("KOSA: Imeshindwa kuonyesha Inventory. Angalia connection ya SQL.")

    # 2. MFUMO WA MICROFINANCE (Kuhifadhi Taarifa za Utambulisho)
    print("\n--- CLIENT REGISTRATION TEST ---")
    test_client = {
        "full_name": "Lexon Mtumiaji",
        "national_id": "19901010-00000-00000",
        "address": "Kinondoni, DSM",
        "max_loan": 500000.00
    }
    
    success = record_client_identity(
        test_client["full_name"],
        test_client["national_id"],
        test_client["address"],
        test_client["max_loan"]
    )
    
    if success:
        print("FANIKIO: Data ya Utambulisho imeandikwa kwenye SQL.")
        
        # 3. SMART TRIGGER: Tuma Email ya Confirmation (Kama ilivyokuwa mwanzo)
        test_email = "test@example.com" # Badilisha na Email Halisi
        send_welcome_email(test_email, test_client["full_name"])
        print(f"FANIKIO: Email ya welcome imetumiwa kwa {test_email}")
        
    else:
        print("KOSA: Imeshindwa kuandika data kwenye SQL. HAKUNA Smart-Trigger iliyotokea.")
    
    print("\nLEXON SYSTEM: Kazi ya kwanza imekamilika. Unahitaji kuunganisha SQL server na WhatsApp API sasa.")
