import os
from PIL import Image, ImageDraw

def render_retro_h_logo(size=512):
    # Background: Retro Arcade Yellow #FACC15 (RGB: 250, 204, 21)
    img = Image.new("RGBA", (size, size), (250, 204, 21, 255))
    draw = ImageDraw.Draw(img)
    
    # 7 Pixel Blocks of HAG lettermark (original 120x120 viewBox):
    # Bounds in 120x120: x in [20, 104] (width 84), y in [22, 96] (height 74)
    # Center: (62, 59)
    blocks_120 = [
        (20, 22, 36, 88),   # Left vertical bar of H
        (80, 22, 96, 38),   # Top right accent pixel
        (20, 40, 64, 56),   # H crossbar
        (56, 48, 72, 88),   # Center vertical stem
        (56, 80, 104, 96),  # Bottom bar of G
        (88, 52, 104, 96),  # Right bar of G
        (64, 52, 104, 68),  # Inward hook of G
    ]
    
    # Target scale: lettermark width ~ 60% of canvas size
    # Leaving ~20% safe-zone margin on all sides for mobile squircle/circle crop
    scale = (size * 0.60) / 84.0
    orig_cx = 62.0
    orig_cy = 59.0
    target_cx = size / 2.0
    target_cy = size / 2.0
    
    black = (0, 0, 0, 255)
    
    for (x1, y1, x2, y2) in blocks_120:
        px1 = round(target_cx + (x1 - orig_cx) * scale)
        py1 = round(target_cy + (y1 - orig_cy) * scale)
        px2 = round(target_cx + (x2 - orig_cx) * scale)
        py2 = round(target_cy + (y2 - orig_cy) * scale)
        draw.rectangle([px1, py1, px2, py2], fill=black)
        
    return img

def generate_icons():
    base_dir = os.path.dirname(__file__)
    public_dir = os.path.join(base_dir, "public")
    
    # Render Master 512x512 Icon
    master_512 = render_retro_h_logo(512)
    
    targets = [
        ("hag-logo.png", 512),
        ("logo.png", 512),
        ("logo-pwa.png", 512),
        ("favicon.png", 512),
        ("android-chrome-512x512.png", 512),
        ("android-chrome-192x192.png", 192),
        ("apple-touch-icon.png", 180),
        ("apple-touch-icon-precomposed.png", 180),
    ]
    
    for filename, s in targets:
        if s == 512:
            out_img = master_512
        else:
            out_img = render_retro_h_logo(s)
        out_path = os.path.join(public_dir, filename)
        out_img.save(out_path, format="PNG")
        print(f"Generated {filename} ({s}x{s})")
        
    # Generate multi-res favicon.ico
    ico_img_16 = render_retro_h_logo(16)
    ico_img_32 = render_retro_h_logo(32)
    ico_img_48 = render_retro_h_logo(48)
    ico_path = os.path.join(public_dir, "favicon.ico")
    ico_img_48.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Generated favicon.ico (16, 32, 48)")
    
    # SVG Vector Icon for high DPI browsers
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" shape-rendering="crispEdges">
  <rect width="512" height="512" fill="#FACC15" />
  <!-- H Left Column -->
  <rect x="102" y="121" width="59" height="242" fill="#000000" />
  <!-- Top Right Accent Pixel -->
  <rect x="322" y="121" width="59" height="59" fill="#000000" />
  <!-- H Crossbar -->
  <rect x="102" y="187" width="161" height="59" fill="#000000" />
  <!-- Center Vertical Stem -->
  <rect x="234" y="216" width="59" height="147" fill="#000000" />
  <!-- Bottom Bar of G -->
  <rect x="234" y="333" width="176" height="59" fill="#000000" />
  <!-- Right Vertical Bar of G -->
  <rect x="351" y="231" width="59" height="161" fill="#000000" />
  <!-- Inward Hook of G -->
  <rect x="263" y="231" width="147" height="59" fill="#000000" />
</svg>"""
    with open(os.path.join(public_dir, "icon.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Generated icon.svg")

if __name__ == "__main__":
    generate_icons()
