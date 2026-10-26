# Security, Privacy & Data Handling Boundaries
## Offline Architecture, File Permissions & Secret Prevention

---

## 1. 100% Offline-First Architecture
- This vault is stored entirely on your local machine at `C:\Users\bhupe\Downloads\Vault\NY17-52`.
- Obsidian operates as a local desktop software that reads and writes local Markdown files.
- The vault does **not** transmit notes, study progress, or error logs to any external cloud service or commercial LLM server unless you deliberately configure a cloud backup.

---

## 2. File Read / Write Boundaries
- **`raw/` (Immutable Evidence)**: Should be treated as strictly read-only. Original PDF exam bulletins, statutory texts, and outlines must never be edited, overwritten, or deleted.
- **`wiki/` and `Learning/` (Derived Knowledge)**: Authorized read/write directory for concept notes, cram sheets, error logs, and study progress.
- **`scripts/` (Local Utilities)**: Contains local Python verification tools. The script `wiki_lint.py` performs **read-only** inspection and modifies zero files.

---

## 3. Protecting Credentials and Personal Information
- **Zero Secrets Policy**: Never store passwords, API keys, client Social Security numbers, or real policy numbers in study notes.
- If committing this vault to a private GitHub repository, ensure no proprietary personal data is tracked.

---

[Back to Welcome Hub](file:///C:/Users/bhupe/Downloads/Vault/NY17-52/welcome.md) · [[how2use]] · [[Troubleshooting]]
