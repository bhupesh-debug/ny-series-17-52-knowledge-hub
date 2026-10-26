# Command Palette & Keyboard Shortcuts Reference
## Windows Keybindings, Palette Actions, Syntax & Terminal Commands

---

## 1. Top 10 Core Obsidian Shortcuts (Windows / macOS)

| Action | Shortcut (Windows) | Shortcut (macOS) | Where to Use | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Quick Switcher** | `Ctrl + O` | `Cmd + O` | Global | Jump instantly to any note by typing part of its title. |
| **Command Palette** | `Ctrl + P` | `Cmd + P` | Global | Search and execute any Obsidian command. |
| **Global Search** | `Ctrl + Shift + F` | `Cmd + Shift + F` | Global | Search full text across all notes in the vault. |
| **Toggle Graph View** | `Ctrl + G` | `Cmd + G` | Global | Open the interactive knowledge graph view. |
| **New Note** | `Ctrl + N` | `Cmd + N` | Global | Create a new note in the current folder. |
| **Close Active Tab** | `Ctrl + W` | `Cmd + W` | Editor | Close current note tab. |
| **Reopen Closed Tab** | `Ctrl + Shift + T` | `Cmd + Shift + T` | Editor | Reopen the most recently closed tab. |
| **Toggle Reading View**| `Ctrl + E` | `Cmd + E` | Editor | Switch between Live Preview editing and Reading mode. |
| **Follow Wikilink** | `Ctrl + Click` | `Cmd + Click` | Editor | Follow the `[[link]]` under your cursor. |
| **Open Link in New Tab**| `Ctrl + Alt + Click`| `Cmd + Opt + Click`| Editor | Open the linked note in a split tab. |

---

## 2. Command Palette Actions (`Ctrl + P`)

To run any command in Obsidian: press `Ctrl + P` and start typing:
- **`Templates: Insert template`**: Opens template picker to inject any template from `templates/`.
- **`Open graph view`**: Launches the visual knowledge graph.
- **`Show Backlinks`**: Focuses the Backlinks panel in the right sidebar.
- **`Show Outline`**: Focuses the Outline table of contents panel.
- **`Toggle Reading view`**: Switches between edit and view modes.

---

## 3. Terminal & Automation Commands

| Command | Category | Shell | Purpose | Risk |
| :--- | :--- | :--- | :--- | :--- |
| **`python scripts/wiki_lint.py`** | Quality Assurance | PowerShell / CMD | Scans all notes for broken links, missing frontmatter, and orphan notes. | **Zero risk** (Read-only inspection). |
| **`git status`** | Version Control | Git Bash / PowerShell | Checks modified or untracked notes in the vault. | **Zero risk** (Status report). |
| **`git add . && git commit -m "update"`** | Version Control | Git Bash / PowerShell | Creates a local version history snapshot of your study vault. | Modifies local git index. |

---

[Back to Welcome Hub](file:///C:/Users/bhupe/Downloads/Vault/NY17-52/welcome.md) · [[how2use]] · [[Tabs and Views]]
