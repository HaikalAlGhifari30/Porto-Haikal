import urllib.request
import urllib.parse
import json

text = "Sinergi untuk Pertumbuhan Berkelanjutan"
url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q={urllib.parse.quote(text)}"

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode('utf-8'))
        translated = "".join([sentence[0] for sentence in res[0]])
        print("Success! Translated text:", translated)
except Exception as e:
    print("Failed:", e)
