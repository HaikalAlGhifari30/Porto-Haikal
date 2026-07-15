import zipfile

with zipfile.ZipFile("../public/Laporan_Kerja_Praktek.docx") as z:
    for name in z.namelist():
        if "footer" in name:
            print(f"File: {name}")
            print(z.read(name).decode("utf-8"))
            print("=" * 60)
