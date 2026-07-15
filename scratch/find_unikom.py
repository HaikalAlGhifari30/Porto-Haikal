import urllib.request, ssl, re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

req = urllib.request.Request('https://www.unikom.ac.id/logo', headers=headers)
try:
    with urllib.request.urlopen(req, context=ctx) as r:
        html = r.read().decode('utf-8')
    print('Fetched HTML successfully!')
    # Find all href/src URLs
    urls = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', html)
    print(f'Total URLs found: {len(urls)}')
    for u in set(urls):
        if 'logo' in u.lower() or 'unikom' in u.lower() or 'png' in u.lower():
            print(u)
except Exception as e:
    print(f'Error: {e}')
