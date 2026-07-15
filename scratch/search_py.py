with open(r"d:\Data Joki\ComproRRK\scratch\generate_docx.py", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "Logo PT" in line or "Struktur Perusahaan" in line or "2.1" in line:
            if "Cm" in line or "add_paragraph" in line or "add_image" in line or "add_caption" in line:
                print(f"Line {idx+1}: {repr(line)}")
