import re

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all ```mermaid with ```mermaid\n%%{init: {'theme': 'default', 'themeVariables': { 'primaryColor': '#ffffff', 'primaryTextColor': '#000000', 'primaryBorderColor': '#000000', 'lineColor': '#000000', 'secondaryColor': '#f4f4f4', 'tertiaryColor': '#ffffff'}}}%%
init_str = "%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'primaryTextColor': '#000000', 'primaryBorderColor': '#000000', 'lineColor': '#000000', 'secondaryColor': '#f4f4f4', 'tertiaryColor': '#ffffff'}}}%%"

# First, clean up any previous inits if they exist (just in case)
content = re.sub(r'%%\{init:.*?\}%%\n', '', content)

# Also fix the classDef for top, mid, bot, staff to be light-themed
content = content.replace('classDef top fill:#1e3a8a,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;', 'classDef top fill:#ffffff,stroke:#000000,stroke-width:2px,color:#000000,rx:5px,ry:5px;')
content = content.replace('classDef mid fill:#2563eb,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;', 'classDef mid fill:#f9fafb,stroke:#000000,stroke-width:2px,color:#000000,rx:5px,ry:5px;')
content = content.replace('classDef bot fill:#3b82f6,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;', 'classDef bot fill:#f3f4f6,stroke:#000000,stroke-width:2px,color:#000000,rx:5px,ry:5px;')
content = content.replace('classDef staff fill:#93c5fd,stroke:#fff,stroke-width:1px,color:#000,rx:5px,ry:5px;', 'classDef staff fill:#ffffff,stroke:#000000,stroke-width:1px,color:#000000,rx:5px,ry:5px;')

# Insert the init block after every ```mermaid
content = re.sub(r'```mermaid\n', f'```mermaid\n{init_str}\n', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
