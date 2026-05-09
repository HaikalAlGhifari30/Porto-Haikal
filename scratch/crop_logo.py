from PIL import Image
import os

def crop_image(path):
    img = Image.open(path)
    img = img.convert("RGBA")
    
    # Get bounding box of non-transparent area
    bbox = img.getbbox()
    if bbox:
        cropped_img = img.crop(bbox)
        cropped_img.save(path)
        print(f"Successfully cropped {path}")
    else:
        print(f"No non-transparent content found in {path}")

if __name__ == "__main__":
    logo_path = r"d:\Data Joki\BaroedakComo\public\logo.png"
    if os.path.exists(logo_path):
        crop_image(logo_path)
    else:
        print(f"File not found: {logo_path}")
