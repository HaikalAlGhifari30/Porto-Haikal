with open(r"d:\Data Joki\ComproRRK\scratch\generate_docx.py", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "Masukkan Screenshot" in line:
            print(f"Line {idx+1}: {repr(line)}")
