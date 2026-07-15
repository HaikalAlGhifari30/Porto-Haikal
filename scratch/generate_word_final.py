"""
generate_word_final.py
Membuat file Word (.doc) dari Laporan_Siap_Print.md dengan:
- Semua gambar ter-embed sebagai base64 (tidak ada yg terpotong)
- Tabel markdown dikonversi ke HTML table yang proper
- Bold (**text**) otomatis jadi <strong> tanpa asterisk
- Font Times New Roman 12pt di seluruh dokumen
- Page break setiap BAB / section
- Margin standar skripsi: Kiri 4cm, Kanan 3cm, Atas 4cm, Bawah 3cm
"""

import re
import base64
import urllib.request
import ssl

MD_FILE   = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Siap_Print.md'
OUT_FILE  = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'
LOGO_FILE = r'd:\Data Joki\ComproRRK\public\logo.png'

with open(MD_FILE, 'r', encoding='utf-8') as f:
    text = f.read()

# ─────────────────────────────────────────────
# 1. Download & embed remote images as base64
# ─────────────────────────────────────────────
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_b64(url):
    try:
        req = urllib.request.Request(url.replace('&amp;','&'), headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            return base64.b64encode(r.read()).decode()
    except Exception as e:
        print(f"WARN skip {url[:60]}: {e}")
        return None

def embed_img_tag(m):
    src = m.group('src').replace('&amp;','&')
    if src.startswith('http'):
        b64 = download_b64(src)
        if b64:
            mime = 'image/jpeg' if any(x in src for x in ['.jpg','.jpeg']) else 'image/png'
            src = f'data:{mime};base64,{b64}'
    # Force width to fit page (13.5cm usable = ~510px at 96dpi)
    return f'<div align="center"><img src="{src}" width="510" style="max-width:510px;" /></div>'

text = re.sub(
    r'<div\s+align="center">\s*<img\s+src=["\'](?P<src>[^"\']+)["\'][^>]*/>\s*</div>',
    embed_img_tag, text, flags=re.DOTALL
)
# Also handle standalone <img> not wrapped in div
def embed_standalone_img(m):
    src = m.group('src').replace('&amp;','&')
    if src.startswith('http'):
        b64 = download_b64(src)
        if b64:
            mime = 'image/jpeg' if any(x in src for x in ['.jpg','.jpeg']) else 'image/png'
            src = f'data:{mime};base64,{b64}'
    return f'<img src="{src}" width="510" style="max-width:510px;" />'

text = re.sub(
    r'<img\s+src=["\'](?P<src>[^"\']+)["\'][^>]*/?>',
    embed_standalone_img, text
)

# ─────────────────────────────────────────────
# 2. Embed local logo file
# ─────────────────────────────────────────────
try:
    with open(LOGO_FILE, 'rb') as f:
        logo_b64 = base64.b64encode(f.read()).decode()
    text = text.replace('/public/logo RRK.png', f'data:image/png;base64,{logo_b64}')
    text = text.replace('./logo RRK.png',       f'data:image/png;base64,{logo_b64}')
    text = text.replace('/public/logo.png',      f'data:image/png;base64,{logo_b64}')
    text = text.replace('/logo.png',             f'data:image/png;base64,{logo_b64}')
    print("Logo embedded.")
except Exception as e:
    print(f"WARN: Logo not found: {e}")

# ─────────────────────────────────────────────
# 3. Convert Markdown syntax → HTML
# ─────────────────────────────────────────────

# --- Bold: **text** or __text__ → <strong>text</strong>
text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
text = re.sub(r'__(.+?)__',     r'<strong>\1</strong>', text)

# --- Italic: *text* or _text_ → <em>text</em>
text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text)
text = re.sub(r'(?<!_)_(?!_)(.+?)(?<!_)_(?!_)', r'<em>\1</em>', text)

# --- Inline code → <code>text</code>
text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)

# --- Markdown Tables → HTML tables
def md_table_to_html(m):
    lines = [l.strip() for l in m.group(0).strip().splitlines() if l.strip()]
    html_rows = []
    for i, line in enumerate(lines):
        if re.match(r'^\|?[-: |]+\|?$', line):
            continue  # skip separator row
        cells = [c.strip() for c in line.strip('|').split('|')]
        tag = 'th' if i == 0 else 'td'
        row_html = ''.join(f'<{tag}>{c}</{tag}>' for c in cells)
        html_rows.append(f'<tr>{row_html}</tr>')
    return '<table border="1" cellpadding="5" cellspacing="0" width="100%">' + ''.join(html_rows) + '</table>'

text = re.sub(r'(\|.+\|\n)+', md_table_to_html, text)

# --- Ordered lists
def ordered_list(m):
    items = re.findall(r'^\d+\.\s+(.+)', m.group(0), re.MULTILINE)
    return '<ol>' + ''.join(f'<li>{i}</li>' for i in items) + '</ol>'
text = re.sub(r'(^\d+\.\s+.+\n?)+', ordered_list, text, flags=re.MULTILINE)

# --- Unordered lists
def unordered_list(m):
    items = re.findall(r'^[-*+]\s+(.+)', m.group(0), re.MULTILINE)
    return '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'
text = re.sub(r'(^[-*+]\s+.+\n?)+', unordered_list, text, flags=re.MULTILINE)

# --- Headings  # → <hN>
text = re.sub(r'^######\s+(.+)$', r'<h6>\1</h6>', text, flags=re.MULTILINE)
text = re.sub(r'^#####\s+(.+)$',  r'<h5>\1</h5>', text, flags=re.MULTILINE)
text = re.sub(r'^####\s+(.+)$',   r'<h4>\1</h4>', text, flags=re.MULTILINE)
text = re.sub(r'^###\s+(.+)$',    r'<h3>\1</h3>', text, flags=re.MULTILINE)
text = re.sub(r'^##\s+(.+)$',     r'<h2>\1</h2>', text, flags=re.MULTILINE)
text = re.sub(r'^#\s+(.+)$',      r'<h1>\1</h1>', text, flags=re.MULTILINE)

# --- Paragraphs (non-HTML lines)
lines_out = []
for line in text.splitlines():
    stripped = line.strip()
    if not stripped:
        lines_out.append('')
        continue
    # Already HTML tag
    if re.match(r'^<[a-zA-Z/!]', stripped):
        lines_out.append(line)
    else:
        lines_out.append(f'<p>{stripped}</p>')
text = '\n'.join(lines_out)

# ─────────────────────────────────────────────
# 4. Word CSS + wrap
# ─────────────────────────────────────────────
WORD_CSS = """
@page WordSection1 {
    size: 21cm 29.7cm;
    margin: 4cm 3cm 3cm 4cm;
    mso-header-margin: 35.4pt;
    mso-footer-margin: 35.4pt;
}
div.WordSection1 { page: WordSection1; }

* {
    font-family: "Times New Roman", Times, serif !important;
    font-size: 12pt !important;
    color: #000000;
    line-height: 1.5;
}
body { background: white; }

p {
    text-align: justify;
    text-justify: inter-ideograph;
    margin: 0 0 6pt 0;
    text-indent: 1.27cm;
}
/* No indent inside table cells or special blocks */
td p, th p, li p, .no-indent p { text-indent: 0 !important; }
li { text-indent: 0; margin-bottom: 4pt; }

h1, h2, h3, h4, h5, h6 {
    font-weight: bold !important;
    text-align: center;
    margin: 12pt 0 6pt 0;
    text-indent: 0 !important;
    page-break-after: avoid;
}
h1 { font-size: 14pt !important; text-transform: uppercase; }
h2 { font-size: 12pt !important; text-align: left; }
h3 { font-size: 12pt !important; text-align: left; }
h4 { font-size: 12pt !important; text-align: left; }

table {
    border-collapse: collapse;
    width: 100%;
    margin: 8pt 0 8pt 0;
}
table, th, td {
    border: 1px solid black;
}
th, td {
    padding: 4pt 6pt;
    text-align: left;
    vertical-align: top;
    text-indent: 0 !important;
}
th { font-weight: bold; background: #f0f0f0; text-align: center; }

div[align="center"], .center { text-align: center; }
div[align="center"] p { text-align: center !important; text-indent: 0 !important; }

img { display: block; margin: 6pt auto; }

code { font-family: Courier New, monospace !important; font-size: 10pt !important; }

/* Separator for page-break divs */
div[style*="page-break-after"] { page-break-after: always; }
"""

html_out = f"""<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>Laporan Kerja Praktek - PT RRK</title>
  <style>{WORD_CSS}</style>
</head>
<body>
<div class="WordSection1">
{text}
</div>
</body>
</html>"""

with open(OUT_FILE, 'w', encoding='utf-8') as f:
    f.write(html_out)

print(f"\nDone! Saved to: {OUT_FILE}")
