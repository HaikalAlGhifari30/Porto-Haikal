import base64
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

code = """flowchart TD
    Start((Mulai)) --> B["Buka halaman Login"]
    B --> C["Masukkan Email & Password"]
    C --> D["Tekan tombol Login"]
    D --> E{Validasi Kredensial?}
    E -- Valid --> F["Sistem membuat Sesi"]
    F --> G["Arahkan ke Dashboard CMS"]
    E -- Tidak Valid --> H["Tampilkan pesan Error"]
    H --> B
    G --> Selesai_Node((Selesai))
    linkStyle default stroke:#000000,stroke-width:2px;"""

init = ("%%{init: {'theme':'neutral','themeVariables':{"
        "'background':'#ffffff','primaryColor':'#ffffff',"
        "'primaryTextColor':'#000000','primaryBorderColor':'#000000',"
        "'lineColor':'#000000','secondaryColor':'#ffffff','tertiaryColor':'#ffffff',"
        "'actorBkg':'#ffffff','actorBorder':'#000000','actorTextColor':'#000000',"
        "'noteBkgColor':'#ffffff','noteBorderColor':'#000000'}}}%%\n")

full_code = init + code
encoded = base64.urlsafe_b64encode(full_code.encode()).decode().rstrip('=')
url = f'https://mermaid.ink/img/{encoded}'

print("URL length:", len(url))
print("URL:", url)

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10, context=ctx) as r:
        print("Success! Status:", r.status)
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.reason)
    try:
        body = e.read().decode('utf-8')
        print("Error response body:", body)
    except Exception as read_err:
        print("Could not read body:", read_err)
except Exception as e:
    print("Other Error:", e)
