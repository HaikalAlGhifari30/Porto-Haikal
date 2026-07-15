import re

CAP_RE = re.compile(r'^\*{0,2}(Tabel|Gambar|Diagram|Grafik|Bagan)\s+[\d.]+', re.IGNORECASE)

line = "**Gambar 2.1** Logo PT Rizky Rijaya Karya\n"
stripped = line.strip()

print(f"Stripped: '{stripped}'")
match = CAP_RE.match(stripped)
if match:
    print(f"Matched! Prefix: '{match.group(0)}' | Label: '{match.group(1)}'")
else:
    print("Not Matched!")
