import React from 'react';
import { History as HistoryInterface } from './interface';
import { Ps1 } from '../Ps1';

type ExplorerNode = {
  type: 'dir' | 'file';
  name: string;
  description?: string;
  content?: string;
  children?: ExplorerNode[];
};

interface ExplorerModalState {
  container: HTMLElement;
  window: HTMLElement;
  body: HTMLElement;
  status: HTMLElement;
  detail: string;
  expanded: boolean;
}

interface ExplorerState {
  tree: ExplorerNode[];
  path: number[];
  selection: number;
  modal?: ExplorerModalState;
}

const decodeExplorerTree = (encoded: string): ExplorerNode[] | null => {
  try {
    const decoded = decodeURIComponent(encoded);
    const parsed = JSON.parse(decoded);
    if (Array.isArray(parsed)) {
      return parsed as ExplorerNode[];
    }
  } catch {
    /* swallow parse errors */
  }
  return null;
};

const initFsExplorer = (root: HTMLElement, tree: ExplorerNode[]) => {
  const pathEl = root.querySelector<HTMLElement>('[data-role="path"]');
  const listEl = root.querySelector<HTMLElement>('[data-role="list"]');
  const statusEl = root.querySelector<HTMLElement>('[data-role="status"]');
  const fallback = root.querySelector<HTMLElement>('.fs-browser__noscript');

  if (fallback) fallback.remove();

  if (!pathEl || !listEl || !statusEl) {
    root.innerHTML = '<div class="fs-browser__error">LinkedIn explorer unavailable (missing template).</div>';
    return;
  }

  const state: ExplorerState = {
    tree,
    path: [],
    selection: 0,
  };

  let handleKeyDown: ((event: KeyboardEvent) => void) | null = null;
  let handleClick: ((event: MouseEvent) => void) | null = null;
  let handleMouseDown: (() => void) | null = null;
  let destroyExplorer: ((message?: string) => void) | null = null;

  const removeListeners = () => {
    if (handleKeyDown) root.removeEventListener('keydown', handleKeyDown);
    if (handleClick) root.removeEventListener('click', handleClick);
    if (handleMouseDown) root.removeEventListener('mousedown', handleMouseDown);
    handleKeyDown = null;
    handleClick = null;
    handleMouseDown = null;
  };

  const ensureFocus = () => {
    if (document.activeElement !== root) {
      root.focus({ preventScroll: true });
    }
  };

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
      switch (char) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return char;
      }
    });

  const getEntries = (): ExplorerNode[] => {
    let current = state.tree;
    for (const index of state.path) {
      const node = current[index];
      if (!node || node.type !== 'dir' || !node.children) {
        return [];
      }
      current = node.children;
    }
    return current;
  };

  const getPathNames = (): string[] => {
    const names: string[] = [];
    let current = state.tree;
    for (const index of state.path) {
      const node = current[index];
      if (!node || node.type !== 'dir') {
        break;
      }
      names.push(node.name);
      current = node.children || [];
    }
    return names;
  };

  const updateModalStatus = () => {
    if (!state.modal) return;
    const suffix = state.modal.expanded
      ? 'expanded to full height (press f to collapse, Esc or Ctrl+X to close)'
      : 'open (press f for full height, Esc or Ctrl+X to close)';
    statusEl.textContent = `file • ${state.modal.detail} — ${suffix}`;
    state.modal.status.textContent = state.modal.expanded
      ? '^X Close  Esc Back  f Shrink  ↑/k Scroll Up  ↓/j Scroll Down'
      : '^X Close  Esc Back  f Full Height  ↑/k Scroll Up  ↓/j Scroll Down';
  };

  const render = () => {
    const entries = getEntries();

    if (entries.length === 0) {
      state.selection = 0;
      listEl.innerHTML = '<div class="fs-browser__empty">(empty)</div>';
      if (!state.modal) {
        statusEl.textContent = 'empty • no entries in this directory';
      }
    } else {
      if (state.selection >= entries.length) {
        state.selection = entries.length - 1;
      }
      const rows = entries
        .map((entry, index) => {
          const active = index === state.selection ? ' fs-browser__row--active' : '';
          const badge = entry.type === 'dir' ? 'dir' : 'file';
          const description = entry.description
            ? `<span class="fs-browser__description">${escapeHtml(entry.description)}</span>`
            : '';
          return `
<div class="fs-browser__row${active}" data-index="${index}" data-type="${entry.type}">
  <span class="fs-browser__badge">${badge}</span>
  <span class="fs-browser__name">${escapeHtml(entry.name)}</span>
  ${description}
</div>`;
        })
        .join('');
      listEl.innerHTML = rows;

      const activeRow = listEl.querySelector<HTMLElement>('.fs-browser__row--active');
      if (activeRow) {
        activeRow.scrollIntoView({ block: 'nearest' });
      }

      if (!state.modal) {
        const current = entries[state.selection];
        const kind = current.type === 'dir' ? 'dir' : 'file';
        const detail = current.description || (current.type === 'dir' ? 'enter to open directory' : 'enter to open file');
        statusEl.textContent = `${kind} • ${detail}`;
      }
    }

    const path = getPathNames();
    pathEl.textContent = path.length ? `~/${path.join('/')}` : '~/';

    ensureFocus();
  };

  const moveSelection = (delta: number) => {
    const entries = getEntries();
    if (!entries.length) return;
    const total = entries.length;
    state.selection = (state.selection + delta + total) % total;
    render();
  };

  const closeFile = () => {
    if (!state.modal) return;
    state.modal.container.remove();
    state.modal = undefined;
  };

  destroyExplorer = (message?: string) => {
    removeListeners();
    closeFile();
    const messageEl = document.createElement('div');
    messageEl.className = 'fs-browser__closed';
    messageEl.textContent = message || "Exited explorer. Run 'ls' to reopen.";
    root.replaceWith(messageEl);
    destroyExplorer = null;
  };

  const toggleModalFull = () => {
    if (!state.modal) return;
    state.modal.expanded = !state.modal.expanded;
    state.modal.container.classList.toggle('fs-browser__modal--full', state.modal.expanded);
    state.modal.window.classList.toggle('fs-browser__modal-window--full', state.modal.expanded);
    state.modal.body.classList.toggle('fs-browser__modal-body--full', state.modal.expanded);
    updateModalStatus();
  };

  const openFile = (entry: ExplorerNode) => {
    closeFile();

    const modal = document.createElement('div');
    modal.className = 'fs-browser__modal';

    const windowEl = document.createElement('div');
    windowEl.className = 'fs-browser__modal-window';

    const titleEl = document.createElement('div');
    titleEl.className = 'fs-browser__modal-title';
    titleEl.textContent = `GNU nano — ${entry.name}`;

    const subtitleEl = document.createElement('div');
    subtitleEl.className = 'fs-browser__modal-subtitle';
    subtitleEl.textContent = entry.description || 'LinkedIn detail snapshot';

    const bodyEl = document.createElement('pre');
    bodyEl.className = 'fs-browser__modal-body';
    bodyEl.textContent = entry.content || 'No additional details recorded yet.';

    const statusBarEl = document.createElement('div');
    statusBarEl.className = 'fs-browser__modal-status';

    windowEl.append(titleEl, subtitleEl, bodyEl, statusBarEl);
    modal.append(windowEl);
    root.append(modal);

    state.modal = {
      container: modal,
      window: windowEl,
      body: bodyEl,
      status: statusBarEl,
      detail: entry.description || entry.name,
      expanded: false,
    };

    updateModalStatus();
    ensureFocus();
  };

  const openEntry = () => {
    const entries = getEntries();
    if (!entries.length) return;
    const entry = entries[state.selection];

    if (entry.type === 'dir') {
      state.path.push(state.selection);
      state.selection = 0;
      closeFile();
      render();
      return;
    }

    openFile(entry);
  };

  const goBack = () => {
    if (state.modal) {
      closeFile();
      render();
      return;
    }

    if (state.path.length === 0) {
      destroyExplorer?.();
      return;
    }
    state.path.pop();
    state.selection = 0;
    render();
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    const lower = key.length === 1 ? key.toLowerCase() : key.toLowerCase();
    const isUp = key === 'ArrowUp' || lower === 'w' || lower === 'k';
    const isDown = key === 'ArrowDown' || lower === 's' || lower === 'j';
    const isOpen = key === 'Enter' || key === 'ArrowRight' || lower === 'd' || lower === 'l';
    const isBack = key === 'Escape' || key === 'ArrowLeft' || lower === 'a' || lower === 'h';
    const isCtrlX = lower === 'x' && event.ctrlKey;

    if (state.modal) {
      if (lower === 'f') {
        event.preventDefault();
        toggleModalFull();
        return;
      }

      if (isUp) {
        event.preventDefault();
        if (!state.modal.expanded) {
          state.modal.body.scrollBy({ top: -28 });
        }
        return;
      }
      if (isDown) {
        event.preventDefault();
        if (!state.modal.expanded) {
          state.modal.body.scrollBy({ top: 28 });
        }
        return;
      }
      if (isBack || isCtrlX || lower === 'q') {
        event.preventDefault();
        closeFile();
        render();
        return;
      }
      return;
    }

    if (isUp) {
      event.preventDefault();
      moveSelection(-1);
      return;
    }

    if (isDown) {
      event.preventDefault();
      moveSelection(1);
      return;
    }

    if (isOpen) {
      event.preventDefault();
      openEntry();
      return;
    }

    if (isBack) {
      event.preventDefault();
      goBack();
      return;
    }
  };

  handleMouseDown = () => {
    window.setTimeout(ensureFocus, 0);
  };

  handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const row = target.closest('.fs-browser__row') as HTMLElement | null;
    if (!row) return;
    const indexAttr = row.getAttribute('data-index');
    if (!indexAttr) return;
    const index = Number(indexAttr);
    if (Number.isNaN(index)) return;

    const entries = getEntries();
    if (!entries.length) return;

    state.selection = Math.min(Math.max(index, 0), entries.length - 1);
    render();

    if (event.detail >= 2) {
      openEntry();
    }
  };

  if (handleKeyDown) root.addEventListener('keydown', handleKeyDown);
  if (handleClick) root.addEventListener('click', handleClick);
  if (handleMouseDown) root.addEventListener('mousedown', handleMouseDown);

  render();
  root.setAttribute('data-fs-ready', 'true');
  window.requestAnimationFrame(() => ensureFocus());
};

export const History: React.FC<{ history: Array<HistoryInterface>; username?: string }> = ({
  history,
  username,
}) => {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const explorers = Array.from(document.querySelectorAll<HTMLElement>('[data-fs-explorer]'));
    explorers.forEach((el) => {
      if (el.dataset.fsReady === 'true') return;
      const treeData = el.getAttribute('data-tree');
      if (!treeData) return;
      const parsed = decodeExplorerTree(treeData);
      if (!parsed) {
        el.innerHTML = '<div class="fs-browser__error">LinkedIn explorer failed to load.</div>';
        el.setAttribute('data-fs-ready', 'true');
        return;
      }
      initFsExplorer(el, parsed);
    });
  }, [history]);

  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div key={entry.command + index}>
          <div className="flex flex-row space-x-2">
            <div className="flex-shrink">
              <Ps1 username={username} />
            </div>

            <div className="flex-grow">{entry.command}</div>
          </div>

          <p
            className="whitespace-pre-wrap mb-2"
            style={{ lineHeight: 'normal' }}
            dangerouslySetInnerHTML={{ __html: entry.output }}
          />
        </div>
      ))}
    </>
  );
};

export default History;
