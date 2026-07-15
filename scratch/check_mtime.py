import os
import datetime

path = r"d:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.docx"
mtime = os.path.getmtime(path)
dt = datetime.datetime.fromtimestamp(mtime)
print(f"File last modified at: {dt}")
