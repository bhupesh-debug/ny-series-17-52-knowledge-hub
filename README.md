# NY Series 17-52 Knowledge Hub & Modern Design System (Vanilla CSS)
> **Comprehensive Life, Accident & Health Insurance Knowledge Vault, Interactive Knowledge Graph & PSI Exam Master**  
> *Powered by Universal LLM Wiki Builder v1.0 & Zero-Dependency Vanilla Web Standards*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-06b6d4?style=for-the-badge&logo=githubpages&logoColor=white)](https://bhupesh-debug.github.io/ny-series-17-52-knowledge-hub/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![CSS](https://img.shields.io/badge/CSS-Vanilla%20CSS%20Design%20System-8b5cf6?style=for-the-badge&logo=css3&logoColor=white)](dashboard/styles.css)
[![Vault Notes](https://img.shields.io/badge/Vault%20Notes-43%20Audited-amber?style=for-the-badge&logo=obsidian&logoColor=white)](wiki/index.md)
[![Lint Status](https://img.shields.io/badge/Wiki%20Lint-100%25%20Verified-10b981?style=for-the-badge)](scripts/wiki_lint.py)

---

## 🌐 Live Interactive Web Hub
Access the live deployment on GitHub Pages:  
🔗 **[https://bhupesh-debug.github.io/ny-series-17-52-knowledge-hub/](https://bhupesh-debug.github.io/ny-series-17-52-knowledge-hub/)**

The Knowledge Hub runs 100% client-side with zero external frameworks or heavy dependencies:
- **Cyberpunk / Slate Dark Mode**: Custom tokens, HSL palette (`--cyan`, `--purple`, `--emerald`, `--rose`), and glowing accents.
- **Glassmorphism Panels**: Frosted backdrop filters (`backdrop-filter: blur(16px)`), modern card elevations, and custom scrollbars.
- **Interactive Knowledge Graph Visualizer**: Real-time 2D Canvas force-directed physics simulation mapping semantic cross-links between statutory and product notes.
- **Dynamic Note Explorer**: Live instant filtering by category (*Concept, Synthesis, Reference, Learning*) and title/keyword search with inline Markdown renderer and wikilink preview modals.
- **PSI Series 17-52 Exam Drill Simulator**: Interactive scenario-based practice questions with real-time scoring, rationale breakdowns, mnemonics, and distractor trap alerts.
- **Statutory Mnemonics & Exam Traps Matrix**: Dedicated quick-review cards covering grace periods (7-10-31), Free Look (10 vs 30 days), claims time limits (20-15-90-60-3), and NY DBL (26 weeks max).

---

## 🏛️ Examination Snapshot
- **Exam Code**: New York Series 17-52 (PSI Services / NYS DFS)
- **Total Questions**: 150 Multiple Choice (140 scored + 10 pretest)
- **Time Allotted**: 3 Hours (180 Minutes)
- **Passing Threshold**: **70%** (minimum 98/140)
- **Official Blueprint Weightings**:
  1. Life Insurance Products, Annuities & Provisions (~42%)
  2. Accident & Health Insurance Products & Provisions (~38%)
  3. New York State Specific Insurance Law & NYS DFS Regulations (~20%)

---

## 📂 Vault & Architecture Overview

```text
ny-series-17-52-knowledge-hub/
├── index.html                         # Live Web Portal Entry Point (Root for GitHub Pages)
├── styles.css                         # Modern Design System (Vanilla CSS tokens & responsive layout)
├── app.js                             # Client-side router, canvas graph engine & drill simulator
├── vault_data.js                      # Pre-compiled static knowledge dataset (zero latency)
├── how2use.md                         # Complete Vault User Manual, shortcuts, tabs, workflows
├── AGENTS.md                          # Universal LLM Wiki Builder operating schema & rules
├── README.md                          # Vault documentation and architecture guide (this file)
├── dashboard/                         # Dedicated Web Dashboard directory
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── vault_data.js
├── Learning/                          # Socratic University: Dashboard, Curriculum, Progress
├── raw/                               # Layer A: Immutable Raw Sources
│   ├── documents/                     # Textbooks, state candidate bulletin, statutory PDFs
│   ├── research/                      # Legal statutes (NYIL), NYCRR administrative codes
│   ├── web-clips/                     # Practice question sets, articles, exam tips
│   └── assets/                        # Diagrams, tables, charts
├── wiki/                              # Layer B: Synthesized Knowledge Wiki
│   ├── index.md                       # Master categorized catalog of all notes
│   ├── log.md                         # Chronological append-only audit trail
│   ├── overview.md                    # Detailed syllabus blueprint & weight breakdown
│   ├── concepts/                      # In-depth concept notes (contracts, provisions, riders, Reg 60, Reg 187)
│   ├── entities/                      # Regulatory bodies (NYS DFS, Superintendent, Guaranty Corp)
│   ├── methods/                       # Learning methods (Active Recall, Spaced Repetition)
│   ├── comparisons/                   # Comparative matrices (Term vs Whole vs UL, Medicare vs MediGap)
│   ├── questions/                     # Question banks, distractor breakdowns, trap analyses
│   ├── syntheses/                     # High-yield cram sheets, master numerical cheat sheets
│   └── sources/                       # Evaluated source dossiers
├── templates/                         # Standardized Obsidian note templates
└── scripts/                           # QA Automation & Local Server
    ├── export_static_data.py          # Builds static JSON/JS bundles from markdown vault
    ├── serve_dashboard.py             # Lightweight zero-dependency Python localhost server (Port 8080)
    └── wiki_lint.py                   # Automated link, schema, and orphan note validator
```

---

## 🚀 Running Locally

### Option 1: Direct File Preview
Simply open `index.html` (or `dashboard/index.html`) directly in any modern web browser. The pre-compiled `vault_data.js` runs completely standalone without a local web server.

### Option 2: Python Localhost Server
To run with live REST API endpoints (`/api/stats`, `/api/notes`, `/api/graph`, `/api/drills`):
```bash
python scripts/serve_dashboard.py
```
Then navigate to: `http://localhost:8080`

### Option 3: Automated Wiki Lint & Health Audit
To verify schema compliance, backlinks, and orphan-free integrity:
```bash
python scripts/wiki_lint.py
```

---

## 📜 Key Statues & Rules Grounded in Vault
- **NY Regulation 60**: Mandatory replacement procedures, 30-day Free Look on replacement, and disclosure statement delivery.
- **NY Regulation 187**: Suitability and Best Interest standard in Life Insurance and Annuity transactions (fiduciary-like care).
- **Grace Periods (Mandatory)**: 7 days (weekly), 10 days (monthly), 31 days (all other modes).
- **Claims Timelines (20-15-90-60-3)**: Notice of Claim (20 days) → Claim Forms (15 days) → Proof of Loss (90 days) → Legal Action Wait (60 days) → Legal Action Max (3 years).
- **NY Disability Benefits Law (DBL)**: 26 weeks maximum non-occupational benefits in any consecutive 52 weeks (50% of AWW up to statutory cap).

---

## 📄 License
MIT License. Created for students, agents, and researchers preparing for the NY State Series 17-52 examination.
