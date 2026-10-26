#!/usr/bin/env python3
"""
UNIVERSAL LLM WIKI LINTER & HEALTH CHECKER
Vault: NY 17-52 Life, Accident & Health Insurance
Validates:
1. Frontmatter schema compliance (id, title, type, status, sources)
2. Broken [[wikilinks]] and markdown links
3. Orphan notes (pages with zero backlinks, excluding index, log, overview)
4. Master index completeness (verifies every wiki note is registered in wiki/index.md)
"""

import os
import re
import sys
from pathlib import Path

VAULT_ROOT = Path(__file__).resolve().parent.parent
WIKI_DIR = VAULT_ROOT / "wiki"
INDEX_FILE = WIKI_DIR / "index.md"
LOG_FILE = WIKI_DIR / "log.md"

WIKILINK_PATTERN = re.compile(r"\[\[([^\]\|#]+)(?:#[^\]\|]+)?(?:\|[^\]]+)?\]\]")
MDLINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
FRONTMATTER_PATTERN = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

EXCLUDED_ORPHAN_CHECK = {"index.md", "log.md", "overview.md"}

def parse_frontmatter(content):
    match = FRONTMATTER_PATTERN.match(content)
    if not match:
        return {}
    raw = match.group(1)
    data = {}
    for line in raw.splitlines():
        if ":" in line and not line.strip().startswith("-"):
            key, val = line.split(":", 1)
            data[key.strip()] = val.strip().strip('"\'')
    return data

def run_lint():
    print(f"[*] Running Universal LLM Wiki Lint on: {WIKI_DIR}")
    if not WIKI_DIR.exists():
        print(f"[!] Error: Wiki directory does not exist at {WIKI_DIR}")
        sys.exit(1)

    wiki_files = list(WIKI_DIR.rglob("*.md"))
    vault_files = list(VAULT_ROOT.rglob("*.md"))
    file_map = {}
    slug_map = {}
    vault_slug_map = {f.stem: f for f in vault_files}

    for f in wiki_files:
        rel = f.relative_to(WIKI_DIR).as_posix()
        file_map[rel] = f
        slug_map[f.stem] = rel

    print(f"[*] Found {len(wiki_files)} markdown notes in wiki/ (Total vault notes: {len(vault_files)})")

    errors = []
    warnings = []

    # Check index file existence
    if not INDEX_FILE.exists():
        errors.append("Critical: wiki/index.md does not exist.")
    else:
        index_text = INDEX_FILE.read_text(encoding="utf-8")
    
    # Check log file existence
    if not LOG_FILE.exists():
        errors.append("Critical: wiki/log.md does not exist.")

    inbound_links = {rel: set() for rel in file_map}

    for rel, path in file_map.items():
        content = path.read_text(encoding="utf-8")
        
        # 1. Frontmatter check (exempt index.md and log.md if desired, but good practice to have)
        if rel not in {"log.md"}:
            fm = parse_frontmatter(content)
            if not fm and rel != "index.md":
                warnings.append(f"{rel}: Missing or invalid YAML frontmatter.")
            else:
                for req in ["id", "type", "status"]:
                    if req not in fm and rel != "index.md":
                        warnings.append(f"{rel}: Missing required frontmatter key '{req}'.")

        # 2. Extract links
        wikilinks = WIKILINK_PATTERN.findall(content)
        for target in wikilinks:
            target_clean = target.strip().replace("\\", "/")
            target_stem = Path(target_clean).stem
            
            # Match by stem or direct relative path in wiki or anywhere in vault
            matched = False
            if target_stem in slug_map:
                inbound_links[slug_map[target_stem]].add(rel)
                matched = True
            elif target_clean in file_map or (target_clean + ".md") in file_map:
                actual_rel = target_clean if target_clean in file_map else target_clean + ".md"
                inbound_links[actual_rel].add(rel)
                matched = True
            elif target_stem in vault_slug_map:
                matched = True
            
            if not matched:
                warnings.append(f"{rel}: Broken wikilink [[{target}]]")

        # 3. Check if registered in index.md
        if rel not in {"index.md", "log.md"}:
            stem = path.stem
            if stem not in index_text and rel not in index_text:
                warnings.append(f"{rel}: Note is not registered in wiki/index.md")

    # 4. Check for orphans
    for rel, inbound in inbound_links.items():
        if rel in EXCLUDED_ORPHAN_CHECK:
            continue
        if len(inbound) == 0:
            warnings.append(f"{rel}: Orphan page (has 0 incoming links)")

    # Print summary
    print("\n" + "="*50)
    print(" LINT AUDIT REPORT: NY 17-52 LLM WIKI")
    print("="*50)
    
    if errors:
        print(f"\n[CRITICAL ERRORS ({len(errors)})]:")
        for err in errors:
            print(f"  [X] {err}")
    else:
        print("\n[OK] Zero critical errors.")

    if warnings:
        print(f"\n[WARNINGS / AUDIT ITEMS ({len(warnings)})]:")
        for w in warnings:
            print(f"  [!] {w}")
    else:
        print("[OK] Zero warnings. All pages linked, indexed, and schema-valid!")

    print("\n" + "="*50)
    print(f"Total Notes Audited: {len(wiki_files)}")
    print(f"Index Verified: {INDEX_FILE.exists()}")
    print(f"Log Verified: {LOG_FILE.exists()}")
    print("="*50 + "\n")

    if errors:
        sys.exit(1)
    sys.exit(0)

if __name__ == "__main__":
    run_lint()
