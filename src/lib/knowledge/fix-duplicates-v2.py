#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JesAI Build Fix — Remove duplicate properties (targeted)
Removes consecutive duplicate property lines in object literals.
"""

import os
import re

def remove_duplicate_properties(filepath):
    """Remove duplicate properties that appear on consecutive lines."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    fixes = []
    prev_prop = None

    for i, line in enumerate(lines):
        stripped = line.strip()
        # Match property definition: whitespace + word + colon
        match = re.match(r'^(\s+)(\w+):\s+', stripped)

        if match:
            prop_name = match.group(2)
            indent = match.group(1)

            # Check if same property with same indentation as previous
            if prev_prop and prev_prop['name'] == prop_name and prev_prop['indent'] == indent:
                fixes.append(f"Line {i+1}: removed duplicate '{prop_name}'")
                continue  # Skip this duplicate line

            prev_prop = {'name': prop_name, 'indent': indent}
        else:
            # Reset on blank lines or closing braces (new object scope)
            if stripped == '' or stripped.startswith('}') or stripped.startswith(']'):
                prev_prop = None

        new_lines.append(line)

    if fixes:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"✅ {filepath}: {len(fixes)} duplicate(s) removed")
        for fix in fixes:
            print(f"   {fix}")
        return len(fixes)
    else:
        print(f"ℹ️ {filepath}: no consecutive duplicates found")
        return 0


print("="*60)
print("JesAI Build Fix — Remove Duplicate Properties")
print("="*60)

total = 0
files = ['property.ts', 'company.ts', 'criminal.ts', 'constitutional.ts', 
         'contract.ts', 'family.ts', 'labour.ts', 'tax.ts', 'nrb.ts']

for filepath in files:
    if os.path.exists(filepath):
        total += remove_duplicate_properties(filepath)
    else:
        print(f"⚠️ {filepath}: not found")

print(f"\n{'='*60}")
print(f"Total fixes applied: {total}")
print("\nNext steps:")
print("  1. Run: npm run build")
print("  2. If build passes: git add . && git commit -m 'fix: remove duplicate properties'")
print("  3. Push: git push origin main")
