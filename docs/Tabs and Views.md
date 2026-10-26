# Obsidian Interface Tabs & Views Reference
## Discovered UI Layout, Panels, Sidebars & Views

---

## 1. Verified Workspace Configuration

The workspace layout discovered in `.obsidian/workspace.json` consists of three primary regions:

```text
┌───────────────────┬───────────────────────────────────────────┬────────────────────┐
│   LEFT SIDEBAR    │            MAIN EDITOR SPLIT              │   RIGHT SIDEBAR    │
│   (Width: 300px)  │                                           │                    │
│ ├─ Files          │  [ Tab 1: Active Markdown Note ]          │ ├─ Backlinks       │
│ ├─ Search         │                                           │ ├─ Outgoing Links  │
│ └─ Bookmarks      │  [ Tab 2: Interactive Graph View ]        │ ├─ Tags            │
│                   │                                           │ ├─ All Properties  │
│                   │                                           │ └─ Outline         │
└───────────────────┴───────────────────────────────────────────┴────────────────────┘
```

---

## 2. Left Sidebar Views

| Tab Name | Obsidian Internal ID | Icon | Primary Function |
| :--- | :--- | :--- | :--- |
| **Files** | `file-explorer` | `folder-closed` | Full file directory navigation. Click folders to expand; click notes to open. |
| **Search** | `global-search` | `search` | Full-text vault search. Supports filters like `tag:#high-yield` or `path:wiki/concepts`. |
| **Bookmarks** | `bookmarks` | `bookmark` | Pinned list of favorite notes. Recommended bookmarks: `welcome.md`, `how2use.md`, `Learning Dashboard.md`. |

---

## 3. Main Split Views

| Tab Name | View Type | Icon | Primary Function |
| :--- | :--- | :--- | :--- |
| **Note Editor** | `markdown` | `file` | Reading and Live Preview editing of Markdown notes. |
| **Graph View** | `graph` | `git-fork` | 2D interactive force-directed graph visualizing concept nodes and wikilink connections. |

---

## 4. Right Sidebar Views

| Tab Name | View Type | Icon | Primary Function |
| :--- | :--- | :--- | :--- |
| **Backlinks** | `backlink` | `links-coming-in` | Displays all notes that link *to* the active note (inbound links). Invaluable for seeing which concepts cite a statute! |
| **Outgoing Links** | `outgoing-link` | `links-going-out` | Displays all links originating *from* the active note. |
| **Tags** | `tag-pane` | `tags` | Lists all tags sorted by frequency (e.g. `#high-yield`, `#nys-law`). |
| **All Properties** | `all-properties` | `archive` | Displays all YAML frontmatter keys across the vault (`id`, `title`, `type`, `status`). |
| **Outline** | `outline` | `list` | Shows the table of contents / headings of the active note for rapid jumping. |

---

[Back to Welcome Hub](file:///C:/Users/bhupe/Downloads/Vault/NY17-52/welcome.md) · [[how2use]] · [[Tools Index]]
