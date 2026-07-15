import re
import base64
import urllib.request
import time

file_path = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Page breaks and styles
html = re.sub(
    r'(<h1[^>]*>BAB)', 
    r'<br clear="all" style="page-break-before:always; mso-break-type:section-break" />\1', 
    html, 
    flags=re.IGNORECASE
)

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

# 2. Extract and embed images
def embed_image(match):
    img_tag = match.group(0)
    src_url = match.group(1).replace("&amp;", "&")
    
    print(f"Downloading: {src_url[:50]}...")
    try:
        req = urllib.request.Request(src_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as response:
            img_data = response.read()
            b64 = base64.b64encode(img_data).decode('utf-8')
            
            content_type = 'image/png'
            if '.jpg' in src_url or '.jpeg' in src_url:
                content_type = 'image/jpeg'
            elif '.svg' in src_url:
                content_type = 'image/svg+xml'
            
            data_uri = f'data:{content_type};base64,{b64}'
            return img_tag.replace(match.group(1), data_uri)
    except Exception as e:
        print(f"Failed to download {src_url[:30]}: {e}")
        return img_tag

html = re.sub(r'<img[^>]+src=["\'](http[^"\']+)["\'][^>]*>', embed_image, html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Done!")
