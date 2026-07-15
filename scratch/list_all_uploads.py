from PIL import Image
import glob
import os
import numpy as np

files = glob.glob("C:/Users/Haikal Al-Ghifari/.gemini/antigravity-ide/brain/0240c856-ae86-439c-99ef-f59155cc5327/media__178411*.png")
print("Listing all uploaded screenshot files:")
for f in sorted(files):
    img = Image.open(f)
    arr = np.array(img)
    mean_val = arr.mean(axis=(0, 1))
    print(f"File: {os.path.basename(f)} | Size: {img.size} | Mean RGB: {mean_val[:3]}")
