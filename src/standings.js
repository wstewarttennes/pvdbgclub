// Renders club standings from the static data file published by the
// tournament app (backgammon/publish.js -> public/data/club.json).

const summaryEl = document.getElementById('summary');
const contentEl = document.getElementById('content');
const errorEl = document.getElementById('error');
const bodyEl = document.getElementById('standings-body');
const tournamentsEl = document.getElementById('tournaments');

const MEDALS = ['gold', 'silver', 'bronze'];

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // The club meets in Providence; a night should read the same date for everyone.
    timeZone: 'America/New_York',
  });

const pct = (n) => `${Math.round(n * 100)}%`;

function span(className, text) {
  const node = document.createElement('span');
  node.className = className;
  node.textContent = text;
  return node;
}

function showError(message) {
  summaryEl.hidden = true;
  errorEl.hidden = false;
  errorEl.textContent = message;
}

// Members level on rating and record share a rank (and a medal) instead of
// being split by the alphabetical tiebreak.
const sameStanding = (a, b) => a.elo === b.elo && a.wins === b.wins && a.losses === b.losses;

function renderStandings(standings) {
  let rank = 0;
  bodyEl.replaceChildren(
    ...standings.map((member, i) => {
      if (i === 0 || !sameStanding(member, standings[i - 1])) rank = i + 1;
      const row = document.createElement('tr');
      const medal = MEDALS[rank - 1];
      if (medal) row.classList.add(`is-${medal}`);

      const cells = [
        { text: rank, className: 'col-rank' },
        { text: member.name, className: 'col-name' },
        { text: member.elo, className: 'num rating' },
        { text: member.wins, className: 'num' },
        { text: member.losses, className: 'num' },
        { text: member.matches ? pct(member.winPct) : '—', className: 'num' },
        { text: member.titles || '—', className: `num${member.titles ? ' has-title' : ''}` },
        { text: member.finals || '—', className: 'num' },
        { text: member.semis || '—', className: 'num' },
        { text: member.played, className: 'num muted' },
      ];

      for (const cell of cells) {
        const td = document.createElement('td');
        td.className = cell.className;
        td.textContent = cell.text;
        row.append(td);
      }
      return row;
    })
  );
}

function roundLabel(round, rounds) {
  const fromEnd = rounds - round;
  if (fromEnd === 1) return 'Final';
  if (fromEnd === 2) return 'Semifinal';
  if (fromEnd === 3) return 'Quarterfinal';
  return `Round ${round + 1}`;
}

function renderTournaments(tournaments) {
  tournamentsEl.replaceChildren(
    ...tournaments.map((event, index) => {
      const card = document.createElement('details');
      card.className = 'tournament';
      if (index === 0) card.open = true;

      // Names are typed by members at the kiosk, so they go in as text, never HTML.
      const summary = document.createElement('summary');
      summary.append(
        span('tournament-date', fmtDate(event.date)),
        span('tournament-champ', `🏆 ${event.champion ?? '—'}`),
        span('tournament-meta', `${event.entrants} players · ${event.matchLength}-point matches`)
      );
      card.append(summary);

      const rounds = Math.max(0, ...event.rounds.map((r) => r.round + 1));
      const list = document.createElement('ol');
      list.className = 'result-list';

      let currentRound = -1;
      for (const result of event.rounds) {
        if (result.round !== currentRound) {
          currentRound = result.round;
          const heading = document.createElement('li');
          heading.className = 'result-round';
          heading.textContent = roundLabel(result.round, rounds);
          list.append(heading);
        }
        const item = document.createElement('li');
        item.className = 'result';
        item.append(
          span('result-winner', result.winner),
          span('result-beat', 'def.'),
          span('result-loser', result.loser)
        );
        if (result.score) item.append(span('result-score', result.score));
        list.append(item);
      }

      card.append(list);
      return card;
    })
  );
}

async function load() {
  let data;
  try {
    const res = await fetch('/data/club.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(String(res.status));
    data = await res.json();
  } catch {
    return showError('Standings are not published yet — check back after the next club night.');
  }

  if (!data.standings?.length) {
    return showError('No tournaments on record yet — check back after the next club night.');
  }

  const nights = data.tournamentCount;
  summaryEl.textContent =
    `${data.memberCount} members · ${nights} tournament${nights === 1 ? '' : 's'} · ` +
    `updated ${fmtDate(data.generatedAt)}`;

  renderStandings(data.standings);
  renderTournaments(data.tournaments);
  contentEl.hidden = false;
}

load();
