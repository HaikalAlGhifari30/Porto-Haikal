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
    
    logo_path = os.path.join(public_dir, "logo.png")
    img.save(logo_path, format="PNG")
    print(f"Generated new HAG logo: {src_logo_path} and {logo_path}")
    
    # 2. Save favicon.ico (multi-resolution 32x32, 48x48, 64x64)
    ico_path = os.path.join(public_dir, "favicon.ico")
    img.save(ico_path, format="ICO", sizes=[(32, 32), (48, 48), (64, 64)])
    print(f"Generated favicon.ico: {ico_path}")
    
    # 3. Sizes to generate
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

    # 4. Generate public/icon.svg
    svg_content = """<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" rx="28" fill="#030712"/>
  <rect x="2" y="2" width="116" height="116" rx="26" fill="none" stroke="url(#grad)" stroke-width="3"/>
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <path d="M 22 18 V 78" stroke="url(#grad)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 22 48 H 65 V 102 H 102 V 68 H 75" stroke="url(#grad)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""
    svg_path = os.path.join(public_dir, "icon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated icon.svg: {svg_path}")

if __name__ == "__main__":
    generate_icons()
