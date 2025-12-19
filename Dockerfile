# 1. Tumia Image ya Python
FROM python:3.9-slim

# 2. Weka folder la kazi
WORKDIR /app

# 3. Nakili faili la mahitaji kwanza (ili kuongeza speed ya build)
COPY requirements.txt .

# 4. SAKINISHA MAKTABA (Hapa ndipo flask-cors itasakinishwa)
RUN pip install --no-cache-dir -r requirements.txt

# 5. Nakili kodi zako zote (main_script.py nk) kuingia kwenye Docker
COPY . .

# 6. Fungua Port 8000
EXPOSE 8000

# 7. Amuru injini iwake
CMD ["python", "main_script.py"]
