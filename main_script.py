import os
import psycopg2
from psycopg2.extras import RealDictCursor
import requests
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_URL = "postgresql://postgres:450e4afe47a7443098e20d290192f15d493658495864d273a90cbf4ffea8d6bb@db.htoqqepgfvpodnoxjfzx.supabase.co:5432/postgres"

def get_db_connection():
    return psycopg2.connect(DB_URL)

NEXTSMS_USER = "lexon_tech"
NEXTSMS_PASS = "Saidi1234@."

@app.route('/')
def home(): return "LEXON TECH ERP: ONLINE ✅"

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''CREATE TABLE IF NOT EXISTS members (
            id SERIAL PRIMARY KEY, name TEXT, email TEXT, phone TEXT, category TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);''')
        cur.execute("INSERT INTO members (name, email, phone, category) VALUES (%s, %s, %s, %s)",
                    (data['name'], data['email'], data['whatsapp'], data['category']))
        conn.commit()
        cur.close()
        conn.close()
        
        # NextSMS Automation
        auth_str = base64.b64encode(f"{NEXTSMS_USER}:{NEXTSMS_PASS}".encode()).decode()
        clean_phone = data['whatsapp'].strip()
        if clean_phone.startswith('0'): clean_phone = '255' + clean_phone[1:]
        requests.post("https://messaging-service.co.tz/api/sms/v1/send/single", 
                      json={"from": "SMART_SMS", "to": clean_phone, "text": f"Habari {data['name']}, karibu Lexon Tech!"},
                      headers={'Authorization': f'Basic {auth_str}', 'Content-Type': 'application/json'}, timeout=5)
        
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/all', methods=['GET'])
def get_all():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM members ORDER BY id DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify({"members": rows, "settings": {"password": "admin123"}})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
