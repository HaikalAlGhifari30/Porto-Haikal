import re
import base64
import os

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'
out_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Siap_Print.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_mermaid(match):
    code = match.group(1).strip()
    # base64 encode
    encoded = base64.urlsafe_b64encode(code.encode('utf-8')).decode('utf-8')
    # Use bgColor=ffffff to force a white background for PDF
    img_url = f'https://mermaid.ink/img/{encoded}?bgColor=ffffff'
    return f'<div align="center">\n<img src="{img_url}" alt="Diagram" style="max-width: 100%;" />\n</div>'

new_content = re.sub(r'```mermaid(.*?)```', replace_mermaid, content, flags=re.DOTALL)

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
