import docx
doc = docx.Document("../public/Laporan_Kerja_Praktek.docx")

print("Checking paragraph styles of captions in the generated file:")
count = 0
for p in doc.paragraphs:
    if p.style.name == 'Caption' or p.text.startswith("Gambar") or p.text.startswith("Tabel"):
        print(f"Text: '{p.text[:60]}' | Style: '{p.style.name}'")
        count += 1
        if count <= 3:
            print("XML:")
            print(p._p.xml)
            print("-" * 50)
print(f"Total captions checked: {count}")
