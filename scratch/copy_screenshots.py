import os, shutil

base = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327'

mapping = {
    'media__1784102623914.png': 'screenshot_login.png',
    'media__1784102659111.png': 'screenshot_dashboard.png',
    'media__1784102689343.png': 'screenshot_landing_id.png',
    'media__1784102709161.png': 'screenshot_landing_en.png'
}

print("Copying screenshots to clean names...")
for src_name, dest_name in mapping.items():
    src_path = os.path.join(base, src_name)
    dest_path = os.path.join(base, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"  Copied {src_name} -> {dest_name} (Size: {os.path.getsize(dest_path)} bytes)")
    else:
        print(f"  Source not found: {src_name}")
