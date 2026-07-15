import re

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. For Org Chart (Struktur Perusahaan), change flowchart TD to flowchart TD and add init for stepBefore curve
org_old = r'```mermaid\nflowchart TD\n    classDef top fill:#ffffff,stroke:#000000'
org_new = r'''```mermaid
%%{init: {"flowchart": {"curve": "stepBefore"}}}%%
flowchart TD
    classDef top fill:#ffffff,stroke:#000000'''
content = content.replace('```mermaid\nflowchart TD\n    classDef top fill:#ffffff,stroke:#000000', org_new)

# 2. Add linkStyle default to all flowcharts to ensure arrows are black
def add_linkstyle(match):
    block = match.group(0)
    if 'linkStyle default' not in block:
        # insert before the closing ```
        block = block.replace('\n```', '\n    linkStyle default stroke:#000000,stroke-width:2px,color:#000000;\n```')
    return block

content = re.sub(r'```mermaid.*?```', add_linkstyle, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
