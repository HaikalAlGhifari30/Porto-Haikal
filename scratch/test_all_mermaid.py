import re
import base64
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

SRC_FILE = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0e56245d-303e-4e0e-a812-ea8f17fa3d46\Laporan_Lengkap.md'

with open(SRC_FILE, encoding='utf-8') as f:
    src = f.read()

mermaid_blocks = re.findall(r'```mermaid(.*?)```', src, flags=re.DOTALL)
print(f"Found {len(mermaid_blocks)} mermaid blocks.")

init = ("%%{init: {'theme':'neutral','themeVariables':{"
        "'background':'#ffffff','primaryColor':'#ffffff',"
        "'primaryTextColor':'#000000','primaryBorderColor':'#000000',"
        "'lineColor':'#000000','secondaryColor':'#ffffff','tertiaryColor':'#ffffff',"
        "'actorBkg':'#ffffff','actorBorder':'#000000','actorTextColor':'#000000',"
        "'noteBkgColor':'#ffffff','noteBorderColor':'#000000'}}}%%\n")

for idx, block in enumerate(mermaid_blocks):
    code = block.strip()
    full_code = init + code
    full_code = re.sub(r'fill:#(?!ffffff)[0-9a-fA-F]{6}', 'fill:#ffffff', full_code)
    
    encoded = base64.urlsafe_b64encode(full_code.encode()).decode().rstrip('=')
    url = f'https://mermaid.ink/img/{encoded}'
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as r:
            data = r.read()
        print(f"Block {idx}: OK (size {len(data)})")
    except Exception as e:
        print(f"Block {idx}: FAIL: {e}")
        # Print a snippet of the code
        print("Code snippet:")
        print(code[:150] + "...")
        print("URL:", url[:120] + "...")
