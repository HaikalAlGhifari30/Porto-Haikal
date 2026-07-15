import re

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update dates
content = content.replace('BANDUNG 2025', 'BANDUNG 2026')
content = content.replace('Bandung, .................... 2025', 'Bandung, 18 Juli 2026')

# 2. Revert graph to flowchart (flowchart has better routing engine that doesn't cause overlapping "menclong" lines)
content = content.replace('graph TD', 'flowchart TD')
content = content.replace('graph LR', 'flowchart LR')

# 3. Remove init blocks to avoid theme conflicts
content = re.sub(r'%%\{init:.*?\}%%\n', '', content)

# 4. Remove any existing linkStyle default to prevent duplicates
content = re.sub(r'\s*linkStyle default.*?;', '', content)

# 5. Add linkStyle default stroke:#000000,stroke-width:2px; to ALL flowcharts to make arrows strictly black
def add_linkstyle(match):
    block = match.group(0)
    if 'flowchart' in block:
        # insert before the closing ```
        block = block.replace('\n```', '\n    linkStyle default stroke:#000000,stroke-width:2px;\n```')
    return block

content = re.sub(r'```mermaid.*?```', add_linkstyle, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
