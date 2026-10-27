import { Plugin, Modal, Notice, Setting, PluginSettingTab, TFile, TFolder, normalizePath, requestUrl } from 'obsidian';
import { L, LANGS, LANG_NAMES, pickLang } from './i18n.js';
import * as E from './engine.js';

const SITE = 'https://getreadystack.com';
const SLUG = 'obsidian-starter-vault-plugin';
const DOORS = [[SLUG, 'pro'], [SLUG + '.club', 'club'], [SLUG + '.year', 'year']];
const BUY = { pro: SITE + '/api/buy/web/' + SLUG, club: SITE + '/api/buy/web/' + SLUG + '.club', year: SITE + '/api/buy/web/' + SLUG + '.year' };
const PACK_INDEX = SITE + '/apps/' + SLUG + '/packs-index.json';
const RECHECK = 7 * 864e5, GRACE = 30 * 864e5;

const DEFAULTS = { lang: '', folders: null, key: '', tier: 'free', checkedAt: 0, doneIndex: {} };
const fmt = (s, v) => String(s).replace(/\{(\w+)\}/g, (_, k) => (v && k in v ? v[k] : '{' + k + '}'));

export default class StarterVault extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULTS, await this.loadData());
    if (!this.settings.lang) this.settings.lang = pickLang(window.localStorage.getItem('language') || 'en');
    const u = this.t().ui;

    this.addRibbonIcon('calendar-check', u.cmdToday, () => this.openToday());
    this.addCommand({ id: 'setup', name: u.cmdSetup, callback: () => new SetupModal(this).open() });
    this.addCommand({ id: 'open-today', name: u.cmdToday, callback: () => this.openToday() });
    this.addCommand({ id: 'new-project', name: u.cmdProject, callback: () => new NameModal(this, (n) => this.newProject(n)).open() });
    this.addCommand({ id: 'preview-week', name: u.cmdPreview, callback: () => this.preview() });
    this.addCommand({ id: 'write-weekly-review', name: u.cmdWeekly, callback: () => this.pro(() => this.writeReview('weekly')) });
    this.addCommand({ id: 'write-monthly-review', name: u.cmdMonthly, callback: () => this.pro(() => this.writeReview('monthly')) });
    this.addCommand({ id: 'write-quarterly-review', name: u.cmdQuarter, callback: () => this.pro(() => this.writeReview('quarterly')) });
    this.addCommand({ id: 'archive-finished-projects', name: u.cmdArchive, callback: () => this.pro(() => this.archive()) });
    this.addCommand({ id: 'add-pro-templates', name: u.cmdTemplates, callback: () => this.pro(() => this.addProTemplates()) });
    this.addCommand({ id: 'template-packs', name: u.cmdPacks, callback: () => new PacksModal(this).open() });
    this.addCommand({ id: 'enter-key', name: u.cmdKey, callback: () => new KeyModal(this).open() });
    this.addSettingTab(new SVSettings(this));

    // remember the day a task was ticked (for ticks without a ✅ date) — read-only on your notes, stored in this plugin's data
    this.timers = new Map();
    this.app.workspace.onLayoutReady(async () => {
      await this.scanAll();
      this.registerEvent(this.app.vault.on('modify', (f) => this.queueIndex(f)));
      this.registerEvent(this.app.vault.on('create', (f) => this.queueIndex(f)));
      this.registerEvent(this.app.vault.on('delete', (f) => { delete this.settings.doneIndex[f.path]; this.saveSoon(); }));
      this.registerEvent(this.app.vault.on('rename', (f, old) => { const v = this.settings.doneIndex[old]; delete this.settings.doneIndex[old]; if (v) this.settings.doneIndex[f.path] = v; this.saveSoon(); }));
      this.recheckKey();
    });
  }

  onunload() { for (const t of this.timers.values()) window.clearTimeout(t); }

  t() { return L[this.settings.lang] || L.en; }
  folders() { return this.settings.folders || this.t().folders; }
  today() { return E.ymd(new Date()); }
  isPro() { return ['pro', 'club', 'year'].includes(this.settings.tier); }
  isClub() { return ['club', 'year'].includes(this.settings.tier); }
  pro(fn) { if (this.isPro()) return fn(); new PaywallModal(this).open(); }
  saveSoon() { window.clearTimeout(this.saveT); this.saveT = window.setTimeout(() => this.saveData(this.settings), 1500); }

  // ── vault helpers ──
  exists(p) { return !!this.app.vault.getAbstractFileByPath(normalizePath(p)); }
  async ensureFolder(p) {
    const parts = normalizePath(p).split('/');
    for (let i = 1; i <= parts.length; i++) { const q = parts.slice(0, i).join('/'); if (!this.exists(q)) await this.app.vault.createFolder(q); }
  }
  async writeNew(p, text) {            // never overwrites
    p = normalizePath(p);
    if (this.exists(p)) return null;
    const dir = p.split('/').slice(0, -1).join('/');
    if (dir) await this.ensureFolder(dir);
    return this.app.vault.create(p, text);
  }
  async applyPlan(items) {
    let n = 0, m = 0;
    for (const it of items) {
      if (it.exists || this.exists(it.path)) { m++; continue; }
      if (it.kind === 'folder') await this.ensureFolder(it.path); else await this.writeNew(it.path, it.content);
      n++;
    }
    return { n, m };
  }
  async open(file) { if (file instanceof TFile) await this.app.workspace.getLeaf(false).openFile(file); }
  async files() {
    const out = [];
    for (const f of this.app.vault.getMarkdownFiles()) out.push({ path: f.path, text: await this.app.vault.cachedRead(f), mtime: f.stat.mtime, ctime: f.stat.ctime });
    return out;
  }

  // ── free ──
  async runSetup(lang) {
    this.settings.lang = lang;
    const items = E.planInstall(lang, (p) => this.exists(p), { pro: this.isPro(), date: this.today() });
    const r = await this.applyPlan(items);
    this.settings.folders = Object.assign({}, L[lang].folders);
    await this.saveData(this.settings);
    new Notice(fmt(L[lang].ui.created, r));
    const home = this.app.vault.getAbstractFileByPath(L[lang].home + '.md');
    await this.open(home);
    return r;
  }

  async openToday() {
    const F = this.folders(), day = this.today(), p = normalizePath(F.daily + '/' + day + '.md');
    let f = this.app.vault.getAbstractFileByPath(p);
    if (!f) {
      let text = E.dailyNote(this.settings.lang, day);
      if (this.isPro()) {
        const prevPath = E.lastDailyBefore(this.app.vault.getMarkdownFiles().map((x) => x.path), F, day);
        const prev = prevPath && this.app.vault.getAbstractFileByPath(prevPath);
        if (prev instanceof TFile) {
          let moved = [];
          await this.app.vault.process(prev, (old) => { const r = E.rollover(old); moved = r.moved; return r.prevText; });
          if (moved.length) {
            text = E.insertUnder(text, this.t().tpl.daily[1][0], moved);
            new Notice(fmt(this.t().ui.rolled, { n: moved.length, date: prev.basename }));
          }
        }
      }
      f = await this.writeNew(p, text);
    }
    await this.open(f);
  }

  async newProject(name) {
    name = String(name || '').trim().replace(/[\\/:*?"<>|#^[\]]/g, '-');
    if (!name) return;
    const p = this.folders().projects + '/' + name + '.md';
    const f = (await this.writeNew(p, E.projectNote(this.settings.lang, name, this.today()))) || this.app.vault.getAbstractFileByPath(normalizePath(p));
    await this.open(f);
  }

  async review(kind) {
    const range = E.period(kind, this.today());
    return E.computeReview(await this.files(), this.folders(), range, this.today(), this.settings.doneIndex);
  }

  async preview() { new PreviewModal(this, await this.review('weekly')).open(); }

  // ── pro ──
  async writeReview(kind) {
    const lang = this.settings.lang, r = await this.review(kind);
    const p = normalizePath(E.reviewPath(lang, this.folders(), r.range));
    let text = E.renderReview(lang, r);
    const old = this.app.vault.getAbstractFileByPath(p);
    if (old instanceof TFile) {                          // keep what you already wrote below "# <your review>"
      const head = '\n# ' + this.t().review.reflect + '\n', prev = await this.app.vault.read(old), i = prev.indexOf(head), j = text.indexOf(head);
      if (i >= 0 && j >= 0) text = text.slice(0, j) + prev.slice(i);
      await this.app.vault.modify(old, text);
    } else await this.writeNew(p, text);
    new Notice(fmt(this.t().ui.reviewDone, { path: p }));
    await this.open(this.app.vault.getAbstractFileByPath(p));
  }

  async archive() {
    const plan = E.archivePlan(await this.files(), this.folders(), this.today());
    if (!plan.length) return new Notice(this.t().ui.archiveNone);
    new ArchiveModal(this, plan).open();
  }

  async moveProjects(plan) {
    let n = 0;
    for (const it of plan) {
      const src = this.app.vault.getAbstractFileByPath(it.from);
      if (!src || this.exists(it.to)) continue;
      await this.ensureFolder(it.to.split('/').slice(0, -1).join('/'));
      await this.app.fileManager.renameFile(src, it.to);    // Obsidian updates the links
      n++;
    }
    new Notice(fmt(this.t().ui.archiveDone, { n }));
  }

  async addProTemplates() {
    const r = await this.applyPlan(E.proTemplatePlan(this.settings.lang, (p) => this.exists(p), this.folders()));
    new Notice(fmt(this.t().ui.templatesDone, r));
  }

  // ── licence (only the key you typed goes to getreadystack.com/api/lic) ──
  async validate(key) {
    let offline = false;
    for (const [door, tier] of DOORS) {
      try {
        const r = await requestUrl({ url: SITE + '/api/lic?key=' + encodeURIComponent(key) + '&slug=' + encodeURIComponent(door), method: 'GET', throw: false });
        if (r.status === 200 && r.json && r.json.ok) return { ok: true, tier, door };
        if (r.status >= 500) offline = true;
      } catch (e) { offline = true; }
    }
    return { ok: false, offline };
  }
  async enterKey(key) {
    key = String(key || '').trim();
    if (!key) return { ok: false };
    const r = await this.validate(key);
    if (r.ok) Object.assign(this.settings, { key, tier: r.tier, checkedAt: Date.now() });
    await this.saveData(this.settings);
    return r;
  }
  async removeKey() { Object.assign(this.settings, { key: '', tier: 'free', checkedAt: 0 }); await this.saveData(this.settings); }
  async recheckKey() {
    const s = this.settings;
    if (!s.key || Date.now() - s.checkedAt < RECHECK) return;
    const r = await this.validate(s.key);
    if (r.ok) Object.assign(s, { tier: r.tier, checkedAt: Date.now() });
    else if (!(r.offline && Date.now() - s.checkedAt < GRACE)) s.tier = 'free';
    await this.saveData(s);
  }
  door() { return (DOORS.find((d) => d[1] === this.settings.tier) || DOORS[0])[0]; }

  // ── packs ──
  async packIndex() { const r = await requestUrl({ url: PACK_INDEX, throw: false }); if (r.status !== 200) throw new Error('index ' + r.status); return r.json; }
  async installPack(id) {
    const r = await requestUrl({ url: SITE + '/api/dl/' + this.door() + '?key=' + encodeURIComponent(this.settings.key), throw: false });
    if (r.status !== 200) throw new Error('download ' + r.status);
    const all = JSON.parse(new TextDecoder().decode(r.arrayBuffer));
    const pack = (all.packs || []).find((p) => p.id === id);
    if (!pack) throw new Error('no pack ' + id);
    const res = await this.applyPlan(E.packPlan(pack, this.settings.lang, this.folders(), (p) => this.exists(p)));
    new Notice(fmt(this.t().ui.packDone, res));
    return res;
  }

  // ── done-task index ──
  queueIndex(f) {
    if (!(f instanceof TFile) || f.extension !== 'md') return;
    window.clearTimeout(this.timers.get(f.path));
    this.timers.set(f.path, window.setTimeout(() => { this.timers.delete(f.path); this.indexFile(f, this.today()).then(() => this.saveSoon()); }, 1500));
  }
  async indexFile(f, stamp) {
    const done = E.parseTasks(await this.app.vault.cachedRead(f)).filter((t) => t.done && !t.doneDate).map((t) => E.taskKey(t.text));
    const old = this.settings.doneIndex[f.path] || {}, next = {};
    for (const k of done) next[k] = k in old ? old[k] : stamp;
    if (done.length) this.settings.doneIndex[f.path] = next; else delete this.settings.doneIndex[f.path];
  }
  async scanAll() {
    const first = !this.settings.indexed, stamp = first ? '' : this.today();   // ticks that existed before install have no day
    for (const f of this.app.vault.getMarkdownFiles()) await this.indexFile(f, stamp);
    this.settings.indexed = true;
    await this.saveData(this.settings);
  }
}

// ── modals ──────────────────────────────────────────────────────────────────────────────────────────────────
class SetupModal extends Modal {
  constructor(plugin) { super(plugin.app); this.plugin = plugin; this.lang = plugin.settings.lang; }
  onOpen() { this.render(); }
  render() {
    const { contentEl } = this, u = L[this.lang].ui;
    contentEl.empty();
    contentEl.addClass('sv-modal');
    contentEl.createEl('h2', { text: u.setupTitle });
    new Setting(contentEl).setName(u.lang).addDropdown((d) => { LANGS.forEach((l) => d.addOption(l, LANG_NAMES[l])); d.setValue(this.lang).onChange((v) => { this.lang = v; this.render(); }); });
    contentEl.createEl('p', { text: u.setupIntro, cls: 'sv-muted' });
    const items = E.planInstall(this.lang, (p) => this.plugin.exists(p), { pro: this.plugin.isPro(), date: this.plugin.today() });
    const ul = contentEl.createEl('ul', { cls: 'sv-plan' });
    for (const it of items) {
      const li = ul.createEl('li', { cls: it.exists ? 'sv-skip' : 'sv-new' });
      li.createSpan({ text: (it.kind === 'folder' ? '📁 ' : '📄 ') + it.path });
      li.createSpan({ text: ' — ' + (it.exists ? u.isThere : u.isNew), cls: 'sv-muted' });
    }
    const n = items.filter((x) => !x.exists).length;
    new Setting(contentEl).addButton((b) => b.setCta().setButtonText(fmt(u.btnCreate, { n })).setDisabled(!n).onClick(async () => { this.close(); await this.plugin.runSetup(this.lang); }));
  }
  onClose() { this.contentEl.empty(); }
}

class NameModal extends Modal {
  constructor(plugin, done) { super(plugin.app); this.plugin = plugin; this.done = done; }
  onOpen() {
    const u = this.plugin.t().ui, { contentEl } = this;
    contentEl.createEl('h2', { text: u.cmdProject });
    let v = '';
    new Setting(contentEl).setName(u.projectName).addText((t) => { t.onChange((x) => (v = x)); t.inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { this.close(); this.done(v); } }); window.setTimeout(() => t.inputEl.focus(), 0); });
    new Setting(contentEl).addButton((b) => b.setCta().setButtonText(u.btnOk).onClick(() => { this.close(); this.done(v); }));
  }
  onClose() { this.contentEl.empty(); }
}

function paywallBlock(el, plugin) {
  const u = plugin.t().ui;
  const box = el.createDiv({ cls: 'sv-pay' });
  box.createEl('h3', { text: u.proTitle });
  box.createEl('p', { text: u.proLine1 });
  box.createEl('p', { text: u.proLine2 });
  box.createEl('p', { text: u.clubLine, cls: 'sv-muted' });
  new Setting(box)
    .addButton((b) => b.setCta().setButtonText(u.btnPro).onClick(() => window.open(BUY.pro)))
    .addButton((b) => b.setButtonText(u.btnClub).onClick(() => window.open(BUY.club)))
    .addButton((b) => b.setButtonText(u.btnYear).onClick(() => window.open(BUY.year)))
    .addButton((b) => b.setButtonText(u.haveKey).onClick(() => new KeyModal(plugin).open()));
}

class PaywallModal extends Modal {
  constructor(plugin) { super(plugin.app); this.plugin = plugin; }
  onOpen() { this.contentEl.addClass('sv-modal'); this.contentEl.createEl('p', { text: this.plugin.t().ui.proOnly, cls: 'sv-muted' }); paywallBlock(this.contentEl, this.plugin); }
  onClose() { this.contentEl.empty(); }
}

class PreviewModal extends Modal {
  constructor(plugin, r) { super(plugin.app); this.plugin = plugin; this.r = r; }
  onOpen() {
    const { contentEl } = this, t = this.plugin.t(), R = t.review, r = this.r;
    contentEl.addClass('sv-modal');
    contentEl.createEl('h2', { text: t.ui.previewTitle + ' · ' + r.range.id });
    const tb = contentEl.createEl('table', { cls: 'sv-numbers' });
    for (const k of E.NUMBER_ORDER) { const tr = tb.createEl('tr'); tr.createEl('td', { text: R[k] }); tr.createEl('td', { text: String(r.numbers[k]), cls: 'sv-num' }); }
    if (r.noNext.length) { contentEl.createEl('h3', { text: R.noNextList }); const ul = contentEl.createEl('ul'); r.noNext.slice(0, 10).forEach((p) => ul.createEl('li', { text: p.split('/').pop().replace(/\.md$/, '') })); }
    if (this.plugin.isPro()) new Setting(contentEl).addButton((b) => b.setCta().setButtonText(t.ui.cmdWeekly).onClick(() => { this.close(); this.plugin.writeReview('weekly'); }));
    else paywallBlock(contentEl, this.plugin);
  }
  onClose() { this.contentEl.empty(); }
}

class ArchiveModal extends Modal {
  constructor(plugin, plan) { super(plugin.app); this.plugin = plugin; this.plan = plan; }
  onOpen() {
    const { contentEl } = this, u = this.plugin.t().ui;
    contentEl.addClass('sv-modal');
    contentEl.createEl('h2', { text: u.archiveTitle });
    const ul = contentEl.createEl('ul', { cls: 'sv-plan' });
    this.plan.forEach((it) => ul.createEl('li', { text: it.from + '  →  ' + it.to }));
    new Setting(contentEl).addButton((b) => b.setCta().setButtonText(fmt(u.btnMove, { n: this.plan.length, path: this.plugin.folders().archive })).onClick(async () => { this.close(); await this.plugin.moveProjects(this.plan); }));
  }
  onClose() { this.contentEl.empty(); }
}

class KeyModal extends Modal {
  constructor(plugin) { super(plugin.app); this.plugin = plugin; }
  onOpen() {
    const { contentEl } = this, u = this.plugin.t().ui;
    contentEl.createEl('h2', { text: u.keyTitle });
    let v = this.plugin.settings.key || '';
    const msg = contentEl.createEl('p', { cls: 'sv-muted' });
    new Setting(contentEl).addText((t) => { t.setPlaceholder(u.keyPh).setValue(v).onChange((x) => (v = x)); t.inputEl.addClass('sv-key'); });
    new Setting(contentEl).addButton((b) => b.setCta().setButtonText(u.btnCheck).onClick(async () => {
      const r = await this.plugin.enterKey(v);
      msg.setText(r.ok ? fmt(u.keyOk, { tier: u.tier[r.tier] }) : r.offline ? u.keyOffline : u.keyBad);
    }));
  }
  onClose() { this.contentEl.empty(); }
}

class PacksModal extends Modal {
  constructor(plugin) { super(plugin.app); this.plugin = plugin; }
  async onOpen() {
    const { contentEl } = this, p = this.plugin, u = p.t().ui, lang = p.settings.lang;
    contentEl.addClass('sv-modal');
    contentEl.createEl('h2', { text: u.packsTitle });
    contentEl.createEl('p', { text: u.packsIntro, cls: 'sv-muted' });
    let idx;
    try { idx = await p.packIndex(); } catch (e) { contentEl.createEl('p', { text: u.packsFail }); return; }
    for (const pk of idx.packs || []) {
      const s = new Setting(contentEl).setName(pk.id + ' · ' + (pk.title[lang] || pk.title.en)).setDesc((pk.desc && (pk.desc[lang] || pk.desc.en)) || '');
      s.addButton((b) => b.setButtonText(u.btnInstall).onClick(async () => {
        if (!p.isClub()) { new Notice(u.packsNeedClub); return new PaywallModal(p).open(); }
        try { await p.installPack(pk.id); } catch (e) { new Notice(u.packsFail); }
      }));
    }
  }
  onClose() { this.contentEl.empty(); }
}

class SVSettings extends PluginSettingTab {
  constructor(plugin) { super(plugin.app, plugin); this.plugin = plugin; }
  display() {
    const { containerEl } = this, p = this.plugin, u = p.t().ui;
    containerEl.empty();
    new Setting(containerEl).setName(u.sLang).setDesc(u.sLangDesc).addDropdown((d) => {
      LANGS.forEach((l) => d.addOption(l, LANG_NAMES[l]));
      d.setValue(p.settings.lang).onChange(async (v) => { p.settings.lang = v; await p.saveData(p.settings); this.display(); });
    });
    new Setting(containerEl).setName(u.sFolders).setDesc(Object.values(p.folders()).filter((v, i, a) => a.indexOf(v) === i).join(' · '))
      .addButton((b) => b.setButtonText(u.sRerun).onClick(() => new SetupModal(p).open()));
    new Setting(containerEl).setName(u.sKey).setHeading();
    new Setting(containerEl).setName(fmt(u.sStatus, { tier: u.tier[p.settings.tier] || u.tier.free }))
      .addButton((b) => b.setButtonText(u.cmdKey).onClick(() => new KeyModal(p).open()))
      .addButton((b) => b.setButtonText(u.btnRemove).setDisabled(!p.settings.key).onClick(async () => { await p.removeKey(); this.display(); }));
    if (!p.isPro()) paywallBlock(containerEl, p);
    containerEl.createEl('p', { text: u.sNetwork, cls: 'sv-muted' });
  }
}
