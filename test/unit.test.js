import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as E from '../src/engine.js';
import { L, LANGS, PRO_TEMPLATES, FREE_TEMPLATES } from '../src/i18n.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ms = (s) => new Date(s + 'T12:00:00').getTime();
const F = L.en.folders;

// a small vault with counts we know by hand (today = Thu 2026-10-29, week 2026-W44 = 26 Oct – 1 Nov)
const VAULT = [
  { path: '1 Projects/Website relaunch.md', mtime: ms('2026-10-28'), text: '---\ntype: project\nstatus: active\ncreated: 2026-10-01\n---\n# Website relaunch\n- [ ] Write homepage copy 📅 2026-10-28\n- [x] Pick a theme ✅ 2026-10-27\n- [x] Old task ✅ 2026-10-10\n' },
  { path: '1 Projects/Tax 2026/Tax 2026.md', mtime: ms('2026-10-05'), text: '---\nstatus: active\ncreated: 2026-09-20\n---\n# Tax 2026\nnotes only\n' },
  { path: '1 Projects/Tax 2026/receipts.md', mtime: ms('2026-10-05'), text: 'receipts\n' },
  { path: '1 Projects/Old thing.md', mtime: ms('2026-09-01'), text: '---\nstatus: done\nfinished: 2026-09-01\ncreated: 2026-08-01\n---\n- [ ] leftover\n' },
  { path: '0 Inbox/idea.md', mtime: ms('2026-10-27'), text: '---\ncreated: 2026-10-27\n---\nan idea\n' },
  { path: '5 Journal/Daily/2026-10-27.md', mtime: ms('2026-10-27'), text: '# day\n## Tasks\n- [x] Call accountant\n- [ ] Buy stamps\n- [ ] \n' },
  { path: '5 Journal/Daily/2026-10-28.md', mtime: ms('2026-10-28'), text: '# day\n' },
  { path: '3 Resources/Reading list.md', mtime: ms('2026-10-28'), text: '---\ncreated: 2026-09-01\n---\n- [ ] read a book\n' },
  { path: '2 Areas/Health.md', mtime: ms('2026-10-28'), text: '---\ncreated: 2026-09-02\n---\n- [x] Run 5k\n' },
  { path: '6 Templates/Project.md', mtime: ms('2026-10-28'), text: E.templateText('en', 'project') },
  { path: '5 Journal/Reviews/2026-W43.md', mtime: ms('2026-10-28'), text: '- [x] something ✅ 2026-10-27\n' },
];

test('every template exists in all 5 languages, and no English heading is left in de/es/pt/ja', () => {
  for (const lang of LANGS) {
    for (const id of FREE_TEMPLATES.concat(PRO_TEMPLATES)) {
      assert.ok(L[lang].tpl[id] && L[lang].tpl[id].length === L.en.tpl[id].length, lang + ' ' + id);
      const txt = E.templateText(lang, id);
      assert.match(txt, /^---\ntype: /);
      if (lang !== 'en') L[lang].tpl[id].forEach(([h], i) => assert.notEqual(h, L.en.tpl[id][i][0], lang + ' ' + id + ' heading still English: ' + h));
    }
  }
});

test('all languages carry the same keys (folders, names, ui, review)', () => {
  for (const lang of LANGS) for (const k of ['folders', 'names', 'ui', 'review']) assert.deepEqual(Object.keys(L[lang][k]).sort(), Object.keys(L.en[k]).sort(), lang + '.' + k);
  for (const lang of LANGS) assert.deepEqual(Object.keys(L[lang].ui.tier).sort(), Object.keys(L.en.ui.tier).sort());
});

test('localized long dates', () => {
  assert.equal(E.fmtDate('2026-10-27', L.en.dailyTitle, 'en'), 'Tuesday, 27 October 2026');
  assert.equal(E.fmtDate('2026-10-27', L.de.dailyTitle, 'de'), 'Dienstag, 27. Oktober 2026');
  assert.equal(E.fmtDate('2026-10-27', L.es.dailyTitle, 'es'), 'martes, 27 de octubre de 2026');
  assert.equal(E.fmtDate('2026-10-27', L.pt.dailyTitle, 'pt'), 'terça-feira, 27 de outubro de 2026');
  assert.equal(E.fmtDate('2026-10-27', L.ja.dailyTitle, 'ja'), '2026年10月27日 (火)');
});

test('periods and ISO weeks', () => {
  assert.deepEqual(E.period('weekly', '2026-10-29'), { kind: 'weekly', start: '2026-10-26', end: '2026-11-02', id: '2026-W44' });
  assert.deepEqual(E.period('monthly', '2026-10-29'), { kind: 'monthly', start: '2026-10-01', end: '2026-11-01', id: '2026-10' });
  assert.deepEqual(E.period('quarterly', '2026-10-29'), { kind: 'quarterly', start: '2026-10-01', end: '2027-01-01', id: '2026-Q4' });
  assert.equal(E.period('weekly', '2027-01-01').id, '2026-W53');
  assert.equal(E.period('weekly', '2026-11-01').start, '2026-10-26');   // Sunday belongs to the week that started Monday
});

test('install plan lists existing items as skipped; applying it keeps an existing file byte-identical', () => {
  const vault = new Map([['1 Projects', null], ['Home.md', 'MY OWN HOME — do not touch\n']]);
  const plan = E.planInstall('en', (p) => vault.has(p), { date: '2026-10-27' });
  assert.equal(plan.find((x) => x.path === 'Home.md').exists, true);
  assert.equal(plan.find((x) => x.path === '1 Projects').exists, true);
  assert.equal(plan.filter((x) => !x.exists).length, plan.length - 2);
  for (const it of plan) if (!it.exists) vault.set(it.path, it.kind === 'folder' ? null : it.content);
  assert.equal(vault.get('Home.md'), 'MY OWN HOME — do not touch\n');
  assert.ok(vault.has('6 Templates/Daily note.md') && vault.has('1 Projects/Start here.md'));
  assert.equal(plan.length, 9 + 2 + 2);                         // 9 folders · Home · Start here · 2 free templates
  assert.equal(E.planInstall('en', new Set(), { pro: true }).length, 9 + 2 + 2 + 10);
  assert.equal(E.planInstall('ja', new Set()).find((x) => x.template === 'daily').path, '6 テンプレート/デイリーノート.md');
});

test('the weekly review counts the fixture vault exactly', () => {
  const r = E.computeReview(VAULT, F, E.period('weekly', '2026-10-29'), '2026-10-29');
  assert.deepEqual(r.numbers, { created: 1, changed: 3, done: 2, open: 1, noNext: 1, stalled: 1, inbox: 1, daily: 2, overdue: 1 });
  assert.deepEqual(r.done.map((d) => d.text), ['Pick a theme ✅ 2026-10-27', 'Call accountant']);
  assert.deepEqual(r.noNext, ['1 Projects/Tax 2026/Tax 2026.md']);
  assert.equal(r.stalled[0].last, '2026-10-05');
  assert.deepEqual(r.created, ['0 Inbox/idea.md']);
});

test('a tick without a date counts on the day the plugin first saw it (done index)', () => {
  const idx = { '2 Areas/Health.md': { [E.taskKey('Run 5k')]: '2026-10-28' } };
  assert.equal(E.computeReview(VAULT, F, E.period('weekly', '2026-10-29'), '2026-10-29', idx).numbers.done, 3);
  const before = { '2 Areas/Health.md': { [E.taskKey('Run 5k')]: '' } };   // ticked before install → no day → not counted
  assert.equal(E.computeReview(VAULT, F, E.period('weekly', '2026-10-29'), '2026-10-29', before).numbers.done, 2);
});

test('the review note renders numbers, lists and the reflection prompts (en + ja)', () => {
  const r = E.computeReview(VAULT, F, E.period('weekly', '2026-10-29'), '2026-10-29');
  const md = E.renderReview('en', r);
  assert.match(md, /\| Tasks done \| 2 \|/);
  assert.match(md, /\| Projects with no next action \| 1 \|/);
  assert.match(md, /### \[\[1 Projects\/Website relaunch\|Website relaunch\]\] \(1\)/);
  assert.match(md, /# Your review\n\n## Wins/);
  assert.match(md, /period: 2026-W44/);
  const ja = E.renderReview('ja', E.computeReview(VAULT, F, E.period('monthly', '2026-10-29'), '2026-10-29'));
  assert.match(ja, /# 月次レビュー 2026-10/);
  assert.match(ja, /\| 完了したタスク \| 3 \|/);   // month: Old task (10-10) also counts
});

test('roll-over moves open tasks to today and marks them forwarded in the old note', () => {
  const r = E.rollover('## Tasks\n- [ ] Buy stamps\n- [x] done one\n- [ ] \n  - [ ] nested call\n');
  assert.deepEqual(r.moved, ['- [ ] Buy stamps', '- [ ] nested call']);
  assert.equal(r.prevText, '## Tasks\n- [>] Buy stamps\n- [x] done one\n- [ ] \n  - [>] nested call\n');
  const today = E.insertUnder(E.dailyNote('en', '2026-10-28'), 'Tasks', r.moved);
  assert.match(today, /## Tasks\n- \[ \] Buy stamps\n- \[ \] nested call\n\n## Notes/);
  assert.equal(E.parseTasks(r.prevText).filter((t) => !t.done).length, 0);
  assert.equal(E.lastDailyBefore(VAULT.map((v) => v.path), F, '2026-10-29'), '5 Journal/Daily/2026-10-28.md');
});

test('archive plan moves finished projects into archive/<year>', () => {
  assert.deepEqual(E.archivePlan(VAULT, F, '2026-10-29'), [{ key: 'Old thing', from: '1 Projects/Old thing.md', to: '4 Archive/2026/Old thing.md', isFolder: false }]);
  const de = [{ path: '1 Projekte/Umzug/Umzug.md', mtime: 1, text: '---\nstatus: erledigt\n---\n' }];
  assert.equal(E.archivePlan(de, L.de.folders, '2026-10-29')[0].to, '4 Archiv/2026/Umzug');
});

test('pack plan installs into templates/Packs/<id> <title> and skips existing files', () => {
  const pack = { id: '2026-11', title: { en: 'Year-end', de: 'Jahresende' }, files: { en: [{ name: 'A', text: 'a' }], de: [{ name: 'B', text: 'b' }] } };
  const plan = E.packPlan(pack, 'de', L.de.folders, new Set(['6 Vorlagen/Packs/2026-11 Jahresende/B.md']));
  assert.deepEqual(plan, [{ path: '6 Vorlagen/Packs/2026-11 Jahresende/B.md', kind: 'file', content: 'b', exists: true }]);
  assert.equal(E.packPlan(pack, 'ja', L.ja.folders, new Set())[0].path, '6 テンプレート/Packs/2026-11 Year-end/A.md');
});

test('the starter-vault zip opens with a standard unzip and holds UTF-8 names', () => {
  const dir = mkdtempSync(join(tmpdir(), 'svzip-'));
  const z = join(dir, 'v.zip');
  writeFileSync(z, E.makeZip(E.vaultEntries('ja', { date: '2026-10-27' })));
  const out = execFileSync('python3', ['-I', '-c', 'import sys,zipfile;z=zipfile.ZipFile(sys.argv[1]);assert z.testzip() is None;print("\\n".join(z.namelist()))', z]).toString();
  assert.match(out, /Starter Vault\/5 ジャーナル\/デイリー\/2026-10-27\.md/);
  assert.match(out, /Starter Vault\/0 受信箱\//);
});

test('bundled main.js uses no Node/Electron module (mobile-safe) and has no sample code', () => {
  const js = readFileSync(join(HERE, '..', 'main.js'), 'utf8');
  const req = [...js.matchAll(/require\(["']([^"']+)["']\)/g)].map((m) => m[1]);
  assert.deepEqual([...new Set(req)], ['obsidian']);
  assert.doesNotMatch(js, /SampleModal|SampleSettingTab|MyPlugin/);
  const man = JSON.parse(readFileSync(join(HERE, '..', 'manifest.json'), 'utf8'));
  assert.equal(man.isDesktopOnly, false);
  assert.ok(man.description.length <= 250 && man.description.endsWith('.'));
  assert.doesNotMatch(man.id, /obsidian/);
});
