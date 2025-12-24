import os
import sqlite3
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = "ggc_master.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    # Washirika Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS members 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, name TEXT, email TEXT, phone TEXT, date TEXT)''')
    # Finance Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS finance 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount REAL, type TEXT, date TEXT)''')
    # Settings Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS settings 
        (id INTEGER PRIMARY KEY, title TEXT, logo_url TEXT, password TEXT)''')
    # Initial Settings kama hazipo
    cursor.execute("INSERT OR IGNORE INTO settings (id, title, logo_url, password) VALUES (1, 'GGC ERP', '', 'admin123')")
    conn.commit()
    conn.close()

init_db()

@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS': return make_response()
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO members (category, name, email, phone, date) VALUES (?, ?, ?, ?, ?)',
                   (data['category'], data['name'], data['email'], data['whatsapp'], datetime.now().strftime("%d/%m/%Y")))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 200

@app.route('/api/finance/add', methods=['POST'])
def add_finance():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO finance (name, amount, type, date) VALUES (?, ?, ?, ?)',
                   (data['name'], data['amount'], data['type'], datetime.now().strftime("%d/%m/%Y")))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}), 200

@app.route('/api/admin/all', methods=['GET'])
def get_all():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    res = {"members": [dict(r) for r in conn.execute('SELECT * FROM members').fetchall()],
           "finance": [dict(r) for r in conn.execute('SELECT * FROM finance').fetchall()],
           "settings": dict(conn.execute('SELECT * FROM settings WHERE id=1').fetchone())}
    conn.close()
    return jsonify(res)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
