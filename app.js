/**
 * NY Series 17-52 Knowledge Hub — Client Application Logic
 * Vanilla ES6 JavaScript with interactive graph, markdown parser, and drills
 */

// Application State
const state = {
  activeTab: 'overview',
  notes: [],
  filteredNotes: [],
  currentNote: null,
  activeCategory: 'ALL',
  searchQuery: '',
  graphData: { nodes: [], links: [] },
  drills: [],
  quizScore: { correct: 0, total: 0 },
  answeredQuestions: new Set(),
};

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSearch();
  initModal();
  fetchInitialData();
});

async function fetchInitialData() {
  try {
    // Dynamic status badge based on host
    const statusTextEl = document.querySelector('.status-text');
    if (statusTextEl) {
      if (window.location.hostname.includes('github.io')) {
        statusTextEl.textContent = 'github.io (Live)';
      } else if (window.location.protocol === 'file:') {
        statusTextEl.textContent = 'Local (Offline)';
      } else {
        statusTextEl.textContent = window.location.host || '127.0.0.1:8080';
      }
    }

    // 1. Prefer Pre-compiled static data (instant load, works on GitHub Pages and offline)
    if (window.VAULT_STATIC_DATA) {
      const data = window.VAULT_STATIC_DATA;
      if (data.stats) {
        const totalNotesEl = document.getElementById('metric-total-notes');
        if (totalNotesEl) totalNotesEl.textContent = data.stats.totalNotes || '--';
        renderTopicWeights(data.stats.syllabusWeights);
      }
      if (data.notes) {
        state.notes = data.notes;
        updateCategoryCounts();
        filterAndRenderNotes();
        
        const defaultNote = state.notes.find(n => n.id === 'welcome' || n.id.includes('official-psi')) || state.notes[0];
        if (defaultNote) {
          loadNote(defaultNote.path);
        }
      }
      if (data.graph) {
        state.graphData = data.graph;
        initGraphCanvas();
      }
      if (data.drills) {
        state.drills = data.drills;
        renderDrills();
      }
      return;
    }

    // 2. Fallback to Local REST API Server
    const statsRes = await fetch('/api/stats');
    if (statsRes.ok) {
      const stats = await statsRes.json();
      document.getElementById('metric-total-notes').textContent = stats.totalNotes || '--';
      renderTopicWeights(stats.syllabusWeights);
    }

    const notesRes = await fetch('/api/notes');
    if (notesRes.ok) {
      state.notes = await notesRes.json();
      updateCategoryCounts();
      filterAndRenderNotes();
      
      const defaultNote = state.notes.find(n => n.id === 'welcome' || n.id.includes('official-psi')) || state.notes[0];
      if (defaultNote) {
        loadNote(defaultNote.path);
      }
    }

    const graphRes = await fetch('/api/graph');
    if (graphRes.ok) {
      state.graphData = await graphRes.json();
      initGraphCanvas();
    }

    const drillsRes = await fetch('/api/drills');
    if (drillsRes.ok) {
      state.drills = await drillsRes.json();
      renderDrills();
    }

  } catch (err) {
    console.error('Initialization error:', err);
  }
}

// ==========================================================================
// Tab Routing
// ==========================================================================

function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Update Tab Buttons
  document.querySelectorAll('.nav-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabId);
  });

  // Update View Panels
  document.querySelectorAll('.view-panel').forEach(p => {
    p.classList.toggle('active', p.id === `view-${tabId}`);
  });

  // Trigger resize or canvas re-render if switching to graph
  if (tabId === 'graph' && window.graphInstance) {
    window.graphInstance.resize();
  }
}

// ==========================================================================
// Topic Weights Grid (Overview)
// ==========================================================================

function renderTopicWeights(weights) {
  const container = document.getElementById('weights-container');
  if (!container || !weights) return;

  container.innerHTML = '';
  for (const [topic, pct] of Object.entries(weights)) {
    const card = document.createElement('div');
    card.className = 'weight-card glassmorphic';
    
    // Priority badge
    let priorityTag = pct >= 10 ? 'High Priority' : 'Standard';
    let priorityClass = pct >= 10 ? 'text-cyan' : 'text-dim';

    card.innerHTML = `
      <div>
        <div class="weight-card-top">
          <h4 class="weight-topic-name">${topic}</h4>
          <span class="weight-badge">${pct}%</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.25rem;">
          Approx. <strong class="${priorityClass}">${pct} Questions</strong> on 100-Q Exam
        </div>
      </div>
      <div class="weight-progress-track">
        <div class="weight-progress-bar" style="width: ${pct * 6.5}%;"></div>
      </div>
    `;
    container.appendChild(card);
  }
}

// ==========================================================================
// Knowledge Explorer: Note List & Filters
// ==========================================================================

function initSearch() {
  const input = document.getElementById('note-search-input');
  const clearBtn = document.getElementById('clear-search-btn');

  input.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    clearBtn.style.display = state.searchQuery ? 'block' : 'none';
    filterAndRenderNotes();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    state.searchQuery = '';
    clearBtn.style.display = 'none';
    filterAndRenderNotes();
    input.focus();
  });

  // Filter chips
  const chips = document.querySelectorAll('.filter-chips .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeCategory = chip.dataset.cat;
      filterAndRenderNotes();
    });
  });

  // Copy Markdown Button
  document.getElementById('copy-markdown-btn').addEventListener('click', () => {
    if (state.currentNote && state.currentNote.content) {
      navigator.clipboard.writeText(state.currentNote.content).then(() => {
        const btn = document.getElementById('copy-markdown-btn');
        const origText = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        setTimeout(() => { btn.innerHTML = origText; }, 1800);
      });
    }
  });
}

function updateCategoryCounts() {
  const counts = { ALL: state.notes.length, Concept: 0, Synthesis: 0, Reference: 0 };
  state.notes.forEach(n => {
    if (counts[n.category] !== undefined) counts[n.category]++;
  });

  document.getElementById('cat-count-all').textContent = counts.ALL;
  document.getElementById('cat-count-concept').textContent = counts.Concept || 0;
  document.getElementById('cat-count-synthesis').textContent = counts.Synthesis || 0;
  document.getElementById('cat-count-reference').textContent = counts.Reference || 0;
}

function filterAndRenderNotes() {
  const container = document.getElementById('notes-list-container');
  if (!container) return;

  state.filteredNotes = state.notes.filter(note => {
    const matchCat = state.activeCategory === 'ALL' || note.category === state.activeCategory;
    const matchQuery = !state.searchQuery || 
      note.title.toLowerCase().includes(state.searchQuery) ||
      note.id.toLowerCase().includes(state.searchQuery) ||
      (note.preview && note.preview.toLowerCase().includes(state.searchQuery));
    return matchCat && matchQuery;
  });

  container.innerHTML = '';
  if (state.filteredNotes.length === 0) {
    container.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-dim); font-size: 0.85rem;">No matching notes found</div>`;
    return;
  }

  state.filteredNotes.forEach(note => {
    const item = document.createElement('div');
    item.className = `note-item ${state.currentNote && state.currentNote.path === note.path ? 'active' : ''}`;
    item.dataset.path = note.path;

    item.innerHTML = `
      <div class="note-item-title">${escapeHtml(note.title)}</div>
      <div class="note-item-preview">${escapeHtml(note.preview || 'No preview available')}</div>
      <div class="note-item-meta">
        <span class="note-badge">${note.category}</span>
        <span>${note.wordCount || 0} words</span>
      </div>
    `;

    item.addEventListener('click', () => loadNote(note.path));
    container.appendChild(item);
  });
}

// ==========================================================================
// Note Loader & Markdown Renderer
// ==========================================================================

async function loadNote(relPath) {
  try {
    let data = null;

    // 1. Check pre-compiled static cache
    if (window.VAULT_STATIC_DATA && window.VAULT_STATIC_DATA.notesMap && window.VAULT_STATIC_DATA.notesMap[relPath]) {
      data = window.VAULT_STATIC_DATA.notesMap[relPath];
    } else {
      const res = await fetch(`/api/note?path=${encodeURIComponent(relPath)}`);
      if (res.ok) {
        data = await res.json();
      }
    }

    if (!data) return;
    state.currentNote = data;

    // Update active highlight in sidebar
    document.querySelectorAll('.note-item').forEach(el => {
      el.classList.toggle('active', el.dataset.path === relPath);
    });

    // Update Header
    document.getElementById('viewer-title').textContent = data.title;
    document.getElementById('viewer-path').textContent = data.path;
    const cat = (data.frontmatter && data.frontmatter.type) || data.category || 'Note';
    document.getElementById('viewer-category').textContent = cat;

    // Render Body
    const bodyContainer = document.getElementById('viewer-body');
    bodyContainer.innerHTML = renderMarkdown(data.body || data.content);

    // Attach click listeners to wikilinks
    bodyContainer.querySelectorAll('a.wikilink').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        handleWikilinkClick(target);
      });
    });

    // Scroll to top of viewer
    bodyContainer.scrollTop = 0;

  } catch (err) {
    console.error('Error loading note:', err);
  }
}

function openNoteByPath(path) {
  switchTab('explorer');
  loadNote(path);
}

function handleWikilinkClick(targetSlug) {
  const cleanTarget = targetSlug.toLowerCase().replace(/\[\[|\]\]/g, '').trim();
  let note = state.notes.find(n => 
    n.id.toLowerCase() === cleanTarget || 
    n.filename.toLowerCase() === cleanTarget ||
    n.title.toLowerCase() === cleanTarget ||
    cleanTarget.endsWith(n.id.toLowerCase())
  );

  // Fallback check against static slugMap
  if (!note && window.VAULT_STATIC_DATA && window.VAULT_STATIC_DATA.slugMap) {
    const staticItem = window.VAULT_STATIC_DATA.slugMap[cleanTarget];
    if (staticItem) {
      note = {
        id: cleanTarget,
        path: staticItem.path,
        title: staticItem.title,
        category: staticItem.category
      };
    }
  }

  if (note) {
    if (state.activeTab === 'explorer') {
      loadNote(note.path);
    } else {
      openModalPreview(note);
    }
  } else {
    console.warn('Target note not found in index:', targetSlug);
  }
}

// Lightweight, High-Performance Markdown to HTML Renderer
function renderMarkdown(md) {
  if (!md) return '';

  let html = md;

  // 1. Alert Callouts: > [!NOTE] ...
  html = html.replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s+(.*))?$/gim, (match, type, title) => {
    const colorClass = type.toLowerCase();
    const displayTitle = title ? title : type;
    return `<div class="callout-block ${colorClass}"><div class="callout-title">${displayTitle}</div>`;
  });
  // Close callout blocks if next line is not blockquote
  html = html.replace(/((?:<div class="callout-block [^>]+>[\s\S]*?)(?:^[^>].*?$))/gim, '$1</div>');

  // 2. Blockquotes
  html = html.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');

  // 3. Headers
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 4. Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 5. Wikilinks [[target|display]] or [[target]]
  html = html.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (match, target, alias) => {
    const displayText = alias ? alias : target.split('/').pop().replace(/-/g, ' ');
    return `<a class="wikilink" href="#" data-target="${escapeHtml(target)}">${escapeHtml(displayText)}</a>`;
  });

  // 6. Code Fences
  html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gim, (match, lang, code) => {
    return `<pre><code class="lang-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // 7. Inline Code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 8. Horizontal Rules
  html = html.replace(/^---$/gm, '<hr style="border:0; border-top:1px solid var(--border-subtle); margin:2rem 0;">');

  // 9. Markdown Tables
  html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
    const lines = match.trim().split('\n');
    if (lines.length < 2) return match;
    
    let table = '<table>';
    let isHeader = true;
    
    lines.forEach((line, idx) => {
      if (line.includes('---')) return; // skip delimiter
      const cells = line.split('|').map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1);
      if (idx === 0) {
        table += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      } else {
        table += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
    });
    table += '</tbody></table>';
    return table;
  });

  // 10. Unordered Lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // 11. Paragraphs (wrap blocks of text)
  html = html.split('\n\n').map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-4]|table|pre|blockquote|ul|ol|hr|div)/.test(block)) {
      return block;
    }
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

// ==========================================================================
// Interactive Canvas Knowledge Graph (Physics Simulation)
// ==========================================================================

function initGraphCanvas() {
  const canvas = document.getElementById('graph-canvas');
  if (!canvas || !state.graphData.nodes.length) return;

  const ctx = canvas.getContext('2d');
  const tooltip = document.getElementById('graph-tooltip');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  // Initialize random positions
  const nodes = state.graphData.nodes.map((n, i) => ({
    ...n,
    x: width / 2 + (Math.random() - 0.5) * 500,
    y: height / 2 + (Math.random() - 0.5) * 400,
    vx: 0,
    vy: 0,
    radius: Math.min(22, Math.max(7, n.val || 10))
  }));

  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  const links = state.graphData.links
    .map(l => ({
      source: nodeMap.get(l.source),
      target: nodeMap.get(l.target)
    }))
    .filter(l => l.source && l.target);

  let transform = { x: 0, y: 0, k: 1 };
  let isDragging = false;
  let dragNode = null;
  let hoveredNode = null;
  let startX = 0, startY = 0;

  // Simulation step
  function tick() {
    // 1. Repulsion between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 260) {
          const force = (260 - dist) / 260 * 0.45;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }
    }

    // 2. Attraction along links
    for (const l of links) {
      const dx = l.target.x - l.source.x;
      const dy = l.target.y - l.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const desired = 90;
      const force = (dist - desired) * 0.008;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      l.source.vx += fx;
      l.source.vy += fy;
      l.target.vx -= fx;
      l.target.vy -= fy;
    }

    // 3. Center gravity & friction
    const cx = width / 2;
    const cy = height / 2;
    for (const n of nodes) {
      n.vx += (cx - n.x) * 0.0008;
      n.vy += (cy - n.y) * 0.0008;
      n.vx *= 0.88;
      n.vy *= 0.88;
      n.x += n.vx;
      n.y += n.vy;
    }
  }

  function render() {
    tick();

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    // Draw Links
    ctx.lineWidth = 1;
    for (const l of links) {
      const isHighlighted = hoveredNode && (l.source === hoveredNode || l.target === hoveredNode);
      ctx.strokeStyle = isHighlighted ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = isHighlighted ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(l.source.x, l.source.y);
      ctx.lineTo(l.target.x, l.target.y);
      ctx.stroke();
    }

    // Draw Nodes
    for (const n of nodes) {
      const isHovered = n === hoveredNode;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + (isHovered ? 4 : 0), 0, Math.PI * 2);
      ctx.fillStyle = n.color || '#06b6d4';
      ctx.fill();

      if (isHovered) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Draw Title Labels on larger or hovered nodes
      if (n.radius >= 14 || isHovered || transform.k > 1.3) {
        ctx.font = '11px Outfit, sans-serif';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(n.title.slice(0, 24), n.x + n.radius + 6, n.y + 4);
      }
    }

    ctx.restore();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Mouse Interactivity
  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    return {
      x: (mx - transform.x) / transform.k,
      y: (my - transform.y) / transform.k,
      rawX: mx,
      rawY: my
    };
  }

  canvas.addEventListener('mousemove', (e) => {
    const pos = getMousePos(e);

    if (isDragging && dragNode) {
      dragNode.x = pos.x;
      dragNode.y = pos.y;
      return;
    }

    if (isDragging) {
      transform.x += e.clientX - startX;
      transform.y += e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;
      return;
    }

    // Hit test
    hoveredNode = null;
    for (const n of nodes) {
      const dx = pos.x - n.x;
      const dy = pos.y - n.y;
      if (Math.sqrt(dx * dx + dy * dy) <= n.radius + 4) {
        hoveredNode = n;
        break;
      }
    }

    if (hoveredNode) {
      canvas.style.cursor = 'pointer';
      tooltip.style.display = 'block';
      tooltip.style.left = `${pos.rawX + 15}px`;
      tooltip.style.top = `${pos.rawY + 15}px`;
      tooltip.innerHTML = `<strong>${escapeHtml(hoveredNode.title)}</strong><br><span style="color:var(--cyan);font-size:0.75rem">${hoveredNode.category}</span>`;
    } else {
      canvas.style.cursor = 'grab';
      tooltip.style.display = 'none';
    }
  });

  canvas.addEventListener('mousedown', (e) => {
    const pos = getMousePos(e);
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;

    for (const n of nodes) {
      const dx = pos.x - n.x;
      const dy = pos.y - n.y;
      if (Math.sqrt(dx * dx + dy * dy) <= n.radius + 4) {
        dragNode = n;
        break;
      }
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    dragNode = null;
  });

  canvas.addEventListener('click', (e) => {
    if (hoveredNode && hoveredNode.path) {
      openNoteByPath(hoveredNode.path);
    }
  });

  // Zoom controls
  document.getElementById('graph-zoom-in').addEventListener('click', () => {
    transform.k = Math.min(3, transform.k * 1.25);
  });
  document.getElementById('graph-zoom-out').addEventListener('click', () => {
    transform.k = Math.max(0.4, transform.k * 0.8);
  });
  document.getElementById('graph-reset-btn').addEventListener('click', () => {
    transform = { x: 0, y: 0, k: 1 };
  });

  window.graphInstance = {
    resize: () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }
  };
  window.addEventListener('resize', window.graphInstance.resize);
}

// ==========================================================================
// Exam Drills & Quiz Simulator
// ==========================================================================

function renderDrills() {
  const container = document.getElementById('quiz-cards-container');
  if (!container || !state.drills.length) return;

  container.innerHTML = '';
  state.quizScore = { correct: 0, total: state.drills.length };
  state.answeredQuestions.clear();
  updateScoreboard();

  state.drills.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'quiz-card glassmorphic';
    card.id = `quiz-card-${q.id}`;

    const optionsHtml = q.options.map((opt, oIdx) => `
      <button class="quiz-option-btn" data-q="${q.id}" data-idx="${oIdx}">
        <span class="badge-sub">${String.fromCharCode(65 + oIdx)}</span>
        <span>${escapeHtml(opt)}</span>
      </button>
    `).join('');

    card.innerHTML = `
      <div class="quiz-question-meta">
        <span class="quiz-topic-tag">${escapeHtml(q.category)} &bull; ${escapeHtml(q.topic)}</span>
        <span style="font-size: 0.8rem; color: var(--text-dim);">Scenario ${idx + 1} of ${state.drills.length}</span>
      </div>
      <h3 class="quiz-question-text">${escapeHtml(q.question)}</h3>
      <div class="quiz-options-list">${optionsHtml}</div>
      <div class="quiz-feedback-box" id="feedback-${q.id}">
        <div id="feedback-result-${q.id}" style="font-weight: 700; margin-bottom: 0.5rem;"></div>
        <p style="font-size: 0.9rem; color: #cbd5e1; line-height: 1.5;">${escapeHtml(q.explanation)}</p>
        <div class="quiz-mnemonic"><strong>💡 Mnemonic:</strong> ${escapeHtml(q.mnemonic)}</div>
      </div>
    `;

    // Attach click listeners to option buttons
    card.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleQuizAnswer(q, parseInt(btn.dataset.idx, 10), card);
      });
    });

    container.appendChild(card);
  });

  document.getElementById('quiz-reset-btn').addEventListener('click', renderDrills);
}

function handleQuizAnswer(q, selectedIdx, cardElement) {
  if (state.answeredQuestions.has(q.id)) return;
  state.answeredQuestions.add(q.id);

  const buttons = cardElement.querySelectorAll('.quiz-option-btn');
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIdx === q.correctIndex;
  if (isCorrect) {
    state.quizScore.correct++;
    buttons[selectedIdx].classList.add('correct');
  } else {
    buttons[selectedIdx].classList.add('wrong');
    buttons[q.correctIndex].classList.add('correct');
  }

  updateScoreboard();

  // Show Feedback
  const feedbackBox = document.getElementById(`feedback-${q.id}`);
  const resultTitle = document.getElementById(`feedback-result-${q.id}`);
  feedbackBox.classList.add('show');
  
  if (isCorrect) {
    resultTitle.textContent = 'Correct! Great Exam Instinct.';
    resultTitle.style.color = 'var(--emerald)';
  } else {
    resultTitle.textContent = 'Incorrect. Review the Distractor Analysis below.';
    resultTitle.style.color = 'var(--rose)';
  }
}

function updateScoreboard() {
  const el = document.getElementById('quiz-score');
  if (el) {
    el.textContent = `${state.quizScore.correct} / ${state.answeredQuestions.size} (${state.drills.length} Total)`;
  }
}

// ==========================================================================
// Modal Note Preview
// ==========================================================================

function initModal() {
  const modal = document.getElementById('preview-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

async function openModalPreview(note) {
  try {
    let data = null;

    if (window.VAULT_STATIC_DATA && window.VAULT_STATIC_DATA.notesMap && window.VAULT_STATIC_DATA.notesMap[note.path]) {
      data = window.VAULT_STATIC_DATA.notesMap[note.path];
    } else {
      const res = await fetch(`/api/note?path=${encodeURIComponent(note.path)}`);
      if (res.ok) {
        data = await res.json();
      }
    }

    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    const body = document.getElementById('modal-body');
    body.innerHTML = renderMarkdown(data.body || data.content);

    // Attach click listeners to wikilinks inside modal
    body.querySelectorAll('a.wikilink').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('preview-modal').classList.remove('open');
        handleWikilinkClick(link.dataset.target);
      });
    });

    document.getElementById('preview-modal').classList.add('open');
  } catch (err) {
    console.error('Error previewing modal note:', err);
  }
}
