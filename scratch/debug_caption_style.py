import docx
doc = docx.Document()
p = doc.add_paragraph(style='Caption')
print("Style name:", p.style.name)
print("Style XML:", p._p.xml)
