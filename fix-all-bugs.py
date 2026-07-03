import os, re

# === FIX 1: Remove empty-string keywords from detectArea in index.ts ===
index_path = os.path.expanduser("~/JesAI-Law-Order/src/lib/knowledge/index.ts")

with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove empty strings and whitespace-only strings from keyword arrays
# Pattern: "", " ", etc. inside arrays
def clean_keywords(match):
    array_content = match.group(0)
    # Remove entries that are empty or whitespace-only strings
    cleaned = re.sub(r',\s*""\s*', '', array_content)
    cleaned = re.sub(r',\s*" "\s*', '', cleaned)
    cleaned = re.sub(r',\s*"\t"\s*', '', cleaned)
    # Clean up leading commas after [
    cleaned = re.sub(r'\[\s*,', '[', cleaned)
    return cleaned

# Match array contents inside areaKeywords
old_count = content.count('""')
content = re.sub(r'\[[^\]]*\]', clean_keywords, content)
new_count = content.count('""')

with open(index_path, "w", encoding="utf-8") as f:
    f.write(content)

removed = old_count - new_count
print(f"Fix 1 (index.ts): Removed {removed} empty-string keywords from detectArea")

# === FIX 2: Remove empty-string includes from scenario-manager.ts ===
scenario_path = os.path.expanduser("~/JesAI-Law-Order/src/lib/knowledge/scenario-manager.ts")

with open(scenario_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'\s*msg\.includes\(""\)\s*\|\|\s*\n'
old_count = len(re.findall(pattern, content))
content = re.sub(pattern, '', content)

with open(scenario_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Fix 2 (scenario-manager.ts): Removed {old_count} empty-string includes")

# === FIX 3: Clean up stray .py files from knowledge folder ===
knowledge_dir = os.path.expanduser("~/JesAI-Law-Order/src/lib/knowledge/")
py_files = [f for f in os.listdir(knowledge_dir) if f.endswith('.py')]
for pyf in py_files:
    os.remove(os.path.join(knowledge_dir, pyf))
    print(f"Fix 3: Removed stray file: knowledge/{pyf}")

# === FIX 4: Clean up root-level fix scripts ===
root_dir = os.path.expanduser("~/JesAI-Law-Order/")
for stray in ["fix-route.py", "fix-scenario.py", "fix-build.py", "fix.js"]:
    path = os.path.join(root_dir, stray)
    if os.path.exists(path):
        os.remove(path)
        print(f"Fix 4: Removed stray file: {stray}")

# === FIX 5: Clean up the mintty screenshot ===
screenshot = os.path.join(root_dir, "mintty.2026-07-03_20-27-04.png")
if os.path.exists(screenshot):
    os.remove(screenshot)
    print(f"Fix 5: Removed screenshot file")

print(f"\nAll fixes applied!")
