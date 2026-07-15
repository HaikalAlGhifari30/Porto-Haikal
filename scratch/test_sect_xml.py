import docx
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = docx.Document()
new_sec = doc.add_section()

sectPr = new_sec._sectPr
print("BEFORE:")
for child in sectPr:
    print("  ", child.tag)

# Apply numbering
pgNumType = OxmlElement('w:pgNumType')
inserted = False
for child in sectPr:
    if child.tag in (qn('w:cols'), qn('w:docGrid'), qn('w:vAlign'), qn('w:formProt')):
        child.addprevious(pgNumType)
        inserted = True
        break
if not inserted:
    sectPr.append(pgNumType)

print("\nAFTER:")
for child in sectPr:
    print("  ", child.tag)
