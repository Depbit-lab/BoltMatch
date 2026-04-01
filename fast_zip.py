import zipfile
import os

zip_name = "deploy_linux.zip"
files_to_zip = ["app.py", "requirements.txt", "Dockerfile", ".env", "Procfile", "README.md"]
public_dir = "public"

with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
    # Add root files
    for file in files_to_zip:
        if os.path.exists(file):
            zipf.write(file)
            print(f"Added: {file}")
            
    # Add public folder files correctly
    if os.path.exists(public_dir):
        for root, dirs, files in os.walk(public_dir):
            for file in files:
                full_path = os.path.join(root, file)
                # Ensure we use forward slashes for Linux compatibility
                archive_name = full_path.replace(os.sep, '/')
                zipf.write(full_path, archive_name)
                print(f"Added: {archive_name}")

print(f"\nSuccessfully created {zip_name} optimized for Linux servers.")
