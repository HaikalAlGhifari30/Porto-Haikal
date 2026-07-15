with open(r"C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "Screenshot" in line or "Gambar 4." in line or "Antarmuka" in line:
            print(f"Line {idx+1}: {repr(line)}")
