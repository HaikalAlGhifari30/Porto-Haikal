import docx
doc = docx.Document()

# Print all paragraph styles in doc
print("Paragraph styles in python-docx default template:")
for s in doc.styles:
    if s.type == docx.enum.style.WD_STYLE_TYPE.PARAGRAPH:
        if "caption" in s.name.lower():
            print(f"Name: '{s.name}' | ID: '{s.style_id}'")
