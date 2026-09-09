import os
from PIL import Image, ImageDraw

def render_monogram():
    size = 512
    img = Image.new("RGBA", (size, size), (3, 7, 18, 255))
    draw = ImageDraw.Draw(img)
    
    stroke_color = (34, 211, 238, 255) # Cyan #22d3ee
    width = 38
    
    # H Left Vertical Stem: (x=96, y=78) -> (x=96, y=330)
    draw.line([(96, 78), (96, 330)], fill=stroke_color, width=width)
    
    # H Crossbar & Center Stem & G Loop:
    # (96, 204) -> (276, 204) -> (276, 432) -> (432, 432) -> (432, 288) -> (320, 288)
    points = [(96, 204), (276, 204), (276, 432), (432, 432), (432, 288), (320, 288)]
    draw.line(points, fill=stroke_color, width=width, joint="miter")
    
    # Rounded Caps
    cap_radius = width // 2
    caps = [(96, 78), (96, 330), (320, 288)]
    for cx, cy in caps:
        draw.ellipse([cx - cap_radius, cy - cap_radius, cx + cap_radius, cy + cap_radius], fill=stroke_color)
        
    return img

def generate_icons():
    base_dir = os.path.dirname(__file__)
    public_dir = os.path.join(base_dir, "public")
    
    # 1. Render new monogram
    img = render_monogram()
    src_logo_path = os.path.join(public_dir, "hag-logo.png")
    img.save(src_logo_path, format="PNG")
    print(f"Generated new HAG logo: {src_logo_path}")
    
    # 2. Sizes to generate
    targets = [
        ("apple-touch-icon.png", (180, 180)),
        ("apple-touch-icon-precomposed.png", (180, 180)),
        ("android-chrome-192x192.png", (192, 192)),
        ("android-chrome-512x512.png", (512, 512)),
        ("favicon.png", (512, 512)),
        ("logo-pwa.png", (512, 512)),
    ]

    BG_COLOR = (3, 7, 18, 255) # Dark #030712

    for filename, (w, h) in targets:
        bg = Image.new("RGBA", (w, h), BG_COLOR)
        padding = int(min(w, h) * 0.08)
        max_size = (w - 2 * padding, h - 2 * padding)
        
        logo_resized = img.copy()
        logo_resized.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        offset_x = (w - logo_resized.width) // 2
        offset_y = (h - logo_resized.height) // 2
        
        bg.paste(logo_resized, (offset_x, offset_y), logo_resized)
        
        out_path = os.path.join(public_dir, filename)
        bg.save(out_path, format="PNG")
        print(f"Generated app icon: {out_path} ({w}x{h})")

if __name__ == "__main__":
    generate_icons()
