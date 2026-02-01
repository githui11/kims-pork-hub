import os
import shutil
from pathlib import Path
from rembg import remove
from PIL import Image

# Config
SOURCE_DIR = r"C:\Users\Admin\OneDrive\Desktop\Client Websites\kim's pork hub other photos videos"
DEST_DIR = r"C:\Users\Admin\OneDrive\Desktop\Client Websites\kims-pork-hub\public\images\rainbow"

# Ensure dest dir exists
Path(DEST_DIR).mkdir(parents=True, exist_ok=True)

# File mapping: (source_name, dest_name, needs_rembg)
FILES = [
    ("Whisk_9947c46841ac44b89dc4bf2034df0f7ceg.png", "plate1.png", False),
    ("Whisk_4396b7617473f58a1014ec1dcfb3dba9dr.png", "plate2.png", False),
    ("11.jpeg", "plate3.png", True),
    ("2.jpeg", "plate4.png", True),
]

def process_images():
    print(f"Processing images to {DEST_DIR}...")
    
    for src_name, dest_name, needs_rembg in FILES:
        src_path = Path(SOURCE_DIR) / src_name
        dest_path = Path(DEST_DIR) / dest_name
        
        if not src_path.exists():
            print(f"ERROR: Source file not found: {src_path}")
            continue
            
        print(f"Processing {src_name} -> {dest_name} (Rembg: {needs_rembg})")
        
        try:
            if needs_rembg:
                # Open image
                with open(src_path, 'rb') as i:
                    input_data = i.read()
                    output_data = remove(input_data)
                    
                # Save as PNG
                with open(dest_path, 'wb') as o:
                    o.write(output_data)
            else:
                # Just copy
                shutil.copy2(src_path, dest_path)
                
            print(f"SUCCESS: {dest_name}")
            
        except Exception as e:
            print(f"FAILED: {src_name} - {str(e)}")

if __name__ == "__main__":
    process_images()
