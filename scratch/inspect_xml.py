import zipfile
import re

with zipfile.ZipFile("test_roman.docx") as z:
    xml_content = z.read("word/document.xml").decode("utf-8")
    
# Find all sectPr blocks
sectPrs = re.findall(r'<w:sectPr[^>]*>.*?</w:sectPr>', xml_content)
for idx, s in enumerate(sectPrs):
    print(f"Section {idx} XML:")
    print(s)
    print("-" * 50)
