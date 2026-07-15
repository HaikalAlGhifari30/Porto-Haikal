import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

# Get images list of Universitas Komputer Indonesia
url = 'https://id.wikipedia.org/w/api.php?action=query&titles=Universitas%20Komputer%20Indonesia&prop=images&format=json'
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, context=ctx) as r:
        res = json.loads(r.read().decode('utf-8'))
    print(json.dumps(res, indent=2))
except Exception as e:
    print(f'Error: {e}')
