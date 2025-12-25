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

@app.route('/')
def home(): return "LEXON ENGINE: READY ✅"

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Hapa tunachagua table sahihi
        cat = data.get('category', '').upper()
        target_table = "washirika" if cat == "MSHIRIKA" else "wageni"
        
        # Kuingiza data kwenye column tulizotengeneza (jina, email, simu)
        query = f"INSERT INTO {target_table} (jina, email, simu) VALUES (%s, %s, %s)"
        cur.execute(query, (data['name'], data['email'], data['whatsapp']))
        
        conn.commit()
        cur.close()
        conn.close()
        
        # NextSMS Automation
        auth_str = base64.b64encode(f"lexon_tech:Saidi1234@.".encode()).decode()
        clean_phone = data['whatsapp'].strip()
        if clean_phone.startswith('0'): clean_phone = '255' + clean_phone[1:]
        
        requests.post("https://messaging-service.co.tz/api/sms/v1/send/single", 
                      json={"from": "SMART_SMS", "to": clean_phone, "text": f"Habari {data['name']}, usajili wako umekamilika Lexon Tech!"},
                      headers={'Authorization': f'Basic {auth_str}', 'Content-Type': 'application/json'}, timeout=5)
        
        return jsonify({"status": "success", "table": target_table}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
