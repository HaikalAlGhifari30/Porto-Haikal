import re
import base64
import urllib.request
import ssl
import markdown

md_file = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Siap_Print.md'
out_file = r'd:\Data Joki\ComproRRK\public\Laporan_Kerja_Praktek.doc'

with open(md_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Convert markdown to HTML (enabling tables and raw HTML)
html = markdown.markdown(text, extensions=['tables', 'extra'])

# 1. Embed Images and restrict size for Word
def embed_image(match):
    img_tag = match.group(0)
    src_url = match.group(1).replace("&amp;", "&")
    
    print(f"Downloading: {src_url[:50]}...")
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        req = urllib.request.Request(src_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15, context=ctx) as response:
            img_data = response.read()
            b64 = base64.b64encode(img_data).decode('utf-8')
            
            content_type = 'image/png'
            if '.jpg' in src_url or '.jpeg' in src_url:
                content_type = 'image/jpeg'
            
            data_uri = f'data:{content_type};base64,{b64}'
            # Replace src and force max width so it doesn't clip in Word
            new_tag = img_tag.replace(match.group(1), data_uri)
            # Add Word-safe width if it doesn't have one
            if 'width=' not in new_tag:
                new_tag = new_tag.replace('<img ', '<img width="600" ')
            return new_tag
    except Exception as e:
        print(f"Failed to download {src_url[:30]}: {e}")
        return img_tag

html = re.sub(r'<img[^>]+src=["\'](http[^"\']+)["\'][^>]*>', embed_image, html)

# 2. Add explicit page breaks before BAB (and Kata Pengantar, Abstrak, Daftar Isi)
break_tag = '<br clear="all" style="page-break-before:always; mso-break-type:section-break" />'
# The markdown creates <h1> tags for `# BAB I`, etc.
html = re.sub(r'(<h1>BAB)', rf'{break_tag}\1', html, flags=re.IGNORECASE)
html = re.sub(r'(<h1>KATA PENGANTAR)', rf'{break_tag}\1', html, flags=re.IGNORECASE)
html = re.sub(r'(<h1>ABSTRAK)', rf'{break_tag}\1', html, flags=re.IGNORECASE)

# 3. Create the final Word-compatible HTML document
word_html = f"""<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="utf-8">
    <title>Laporan Kerja Praktek</title>
    <style>
        @page WordSection1 {{
            size: 21cm 29.7cm; /* A4 */
            margin: 4cm 3cm 3cm 4cm; /* Top 4, Right 3, Bottom 3, Left 4 */
            mso-header-margin: 35.4pt;
            mso-footer-margin: 35.4pt;
            mso-paper-source: 0;
        }}
        div.WordSection1 {{ page: WordSection1; }}
        
        /* Force Times New Roman 12pt */
        body, p, li, td, span, div {{
            font-family: "Times New Roman", serif !important;
            font-size: 12pt !important;
            line-height: 1.5;
            color: black;
        }}
        p {{
            text-align: justify;
            text-justify: inter-ideograph;
            margin-top: 0pt;
            margin-bottom: 12pt;
        }}
        /* Cover page centering */
        div[align="center"] p, div[align="center"] h1, div[align="center"] h2 {{
            text-align: center !important;
        }}
        /* Headings */
        h1, h2, h3, h4 {{
            font-family: "Times New Roman", serif !important;
            font-weight: bold !important;
            color: black;
            margin-top: 12pt;
            margin-bottom: 12pt;
        }}
        h1 {{
            font-size: 14pt !important;
            text-align: center;
            text-transform: uppercase;
        }}
        h2 {{ font-size: 12pt !important; text-align: left; }}
        h3 {{ font-size: 12pt !important; text-align: left; }}
        
        table {{
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 12pt;
        }}
        table, th, td {{
            border: 1px solid black;
        }}
        th, td {{
            padding: 5pt;
        }}
        th {{
            font-weight: bold;
            background-color: #f2f2f2;
        }}
        /* Justify non-center paragraphs with indent */
        p:not([align="center"]) {{
            text-indent: 1cm;
        }}
        /* Except inside tables */
        td p {{ text-indent: 0 !important; }}
    </style>
</head>
<body>
    <div class="WordSection1">
        {html}
    </div>
</body>
</html>
"""

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(word_html)
print("Done creating Word document!")
