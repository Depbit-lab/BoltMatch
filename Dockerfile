# Usar la imagen de Python 3.7
FROM python:3.7-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del proyecto
COPY . .

# Exponer el puerto 80 (Predeterminado del servidor JustRunMy.App)
EXPOSE 80

# Arrancar con Gunicorn en el puerto 80 
# (Se usa shell form para expandir $PORT si la plataforma lo provee, sino usa 80)
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-80} app:app"]
