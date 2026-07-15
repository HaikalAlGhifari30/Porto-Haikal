import zipfile
import xml.etree.ElementTree as ET

with zipfile.ZipFile("../public/Laporan_Kerja_Praktek.docx") as z:
    xml_data = z.read("word/document.xml")
    root = ET.fromstring(xml_data)

namespaces = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
}

# Find all paragraphs
body = root.find('w:body', namespaces)
for child_idx, child in enumerate(body):
    # Print paragraph text and check if it has sectPr in pPr
    if child.tag.endswith('p'):
        text = "".join(t.text for t in child.findall('.//w:t', namespaces) if t.text)
        pPr = child.find('w:pPr', namespaces)
        if pPr is not None:
            sectPr = pPr.find('w:sectPr', namespaces)
            if sectPr is not None:
                print(f"Paragraph {child_idx} ends a section! Text: '{text[:50]}'")
                pgNumType = sectPr.find('w:pgNumType', namespaces)
                if pgNumType is not None:
                    print(f"  pgNumType found: fmt={pgNumType.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}fmt')}, start={pgNumType.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}start')}")
                else:
                    print("  No pgNumType found")

# Check direct body child sectPr at the very end
sectPr = body.find('w:sectPr', namespaces)
if sectPr is not None:
    print(f"End of body sectPr:")
    pgNumType = sectPr.find('w:pgNumType', namespaces)
    if pgNumType is not None:
        print(f"  pgNumType found: fmt={pgNumType.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}fmt')}, start={pgNumType.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}start')}")
    else:
        print("  No pgNumType found")
