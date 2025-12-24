import os
import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app) # Inaruhusu Engine kuongea na Church.html

# Database ya muda (Inatunza data za Admin & Finance)
db_store = []

# --- INFOBIP CONFIG (Engine SMS) ---
INFOBIP_API_KEY = "c2d7220f305487d6f7344c934d3740fc-4890475b-a39d-48dd-8588-9247da27b3ae"
INFOBIP_URL = "https://qw36gr.api.infobip.com/sms/2/text/advanced"

# A. HEALTH CHECK ROUTE (Muhimu kwa Koyeb)
@app.route('/', methods=['GET'])
def health_check():
    # Hii itafanya Koyeb iseme "Healthy"
    return "GGC ENGINE v105 MASTER: RUNNING ✅", 200

# B. USAJILI ROUTE
@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return make_response()
    
    data = request.json
    try:
        entry = {
            "id": len(db_store) + 1,
            "category": data.get('category', 'MSHIRIKA'),
            "name": data.get('name'),
            "email": data.get('email'),
            "phone": data.get('whatsapp'),
            "date": datetime.now().strftime("%d/%m/%Y %H:%M")
        }
        db_store.append(entry)
        
        # SMS Logic (Inafanya kazi kimya kimya)
        clean_phone = ''.join(filter(str.isdigit, str(entry['phone'])))
        if clean_phone.startswith("0"): clean_phone = "255" + clean_phone[1:]
        
        payload = {
            "messages": [{
                "destinations": [{"to": clean_phone}],
                "from": "GGC_FAMILY",
                "text": f"SHALOM {entry['name']}! Usajili wako GGC FAMILY umekamilika. Karibu."
            }]
        }
        requests.post(INFOBIP_URL, json=payload, headers={"Authorization": f"App {INFOBIP_API_KEY}"}, timeout=5)
        
        return jsonify({"status": "success", "message": "Data saved and SMS triggered"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# C. ADMIN/FINANCE DATA ROUTE
@app.route('/api/admin/all', methods=['GET'])
def get_all_data():
    return jsonify(db_store)

if __name__ == '__main__':
    # Koyeb itatafuta PORT kiotomatiki
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
