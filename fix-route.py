import os

filepath = os.path.expanduser("~/JesAI-Law-Order/src/app/api/chat/route.ts")

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

old = '''const scenarioResult = matchScenario(message, activeSession);
    if (scenarioResult.matched) {
      const wrongSubject = selectedArea && scenarioResult.scenario.area !== selectedArea;
      if (!wrongSubject) {'''

new = '''const scenarioResult = matchScenario(message, activeSession);
    if (scenarioResult.matched) {
      // Fix: Also check detected area when selectedArea is null
      const detectedForScenario = detectArea(message);
      const wrongSubject = 
        (selectedArea && scenarioResult.scenario.area !== selectedArea) ||
        (!selectedArea && detectedForScenario && detectedForScenario !== "general" && detectedForScenario !== scenarioResult.scenario.area);
      if (!wrongSubject) {'''

if old in content:
    content = content.replace(old, new)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed route.ts - scenario area validation")
else:
    print("Pattern not found - checking current state...")
    # Show the actual lines around matchScenario
    lines = content.split("\n")
    for i, line in enumerate(lines):
        if "matchScenario" in line and "const" in line:
            print(f"Line {i+1}: {line}")
            for j in range(i+1, min(i+6, len(lines))):
                print(f"Line {j+1}: {lines[j]}")
