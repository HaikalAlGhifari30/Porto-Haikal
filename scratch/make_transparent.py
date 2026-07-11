from PIL import Image
import sys
import os

def make_white_transparent(image_path, output_path, tolerance=30):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            r, g, b, a = item
            # Check if pixel is close to white
            if r > 255 - tolerance and g > 255 - tolerance and b > 255 - tolerance:
                # Make it transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {image_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    logo_path = r"d:\Data Joki\ComproRRK\public\logo.png"
    favicon_path = r"d:\Data Joki\ComproRRK\public\favicon.png"
    
    if os.path.exists(logo_path):
        make_white_transparent(logo_path, logo_path, tolerance=25)
    else:
        print(f"File not found: {logo_path}")
        
    if os.path.exists(favicon_path):
        make_white_transparent(favicon_path, favicon_path, tolerance=25)
    else:
        print(f"File not found: {favicon_path}")
