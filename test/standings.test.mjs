// Builds the site, serves dist/, and loads the standings page in headless Chrome
// to check it renders what public/data/club.json says.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 8499;

const club = JSON.parse(readFileSync(new URL('../public/data/club.json', import.meta.url), 'utf8'));

async function waitFor(url) {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`server never came up at ${url}`);
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const html = (s) => escape(s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));

function dumpDom(url) {
  // Render as a viewer outside Providence would, so dates can't lean on local time.
  return execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', '--virtual-time-budget=5000', '--dump-dom', url],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], env: { ...process.env, TZ: 'UTC' } }
  );
}

test('standings page renders the published club records', async (t) => {
  execFileSync('npx', ['vite', 'build', '--logLevel', 'silent'], { cwd: root });
  // Run vite's bin directly: killing an npx wrapper leaves the server holding the port.
  const vite = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url));
  const server = spawn(process.execPath, [vite, 'preview', '--port', String(PORT), '--strictPort'], { cwd: root });
  t.after(() => server.kill());

  const url = `http://localhost:${PORT}/standings.html`;
  await waitFor(url);
  const dom = dumpDom(url);

  const rows = dom.match(/<tr[^>]*>\s*<td class="col-rank">/g) ?? [];
  assert.equal(rows.length, club.memberCount, 'one row per member');

  const leader = club.standings[0];
  assert.match(dom, new RegExp(`<td class="col-name">${html(leader.name)}</td>`));
  assert.match(dom, new RegExp(`${club.memberCount} members · ${club.tournamentCount} tournament`));

  const cards = dom.match(/<details class="tournament"/g) ?? [];
  assert.equal(cards.length, club.tournamentCount, 'one archive card per night');
  assert.match(dom, new RegExp(`🏆 ${html(club.tournaments[0].champion)}`));
  // Club nights are evening ET; 03:25Z on Aug 27 is the night of Aug 26 in Providence.
  assert.match(dom, /<span class="tournament-date">August 26, 2026<\/span>/);

  // Cristiane and Mike St. Pierre are level on rating and record: same rank, both bronze.
  for (const name of ['Cristiane', 'Mike St. Pierre']) {
    assert.match(dom, new RegExp(`<tr class="is-bronze"><td class="col-rank">3</td><td class="col-name">${html(name)}</td>`));
  }

  assert.doesNotMatch(dom, /id="error"(?![^>]*hidden)/, 'error message stays hidden');
});

test('home page links to standings', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="\/standings\.html"/);
});
