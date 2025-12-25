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

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Pata Category (Default ni WAGENI kama haijaandikwa)
        cat = str(data.get('category', 'WAGENI')).upper()
        target_table = "washirika" if cat == "MSHIRIKA" else "wageni"
        
        # Ingiza data kwa kutumia majina ya column ya Supabase (jina, email, simu)
        query = f"INSERT INTO {target_table} (jina, email, simu) VALUES (%s, %s, %s)"
        cur.execute(query, (data.get('name'), data.get('email'), data.get('whatsapp')))
        
        conn.commit()
        cur.close()
        conn.close()
        
        # SMS Automation
        try:
            auth_str = base64.b64encode(f"lexon_tech:Saidi1234@.".encode()).decode()
            phone = str(data.get('whatsapp')).strip()
            if phone.startswith('0'): phone = '255' + phone[1:]
            requests.post("https://messaging-service.co.tz/api/sms/v1/send/single", 
                          json={"from": "SMART_SMS", "to": phone, "text": f"Habari {data.get('name')}, usajili umekamilika!"},
                          headers={'Authorization': f'Basic {auth_str}', 'Content-Type': 'application/json'}, timeout=5)
        except: pass

        return jsonify({"status": "success", "table": target_table}), 200
    except Exception as e:
        # Hapa ndipo tunazuia "undefined" - tunarudisha kosa halisi
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
