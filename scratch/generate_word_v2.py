"""
generate_word_v2.py
Fix images being cut off by using proper Word-compatible img sizing.
Key fix: use style="width:14cm;" to force images to fit within A4 usable area.
"""

import re
import base64
import urllib.request
import ssl

MD_FILE  = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Siap_Print.md'
OUT_FILE = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'
LOGO_FILE = r'd:\Data Joki\ComproRRK\public\logo.png'

with open(MD_FILE, 'r', encoding='utf-8') as f:
    text = f.read()

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_b64(url):
    try:
        url = url.replace('&amp;','&')
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            data = r.read()
            print(f"  OK {url[:60]} ({len(data)//1024}KB)")
            return base64.b64encode(data).decode()
    except Exception as e:
        print(f"  FAIL {url[:60]}: {e}")
        return None

# ── 1. Embed all <img> tags (both inside <div align="center"> and standalone)
def embed_any_img(m):
    tag   = m.group(0)
    src   = m.group('src').replace('&amp;','&')
    if src.startswith('http'):
        b64 = download_b64(src)
        if b64:
            mime = 'image/jpeg' if any(x in src for x in ['.jpg','.jpeg']) else 'image/png'
            src  = f'data:{mime};base64,{b64}'
    # Return image as a centered paragraph with fixed width = 14cm (usable width A4 4/3 margins)
    return (
        f'<p align="center" style="text-indent:0">'
        f'<img src="{src}" style="width:14cm; height:auto; display:block; margin:6pt auto;" />'
        f'</p>'
    )

# Match src value
text = re.sub(
    r'<div[^>]*align=["\']center["\'][^>]*>\s*<img\s[^>]*src=["\'](?P<src>[^"\']+)["\'][^>]*/>\s*</div>',
    embed_any_img, text, flags=re.DOTALL
)
text = re.sub(
    r'<img\s[^>]*src=["\'](?P<src>[^"\']+)["\'][^>]*/?>',
    embed_any_img, text
)

# ── 2. Embed local logo
try:
    with open(LOGO_FILE, 'rb') as f:
        logo_b64 = base64.b64encode(f.read()).decode()
    for pat in ['/public/logo RRK.png', './logo RRK.png', '/public/logo.png', '/logo.png']:
        text = text.replace(pat, f'data:image/png;base64,{logo_b64}')
    print("Logo embedded.")
except Exception as e:
    print(f"WARN logo: {e}")

# ── 3. Markdown → HTML
# Bold
text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
text = re.sub(r'__(.+?)__',     r'<strong>\1</strong>', text)
# Italic
text = re.sub(r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text)
text = re.sub(r'(?<!_)_(?!_)(.+?)(?<!_)_(?!_)', r'<em>\1</em>', text)
# Inline code
text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)

# Markdown tables → HTML
def md_table_to_html(m):
    raw = m.group(0).strip()
    lines = [l for l in raw.splitlines() if l.strip()]
    rows_html = []
    header_done = False
    for line in lines:
        if re.match(r'^\|?[\s\-:|]+\|?$', line.replace(' ','')):
            continue
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line.strip('|'))]
        if not header_done:
            row = ''.join(f'<th align="center">{c}</th>' for c in cells)
            rows_html.append(f'<tr>{row}</tr>')
            header_done = True
        else:
            row = ''.join(f'<td>{c}</td>' for c in cells)
            rows_html.append(f'<tr>{row}</tr>')
    if not rows_html:
        return m.group(0)
    return '\n<table border="1" cellpadding="5" cellspacing="0" width="100%">\n' + '\n'.join(rows_html) + '\n</table>\n'

text = re.sub(r'(\|.+(?:\n|$))+', md_table_to_html, text)

# Ordered lists
def ordered_list(m):
    items = re.findall(r'^\d+\.\s+(.+)', m.group(0), re.MULTILINE)
    lis = ''.join(f'<li>{i}</li>' for i in items)
    return f'<ol>{lis}</ol>\n'
text = re.sub(r'(?:^\d+\.\s+.+\n?)+', ordered_list, text, flags=re.MULTILINE)

# Unordered lists
def unordered_list(m):
    items = re.findall(r'^[-*+]\s+(.+)', m.group(0), re.MULTILINE)
    lis = ''.join(f'<li>{i}</li>' for i in items)
    return f'<ul>{lis}</ul>\n'
text = re.sub(r'(?:^[-*+]\s+.+\n?)+', unordered_list, text, flags=re.MULTILINE)

# Headings
for n in range(6, 0, -1):
    hashes = '#' * n
    text = re.sub(rf'^{hashes}\s+(.+)$', rf'<h{n}>\1</h{n}>', text, flags=re.MULTILINE)

# Paragraphs — wrap non-HTML lines
lines_out = []
for line in text.splitlines():
    stripped = line.strip()
    if not stripped:
        lines_out.append('')
    elif re.match(r'^<[a-zA-Z/!]', stripped):
        lines_out.append(line)
    else:
        lines_out.append(f'<p>{stripped}</p>')
text = '\n'.join(lines_out)

# ── 4. Word CSS
CSS = """
@page WordSection1 {
    size: 21cm 29.7cm;
    margin: 4cm 3cm 3cm 4cm;
}
div.WordSection1 { page: WordSection1; }

body {
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    background: white;
    color: black;
}
* {
    font-family: "Times New Roman", Times, serif !important;
    font-size: 12pt !important;
    color: black;
}
p {
    text-align: justify;
    text-justify: inter-ideograph;
    margin: 0 0 6pt 0;
    text-indent: 1.27cm;
    line-height: 1.5;
}
td p, th p, li p { text-indent: 0 !important; }
li { text-indent: 0; margin-bottom: 3pt; line-height: 1.5; }
p[align="center"] { text-align: center !important; text-indent: 0 !important; }
div[align="center"] p { text-align: center !important; text-indent: 0 !important; }
div[align="center"] { text-align: center; }

h1, h2, h3, h4, h5, h6 {
    font-weight: bold !important;
    text-align: center;
    margin: 12pt 0 6pt 0;
    text-indent: 0 !important;
    line-height: 1.5;
    page-break-after: avoid;
}
h1 { font-size: 14pt !important; text-transform: uppercase; }
h2 { font-size: 12pt !important; text-align: left; }
h3 { font-size: 12pt !important; text-align: left; }
h4 { font-size: 12pt !important; text-align: left; }

table {
    border-collapse: collapse;
    width: 100%;
    margin: 8pt 0;
    page-break-inside: avoid;
}
th, td {
    border: 1px solid black;
    padding: 4pt 6pt;
    text-align: left;
    vertical-align: top;
    text-indent: 0 !important;
    line-height: 1.5;
}
th { font-weight: bold !important; background: #f0f0f0; text-align: center; }

/* CRITICAL: images must be exactly 14cm to fit A4 with 4+3cm margins */
img {
    display: block;
    margin: 6pt auto;
    max-width: 14cm;
    width: 14cm;
    height: auto;
}
code { font-family: "Courier New", monospace !important; font-size: 10pt !important; }
div[style*="page-break"] { page-break-after: always; mso-break-type: section-break; }
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
