#!/usr/bin/env python3
"""
JesAI Build Fix Script
Fixes 3 syntax errors in constitutional.ts, nrb.ts, tax.ts
Run: python3 fix-build.py
"""

import re

# ─── FIX 1: constitutional.ts ─────────────────────────────────────
with open('constitutional.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix: backtick inside double-quoted array
content = content.replace('"con-002`, "con-004"]', '"con-002", "con-004"]')

with open('constitutional.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("constitutional.ts fixed")

# ─── FIX 2: nrb.ts ────────────────────────────────────────────────
with open('nrb.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the pattern where rule line has no closing quote before application
# The error line is around the remittance rule
# We look for: rule: "... (no closing quote) \n      application:
# and fix by adding closing quote and comma

# Pattern: line with 'rule:' containing 'Foreign Exchange Regulation Act 1947'
# followed by newline and whitespace then 'application:'
# The rule line is missing its closing "

lines = content.split('\n')
for i, line in enumerate(lines):
    if 'rule: "Foreign Exchange Regulation Act 1947' in line and not line.rstrip().endswith('",'):
        # This is the broken line - add closing quote and comma
        lines[i] = line.rstrip() + '",'
        print(f"Fixed nrb.ts line {i+1}")
        break

content = '\n'.join(lines)

with open('nrb.ts', 'w', encoding='utf-8') as f:
    f.write(content)

# ─── FIX 3: tax.ts ────────────────────────────────────────────────
with open('tax.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Same pattern for tax.ts
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'rule: "ITA 2023, Section 264: TIN mandatory' in line and not line.rstrip().endswith('",'):
        lines[i] = line.rstrip() + '",'
        print(f"Fixed tax.ts line {i+1}")
        break

content = '\n'.join(lines)

with open('tax.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nAll 3 files fixed! Run: npm run build")
