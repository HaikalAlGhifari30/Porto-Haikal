import docx

doc = docx.Document()
try:
    p = doc.add_paragraph(style='Caption')
    print("Success! style='Caption' is supported by python-docx default template!")
except Exception as e:
    print(f"Failed: {e}")
