import os, psycopg2, requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

# Database URL yako ya Supabase (Usibadili hii maana tayari unayo)
DB_URL = "postgresql://postgres:450e4afe47a7443098e20d290192f15d493658495864d273a90cbf4ffea8d6bb@db.htoqqepgfvpodnoxjfzx.supabase.co:5432/postgres"

# Hifadhi ya muda ya SMS (Queue) - Hii inakaa kwenye RAM ya Koyeb
sms_queue = []

@app.route('/')
def home():
    return "GGC FAMILY SYSTEM: ENGINE LIVE", 200

# --- USAJILI NA SMS ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cat = str(data.get('category', 'MGENI')).upper()
        target = "washirika" if cat == "MSHIRIKA" else "wageni"
        
        # Hifadhi Supabase
        cur.execute(f"INSERT INTO {target} (jina, email, simu) VALUES (%s, %s, %s)",
                    (data.get('name'), data.get('email'), data.get('whatsapp')))
        conn.commit()
        cur.close()
        conn.close()

        # WEKA KWENYE FOLENI YA SMS (Ili MacBook iione)
        sms_queue.append({
            "namba": data.get('whatsapp'),
            "jina": data.get('name'),
            "msg": f"SHALOM_{data.get('name')}_KARIBU_GGC_FAMILY"
        })

        return jsonify({"status": "success", "message": "Registered and queued for SMS"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# --- API YA MACBOOK (WORKER) ---
@app.route('/api/get_sms_jobs', methods=['GET'])
def get_sms_jobs():
    global sms_queue
    jobs = sms_queue[:]
    sms_queue = [] # Safisha foleni baada ya kuchukuliwa
    return jsonify(jobs)

# --- MAPATO (FINANCE) ---
@app.route('/api/save_finance', methods=['POST'])
def save_finance():
    data = request.json
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        # Hakikisha una table ya 'finance' Supabase
        cur.execute("INSERT INTO finance (kiasi, aina, maelezo) VALUES (%s, %s, %s)",
                    (data.get('amt'), data.get('type'), data.get('desc')))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# --- DATA ZOTE (KWA PASTOR) ---
@app.route('/api/data/all', methods=['GET'])
def get_data():
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        # Inachukua washirika, wageni na finance
        cur.execute("SELECT jina, simu, 'MSHIRIKA' as cat FROM washirika UNION ALL SELECT jina, simu, 'MGENI' as cat FROM wageni")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
