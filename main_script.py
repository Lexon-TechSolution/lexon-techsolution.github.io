import os, psycopg2, requests, base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

DB_URL = "postgresql://postgres:450e4afe47a7443098e20d290192f15d493658495864d273a90cbf4ffea8d6bb@db.htoqqepgfvpodnoxjfzx.supabase.co:5432/postgres"

# --- HII NDIO SEHEMU MUHIMU KWA KOYEB ---
@app.route('/')
def home():
    return "LEXON TECH ERP: SYSTEM LIVE", 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        cat = str(data.get('category', 'MGENI')).upper()
        target = "washirika" if cat == "MSHIRIKA" else "wageni"
        cur.execute(f"INSERT INTO {target} (jina, email, simu) VALUES (%s, %s, %s)",
                    (data.get('name'), data.get('email'), data.get('whatsapp')))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"status": "success", "table": target}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/all', methods=['GET'])
def get_data():
    try:
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT jina, email, simu, 'MSHIRIKA' as cat FROM washirika UNION ALL SELECT jina, email, simu, 'MGENI' as cat FROM wageni")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Koyeb inasoma PORT kutoka kwenye Environment variable
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
