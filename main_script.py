import os
import psycopg2
from psycopg2.extras import RealDictCursor
import requests
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- DATABASE CONNECTION (SUPABASE POSTGRES) ---
DB_URL = "postgresql://postgres:450e4afe47a7443098e20d290192f15d493658495864d273a90cbf4ffea8d6bb@db.htoqqepgfvpodnoxjfzx.supabase.co:5432/postgres"

def get_db_connection():
    return psycopg2.connect(DB_URL)

# --- NEXTSMS CONFIG ---
NEXTSMS_USER = "lexon_tech"
NEXTSMS_PASS = "Saidi1234@."
NEXTSMS_SENDER = "SMART_SMS"

def send_sms(phone, name):
    url = "https://messaging-service.co.tz/api/sms/v1/send/single"
    auth_str = base64.b64encode(f"{NEXTSMS_USER}:{NEXTSMS_PASS}".encode()).decode()
    headers = {'Authorization': f'Basic {auth_str}', 'Content-Type': 'application/json'}
    
    clean_phone = phone.strip()
    if clean_phone.startswith('0'): clean_phone = '255' + clean_phone[1:]
    
    payload = {
        "from": NEXTSMS_SENDER, 
        "to": clean_phone, 
        "text": f"Habari {name}, usajili wako LEXON TECH umekamilika. Karibu!"
    }
    try:
        requests.post(url, json=payload, headers=headers, timeout=8)
    except:
        pass

@app.route('/')
def health():
    return "LEXON SECURE ENGINE: TABLES READY ✅"

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # LOGIC: Chagua table kulingana na Category inayotoka kwenye Website
        # Inatakiwa iwe "MSHIRIKA" au "MGENI"
        table_target = "washirika" if data['category'].upper() == "MSHIRIKA" else "wageni"
        
        query = f"INSERT INTO {table_target} (name, email, phone) VALUES (%s, %s, %s)"
        cur.execute(query, (data['name'], data['email'], data['whatsapp']))
        
        conn.commit()
        cur.close()
        conn.close()
        
        # Tuma SMS Automation
        send_sms(data['whatsapp'], data['name'])
        
        return jsonify({"status": "success", "saved_to": table_target}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Endpoint ya kuona data zote (Kwa ajili ya Poster Office)
@app.route('/api/data/all', methods=['GET'])
def get_all():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Vuta data kutoka table zote mbili
        cur.execute("SELECT *, 'MSHIRIKA' as category FROM washirika")
        washirika = cur.fetchall()
        
        cur.execute("SELECT *, 'MGENI' as category FROM wageni")
        wageni = cur.fetchall()
        
        all_members = washirika + wageni
        
        cur.close()
        conn.close()
        return jsonify({"members": all_members, "settings": {"password": "admin123"}})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
