# 1. Tumia Image ya Python
FROM python:3.9-slim

# 2. Weka folder la kazi
WORKDIR /app

# 3. Nakili faili la mahitaji kwanza
COPY requirements.txt .

# 4. SAKINISHA MAKTABA (Ikijumuisha Gunicorn)
RUN pip install --no-cache-dir -r requirements.txt

# 5. Nakili kodi zako zote
COPY . .

# 6. Fungua Port 8000
EXPOSE 8000

# 7. Amuru injini iwake kwa kutumia Gunicorn (Hapa ndipo siri ya ushindi ilipo)
CMD ["gunicorn", "-b", "0.0.0.0:8000", "main_script:app"]
