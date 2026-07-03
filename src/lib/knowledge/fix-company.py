#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JesAI Build Fix — Company.ts Type Mismatch
Fixes the KnowledgeModule export in company.ts to match the type definition.
"""

import re
import os

def fix_company_ts():
    filepath = 'company.ts'
    if not os.path.exists(filepath):
        print(f"⚠️ {filepath}: not found")
        return 0

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Replace the broken export block with the correct one
    old_export = '''const companyLawModule: KnowledgeModule = {
  id: "company-law-bd",
  name: "Bangladesh Company Law",
  version: "2.0.0",
  jurisdiction: "BD",
  lastUpdated: "2025-03-09",
  validatedBy: "Nazmul, Advocate, Supreme Court of Bangladesh",
  rules,
  qaBank,
};'''

    new_export = '''const companyLawModule: KnowledgeModule = {
  area: "company",
  label: "Bangladesh Company Law",
  description: "Company law Q&A covering private limited, public limited, OPC, partnership, foreign company, annual compliance, director duties, meetings, charges, FDI, winding up, conversion, and RJSC procedures.",
  rules,
  qaBank,
};'''

    if old_export in content:
        content = content.replace(old_export, new_export)
        print("✅ company.ts: fixed KnowledgeModule export (removed extra fields)")
    else:
        # Try regex-based replacement in case spacing differs
        pattern = r'const companyLawModule: KnowledgeModule = \{[\s\S]*?rules,\s*qaBank,\s*\};'
        replacement = '''const companyLawModule: KnowledgeModule = {
  area: "company",
  label: "Bangladesh Company Law",
  description: "Company law Q&A covering private limited, public limited, OPC, partnership, foreign company, annual compliance, director duties, meetings, charges, FDI, winding up, conversion, and RJSC procedures.",
  rules,
  qaBank,
};'''
        content_new = re.sub(pattern, replacement, content)
        if content_new != content:
            content = content_new
            print("✅ company.ts: fixed KnowledgeModule export (regex match)")
        else:
            print("ℹ️ company.ts: export block not found - may already be fixed or different format")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return 1
    return 0

def fix_template_literals(filepath):
    if not os.path.exists(filepath):
        return 0

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_template = False
    template_start_line = -1
    fixes = []

    for i, line in enumerate(lines):
        stripped = line.rstrip('\n').rstrip('\r')

        if not in_template and '`' in stripped:
            if re.search(r':\s*`', stripped) or stripped.strip().startswith('`'):
                in_template = True
                template_start_line = i

        if in_template:
            if stripped.endswith('`,') or stripped.endswith('`}'):
                in_template = False
            elif '`' in stripped:
                last_backtick = stripped.rfind('`')
                suffix = stripped[last_backtick+1:].strip()
                if suffix in ('', ',', '}', '},'):
                    in_template = False

            if in_template and (stripped.endswith('",') or stripped.endswith('"}')):
                if stripped.endswith('",'):
                    new_stripped = stripped[:-2] + '`,'
                else:
                    new_stripped = stripped[:-2] + '`}'
                newline_chars = line[len(stripped):]
                lines[i] = new_stripped + newline_chars
                fixes.append(f"Line {i+1}: fixed '{stripped[-2:]}' -> '{new_stripped[-2:]}'")
                in_template = False

    if in_template:
        fixes.append(f"WARNING: Unclosed template literal starting at line {template_start_line+1}")

    if fixes:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"✅ {filepath}: {len(fixes)} fix(es)")
        for fix in fixes:
            print(f"   {fix}")
        return len(fixes)
    return 0

print("="*50)
print("JesAI Build Fix — Company.ts + Final Cleanup")
print("="*50)

total = fix_company_ts()

for filepath in ['constitutional.ts', 'nrb.ts', 'tax.ts', 'company.ts', 'contract.ts', 'criminal.ts', 'family.ts', 'labour.ts', 'property.ts']:
    total += fix_template_literals(filepath)

print(f"\n{'='*50}")
print(f"Total fixes applied: {total}")
print("\nNext steps:")
print("  1. Run: npm run build")
print("  2. If build passes: git add . && git commit -m 'fix: company.ts type mismatch'")
print("  3. Push: git push origin main")
