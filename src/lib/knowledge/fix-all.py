import re, os, glob

base = os.path.dirname(os.path.abspath(__file__))
total = 0

# ---- Fix 1: Remove duplicate consecutive property lines ----
for fpath in sorted(glob.glob(os.path.join(base, "*.ts"))):
    with open(fpath, "r", encoding="utf-8") as f:
        lines = f.readlines()
    new_lines = []
    skip_next = False
    changed = False
    for i, line in enumerate(lines):
        if skip_next:
            skip_next = False
            changed = True
            total += 1
            print(f"  [dup] {os.path.basename(fpath)}:{i+1} removed: {line.strip()}")
            continue
        m = re.match(r'^(\s*)(\w+)\s*:\s*".*?",?\s*$', line)
        if m:
            indent, key = m.group(1), m.group(2)
            if i + 1 < len(lines):
                m2 = re.match(r'^' + re.escape(indent) + re.escape(key) + r'\s*:\s*".*?",?\s*$', lines[i + 1])
                if m2:
                    new_lines.append(line)
                    skip_next = True
                    continue
        new_lines.append(line)
    if changed:
        with open(fpath, "w", encoding="utf-8") as f:
            f.writelines(new_lines)

# ---- Fix 2: Replace backtick strings with double-quoted strings ----
for fpath in sorted(glob.glob(os.path.join(base, "*.ts"))):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Find backtick-delimited strings: key: `...`
    pattern = r'(\w+)\s*:\s*`((?:[^`\\]|\\.)*)`'
    
    def replacer(m):
        key = m.group(1)
        inner = m.group(2)
        inner = inner.replace('\\', '\\\\')
        inner = inner.replace('"', '\\"')
        inner = inner.replace('\r\n', '\\n').replace('\n', '\\n')
        inner = re.sub(r' {2,}', ' ', inner)
        return key + ': "' + inner + '"'
    
    new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
    if count > 0:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        total += count
        print(f"  [btick] {os.path.basename(fpath)}: fixed {count} backtick string(s)")

print(f"\nTotal fixes applied: {total}")
