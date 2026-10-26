# Obsidian Vault University: Practical Projects & Challenges

These hands-on practical challenges test independent mastery of the vault's structure, tools, and content.

---

### Challenge 1: The Integrity Audit (Level 1)
- **Objective**: Run the vault verification script from the command line and interpret the output.
- **Task**: Execute `python scripts/wiki_lint.py` in the vault root.
- **Verification**: Ensure 0 errors, 0 broken links, and 100% index registration.

### Challenge 2: The Broken Link Investigator (Level 2)
- **Objective**: Trace a newly introduced link and detect why Obsidian graph view displays or isolates orphan nodes.
- **Task**: Inspect how `wiki/index.md` catalogs each note and verify that every note has at least one inbound and outbound link.

### Challenge 3: Ingesting an Official New York Circular (Level 3)
- **Objective**: Ingest a simulated NYS DFS legal circular into the vault following the 8-step pipeline in `AGENTS.md`.
- **Task**: Create a new source file in `wiki/sources/SRC-006-...`, update the affected concepts, update `wiki/index.md`, and log the change in `wiki/log.md`.

### Challenge 4: Error Log Diagnostic (Level 4)
- **Objective**: Convert a missed exam practice question into a permanent, structured error log note using `templates/template-question-error-log.md`.
- **Task**: Document the distractor trap, statutory rationale, and root cause analysis in `wiki/questions/`.
