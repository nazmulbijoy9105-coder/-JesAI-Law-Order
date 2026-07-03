#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JesAI Build Fix — Comprehensive
Fixes all syntax errors in constitutional.ts, nrb.ts, tax.ts, and ChatInterface.tsx
"""

import re
import os

fixes_applied = []

# ═══════════════════════════════════════════════════════════════
# FIX 1: ChatInterface.tsx — broken regex .replace(//g, ...)
# ═══════════════════════════════════════════════════════════════
chat_path = "../../../src/components/chat/ChatInterface.tsx"
# Try multiple possible paths
paths_to_try = [
    "../../../src/components/chat/ChatInterface.tsx",
    "../../src/components/chat/ChatInterface.tsx",
    "../src/components/chat/ChatInterface.tsx",
    "src/components/chat/ChatInterface.tsx",
    "../../../components/chat/ChatInterface.tsx",
]

chat_content = None
chat_found_path = None
for p in paths_to_try:
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            chat_content = f.read()
        chat_found_path = p
        break

if chat_content:
    # Fix the two broken .replace(//g, ...) calls
    # These are empty regex patterns which are invalid
    original = chat_content
    chat_content = chat_content.replace('.replace(//g, "lock")', '')
    chat_content = chat_content.replace('.replace(//g, "Warning:")', '')
    if chat_content != original:
        with open(chat_found_path, 'w', encoding='utf-8') as f:
            f.write(chat_content)
        fixes_applied.append(f"ChatInterface.tsx: removed broken regex .replace(//g, ...) calls")
        print("✅ ChatInterface.tsx fixed")
    else:
        print("ℹ️ ChatInterface.tsx: patterns not found (may already be fixed)")
else:
    print("⚠️ ChatInterface.tsx not found — please check path")

# ═══════════════════════════════════════════════════════════════
# FIX 2: constitutional.ts — backticks inside double-quoted arrays
# ═══════════════════════════════════════════════════════════════
with open('constitutional.ts', 'r', encoding='utf-8') as f:
    content = f.read()

original = content
# Fix pattern: ["id`, "id"] -> ["id", "id"]
# Use regex to find backticks inside relatedRules arrays
content = re.sub(r'\["([^"]+)`,\s*"([^"]+)"\]', r'["\1", "\2"]', content)

if content != original:
    with open('constitutional.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    fixes_applied.append("constitutional.ts: fixed backticks inside relatedRules arrays")
    print("✅ constitutional.ts fixed")
else:
    print("ℹ️ constitutional.ts: no backtick-in-array issues found")

# ═══════════════════════════════════════════════════════════════
# FIX 3 & 4: nrb.ts and tax.ts — mismatched string delimiters
# ═══════════════════════════════════════════════════════════════

def fix_mismatched_delimiters(filepath):
    """Fix lines that open with backtick but close with double quote"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    fixed_count = 0
    new_lines = []

    for i, line in enumerate(lines):
        # Check if line has: `...",
        # Meaning: starts with backtick, ends with double-quote + comma
        stripped = line.rstrip()

        # Find if there's a backtick opening and double-quote closing
        backtick_pos = stripped.find('`')
        if backtick_pos != -1:
            # Check if the line ends with '",' (double quote + comma)
            if stripped.endswith('",'):
                # Check that there's no closing backtick before the ending '",'
                # Find the last backtick
                last_backtick = stripped.rfind('`')
                # If the last backtick is at the beginning (or early) and the line ends with '",'
                # then we have a mismatch
                if last_backtick < len(stripped) - 3:  # backtick is not near the end
                    # Replace ending '",' with '`,'
                    new_line = stripped[:-2] + '`\n'  # remove '",' add '`'
                    new_lines.append(new_line)
                    fixed_count += 1
                    continue

        new_lines.append(line)

    if fixed_count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        fixes_applied.append(f"{filepath}: fixed {fixed_count} mismatched delimiter(s) (backtick opened, double-quote closed)")
        print(f"✅ {filepath} fixed ({fixed_count} issue(s))")
    else:
        print(f"ℹ️ {filepath}: no mismatched delimiter issues found")

fix_mismatched_delimiters('nrb.ts')
fix_mismatched_delimiters('tax.ts')

# ═══════════════════════════════════════════════════════════════
# Summary
# ═══════════════════════════════════════════════════════════════
print("\n" + "="*60)
print("FIX SUMMARY")
print("="*60)
for fix in fixes_applied:
    print(f"  • {fix}")
if not fixes_applied:
    print("  No fixes were needed")
print("\n🚀 Run: npm run build")
