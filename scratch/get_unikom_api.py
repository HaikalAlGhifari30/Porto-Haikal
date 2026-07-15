import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

url = 'https://id.wikipedia.org/w/api.php?action=query&titles=Berkas:Logo%20Universitas%20Komputer%20Indonesia.png&prop=imageinfo&iiprop=url&format=json'

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, context=ctx) as r:
        res = json.loads(r.read().decode('utf-8'))
    pages = res['query']['pages']
    print(json.dumps(res, indent=2))
    for p_id, p_info in pages.items():
        if 'imageinfo' in p_info:
            img_url = p_info['imageinfo'][0]['url']
            print(f'Direct image URL: {img_url}')
            
            # Download the image
            req_img = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(req_img, context=ctx) as r_img:
                data = r_img.read()
            with open(r'd:\Data Joki\ComproRRK\public\logo_unikom.png', 'wb') as f:
                f.write(data)
            print('Successfully downloaded logo_unikom.png!')
        else:
            print('Image info not found in API response.')
except Exception as e:
    print(f'Error: {e}')
