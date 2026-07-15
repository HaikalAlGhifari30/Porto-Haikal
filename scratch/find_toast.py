from PIL import Image
import numpy as np

files = [
    "C:/Users/Haikal Al-Ghifari/.gemini/antigravity-ide/brain/0240c856-ae86-439c-99ef-f59155cc5327/media__1784119147468.png",
    "C:/Users/Haikal Al-Ghifari/.gemini/antigravity-ide/brain/0240c856-ae86-439c-99ef-f59155cc5327/media__1784119181054.png",
    "C:/Users/Haikal Al-Ghifari/.gemini/antigravity-ide/brain/0240c856-ae86-439c-99ef-f59155cc5327/media__1784119198342.png",
]

for f in files:
    img = Image.open(f)
    arr = np.array(img)
    # Crop top-right corner
    top_right = arr[20:70, 800:1000]
    mean_val = top_right.mean(axis=(0, 1))
    print(f"File: {f.split('/')[-1]} | Top-Right Mean RGB: {mean_val[:3]}")
