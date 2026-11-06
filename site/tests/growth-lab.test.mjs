import test from 'node:test';
import assert from 'node:assert/strict';
import { COHORTS, FUNNEL, createDeck, rate, percent, sampleCohorts, sessionCohorts, composePrompt, cohortCsv, csvCell } from '../src/growth-lab-model.js';

test('sample cohorts aggregate mutually exclusive channels with correct denominators', () => {
  const [a, b] = sampleCohorts();
  assert.deepEqual(a.counts, [1600, 252, 174, 120, 96, 72]);
  assert.deepEqual(b.counts, [1600, 330, 240, 174, 138, 102]);
  assert.equal(sampleCohorts('order')[1].counts[5], 78);
  assert.equal(sampleCohorts('email')[1].counts[5], 24);
  assert.equal(percent(rate(b.counts[5], b.counts[0])), '6.4%');
  for (const row of COHORTS) row.counts.slice(1).forEach((n, i) => assert.ok(n <= row.counts[i]));
});

test('repeated events do not inflate local session counts and unknown data stays unknown', () => {
  const events = FUNNEL.flatMap(([event]) => [1, 2].map(() => ({ event, variant: 'B', session_id: 'one' })));
  events.push({ event: 'card_flip', variant: 'B', session_id: 'one' });
  events.push({ event: 'entry_view', variant: 'A', session_id: 'two' });
  const rows = sessionCohorts(events);
  assert.deepEqual(rows[0].counts, [1, 0, 0, 0, 0, 0]);
  assert.deepEqual(rows[1].counts, [1, 1, 1, 1, 1, 1]);
  assert.equal(rows[1].negative, null);
  assert.equal(rate(null, 1), null);
  assert.equal(rate(0, 0), null);
  assert.equal(percent(rate(0, 1)), '0.0%');
  assert.equal(percent(rate(null, 1)), '—');
});

test('every shuffled game has exactly three solvable pairs and unique card identifiers', () => {
  for (let seed = 0; seed < 100; seed++) {
    const deck = createDeck(seed);
    assert.equal(deck.length, 6);
    assert.equal(new Set(deck.map(c => c.id)).size, 6);
    for (let pair = 0; pair < 3; pair++) assert.equal(deck.filter(c => c.pair === pair).length, 2);
  }
  assert.notDeepEqual(createDeck(0), createDeck(1));
});

test('exported prompts preserve brief facts and select a channel-appropriate structure', () => {
  const brief = { brand: 'Test brand', audience: 'new members', goal: 'qualified visits', channel: 'Instagram carousel', proof: 'No fee, six cards.', constraints: 'No real reward.' };
  const en = composePrompt(brief, 'en');
  for (const value of Object.values(brief)) assert.ok(en.includes(value));
  assert.ok(en.includes('Four panels'));
  assert.ok(en.includes('No invented discounts'));
  const zh = composePrompt({ ...brief, channel: 'TikTok / Reels' }, 'zh');
  assert.ok(zh.includes('15 秒分镜'));
  assert.ok(zh.includes('发布前由人审核'));
});

test('CSV keeps provenance, missing values, quotes and spreadsheet-safe text', () => {
  const csv = cohortCsv(sessionCohorts([]), 'local_session');
  assert.ok(csv.startsWith('\ufeff'));
  assert.ok(csv.includes('"local_session","A","0","0","0","0","0","0",""'));
  assert.equal(csvCell('a"b'), '"a""b"');
  assert.equal(csvCell('=SUM(A1)'), '"\'=SUM(A1)"');
});
