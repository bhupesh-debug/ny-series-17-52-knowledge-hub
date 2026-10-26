# Lesson 01: The 4-Layer Knowledge Vault Architecture

## 1. WHY
Without a strict architecture, an Obsidian vault quickly degenerates into an unorganized "digital junk drawer" where notes are duplicated, statutory sources get overwritten, and broken links accumulate. The 4-Layer Architecture ensures that raw legal evidence is preserved forever, synthesized knowledge remains traceable, templates keep notes consistent, and scripts guarantee system integrity.

## 2. ELI5 (Explain Like I'm 10)
Imagine a master bakery:
- **Layer A (`raw/`)**: The raw pantry ingredients (bags of flour, sugar, real fruit). You never contaminate or mess with them.
- **Layer B (`wiki/`)**: The finished cakes and pastries on the glass display shelf (concept notes, cram sheets, question banks). Customers eat and enjoy these.
- **Layer C (`templates/` & `scripts/`)**: The cookie cutters and oven thermometers (templates ensure every cookie has the right shape, and the lint script checks that nothing is burned).
- **Layer D (`AGENTS.md`)**: The master head chef's rulebook that explains the exact recipe sequence so any chef can run the kitchen perfectly.

## 3. MENTAL MODEL
```text
┌────────────────────────────────────────────────────────┐
│                   VAULT ROOT DIRECTORY                 │
├────────────────────────────────────────────────────────┤
│ Layer D: Schema & Rules        --> AGENTS.md, README.md│
│ Layer C: Tooling & Automation  --> scripts/, templates/│
│ Layer B: Synthesized Knowledge --> wiki/               │
│          ├── index.md & log.md                         │
│          ├── concepts/ & entities/                     │
│          ├── comparisons/ & methods/                   │
│          └── syntheses/ & questions/                   │
│ Layer A: Immutable Evidence    --> raw/documents/      │
└────────────────────────────────────────────────────────┘
```

## 4. REAL EXAMPLE FROM THIS VAULT
- **Layer A**: The official PDF at `raw/documents/SRC-003-PSI-Bulletin-7228-NY-17-52.pdf`.
- **Layer B**: The concept note at `wiki/concepts/medical-plans-cost-sharing-managed-care.md`.
- **Layer C**: The template at `templates/template-concept.md` and script `scripts/wiki_lint.py`.
- **Layer D**: `AGENTS.md`.

## 5. STEP-BY-STEP HOW TO USE IT
1. **Acquire Source**: Place raw PDFs or outlines in `raw/documents/`.
2. **Assign Source ID**: Create a source dossier in `wiki/sources/SRC-XXX-...`.
3. **Draft Synthesized Note**: Use a template from `templates/` to create a concept note in `wiki/concepts/`.
4. **Index & Log**: Link the new note in `wiki/index.md` and append a record in `wiki/log.md`.
5. **Lint**: Run `python scripts/wiki_lint.py` to confirm zero broken links.

## 6. UNDER THE HOOD
Every note in Layer B uses YAML frontmatter (`id`, `title`, `type`, `status`, `sources`, `tags`). The script `scripts/wiki_lint.py` parses these headers with regular expressions, maps all `[[wikilinks]]`, verifies inbound links to detect orphan notes, and confirms that `wiki/index.md` catalogs every note.

## 7. COMMON MISTAKES
- *Mistake*: Editing or summarizing directly inside the raw source file.
  - *Consequence*: Original legal evidence is lost or corrupted.
- *Mistake*: Creating a concept note without registering it in `wiki/index.md`.
  - *Consequence*: The note becomes an undiscoverable orphan and triggers a warning during linter audits.

## 8. GUIDED PRACTICE
Observe how `wiki/index.md` organizes your 38 notes into 8 categories. Notice how every concept links back to its primary source dossier (e.g., `[[SRC-003-psi-current-bulletin-ny-17-52-ah-study-guide]]`).

## 9. RETRIEVAL PRACTICE (Question for You!)
*Why must original exam bulletins, regulations, and textbook PDFs be kept in `raw/` rather than being converted directly into concept notes?*

## 10. TRANSFER
If NYDFS issues a new 2026 statutory bulletin on health insurance rebating, in which layer and folder does the original bulletin belong, and in which layer do the updated rules belong?

## 11. MASTERY CHECK
Can you explain the difference between Layer A and Layer B without opening your notes?

## 12. OBSIDIAN NOTE REFERENCES
- Master Schema: [[AGENTS.md]]
- Master Index: [[wiki/index.md]]
- Linter Script: [[scripts/wiki_lint.py]]
