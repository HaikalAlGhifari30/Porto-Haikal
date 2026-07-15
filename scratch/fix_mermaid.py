import re

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def quote_text(match):
    prefix = match.group(1)
    text = match.group(2)
    # Don't quote if already quoted
    if text.startswith('"') and text.endswith('"'):
        return match.group(0)
    return f'{prefix}["{text}"]'

# Match node definitions like C[Something]
content = re.sub(r'([A-Za-z0-9_]+)\[([^\]]+)\]', quote_text, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
