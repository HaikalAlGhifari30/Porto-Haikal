import glob
import os
from PIL import Image

files = glob.glob("C:/Users/Haikal Al-Ghifari/.gemini/antigravity-ide/brain/0240c856-ae86-439c-99ef-f59155cc5327/media__178411*.png")
print("Listing all uploaded screenshot files including newest batch:")
for f in sorted(files):
    with Image.open(f) as img:
        print(f"File: {os.path.basename(f)} | Size: {img.size}")
