import docx

doc = docx.Document("../public/Laporan_Kerja_Praktek.docx")
found_bib = False
for p in doc.paragraphs:
    if "DAFTAR PUSTAKA" in p.text:
        found_bib = True
        print(f"Found 'DAFTAR PUSTAKA' in paragraph: style='{p.style.name}', text='{p.text}'")

if not found_bib:
    print("WARNING: 'DAFTAR PUSTAKA' was NOT found in the document paragraphs!")
