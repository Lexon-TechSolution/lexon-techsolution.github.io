import os
import sqlite3
import requests
import base64
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = "lexon_erp.db"

# --- NEXTSMS CONFIG ---
NEXTSMS_USER = "lexon_tech" # Weka Username yako ya NextSMS
NEXTSMS_PASS = "Yako_Hapa"   # Weka Password yako ya NextSMS
NEXTSMS_SENDER = "SMART_SMS" # Au Sender ID yako iliyopitishwa

def send_nextsms(phone, message):
    url = "https://messaging-service.co.tz/api/sms/v1/test/single" # Badili kuwa /v1/send/single ukiingia live
    auth_str = f"{NEXTSMS_USER}:{NEXTSMS_PASS}"
    encoded_auth = base64.b64encode(auth_str.encode()).decode()
    
    headers = {
        'Authorization': f'Basic {encoded_auth}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    payload = {
        "from": NEXTSMS_SENDER,
        "to": phone,
        "text": message
    }
    try:
        requests.post(url, json=payload, headers=headers)
    except Exception as e:
        print(f"SMS Error: {e}")

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, name TEXT, email TEXT, phone TEXT, date TEXT, status TEXT DEFAULT "active")')
    cursor.execute('CREATE TABLE IF NOT EXISTS finance (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, donor_name TEXT, amount REAL, description TEXT, date TEXT, status TEXT DEFAULT "active")')
    cursor.execute('CREATE TABLE IF NOT EXISTS miracles (id INTEGER PRIMARY KEY AUTOINCREMENT, member_name TEXT, testimony TEXT, date TEXT, status TEXT DEFAULT "active")')
    cursor.execute('CREATE TABLE IF NOT EXISTS sermons (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, scripture TEXT, content TEXT, date TEXT, status TEXT DEFAULT "active")')
    cursor.execute('CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, office_name TEXT, password TEXT, logo_url TEXT)')
    cursor.execute("INSERT OR IGNORE INTO settings (id, office_name, password) VALUES (1, 'LEXON TECH SOLUTION', 'admin123')")
    conn.commit()
    conn.close()

init_db()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO members (category, name, email, phone, date) VALUES (?, ?, ?, ?, ?)',
                   (data['category'], data['name'], data['email'], data['whatsapp'], datetime.now().strftime("%d/%m/%Y")))
    conn.commit()
    conn.close()
    
    # NextSMS Trigger
    msg = f"SHALOM {data['name']}! Usajili wako LEXON TECH umekamilika. Karibu."
    send_nextsms(data['whatsapp'], msg)
    
    return jsonify({"status": "success"}), 200

# API zingine (Finance, Miracles, Sermons, etc.) zinaendelea kama kawaida...
@app.route('/api/data/all', methods=['GET'])
def get_data():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    res = {
        "members": [dict(r) for r in conn.execute('SELECT * FROM members WHERE status="active"').fetchall()],
        "finance": [dict(r) for r in conn.execute('SELECT * FROM finance WHERE status="active"').fetchall()],
        "miracles": [dict(r) for r in conn.execute('SELECT * FROM miracles WHERE status="active"').fetchall()],
        "sermons": [dict(r) for r in conn.execute('SELECT * SELECT * FROM sermons WHERE status="active"').fetchall()],
        "settings": dict(conn.execute('SELECT * FROM settings WHERE id=1').fetchone())
    }
    conn.close()
    return jsonify(res)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
