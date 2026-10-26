# Verified Tools & Integration Directory
## Verified Scripts, Plugins, Companion Agents & Templates

---

## 1. Local Python Automation Tools

### `scripts/wiki_lint.py`
- **Verification Status**: **VERIFIED & CONFIGURED**
- **Location**: `scripts/wiki_lint.py`
- **Purpose**: Automated quality assurance. Scans the entire vault, parses YAML frontmatter, traces all `[[wikilinks]]`, verifies inbound links to detect orphan notes, and validates that every wiki note is registered in `wiki/index.md`.
- **How to Execute**:
  ```powershell
  python scripts/wiki_lint.py
  ```
- **Dependencies**: Python 3.8+ (Verified on Python 3.14.3). Built purely with standard library (`os`, `re`, `sys`, `pathlib`).
- **Offline Capable**: 100% Offline. Makes zero network calls.
- **Privacy & Security**: Read-only inspection of markdown files. Does not delete, modify, or transmit any data.

---

## 2. Companion Agents & AI Skills

### `ny-17-52-insurance-skill`
- **Verification Status**: **VERIFIED & CONFIGURED**
- **Location**: `C:\Users\bhupe\.gemini\config\skills\ny-17-52-insurance-skill\SKILL.md`
- **Purpose**: Local pair-programming and Socratic coaching skill. Natively understands the 4-layer architecture, New York Insurance Law, NYS DFS regulations, and exam trap analysis.
- **Offline / Local Model Capable**: Operates seamlessly with local models (e.g. via Ollama/Qwen) or Antigravity IDE.

---

## 3. Standardized Obsidian Note Templates
- **Verification Status**: **VERIFIED & CONFIGURED**
- **Location**: `templates/`
- **Inventory**:
  1. `template-concept.md`: For insurance provisions, riders, and legal doctrines.
  2. `template-source.md`: For regulatory bulletins, statutory acts, and study guides.
  3. `template-comparison.md`: For comparative matrices (e.g. HMO vs. PPO; Own Occ vs. Any Occ).
  4. `template-question-error-log.md`: For logging missed practice exam questions with root-cause analysis.
  5. `template-synthesis.md`: For master cram sheets and priority guides.
  6. `template-entity.md`: For regulatory bodies (NYS DFS, Superintendent, Guaranty Corp).

---

[Back to Welcome Hub](file:///C:/Users/bhupe/Downloads/Vault/NY17-52/welcome.md) · [[how2use]] · [[Vault Map]]
