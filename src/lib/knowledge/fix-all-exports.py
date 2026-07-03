#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JesAI Build Fix — Fix ALL KnowledgeModule exports
Scans all .ts files and fixes any KnowledgeModule exports that have extra fields.
"""

import os
import re

def fix_knowledgemodule_export(filepath):
    """Fix KnowledgeModule export in a file if it has extra fields."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Find the export block: const XxxModule: KnowledgeModule = { ... };
    pattern = r'(const\s+\w+Module:\s+KnowledgeModule\s+=\s+\{)[\s\S]*?(rules,\s*qaBank,\s*\};)'

    def replace_export(match):
        header = match.group(1)
        footer = match.group(2)

        # Extract area from filename
        basename = os.path.splitext(os.path.basename(filepath))[0]
        area = basename.replace('Law', '').replace('Module', '').lower()

        # Map common names
        area_map = {
            'company': 'company',
            'criminal': 'criminal', 
            'constitutional': 'constitutional',
            'contract': 'contract',
            'family': 'family',
            'labour': 'labour',
            'property': 'property',
            'tax': 'tax',
            'nrb': 'nrb',
        }
        area = area_map.get(area, area)

        # Build label
        label = area.capitalize() + " Law"
        if area == 'nrb':
            label = "NRB Investment & Foreign Investment Law"
        elif area == 'tax':
            label = "Tax Law - Income Tax Act 2023, VAT & NBR"

        # Build replacement using string concatenation
        replacement = header + "\n"
        replacement += '  area: "' + area + '",\n'
        replacement += '  label: "' + label + '",\n'
        replacement += '  description: "Knowledge module for ' + area + ' law in Bangladesh.",\n'
        replacement += '  ' + footer

        return replacement

    content = re.sub(pattern, replace_export, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("  " + filepath + ": fixed KnowledgeModule export")
        return 1
    else:
        print("  " + filepath + ": no issues found")
        return 0


print("=" * 60)
print("JesAI Build Fix — ALL KnowledgeModule Exports")
print("=" * 60)

total = 0
files = ['company.ts', 'criminal.ts', 'constitutional.ts', 'contract.ts', 
         'family.ts', 'labour.ts', 'property.ts', 'tax.ts', 'nrb.ts']

for filepath in files:
    if os.path.exists(filepath):
        total += fix_knowledgemodule_export(filepath)
    else:
        print("  " + filepath + ": not found")

print()
print("=" * 60)
print("Total fixes applied: " + str(total))
print()
print("Next steps:")
print("  1. Run: npm run build")
print("  2. If build passes: git add . && git commit -m 'fix: KnowledgeModule exports'")
print("  3. Push: git push origin main")
