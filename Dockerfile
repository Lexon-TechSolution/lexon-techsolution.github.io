# Tumia toleo la Python lililo thabiti
FROM python:3.10-slim

# Weka folder la kazi
WORKDIR /app

# Copy mafaili yako yote kuingia kwenye seva
COPY . .

# LAZIMA: Install maktaba zote hapa ili Docker izijue
RUN pip install --no-cache-dir pg8000 sendgrid flask python-dotenv

# Amri ya kuwasha injini yako
CMD ["python", "main_script.py"]
