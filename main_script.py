import os
import sqlite3
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- DATABASE SETUP (SQLite) ---
DB_NAME = "ggc_master.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            name TEXT,
            email TEXT,
            phone TEXT,
            reg_date TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- INFOBIP CONFIG ---
INFOBIP_API_KEY = "c2d7220f305487d6f7344c934d3740fc-4890475b-a39d-48dd-8588-9247da27b3ae"
INFOBIP_URL = "https://qw36gr.api.infobip.com/sms/2/text/advanced"

@app.route('/', methods=['GET'])
def health():
    return "GGC ENGINE v105 MASTER: RUNNING ✅", 200

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS': return make_response()
    
    data = request.json
    name = data.get('name')
    category = data.get('category')
    email = data.get('email')
    phone = data.get('whatsapp')
    date = datetime.now().strftime("%d/%m/%Y %H:%M")

    # Hifadhi kwenye SQLite
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO members (category, name, email, phone, reg_date) VALUES (?, ?, ?, ?, ?)',
                   (category, name, email, phone, date))
    conn.commit()
    conn.close()

    # SMS Logic kupitia Infobip
    try:
        clean_phone = ''.join(filter(str.isdigit, str(phone)))
        if clean_phone.startswith("0"): clean_phone = "255" + clean_phone[1:]
        
        payload = {
            "messages": [{
                "destinations": [{"to": clean_phone}],
                "from": "GGC_FAMILY",
                "text": f"SHALOM {name}! Usajili wako GGC FAMILY umekamilika. Karibu."
            }]
        }
        requests.post(INFOBIP_URL, json=payload, headers={"Authorization": f"App {INFOBIP_API_KEY}"}, timeout=5)
    except:
        pass

    return jsonify({"status": "success"}), 200

@app.route('/api/admin/all', methods=['GET'])
def get_all():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM members ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    
    return jsonify([dict(row) for row in rows])

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
