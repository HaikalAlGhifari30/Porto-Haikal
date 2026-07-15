"""
generate_word_clean.py  – CLEAN REWRITE
Builds a proper Word HTML file from Laporan_Lengkap.md (the one with raw mermaid blocks).

Strategy:
  1. Strip <style> block (it must not appear as text in Word).
  2. Replace page-break divs with a proper Word page-break paragraph.
  3. Unwrap <div align="center"> – push text-align:center onto child paragraphs instead.
  4. Render mermaid blocks → base64 PNG (pre-scaled to 530px via Pillow).
  5. Convert remaining markdown (bold, italic, headings, tables, lists) to HTML.
  6. Wrap non-HTML lines in <p>.
  7. Assemble the final Word-compatible HTML.
"""

import re, base64, io, ssl, urllib.request
from PIL import Image

SRC_FILE  = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'
OUT_FILE  = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'
LOGO_FILE = r'd:\Data Joki\ComproRRK\public\logo.png'

MAX_W = 530   # pixels – equals ~14cm at 96 dpi

# ── SSL context (bypass expired certs) ───────────────────────────────────────
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode    = ssl.CERT_NONE
HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def to_b64_png(img_bytes, max_w=MAX_W):
    """Resize image to ≤max_w wide, convert to white-bg PNG, return base64 str."""
    img = Image.open(io.BytesIO(img_bytes)).convert('RGBA')
    if img.width > max_w:
        img = img.resize((max_w, int(img.height * max_w / img.width)), Image.LANCZOS)
    bg = Image.new('RGB', img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3])
    buf = io.BytesIO(); bg.save(buf, 'PNG'); buf.seek(0)
    return base64.b64encode(buf.read()).decode()

def fetch_b64(url):
    try:
        req = urllib.request.Request(url.replace('&amp;','&'), headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            data = r.read()
        b64 = to_b64_png(data)
        print(f"  OK {url[:55]}")
        return b64
    except Exception as e:
        print(f"  FAIL {url[:55]}: {e}")
        return None

# ── Load source ───────────────────────────────────────────────────────────────
with open(SRC_FILE, encoding='utf-8') as f:
    src = f.read()

# ── 1. Remove <style>…</style> blocks ────────────────────────────────────────
src = re.sub(r'<style[^>]*>.*?</style>', '', src, flags=re.DOTALL | re.IGNORECASE)

# ── 2. Render mermaid blocks → centered <img> ─────────────────────────────────
def render_mermaid(m):
    code = m.group(1).strip()
    # Inject neutral theme so nodes are white
    if '%%{init' not in code:
        init = ("%%{init: {'theme':'neutral','themeVariables':{"
                "'background':'#ffffff','primaryColor':'#ffffff',"
                "'primaryTextColor':'#000000','primaryBorderColor':'#000000',"
                "'lineColor':'#000000','secondaryColor':'#ffffff','tertiaryColor':'#ffffff',"
                "'actorBkg':'#ffffff','actorBorder':'#000000','actorTextColor':'#000000',"
                "'noteBkgColor':'#ffffff','noteBorderColor':'#000000'}}}%%\n")
        code = init + code
    # Force white fills in flowchart classDef
    code = re.sub(r'fill:#(?!ffffff)[0-9a-fA-F]{6}', 'fill:#ffffff', code)

    encoded = base64.urlsafe_b64encode(code.encode()).decode()
    url = f'https://mermaid.ink/img/{encoded}?bgColor=ffffff'
    b64 = fetch_b64(url)
    if b64:
        return f'\n<IMG_CENTER>data:image/png;base64,{b64}</IMG_CENTER>\n'
    return ''   # skip if failed

src = re.sub(r'```mermaid(.*?)```', render_mermaid, src, flags=re.DOTALL)

# ── 3. Embed local logo ───────────────────────────────────────────────────────
try:
    with open(LOGO_FILE, 'rb') as f: logo_bytes = f.read()
    logo_b64 = to_b64_png(logo_bytes, max_w=200)
    logo_tag = f'data:image/png;base64,{logo_b64}'
    for pat in ['/public/logo RRK.png', '/public/logo.png', '/logo.png', './logo.png']:
        src = src.replace(pat, logo_tag)
    print("Logo embedded.")
except Exception as e:
    print(f"WARN logo: {e}")

# ── 4. Flatten <div align="center"> regions ───────────────────────────────────
# Mark content inside these divs so we can center it later
def flatten_center_div(m):
    inner = m.group(1)
    return f'\n<CENTER_BLOCK>\n{inner}\n</CENTER_BLOCK>\n'

src = re.sub(
    r'<div\s+align=["\']center["\'][^>]*>(.*?)</div>',
    flatten_center_div, src, flags=re.DOTALL | re.IGNORECASE
)

# ── 5. Replace page-break divs ────────────────────────────────────────────────
src = re.sub(
    r'<div[^>]*page-break-after[^>]*>\s*</div>',
    '\n<PAGEBREAK/>\n', src, flags=re.IGNORECASE
)

# Remove any remaining <div> / </div> tags (they cause Word layout chaos)
src = re.sub(r'</?div[^>]*>', '', src, flags=re.IGNORECASE)

# ── 6. Embed remote <img> tags ────────────────────────────────────────────────
def embed_remote_img(m):
    src_url = m.group('src').replace('&amp;','&')
    if src_url.startswith('data:'):
        return m.group(0)
    if src_url.startswith('http'):
        b64 = fetch_b64(src_url)
        if b64:
            return f'<IMG_CENTER>data:image/png;base64,{b64}</IMG_CENTER>'
    return ''

src = re.sub(r'<img\s[^>]*src=["\'](?P<src>[^"\']+)["\'][^>]*/?>',
             embed_remote_img, src, flags=re.IGNORECASE)

# ── 7. Markdown → HTML ────────────────────────────────────────────────────────
# Bold / italic
src = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', src)
src = re.sub(r'__(.+?)__',     r'<strong>\1</strong>', src)
src = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', src)

# Inline code
src = re.sub(r'`([^`]+)`', r'<code>\1</code>', src)

# Tables
def md_table(m):
    lines = [l.strip() for l in m.group(0).strip().splitlines() if l.strip()]
    rows, head = [], False
    for line in lines:
        if re.match(r'^[\|:\- ]+$', line): continue
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line.strip('|'))]
        tag = 'th' if not head else 'td'
        rows.append('<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in cells) + '</tr>')
        head = True
    return ('\n<table border="1" cellpadding="5" cellspacing="0" width="100%">\n'
            + '\n'.join(rows) + '\n</table>\n') if rows else m.group(0)

src = re.sub(r'(\|.+(?:\n|$))+', md_table, src)

# Lists
def ol(m):
    items = re.findall(r'^\d+\.\s+(.+)', m.group(0), re.MULTILINE)
    return '<ol>' + ''.join(f'<li>{i}</li>' for i in items) + '</ol>\n'
src = re.sub(r'(?:^\d+\.\s+.+\n?)+', ol, src, flags=re.MULTILINE)

def ul(m):
    items = re.findall(r'^[-*+]\s+(.+)', m.group(0), re.MULTILINE)
    return '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>\n'
src = re.sub(r'(?:^[-*+]\s+.+\n?)+', ul, src, flags=re.MULTILINE)

# Headings
for n in range(6, 0, -1):
    src = re.sub(rf'^{"#"*n}\s+(.+)$', rf'<h{n}>\1</h{n}>', src, flags=re.MULTILINE)

# ── 8. Render to final HTML lines ─────────────────────────────────────────────
lines = src.splitlines()
out   = []
in_center = False

i = 0
while i < len(lines):
    line = lines[i]
    stripped = line.strip()

    # Page break
    if stripped == '<PAGEBREAK/>':
        out.append('<p style="page-break-after:always; margin:0;">&nbsp;</p>')
        i += 1; continue

    # Center block start
    if stripped == '<CENTER_BLOCK>':
        in_center = True; i += 1; continue

    # Center block end
    if stripped == '</CENTER_BLOCK>':
        in_center = False; i += 1; continue

    # IMG_CENTER – centred image paragraph
    img_m = re.match(r'<IMG_CENTER>(.*?)</IMG_CENTER>', stripped, re.DOTALL)
    if img_m:
        src_val = img_m.group(1)
        out.append(
            f'<p align="center" style="text-indent:0;margin:6pt 0;">'
            f'<img src="{src_val}" width="{MAX_W}" /></p>'
        )
        i += 1; continue

    # Empty line
    if not stripped:
        out.append('')
        i += 1; continue

    # Already HTML tag lines – pass through
    if re.match(r'^<[a-zA-Z/!]', stripped):
        # If we're in a center block and it's a heading or paragraph, add align
        if in_center and re.match(r'^<(h[1-6]|p)[ >]', stripped, re.IGNORECASE):
            stripped = re.sub(r'^<(h[1-6]|p)', lambda m: f'<{m.group(1)} align="center" style="text-indent:0"', stripped)
        out.append(stripped)
        i += 1; continue

    # Plain text → paragraph
    align = ' align="center" style="text-indent:0"' if in_center else ''
    out.append(f'<p{align}>{stripped}</p>')
    i += 1

html_body = '\n'.join(out)

# ── 9. CSS ────────────────────────────────────────────────────────────────────
CSS = f"""
@page WordSection1 {{
    size: 21cm 29.7cm;
    margin: 4cm 3cm 3cm 4cm;
}}
div.WordSection1 {{ page: WordSection1; }}

body {{
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    background: white;
    color: black;
}}
p {{
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    text-align: justify;
    text-justify: inter-ideograph;
    margin: 0 0 6pt 0;
    text-indent: 1.27cm;
    line-height: 1.5;
    color: black;
}}
p[align="center"] {{ text-align: center !important; text-indent: 0 !important; }}
li {{
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    margin-bottom: 3pt;
    text-indent: 0;
    color: black;
}}
h1, h2, h3, h4, h5, h6 {{
    font-family: "Times New Roman", Times, serif;
    font-weight: bold;
    margin: 12pt 0 6pt 0;
    line-height: 1.5;
    text-indent: 0;
    color: black;
    page-break-after: avoid;
}}
h1 {{ font-size: 14pt; text-align: center; text-transform: uppercase; }}
h2 {{ font-size: 12pt; text-align: left; }}
h3 {{ font-size: 12pt; text-align: left; }}
h4 {{ font-size: 12pt; text-align: left; }}
h5 {{ font-size: 12pt; text-align: left; }}
table {{
    border-collapse: collapse;
    width: 100%;
    margin: 8pt 0;
    page-break-inside: avoid;
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
}}
th, td {{
    border: 1px solid black;
    padding: 4pt 6pt;
    text-align: left;
    vertical-align: top;
    text-indent: 0;
    line-height: 1.5;
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    color: black;
}}
th {{ font-weight: bold; background: #f0f0f0; text-align: center; }}
img {{
    display: block;
    margin: 6pt auto;
}}
code {{
    font-family: "Courier New", monospace;
    font-size: 10pt;
}}
strong {{ font-weight: bold; }}
em {{ font-style: italic; }}
"""

# ── 10. Final HTML document ───────────────────────────────────────────────────
doc = f"""<html xmlns:o="urn:schemas-microsoft-com:office:office"
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
{html_body}
</div>
</body>
</html>"""

with open(OUT_FILE, 'w', encoding='utf-8') as f:
    f.write(doc)
print(f"\nDone! -> {OUT_FILE}")
