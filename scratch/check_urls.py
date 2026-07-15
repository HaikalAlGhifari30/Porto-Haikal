import re

file_path = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

matches = re.findall(r'<img[^>]+src=["\'](http[^"\']+)["\']', html)
print(matches[:3])
