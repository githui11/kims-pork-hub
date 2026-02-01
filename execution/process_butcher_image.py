import os
from PIL import Image

def process_image(input_path, output_path, max_width=1920, quality=75):
    try:
        if not os.path.exists(input_path):
            print(f"Error: Input file not found at {input_path}")
            return

        with Image.open(input_path) as img:
            # Convert to RGB (in case of RGBA/PNG)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            # Resize if width exceeds max_width
            width, height = img.size
            if width > max_width:
                ratio = max_width / width
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
                print(f"Resized image from {width}x{height} to {new_size[0]}x{new_size[1]}")

            # Save as WebP
            output_dir = os.path.dirname(output_path)
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)

            img.save(output_path, 'WEBP', quality=quality)
            print(f"Successfully saved processed image to {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    input_file = r"C:\Users\Admin\OneDrive\Desktop\Client Websites\kim's pork hub other photos videos\WhatsApp Image 2026-01-30 at 12.38.43.jpeg"
    output_file = r"c:\Users\Admin\OneDrive\Desktop\Client Websites\kims-pork-hub\public\images\butcher-bg.webp"
    process_image(input_file, output_file)
