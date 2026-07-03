#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JesAI Build Fix — Comprehensive v3
Uses a state machine to track template literals across the entire file.

Root cause: Some `conclusion` values open with backtick (`) but close with double-quote (")
This leaves the parser inside a template literal, causing cascading errors at subsequent
backtick locations.
"""

import re
import os

def fix_template_literals(filepath):
    """Find and fix ALL template literal mismatches in a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_template = False
    template_start_line = -1
    fixes = []

    for i, line in enumerate(lines):
        stripped = line.rstrip('\n').rstrip('\r')

        # Check if we're starting a template literal on this line
        if not in_template and '`' in stripped:
            # Pattern: propertyName: ` or : ` (start of template literal value)
            # Also catch: ` at beginning of line (continuation)
            if re.search(r':\s*`', stripped) or stripped.strip().startswith('`'):
                in_template = True
                template_start_line = i

        if in_template:
            # Check for proper closing with backtick
            # Patterns: `,  `}  or just ` at end of line
            if stripped.endswith('`,') or stripped.endswith('`}'):
                in_template = False
            elif '`' in stripped:
                # Check if last backtick is at/near end of line
                last_backtick = stripped.rfind('`')
                # If backtick is within last 2 chars of non-whitespace content
                suffix = stripped[last_backtick+1:].strip()
                if suffix in ('', ',', '}', '},'):
                    in_template = False

            # Check for BUGGY closing with double-quote while still in template
            if in_template and (stripped.endswith('",') or stripped.endswith('"}')):
                # BUG FOUND: opened with `, closed with "
                # Fix the closing delimiter
                if stripped.endswith('",'):
                    new_stripped = stripped[:-2] + '`,'
                else:  # ends with "}
                    new_stripped = stripped[:-2] + '`}'

                # Preserve original line ending (newline chars)
                newline_chars = line[len(stripped):]
                lines[i] = new_stripped + newline_chars

                fixes.append(f"Line {i+1}: fixed '{stripped[-2:]}' -> '{new_stripped[-2:]}' (template started at line {template_start_line+1})")
                in_template = False

    # After scanning, check if we ended with an unclosed template literal
    if in_template:
        fixes.append(f"WARNING: Unclosed template literal starting at line {template_start_line+1}")

    if fixes:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f"✅ {filepath}: {len(fixes)} fix(es) applied")
        for fix in fixes:
            print(f"   {fix}")
    else:
        print(f"ℹ️ {filepath}: no template literal issues found")

    return len(fixes)


def fix_backticks_in_arrays(filepath):
    """Fix backticks inside double-quoted strings in arrays."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Fix: ["id`, "id"] -> ["id", "id"]
    content = re.sub(r'\["([^"\]]+)`([^"\]]*)"\]', r'["\1"\2"]', content)
    # More specific: catch backtick before comma in array
    content = content.replace('`",', '",').replace('`"]', '"]').replace('"`', '"').replace('`"', '"')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filepath}: fixed backticks inside quoted arrays")
        return 1
    return 0


# Fix all knowledge files
files = ['constitutional.ts', 'nrb.ts', 'tax.ts']
total_fixes = 0

for filepath in files:
    if os.path.exists(filepath):
        total_fixes += fix_backticks_in_arrays(filepath)
        total_fixes += fix_template_literals(filepath)
    else:
        print(f"⚠️ {filepath}: not found")

print(f"\n{'='*50}")
print(f"Total fixes applied: {total_fixes}")
print("\nNext steps:")
print("  1. Run: npm run build")
print("  2. If build passes: git add . && git commit -m 'fix: template literal delimiters'")
print("  3. Push: git push origin main")
