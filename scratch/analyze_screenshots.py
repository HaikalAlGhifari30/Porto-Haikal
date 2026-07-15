import os, shutil
from PIL import Image

base = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327'
names = ['media__1784102623914.png', 'media__1784102659111.png', 'media__1784102689343.png', 'media__1784102709161.png']

print("Analyzing images...")
for name in names:
    p = os.path.join(base, name)
    if os.path.exists(p):
        with Image.open(p) as img:
            # Convert to RGB
            rgb = img.convert('RGB')
            w, h = rgb.size
            
            # Analyze a few regions:
            # 1. Left sidebar region (x from 10 to 100, y from 100 to 400)
            sidebar_pixels = []
            for y in range(100, 400, 20):
                for x in range(10, 100, 20):
                    sidebar_pixels.append(rgb.getpixel((x, y)))
            avg_sidebar = [sum(c)/len(sidebar_pixels) for c in zip(*sidebar_pixels)]
            
            # 2. Center region (x from 400 to 600, y from 200 to 300)
            center_pixels = []
            for y in range(200, 300, 10):
                for x in range(400, 600, 10):
                    center_pixels.append(rgb.getpixel((x, y)))
            avg_center = [sum(c)/len(center_pixels) for c in zip(*center_pixels)]
            
            # 3. Top right header region (x from 800 to 950, y from 10 to 40)
            tr_pixels = []
            for y in range(10, 40, 5):
                for x in range(800, 950, 10):
                    tr_pixels.append(rgb.getpixel((x, y)))
            avg_tr = [sum(c)/len(tr_pixels) for c in zip(*tr_pixels)]
            
            print(f"{name}:")
            print(f"  Avg Sidebar (left): {avg_sidebar}")
            print(f"  Avg Center: {avg_center}")
            print(f"  Avg Top Right: {avg_tr}")
            
            # Let's write rules to identify:
            # - Login page: The background is a very dark blurred overlay (high dark values in center/sidebar, e.g. center R,G,B < 100)
            # - Dashboard: Has a white sidebar (R,G,B > 220 in sidebar) and a dark blue banner in the center (R < 50, G < 80, B > 100 in center)
            # - Landing page ID: Has a white header and orange/blue elements
            # - Landing page EN: Has "Contact Us" or "View Projects" (slightly different banner or layout)
