import re
import base64
import urllib.request
from urllib.parse import urlparse

file_path = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add page breaks before BAB (h1 tags that contain BAB)
html = re.sub(
    r'(<h1[^>]*>BAB)', 
    r'<br clear="all" style="page-break-before:always; mso-break-type:section-break" />\1', 
    html, 
    flags=re.IGNORECASE
)

# 2. Add some Microsoft Word specific styling to the head to make it look like a document
word_style = """
<style>
    @page { size: 21cm 29.7cm; margin: 3cm 3cm 3cm 4cm; }
    body { font-family: "Times New Roman", Times, serif; font-size: 12pt; text-align: justify; line-height: 1.5; }
    h1, h2, h3, h4, h5, h6 { text-align: center; font-weight: bold; }
    h1 { font-size: 14pt; }
    h2 { font-size: 12pt; text-align: left; }
    h3 { font-size: 12pt; text-align: left; }
    p { margin-bottom: 12pt; text-align: justify; }
    div[align="center"] { text-align: center; }
</style>
"""
html = html.replace('</head>', word_style + '\n</head>')

# 3. Find and embed images as base64
def embed_image(match):
    img_tag = match.group(0)
    src_url = match.group(1)
    
    try:
        req = urllib.request.Request(src_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            img_data = response.read()
            b64 = base64.b64encode(img_data).decode('utf-8')
            
            # Determine content type
            content_type = 'image/png'
            if src_url.endswith('.jpg') or src_url.endswith('.jpeg'):
                content_type = 'image/jpeg'
            elif src_url.endswith('.svg'):
                content_type = 'image/svg+xml'
            
            data_uri = f'data:{content_type};base64,{b64}'
            return img_tag.replace(src_url, data_uri)
    except Exception as e:
        print(f"Failed to download {src_url}: {e}")
        return img_tag

# Match <img src="URL" ...>
html = re.sub(r'<img[^>]+src=["\'](http[^"\']+)["\'][^>]*>', embed_image, html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("DOC file updated successfully with embedded images and page breaks.")
