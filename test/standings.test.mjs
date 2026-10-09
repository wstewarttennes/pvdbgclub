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

function dumpDom(url) {
  return execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', '--virtual-time-budget=5000', '--dump-dom', url],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );
}

test('standings page renders the published club records', async (t) => {
  execFileSync('npx', ['vite', 'build', '--logLevel', 'silent'], { cwd: root });
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: root });
  t.after(() => server.kill());

  const url = `http://localhost:${PORT}/standings.html`;
  await waitFor(url);
  const dom = dumpDom(url);

  const rows = dom.match(/<tr[^>]*>\s*<td class="col-rank">/g) ?? [];
  assert.equal(rows.length, club.memberCount, 'one row per member');

  const leader = club.standings[0];
  assert.match(dom, new RegExp(`<td class="col-name">${leader.name}</td>`));
  assert.match(dom, new RegExp(`${club.memberCount} members · ${club.tournamentCount} tournament`));

  const cards = dom.match(/<details class="tournament"/g) ?? [];
  assert.equal(cards.length, club.tournamentCount, 'one archive card per night');
  assert.match(dom, new RegExp(`🏆 ${club.tournaments[0].champion}`));
  assert.doesNotMatch(dom, /id="error"(?![^>]*hidden)/, 'error message stays hidden');
});

test('home page links to standings', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="\/standings\.html"/);
});
