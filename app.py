import os
import requests
import smtplib
import binascii
import hashlib
from email.mime.text import MIMEText
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from mnemonic import Mnemonic
from bech32 import bech32_encode, convertbits

load_dotenv()

# --- Helper functions for NIP-19 and Account Generation ---
def hex_to_bech32(prefix, hex_str):
    data = binascii.unhexlify(hex_str)
    five_bit_data = convertbits(data, 8, 5)
    return bech32_encode(prefix, five_bit_data)

def generate_nostr_account():
    mnemo = Mnemonic("english")
    words = mnemo.generate(strength=128)
    seed = mnemo.to_seed(words)
    # Simplified BIP32 derivation for the prototype
    # real NIP-06 is m/44'/1237'/0'/0/0 but hex seed is enough for a unique key
    sk_hex = hashlib.sha256(seed).hexdigest()
    # For now, we use a simple SHA256 of the seed as the private key
    return words, sk_hex

import os
base_dir = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=os.path.join(base_dir, 'public'), static_url_path='')
CORS(app)

# --- Diagnóstico de archivos en el servidor ---
import os
print("--- DIAGNOSTICO DE BoltMatch ---")
print("--- DIRECTORIO ACTUAL:", os.getcwd())
try:
    print("--- ARCHIVOS EN RAIZ:", os.listdir('.'))
    if os.path.exists('public'):
        print("--- ARCHIVOS EN /public:", os.listdir('public'))
    else:
        print("--- ¡ALERTA!: La carpeta 'public' NO existe en el directorio actual.")
except Exception as e:
    print("--- Error de diagnóstico:", str(e))

@app.route('/api/zap', methods=['POST'])
def zap():
    try:
        data = request.json
        amount = data.get('amount')
        pubkey = data.get('pubkey')

        lnbits_url = os.environ.get('LNBITS_URL', 'https://bitcointxoko.org/api/v1')
        invoice_key = os.environ.get('LNBITS_INVOICE_KEY', 'e6a18e65941b467a929c41844cb46879')

        memo = f"BoltMatch Zap a Pk:{pubkey[:8] if pubkey else 'anon'}"

        response = requests.post(
            f"{lnbits_url}/payments",
            headers={"X-Api-Key": invoice_key, "Content-Type": "application/json"},
            json={"out": False, "amount": amount, "memo": memo}
        )
        response.raise_for_status()
        resp_data = response.json()

        return jsonify({
            "status": "success",
            "invoice": resp_data.get("payment_request"),
            "payment_hash": resp_data.get("payment_hash"),
            "message": "Invoice Lightning generada con éxito"
        })
    except Exception as e:
        print("Error generando Zap:", str(e))
        return jsonify({"error": "Fallo al generar invoice de Lightning"}), 500

@app.route('/api/wot/<pubkey>', methods=['GET'])
def wot(pubkey):
    return jsonify({"pubkey": pubkey, "trustScore": 85, "endorsements": 3})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        # Add random prefix to avoid collisions
        filename = f"{os.urandom(8).hex()}_{filename}"
        save_path = os.path.join(base_dir, 'public', 'uploads', filename)
        file.save(save_path)
        
        # Get server URL from request to build the full path
        url_root = request.url_root.rstrip('/')
        file_url = f"{url_root}/uploads/{filename}"
        return jsonify({"status": "success", "url": file_url})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required"}), 400
        
    try:
        # 1. Generate real Nostr keys
        words, nsec_hex = generate_nostr_account()
        
        # 2. Encode to NIP-19 nsec format
        from bech32 import bech32_encode, convertbits
        # Manual bech32 for nsec
        nsec = hex_to_bech32("nsec", nsec_hex)
        
        # 3. Create Magic Link
        base_url = os.environ.get('BASE_URL', 'http://localhost:5000')
        magic_link = f"{base_url}/?login={nsec}"
        
        # 4. Send Email
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_pass = os.environ.get('SMTP_PASS')
        
        body = f"""
⚡️ Welcome to BoltMatch! / ¡Bienvenido a BoltMatch!

Your Nostr account has been generated / Tu cuenta de Nostr ha sido generada.

RECOVERY PHRASE (12 words) / FRASE DE RECUPERACIÓN:
{words}

MAGIC LINK / ACCESO DIRECTO:
{magic_link}

Keep your words safe. Do not share your link. / Guarda tus palabras a buen recaudo. No compartas tu enlace.
"""
        # Specify UTF-8 for special characters like ⚡️
        msg = MIMEText(body, 'plain', 'utf-8')
        msg['Subject'] = 'BoltMatch Credentials ⚡️ Credenciales'
        msg['From'] = smtp_user
        msg['To'] = email
        
        if smtp_user and smtp_pass and smtp_host:
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
            
            return jsonify({"status": "success", "message": "Email enviado con tus credenciales."})
        else:
            # Fallback for testing without SMTP
            print(f"DEBUG: Registro para {email}. Mnemonic: {words}. Link: {magic_link}")
            return jsonify({
                "status": "debug", 
                "message": "Registro simulado (SMTP no configurado). Mira la terminal del servidor.",
                "debug_link": magic_link,
                "words": words
            })
            
    except Exception as e:
        error_msg = "Registration Error: " + str(e)
        print(error_msg)
        return jsonify({"status": "error", "error": error_msg}), 500
        return jsonify({"error": str(e)}), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Intentar encontrar la carpeta public de forma absoluta
    public_path = os.path.join(base_dir, 'public')
    
    if path != "" and os.path.exists(os.path.join(public_path, path)):
        return send_from_directory(public_path, path)
    
    # Si la ruta no existe o es la raíz, servimos index.html
    # Asegurándonos de que Flask lo encuentre
    return send_from_directory(public_path, 'index.html')

if __name__ == '__main__':
    # Asegurarnos de imprimir dónde está Flask buscando
    print(f"--- Flask buscando public en: {os.path.join(base_dir, 'public')}")
    port = int(os.environ.get('PORT', 80))
    
    # Ensure upload directory exists
    upload_path = os.path.join(base_dir, 'public', 'uploads')
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)
        
    app.run(host='0.0.0.0', port=port, debug=False)
