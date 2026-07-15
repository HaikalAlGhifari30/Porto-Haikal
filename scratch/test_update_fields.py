import docx
doc = docx.Document()
try:
    doc.settings.update_fields = True
    print("Success! doc.settings.update_fields = True works!")
except Exception as e:
    print(f"Failed: {e}")
