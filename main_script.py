import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# HII NI MUHIMU: Inaruhusu admin.html kuongea na Koyeb
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return jsonify({
        "status": "Lexon SaaS Engine Pro Online",
        "version": "3.1",
        "message": "Karibu kwenye Mfumo wa Lexon"
    })

# NJIA YA KUSAJILI DUKA (Hii ndiyo inayotafutwa na admin.html)
@app.route('/add_vendor_full', methods=['POST', 'OPTIONS'])
def add_vendor_full():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.json
        v_id = data.get('id')
        v_name = data.get('name')
        
        if not v_id or not v_name:
            return jsonify({"status": "error", "message": "ID na Jina vinahitajika"}), 400
            
        # Hapa ndipo kodi ya kuhifadhi kwenye Database inaingia
        # Kwa sasa tunarudisha jibu la mafanikio
        print(f"Duka jipya limesajiliwa: {v_name} (ID: {v_id})")
        
        return jsonify({
            "status": "success",
            "message": f"Duka la {v_name} limesajiliwa kikamilifu!",
            "vendor_id": v_id
        }), 200
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # Koyeb inatumia Port 8000
    app.run(host='0.0.0.0', port=8000)
