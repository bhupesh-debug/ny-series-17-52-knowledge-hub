# Step-by-Step Vault Workflows
## Practical End-to-End Operational Procedures

---

## Workflow 1: How to Navigate and Study a Core Topic
1. **Goal**: Rapidly master a complex exam domain (e.g. Disability Income).
2. **Steps**:
   - Press `Ctrl + O` and open [[ny-17-52-the-big-six-first-pass-priority-guide]].
   - Read the summary of Section 3 (Disability Income) and memorize the mnemonic **E then B** (Elimination first; Benefits follow).
   - Click the concept link [[disability-income-provisions-riders-business-uses]] to read the deep-dive explanation and business taxation matrix.
   - Click the linked state-specific note [[new-york-disability-benefits-law-dbl]] to verify New York DBL limits ($170/wk cap, 26 weeks, 7-day wait).
3. **Expected Result**: Complete comprehension of both general insurance mechanics and NY state statutory law.

---

## Workflow 2: How to Log a Missed Practice Question
1. **Goal**: Turn every exam mistake into permanent learning.
2. **Steps**:
   - Open `templates/template-question-error-log.md`.
   - Copy the entire template (`Ctrl + A`, `Ctrl + C`).
   - Create a new note in `wiki/questions/` (e.g. `wiki/questions/q-grace-period-01.md`).
   - Paste the template and fill out the question stem, correct answer, governing concept link (e.g. `[[individual-health-policy-provisions-and-renewability]]`), and check the root-cause checkbox.
   - Open `wiki/index.md` and add a bulleted link to your new question note under Section 8.
   - Run `python scripts/wiki_lint.py` to confirm zero broken links.
3. **Expected Result**: A personal error repository that drives active recall review before exam day.

---

## Workflow 3: How to Verify Vault Health & Links
1. **Goal**: Ensure no broken links or orphan notes exist across your vault.
2. **Steps**:
   - Open terminal in `C:\Users\bhupe\Downloads\Vault\NY17-52`.
   - Execute:
     ```powershell
     python scripts/wiki_lint.py
     ```
   - Verify that the terminal reports `[OK] Zero critical errors` and `[OK] Zero warnings`.
3. **Expected Result**: A 100% verified, perfectly connected knowledge network.

---

[Back to Welcome Hub](file:///C:/Users/bhupe/Downloads/Vault/NY17-52/welcome.md) · [[how2use]] · [[Tools Index]]
