# sql_manager.py - MFUMO ULIOUNGANISHWA WA LEXON (E-commerce, Booking & Real Estate)

import os
from datetime import datetime
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# --- 1. CONFIGURATION ---
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")

def connect_db():
    """Hufanya connection na database."""
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST
        )
        return conn
    except Exception as e:
        print(f"KOSA: Imeshindwa kuunganisha na Database: {e}")
        return None

# --- 2. SETUP (KUUNDA MAJEDWALI YOTE) ---
def create_tables():
    """Inaunda majedwali yote ya mifumo mitatu kwa mpigo mmoja."""
    commands = (
        # 1. E-commerce: Bidhaa na Orders
        """
        CREATE TABLE IF NOT EXISTS products (
            product_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            price DECIMAL(10, 2) NOT NULL,
            stock_quantity INTEGER NOT NULL DEFAULT 0,
            description TEXT
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS orders (
            order_id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            product_id INTEGER REFERENCES products(product_id),
            quantity INTEGER NOT NULL,
            total_price DECIMAL(10, 2),
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """,
        # 2. Booking Online
        """
        CREATE TABLE IF NOT EXISTS bookings (
            booking_id SERIAL PRIMARY KEY,
            client_name VARCHAR(255) NOT NULL,
            service_name VARCHAR(100) NOT NULL,
            booking_date DATE NOT NULL,
            booking_time TIME NOT NULL,
            status VARCHAR(50) DEFAULT 'Confirmed'
        )
        """,
        # 3. Real Estate
        """
        CREATE TABLE IF NOT EXISTS properties (
            property_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            price DECIMAL(15, 2) NOT NULL,
            category VARCHAR(50), 
            status VARCHAR(50) DEFAULT 'Inapatikana'
        )
        """,
        # 4. Microfinance (Clients)
        """
        CREATE TABLE IF NOT EXISTS clients (
            client_id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            national_id VARCHAR(50) NOT NULL UNIQUE,
            address VARCHAR(255),
            max_loan_amount DECIMAL(10, 2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    conn = connect_db()
    if not conn: return False
    cursor = conn.cursor()
    try:
        for command in commands:
            cursor.execute(command)
        conn.commit()
        print("FANIKIO: Majedwali yote yameandaliwa.")
        return True
    except Exception as e:
        print(f"KOSA la Setup: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

# --- 3. LOGIC YA HUDUMA ---

# A. E-commerce: Fetch Menu
def get_product_menu():
    conn = connect_db()
    if not conn: return []
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT name, price FROM products WHERE stock_quantity > 0")
        return [f"*{r[0]}* - TZS {r[1]:,.0f}" for r in cursor.fetchall()]
    finally:
        cursor.close()
        conn.close()

# B. Booking: Record Appointment
def make_booking(name, service, date, time):
    conn = connect_db()
    if not conn: return False
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO bookings (client_name, service_name, booking_date, booking_time) VALUES (%s, %s, %s, %s)",
            (name, service, date, time)
        )
        conn.commit()
        return True
    except Exception as e:
        print(f"Booking Error: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

# C. Real Estate: Get Properties
def get_property_list():
    conn = connect_db()
    if not conn: return []
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT title, location, price FROM properties WHERE status = 'Inapatikana'")
        return [f"🏠 *{r[0]}*\n📍 Mahali: {r[1]}\n💰 Bei: TZS {r[2]:,.0f}" for r in cursor.fetchall()]
    finally:
        cursor.close()
        conn.close()