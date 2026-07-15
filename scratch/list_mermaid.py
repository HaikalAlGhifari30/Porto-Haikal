import re

with open(r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all mermaid blocks
blocks = re.findall(r'```mermaid\s*(.*?)```', content, re.DOTALL)
print(f'Found {len(blocks)} mermaid blocks')
for i, b in enumerate(blocks):
    print(f'--- Block {i+1} first line: {b.strip().splitlines()[0] if b.strip() else "(empty)"}')
