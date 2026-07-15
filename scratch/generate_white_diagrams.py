import re
import base64

md_file = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'
out_file = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Siap_Print.md'

with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_mermaid(match):
    code = match.group(1).strip()

    # Inject init theme at the top if not already there
    if '%%{init' not in code:
        code = "%%{init: {'theme': 'neutral', 'themeVariables': {'background': '#ffffff', 'primaryColor': '#ffffff', 'primaryTextColor': '#000000', 'primaryBorderColor': '#000000', 'lineColor': '#000000', 'secondaryColor': '#ffffff', 'tertiaryColor': '#ffffff', 'actorBkg': '#ffffff', 'actorBorder': '#000000', 'actorTextColor': '#000000', 'labelBoxBkgColor': '#ffffff', 'labelBoxBorderColor': '#000000', 'loopTextColor': '#000000', 'noteBkgColor': '#ffffff', 'noteBorderColor': '#000000', 'noteFillColor': '#ffffff'}}}%%\n" + code

    # For flowcharts that use classDef, force white fill 
    if code.startswith('flowchart') or code.startswith('%%') and 'flowchart' in code:
        # Replace any non-white fill colors
        code = re.sub(r'fill:#(?!ffffff)[0-9a-fA-F]{6}', 'fill:#ffffff', code)

    encoded = base64.urlsafe_b64encode(code.encode('utf-8')).decode('utf-8')
    img_url = f'https://mermaid.ink/img/{encoded}?bgColor=ffffff'
    return f'<div align="center">\n<img src="{img_url}" alt="Diagram" style="max-width: 100%;" />\n</div>'

new_content = re.sub(r'```mermaid(.*?)```', replace_mermaid, content, flags=re.DOTALL)

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Done! White background applied to all diagrams.")
