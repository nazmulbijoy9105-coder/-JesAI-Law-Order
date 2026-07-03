import os

filepath = os.path.expanduser("~/JesAI-Law-Order/src/lib/knowledge/scenario-manager.ts")

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the always-true empty string includes
old = """  const isProcessRequest =
    msg.includes("step") ||
    msg.includes("steps") ||
    msg.includes("process") ||
    msg.includes("procedure") ||
    msg.includes("how to") ||
    msg.includes("") ||
    msg.includes("") ||
    msg.includes("") ||
    msg.includes("");"""

new = """  const isProcessRequest =
    msg.includes("step") ||
    msg.includes("steps") ||
    msg.includes("process") ||
    msg.includes("procedure") ||
    msg.includes("how to");"""

if old in content:
    content = content.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed scenario-manager.ts - removed 4 empty-string includes that were always true")
else:
    print("Pattern not found, trying alternate...")
    # Try with different whitespace
    import re
    pattern = r'msg\.includes\(""\) \|\|\s*\n\s*msg\.includes\(""\) \|\|\s*\n\s*msg\.includes\(""\) \|\|\s*\n\s*msg\.includes\(""\)'
    new_content = re.sub(pattern, '', content)
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Fixed via regex")
    else:
        print("Could not find empty string includes")
