// engine.js — pure functions shared by the Obsidian plugin and the web page (no Obsidian, no DOM, no network).
import { L, LANGS, FM, FREE_TEMPLATES, PRO_TEMPLATES } from './i18n.js';

// ── dates (local calendar days as 'YYYY-MM-DD' strings) ─────────────────────────────────────────────────────────
const p2 = (n) => String(n).padStart(2, '0');
export const ymd = (d) => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
export const parseYmd = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || '')); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
export const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
export const msToYmd = (ms) => (ms ? ymd(new Date(ms)) : '');

export function isoWeek(s) {
  const d = parseYmd(s), t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear();
  return { year: y, week: Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7) };
}

// a review period that contains the day `s` → { kind, start, end (exclusive), id }
export function period(kind, s) {
  const d = parseYmd(s);
  if (kind === 'weekly') {
    const start = addDays(s, -((d.getDay() + 6) % 7));
    const w = isoWeek(s);
    return { kind, start, end: addDays(start, 7), id: w.year + '-W' + p2(w.week) };
  }
  if (kind === 'monthly') {
    const start = ymd(new Date(d.getFullYear(), d.getMonth(), 1));
    return { kind, start, end: ymd(new Date(d.getFullYear(), d.getMonth() + 1, 1)), id: start.slice(0, 7) };
  }
  if (kind === 'quarterly') {
    const q = Math.floor(d.getMonth() / 3);
    return { kind, start: ymd(new Date(d.getFullYear(), q * 3, 1)), end: ymd(new Date(d.getFullYear(), q * 3 + 3, 1)), id: d.getFullYear() + '-Q' + (q + 1) };
  }
  throw new Error('unknown period ' + kind);
}

// moment-style formatter for the tokens our templates use: YYYY MMMM MM M DD D dddd ddd [literal]
export function fmtDate(s, fmt, lang) {
  const d = parseYmd(s), loc = lang === 'pt' ? 'pt-BR' : lang;
  const name = (o) => new Intl.DateTimeFormat(loc, o).format(d);
  return String(fmt).replace(/\[([^\]]*)\]|YYYY|MMMM|MM|M|DD|D|dddd|ddd/g, (t, lit) => {
    if (lit !== undefined) return lit;
    switch (t) {
      case 'YYYY': return String(d.getFullYear());
      case 'MMMM': return lang === 'ja' ? (d.getMonth() + 1) + '月' : name({ month: 'long' });
      case 'MM': return p2(d.getMonth() + 1);
      case 'M': return String(d.getMonth() + 1);
      case 'DD': return p2(d.getDate());
      case 'D': return String(d.getDate());
      case 'dddd': return name({ weekday: 'long' });
      case 'ddd': return name({ weekday: 'short' }).replace(/\.$/, '');
    }
    return t;
  });
}

// ── templates ────────────────────────────────────────────────────────────────────────────────────────────────
export function fill(text, v, lang) {
  return String(text)
    .replace(/\{\{title\}\}/g, v.title || '')
    .replace(/\{\{date:([^}]+)\}\}/g, (_, f) => fmtDate(v.date, f, lang))
    .replace(/\{\{date\}\}/g, v.date)
    .replace(/\{\{time\}\}/g, v.time || '');
}

export function frontmatter(obj) {
  const keys = Object.keys(obj || {});
  if (!keys.length) return '';
  return '---\n' + keys.map((k) => k + ': ' + obj[k]).join('\n') + '\n---\n';
}

export function sectionsMd(sections) {
  return sections.map(([h, lines]) => '## ' + h + '\n' + lines.join('\n')).join('\n\n') + '\n';
}

// the template file as stored in the templates folder (placeholders kept)
export function templateText(lang, id) {
  const t = L[lang], body = t.tpl[id];
  if (!body) throw new Error('no template ' + id);
  const h1 = id === 'daily' ? '# {{date:' + t.dailyTitle + '}}' : '# {{title}}';
  return frontmatter(FM[id]) + '\n' + h1 + '\n\n' + sectionsMd(body);
}

export const dailyNote = (lang, date) => fill(templateText(lang, 'daily'), { date }, lang);
export const projectNote = (lang, title, date) => fill(templateText(lang, 'project'), { title, date }, lang);

export function startProject(lang, date) {
  const t = L[lang];
  const tasks = t.startTasks.map((x) => '- [ ] ' + x.replace('{inbox}', t.folders.inbox));
  return frontmatter({ type: 'project', status: 'active', area: '', created: date, due: '' }) + '\n# ' + t.start + '\n\n' +
    sectionsMd([[t.tpl.project[0][0], [t.startOutcome]], [t.tpl.project[1][0], tasks]]);
}

export function homeNote(lang, date) {
  const t = L[lang], f = t.folders, u = t.ui;
  const link = (p, label) => '[[' + p + '|' + (label || p.split('/').pop()) + ']]';
  return '# ' + t.home + '\n\n' + t.homeIntro + '\n\n## ' + t.homeFolders + '\n' +
    ['inbox', 'projects', 'areas', 'resources', 'archive', 'daily', 'reviews', 'templates'].map((k) => '- ' + f[k]).join('\n') +
    '\n\n## ' + t.homeToday + '\n- ' + link(f.projects + '/' + t.start, t.start) + '\n\n## ' + t.homeCommands + '\n' +
    [u.cmdToday, u.cmdProject, u.cmdPreview, u.cmdWeekly, u.cmdMonthly, u.cmdArchive].map((c) => '- ' + c).join('\n') + '\n';
}

// ── install plan: what setup will create; existing paths are listed and skipped, never overwritten ─────────────
export function folderList(lang) {
  const f = L[lang].folders;
  return [f.inbox, f.projects, f.areas, f.resources, f.archive, f.journal, f.daily, f.reviews, f.templates];
}

export function planInstall(lang, exists, opts) {
  const o = opts || {}, t = L[lang], f = t.folders, date = o.date || ymd(new Date());
  const has = typeof exists === 'function' ? exists : (p) => exists.has(p);
  const items = folderList(lang).map((p) => ({ path: p, kind: 'folder' }));
  items.push({ path: t.home + '.md', kind: 'file', content: homeNote(lang, date) });
  items.push({ path: f.projects + '/' + t.start + '.md', kind: 'file', content: startProject(lang, date) });
  const tpls = FREE_TEMPLATES.concat(o.pro ? PRO_TEMPLATES : []);
  for (const id of tpls) items.push({ path: f.templates + '/' + t.names[id] + '.md', kind: 'file', content: templateText(lang, id), template: id });
  for (const it of items) it.exists = !!has(it.path);
  return items;
}

export function proTemplatePlan(lang, exists, folders) {
  const t = L[lang], has = typeof exists === 'function' ? exists : (p) => exists.has(p), dir = (folders || t.folders).templates;
  return PRO_TEMPLATES.map((id) => {
    const path = dir + '/' + t.names[id] + '.md';
    return { path, kind: 'file', content: templateText(lang, id), template: id, exists: !!has(path) };
  });
}

// ── reading notes ────────────────────────────────────────────────────────────────────────────────────────────
export function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(String(text || ''));
  const out = {};
  if (!m) return out;
  for (const ln of m[1].split(/\r?\n/)) {
    const k = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(ln);
    if (k) out[k[1].toLowerCase()] = k[2].replace(/^["']|["']$/g, '').trim();
  }
  return out;
}

const TASK = /^(\s*[-*+]\s+)\[(.)\]\s+(.*)$/;
const DATE_RX = (marks) => new RegExp('(?:' + marks + ')\\s*(\\d{4}-\\d{2}-\\d{2})');
const DONE_AT = DATE_RX('✅|\\[completion::|done::|\\[done::');
const DUE_AT = DATE_RX('📅|\\[due::|due::');

export function parseTasks(text) {
  const out = [];
  String(text || '').split(/\r?\n/).forEach((line, i) => {
    const m = TASK.exec(line);
    if (!m) return;
    const body = m[3].trim();
    if (!body) return;                                    // an empty "- [ ] " placeholder is not a task
    const st = m[2];
    const done = st === 'x' || st === 'X';
    if (!done && st !== ' ') return;                      // [>] forwarded · [-] cancelled · others: not open, not done
    const da = DONE_AT.exec(body), du = DUE_AT.exec(body);
    out.push({ done, text: body, line: i, doneDate: da ? da[1] : '', due: du ? du[1] : '' });
  });
  return out;
}

export const taskKey = (s) => String(s).replace(/\s*(✅|📅|⏳|🛫|➕)\s*\d{4}-\d{2}-\d{2}/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

const ALL_DONE_WORDS = new Set([].concat(...LANGS.map((l) => L[l].doneWords)));
export const isDoneStatus = (s) => ALL_DONE_WORDS.has(String(s || '').trim().toLowerCase());

const under = (path, folder) => !!folder && (path === folder || path.startsWith(folder + '/'));
const base = (p) => p.split('/').pop().replace(/\.md$/i, '');

// the day a note was created: frontmatter created/date → a leading YYYY-MM-DD in the file name → file ctime
export function createdDay(file, fm) {
  for (const v of [fm.created, fm.date]) if (/^\d{4}-\d{2}-\d{2}/.test(v || '')) return v.slice(0, 10);
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(base(file.path));
  if (m) return m[1];
  return file.ctime ? msToYmd(file.ctime) : '';
}

// ── projects ─────────────────────────────────────────────────────────────────────────────────────────────────
// a project = a note directly in the projects folder, or a folder in it (its main note = same name, else the first note)
export function projectsOf(files, folders) {
  const map = new Map();
  for (const f of files) {
    if (!under(f.path, folders.projects) || !/\.md$/i.test(f.path)) continue;
    const rest = f.path.slice(folders.projects.length + 1).split('/');
    const isFolder = rest.length > 1, key = isFolder ? rest[0] : base(f.path);
    const pr = map.get(key) || { key, isFolder, path: isFolder ? folders.projects + '/' + key : f.path, files: [], main: null };
    pr.files.push(f);
    if (!isFolder || base(f.path) === key) pr.main = f;
    map.set(key, pr);
  }
  for (const pr of map.values()) {
    if (!pr.main) pr.main = pr.files.slice().sort((a, b) => a.path.localeCompare(b.path))[0];
    pr.fm = parseFrontmatter(pr.main.text);
    pr.done = isDoneStatus(pr.fm.status);
    pr.lastTouch = Math.max(...pr.files.map((x) => x.mtime || 0));
  }
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}

// ── the review: numbers and lists from the vault's own notes ─────────────────────────────────────────────────
// files: [{path, text, mtime, ctime?}] · folders: resolved folder paths · range: period() · today: 'YYYY-MM-DD'
// doneIndex (plugin only): {path: {taskKey: 'YYYY-MM-DD' first seen ticked}} — lets a tick without a ✅ date count
export function computeReview(files, folders, range, today, doneIndex) {
  const inR = (s) => !!s && s >= range.start && s < range.end;
  const notes = files.filter((f) => /\.md$/i.test(f.path) && !under(f.path, folders.templates) && !under(f.path, folders.reviews));
  const dailyDay = (f) => (under(f.path, folders.daily) && /^\d{4}-\d{2}-\d{2}$/.test(base(f.path)) ? base(f.path) : '');
  const r = { range, today, created: [], changed: [], done: [], open: [], noNext: [], stalled: [], overdue: [], inbox: 0, daily: 0, openCount: 0 };
  const seen = new Set();
  for (const f of notes) {
    const fm = parseFrontmatter(f.text), dd = dailyDay(f);
    if (dd) { if (inR(dd)) r.daily++; }
    else {
      const c = createdDay(f, fm);
      if (inR(c)) r.created.push(f.path);
      else if (inR(msToYmd(f.mtime))) r.changed.push(f.path);
    }
    if (under(f.path, folders.inbox)) r.inbox++;
    const idx = (doneIndex && doneIndex[f.path]) || {};
    for (const t of parseTasks(f.text)) {
      if (t.done) {
        const when = t.doneDate || idx[taskKey(t.text)] || (dd || '');
        const k = f.path + '\u0000' + taskKey(t.text);
        if (inR(when) && !seen.has(k)) { seen.add(k); r.done.push({ path: f.path, text: t.text, date: when }); }
      } else if (t.due && t.due < today) r.overdue.push({ path: f.path, text: t.text, due: t.due });
    }
  }
  const stallBefore = addDays(today, -14);
  for (const pr of projectsOf(notes, folders)) {
    if (pr.done) continue;
    const open = [];
    for (const f of pr.files) for (const t of parseTasks(f.text)) if (!t.done) open.push({ path: f.path, text: t.text });
    r.openCount += open.length;
    r.open.push({ key: pr.key, path: pr.main.path, tasks: open });
    if (!open.length) r.noNext.push(pr.main.path);
    if (msToYmd(pr.lastTouch) < stallBefore) r.stalled.push({ path: pr.main.path, last: msToYmd(pr.lastTouch) });
  }
  r.done.sort((a, b) => a.date.localeCompare(b.date) || a.path.localeCompare(b.path));
  r.numbers = {
    created: r.created.length, changed: r.changed.length, done: r.done.length, open: r.openCount,
    noNext: r.noNext.length, stalled: r.stalled.length, inbox: r.inbox, daily: r.daily, overdue: r.overdue.length,
  };
  return r;
}

export const NUMBER_ORDER = ['done', 'created', 'changed', 'open', 'noNext', 'stalled', 'overdue', 'inbox', 'daily'];

export function reviewPath(lang, folders, range) {
  return folders.reviews + '/' + range.id + '.md';
}

export function renderReview(lang, r, opts) {
  const t = L[lang], R = t.review, o = opts || {}, cap = o.cap || 30;
  const link = (p) => '[[' + p.replace(/\.md$/i, '') + '|' + base(p) + ']]';
  const list = (arr, fn) => (arr.length ? arr.slice(0, cap).map(fn).join('\n') + (arr.length > cap ? '\n' + R.more.replace('{n}', arr.length - cap) : '') : R.none);
  const kind = r.range.kind, last = addDays(r.range.end, -1);
  const out = [];
  out.push(frontmatter({ type: kind + '-review', period: r.range.id, from: r.range.start, to: last, generated: r.today }));
  out.push('# ' + R[kind] + ' ' + r.range.id);
  out.push(fmtDate(r.range.start, 'D MMMM YYYY', lang) + ' – ' + fmtDate(last, 'D MMMM YYYY', lang) + '\n');
  out.push('## ' + R.numbers + '\n| ' + R[kind] + ' | ' + r.range.id + ' |\n|---|---:|\n' + NUMBER_ORDER.map((k) => '| ' + R[k] + ' | ' + r.numbers[k] + ' |').join('\n') + '\n');
  out.push('## ' + R.doneList + '\n' + list(r.done, (d) => '- [x] ' + d.text + ' — ' + link(d.path)) + '\n');
  const withOpen = r.open.filter((p) => p.tasks.length);
  out.push('## ' + R.openList + '\n' + (withOpen.length ? withOpen.map((p) => '### ' + link(p.path) + ' (' + p.tasks.length + ')\n' +
    list(p.tasks, (x) => '- ' + x.text + (x.path !== p.path ? ' — ' + link(x.path) : ''))).join('\n') : R.none) + '\n');
  out.push('## ' + R.noNextList + '\n' + list(r.noNext, (p) => '- ' + link(p)) + '\n');
  out.push('## ' + R.stalledList + '\n' + list(r.stalled, (s) => '- ' + link(s.path) + ' (' + s.last + ')') + '\n');
  out.push('## ' + R.overdueList + '\n' + list(r.overdue, (x) => '- ' + x.text + ' — ' + link(x.path)) + '\n');
  out.push('## ' + R.createdList + '\n' + list(r.created, (p) => '- ' + link(p)) + '\n');
  const refl = t.tpl[kind];
  if (refl) out.push('# ' + R.reflect + '\n\n' + sectionsMd(refl));
  return out.join('\n');
}

// ── daily roll-over: open tasks of the last daily note move to today; the old line becomes "- [>]" (forwarded) ────
export function rollover(prevText) {
  const lines = String(prevText || '').split(/\r?\n/), moved = [];
  for (let i = 0; i < lines.length; i++) {
    const m = TASK.exec(lines[i]);
    if (m && m[2] === ' ' && m[3].trim()) { moved.push('- [ ] ' + m[3].trim()); lines[i] = m[1] + '[>] ' + m[3]; }
  }
  return { moved, prevText: lines.join('\n') };
}

// put lines under "## heading": replaces the empty "- [ ] " placeholder when that is all the section holds
export function insertUnder(text, heading, newLines) {
  if (!newLines.length) return text;
  const lines = String(text).split('\n');
  const h = lines.findIndex((l) => l.trim() === '## ' + heading);
  if (h < 0) return text.replace(/\s*$/, '\n\n## ' + heading + '\n' + newLines.join('\n') + '\n');
  let end = h + 1;
  while (end < lines.length && !/^#{1,2} /.test(lines[end])) end++;
  const body = lines.slice(h + 1, end).filter((l) => l.trim() !== '' && l.trim() !== '- [ ]');
  return lines.slice(0, h + 1).concat(body, newLines, [''], lines.slice(end)).join('\n').replace(/\n{3,}/g, '\n\n');
}

export function lastDailyBefore(paths, folders, today) {
  let best = '';
  for (const p of paths) {
    if (!under(p, folders.daily)) continue;
    const d = base(p);
    if (/^\d{4}-\d{2}-\d{2}$/.test(d) && d < today && d > base(best || 'x/0000-00-00.md')) best = p;
  }
  return best;
}

// ── archive: finished projects → archive/<year>/ ─────────────────────────────────────────────────────────────
export function archivePlan(files, folders, today) {
  return projectsOf(files.filter((f) => /\.md$/i.test(f.path)), folders).filter((p) => p.done).map((p) => {
    const when = [p.fm.finished, p.fm.done, p.fm.completed].find((v) => /^\d{4}/.test(v || '')) || today;
    const target = folders.archive + '/' + when.slice(0, 4) + '/' + p.path.split('/').pop();
    return { key: p.key, from: p.path, to: target, isFolder: p.isFolder };
  });
}

// ── packs (monthly template packs from the server) ───────────────────────────────────────────────────────────
// pack = {id:'2026-11', title:{en..}, files:{en:[{name, text}], de:[…]…}}
export function packPlan(pack, lang, folders, exists) {
  const has = typeof exists === 'function' ? exists : (p) => exists.has(p);
  const title = (pack.title && (pack.title[lang] || pack.title.en)) || pack.id;
  const dir = folders.templates + '/Packs/' + pack.id + ' ' + title.replace(/[\\/:*?"<>|#^[\]]/g, '-');
  const files = (pack.files && (pack.files[lang] || pack.files.en)) || [];
  return files.map((x) => { const path = dir + '/' + x.name.replace(/[\\/:*?"<>|#^[\]]/g, '-') + '.md'; return { path, kind: 'file', content: x.text, exists: !!has(path) }; });
}

// ── zip (store only) for the web page's downloads ────────────────────────────────────────────────────────────
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }

export function makeZip(entries) {
  const enc = new TextEncoder(), parts = [], central = [];
  let off = 0;
  const u16 = (v) => [v & 255, (v >>> 8) & 255], u32 = (v) => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
  for (const e of entries) {
    const isDir = e.path.endsWith('/');
    const name = enc.encode(e.path), data = isDir ? new Uint8Array(0) : enc.encode(e.content || ''), crc = crc32(data);
    const head = [].concat(u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0));
    parts.push(new Uint8Array(head), name, data);
    central.push(new Uint8Array([].concat(u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(crc), u32(data.length), u32(data.length),
      u16(name.length), u16(0), u16(0), u16(0), u16(0), u32(isDir ? 0x10 : 0), u32(off))), name);
    off += head.length + name.length + data.length;
  }
  const csize = central.reduce((s, b) => s + b.length, 0);
  const end = new Uint8Array([].concat(u32(0x06054b50), u16(0), u16(0), u16(entries.length), u16(entries.length), u32(csize), u32(off), u16(0)));
  const all = parts.concat(central, [end]), out = new Uint8Array(all.reduce((s, b) => s + b.length, 0));
  let o = 0;
  for (const b of all) { out.set(b, o); o += b.length; }
  return out;
}

// the starter vault as zip entries (web page download): folders + files of the install plan, plus today's daily note
export function vaultEntries(lang, opts) {
  const o = opts || {}, date = o.date || ymd(new Date()), root = (o.root || 'Starter Vault') + '/';
  const plan = planInstall(lang, new Set(), { pro: o.pro, date });
  const ent = [];
  for (const it of plan) ent.push(it.kind === 'folder' ? { path: root + it.path + '/' } : { path: root + it.path, content: it.content });
  ent.push({ path: root + L[lang].folders.daily + '/' + date + '.md', content: dailyNote(lang, date) });
  return ent;
}

export { L, LANGS };
