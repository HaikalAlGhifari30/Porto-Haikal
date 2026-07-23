import base64
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

code = """flowchart TD
    classDef top fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000,rx:5px,ry:5px;
    classDef mid fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000,rx:5px,ry:5px;
    classDef bot fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000,rx:5px,ry:5px;
    classDef staff fill:#ffffff,stroke:#000000,stroke-width:1px,color:#000000,rx:5px,ry:5px;

    K["Komisaris"]:::top --> DU["Direktur Utama"]:::top
    DU --> D["Direktur"]:::top
    
    D --> MA["Manager Accounting"]:::mid
    D --> MP["Manager Personalia & Administrasion"]:::mid
    D --> MS["Manager Sales"]:::mid
    
    MA --> FA["Finance & Accounting"]:::bot
    
    MP --> HR["Human Resources & General Affairs"]:::bot
    MP --> SQO["SQO <br> Sales Quality Officer"]:::bot
    HR --> ES["Executive Security"]:::staff
    
    MS --> SPV["SPV Sales"]:::bot
    SPV --> S["Sales"]:::staff
    linkStyle default stroke:#000000,stroke-width:2px;"""

init = ("%%{init: {'theme':'neutral','themeVariables':{"
        "'background':'#ffffff','primaryColor':'#ffffff',"
        "'primaryTextColor':'#000000','primaryBorderColor':'#000000',"
        "'lineColor':'#000000','secondaryColor':'#ffffff','tertiaryColor':'#ffffff',"
        "'actorBkg':'#ffffff','actorBorder':'#000000','actorTextColor':'#000000',"
        "'noteBkgColor':'#ffffff','noteBorderColor':'#000000'}}}%%\n")

full_code = init + code
encoded = base64.urlsafe_b64encode(full_code.encode()).decode()

# Try with and without padding, and with and without query params
urls = [
    f'https://mermaid.ink/img/{encoded}',
    f'https://mermaid.ink/img/{encoded.rstrip("=")}',
    f'https://mermaid.ink/img/{encoded}?bgColor=ffffff',
    f'https://mermaid.ink/img/{encoded.rstrip("=")}?bgColor=ffffff',
]

for url in urls:
    print("\nTrying URL:", url[:100] + "...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as r:
            print("STATUS:", r.status)
    except Exception as e:
        print("ERROR:", e)
