FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Hii amri ndio inawasha engine yako ya Flask
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "main_script:app"]
