import os, re

filepath = os.path.expanduser("~/JesAI-Law-Order/src/lib/knowledge/scenario-manager.ts")

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Remove lines with msg.includes("") - these are always true
pattern = r'\s*msg\.includes\(""\)\s*\|\|\s*\n'
new_content = re.sub(pattern, '', content)

if new_content != content:
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Fixed: removed empty-string includes")
else:
    print("No empty-string includes found (already fixed?)")
