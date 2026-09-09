import os
from PIL import Image

def generate_icons():
    base_dir = os.path.dirname(__file__)
    public_dir = os.path.join(base_dir, "public")
    
    src_logo_path = os.path.join(public_dir, "hag-logo.png")
    if not os.path.exists(src_logo_path):
        print(f"Error: {src_logo_path} not found")
        return

    # Load original HAG logo
    img = Image.open(src_logo_path).convert("RGBA")
    
    # Sizes to generate
    targets = [
        ("apple-touch-icon.png", (180, 180)),
        ("apple-touch-icon-precomposed.png", (180, 180)),
        ("android-chrome-192x192.png", (192, 192)),
        ("android-chrome-512x512.png", (512, 512)),
        ("favicon.png", (512, 512)),
        ("logo-pwa.png", (512, 512)),
    ]

    BG_COLOR = (9, 13, 22, 255) # Dark #090d16 matching app theme

    for filename, (width, height) in targets:
        # Create solid dark background
        bg = Image.new("RGBA", (width, height), BG_COLOR)
        
        # Resize logo maintaining aspect ratio with subtle margin (85% of target size)
        padding = int(min(width, height) * 0.08)
        max_size = (width - 2 * padding, height - 2 * padding)
        
        logo_resized = img.copy()
        logo_resized.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Center logo on background
        offset_x = (width - logo_resized.width) // 2
        offset_y = (height - logo_resized.height) // 2
        
        bg.paste(logo_resized, (offset_x, offset_y), logo_resized)
        
        out_path = os.path.join(public_dir, filename)
        bg.save(out_path, format="PNG")
        print(f"Generated app icon: {out_path} ({width}x{height})")

if __name__ == "__main__":
    generate_icons()
