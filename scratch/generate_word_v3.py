"""
generate_word_v3.py
Fix: Pre-scale ALL images to exactly 530px wide using Pillow before embedding.
This makes the actual image data fit the page, so Word cannot ignore the sizing.
"""

import re, base64, io, ssl, urllib.request
from PIL import Image

MD_FILE   = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Siap_Print.md'
OUT_FILE  = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'
LOGO_FILE = r'd:\Data Joki\ComproRRK\public\logo.png'

# 530px @ 96dpi ≈ 14.0cm  (A4 - left 4cm - right 3cm = 14cm usable)
MAX_WIDTH_PX = 530

with open(MD_FILE, 'r', encoding='utf-8') as f:
    text = f.read()

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_and_resize(url):
    """Download image, resize width to MAX_WIDTH_PX (preserve aspect), return base64 PNG."""
    try:
        url = url.replace('&amp;', '&')
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            raw = r.read()
        img = Image.open(io.BytesIO(raw)).convert('RGBA')
        if img.width > MAX_WIDTH_PX:
            ratio  = MAX_WIDTH_PX / img.width
            new_h  = int(img.height * ratio)
            img    = img.resize((MAX_WIDTH_PX, new_h), Image.LANCZOS)
        # Convert to RGB (PNG with white bg) before encoding
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
        buf = io.BytesIO()
        bg.save(buf, format='PNG', optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode()
        print(f"  OK {url[:55]} -> {img.width}x{img.height}px")
        return b64
    except Exception as e:
        print(f"  FAIL {url[:55]}: {e}")
        return None

def resize_local(path):
    try:
        img = Image.open(path).convert('RGBA')
        if img.width > MAX_WIDTH_PX:
            ratio = MAX_WIDTH_PX / img.width
            img = img.resize((MAX_WIDTH_PX, int(img.height * ratio)), Image.LANCZOS)
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
        buf = io.BytesIO()
        bg.save(buf, format='PNG')
        return base64.b64encode(buf.getvalue()).decode()
    except Exception as e:
        print(f"  FAIL local {path}: {e}")
        return None

# ── 1. Embed <div align="center"><img .../></div> blocks
def embed_center_img(m):
    src = m.group('src').replace('&amp;', '&')
    if src.startswith('data:'):
        return m.group(0)
    b64 = download_and_resize(src) if src.startswith('http') else None
    if b64:
        src = f'data:image/png;base64,{b64}'
    return (
        f'<p align="center" style="text-indent:0;margin:6pt 0;">'
        f'<img src="{src}" width="{MAX_WIDTH_PX}" height="auto" />'
        f'</p>'
    )

text = re.sub(
    r'<div[^>]*align=["\']center["\'][^>]*>\s*<img\s[^>]*src=["\'](?P<src>[^"\']+)["\'][^>]*/>\s*</div>',
    embed_center_img, text, flags=re.DOTALL
)

# ── 2. Embed remaining standalone <img> tags
def embed_standalone_img(m):
    src = m.group('src').replace('&amp;', '&')
    if src.startswith('data:'):
        return m.group(0)
    b64 = download_and_resize(src) if src.startswith('http') else None
    if b64:
        src = f'data:image/png;base64,{b64}'
    return (
        f'<p align="center" style="text-indent:0;margin:6pt 0;">'
        f'<img src="{src}" width="{MAX_WIDTH_PX}" height="auto" />'
        f'</p>'
    )

text = re.sub(r'<img\s[^>]*src=["\'](?P<src>[^"\']+)["\'][^>]*/?>',
              embed_standalone_img, text)

# ── 3. Embed local logo
logo_b64 = resize_local(LOGO_FILE)
if logo_b64:
    for pat in ['/public/logo RRK.png', './logo RRK.png', '/public/logo.png', '/logo.png']:
        text = text.replace(pat, f'data:image/png;base64,{logo_b64}')
    print("Logo embedded.")

# ── 4. Markdown → HTML
text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
text = re.sub(r'__(.+?)__',     r'<strong>\1</strong>', text)
text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text)
text = re.sub(r'(?<!_)_(?!_)(.+?)(?<!_)_(?!_)', r'<em>\1</em>', text)
text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)

def md_table_to_html(m):
    lines = [l for l in m.group(0).strip().splitlines() if l.strip()]
    rows, header_done = [], False
    for line in lines:
        if re.match(r'^[\|\s\-:]+$', line):
            continue
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line.strip('|'))]
        if not header_done:
            rows.append('<tr>' + ''.join(f'<th>{c}</th>' for c in cells) + '</tr>')
            header_done = True
        else:
            rows.append('<tr>' + ''.join(f'<td>{c}</td>' for c in cells) + '</tr>')
    return '\n<table border="1" cellpadding="5" cellspacing="0" width="100%">\n' + '\n'.join(rows) + '\n</table>\n' if rows else m.group(0)

text = re.sub(r'(\|.+(?:\n|$))+', md_table_to_html, text)

def ordered_list(m):
    items = re.findall(r'^\d+\.\s+(.+)', m.group(0), re.MULTILINE)
    return '<ol>' + ''.join(f'<li>{i}</li>' for i in items) + '</ol>\n'
text = re.sub(r'(?:^\d+\.\s+.+\n?)+', ordered_list, text, flags=re.MULTILINE)

def unordered_list(m):
    items = re.findall(r'^[-*+]\s+(.+)', m.group(0), re.MULTILINE)
    return '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>\n'
text = re.sub(r'(?:^[-*+]\s+.+\n?)+', unordered_list, text, flags=re.MULTILINE)

for n in range(6, 0, -1):
    text = re.sub(rf'^{"#"*n}\s+(.+)$', rf'<h{n}>\1</h{n}>', text, flags=re.MULTILINE)

lines_out = []
for line in text.splitlines():
    s = line.strip()
    if not s:
        lines_out.append('')
    elif re.match(r'^<[a-zA-Z/!]', s):
        lines_out.append(line)
    else:
        lines_out.append(f'<p>{s}</p>')
text = '\n'.join(lines_out)

# ── 5. Build Word HTML
CSS = f"""
@page WordSection1 {{
    size: 21cm 29.7cm;
    margin: 4cm 3cm 3cm 4cm;
}}
div.WordSection1 {{ page: WordSection1; }}
* {{
    font-family: "Times New Roman", Times, serif !important;
    font-size: 12pt !important;
    color: black;
}}
body {{ background: white; }}
p {{
    text-align: justify;
    text-justify: inter-ideograph;
    margin: 0 0 6pt 0;
    text-indent: 1.27cm;
    line-height: 1.5;
}}
p[align="center"] {{ text-align: center !important; text-indent: 0 !important; }}
div[align="center"] {{ text-align: center; }}
div[align="center"] p {{ text-align: center !important; text-indent: 0 !important; }}
td p, th p, li p {{ text-indent: 0 !important; }}
li {{ text-indent: 0; margin-bottom: 3pt; line-height: 1.5; }}
h1, h2, h3, h4, h5, h6 {{
    font-weight: bold !important;
    text-align: center;
    margin: 12pt 0 6pt 0;
    text-indent: 0 !important;
    line-height: 1.5;
    page-break-after: avoid;
}}
h1 {{ font-size: 14pt !important; text-transform: uppercase; }}
h2 {{ font-size: 12pt !important; text-align: left; }}
h3 {{ font-size: 12pt !important; text-align: left; }}
h4 {{ font-size: 12pt !important; text-align: left; }}
table {{ border-collapse: collapse; width: 100%; margin: 8pt 0; page-break-inside: avoid; }}
th, td {{ border: 1px solid black; padding: 4pt 6pt; text-align: left; vertical-align: top; text-indent: 0 !important; line-height: 1.5; }}
th {{ font-weight: bold !important; background: #f0f0f0; text-align: center; }}
img {{ display: block; margin: 6pt auto; width: {MAX_WIDTH_PX}px; height: auto; }}
code {{ font-family: "Courier New", monospace !important; font-size: 10pt !important; }}
div[style*="page-break"] {{ page-break-after: always; mso-break-type: section-break; }}
"""

html_out = f"""<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <meta name="ProgId" content="Word.Document">
  <title>Laporan Kerja Praktek - PT RRK</title>
  <style>{CSS}</style>
</head>
<body>
<div class="WordSection1">
{text}
</div>
</body>
</html>"""

with open(OUT_FILE, 'w', encoding='utf-8') as f:
    f.write(html_out)
print(f"\nDone! -> {OUT_FILE}")
