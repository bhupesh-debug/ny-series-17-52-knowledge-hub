# Troubleshooting & Diagnostic Guide
## Common Issues, Causes & Instant Solutions

---

## 1. Terminal Unicode / Character Encoding Errors
- **Symptom**: Running `python scripts/wiki_lint.py` produces `UnicodeEncodeError: 'charmap' codec can't encode character...`.
- **Root Cause**: The Windows PowerShell or Command Prompt console default code page (cp1252) cannot display raw multi-byte UTF-8 emojis.
- **Solution**: The script `scripts/wiki_lint.py` is configured with safe ASCII indicators (`[OK]`, `[!]`, `[X]`). If adding print statements, avoid raw emojis in console output.

---

## 2. Broken Wikilinks in Linter Audit
- **Symptom**: Linter warns: `[!] index.md: Broken wikilink [[some-note]]`.
- **Root Cause**: The target file does not exist, was renamed, or has a typo in its filename.
- **Solution**: Always rename notes using the Obsidian Files explorer (press `F2`), which automatically prompts Obsidian to update all inbound links vault-wide.

---

## 3. Orphan Notes Detected
- **Symptom**: Linter warns: `[!] concepts/xyz.md: Orphan page (has 0 incoming links)`.
- **Root Cause**: The note was written but never linked from `wiki/index.md` or another concept note.
- **Solution**: Open `wiki/index.md` and insert `[[xyz]]` under the appropriate category.

---

[Back to Welcome Hub](file:///C:/Users/bhupe/Downloads/Vault/NY17-52/welcome.md) · [[how2use]] · [[Workflows]]
