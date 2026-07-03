#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JesAI Build Fix — Remove duplicate properties
Scans all .ts files and removes duplicate property definitions in object literals.
"""

import os
import re

def remove_duplicate_properties(filepath):
    """Remove duplicate properties in object literals within a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    lines = content.split('\n')
    new_lines = []
    seen_properties = set()
    in_object = False
    object_depth = 0
    fixes = []

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Track object depth with braces
        brace_diff = stripped.count('{') - stripped.count('}')

        if brace_diff > 0:
            in_object = True
            object_depth += brace_diff
        elif brace_diff < 0:
            object_depth += brace_diff
            if object_depth <= 0:
                in_object = False
                object_depth = 0
                seen_properties = set()

        # Check if this line defines a property
        prop_match = re.match(r'^(\s+)(\w+):\s+', stripped)
        if prop_match and in_object:
            prop_name = prop_match.group(2)
            if prop_name in seen_properties:
                fixes.append(f"Line {i+1}: removed duplicate '{prop_name}'")
                continue  # Skip this line
            seen_properties.add(prop_name)

        new_lines.append(line)

    if fixes:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f"✅ {filepath}: {len(fixes)} duplicate(s) removed")
        for fix in fixes:
            print(f"   {fix}")
        return len(fixes)
    else:
        print(f"ℹ️ {filepath}: no duplicates found")
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
