export const FUNNEL = [
  ['entry_view', '入口曝光', 'Entry exposure'],
  ['hub_view', '进入权益中心', 'Benefits hub visit'],
  ['activity_start', '开始互动', 'Activity started'],
  ['activity_complete', '完成互动', 'Activity completed'],
  ['benefit_claim', '领取演示通行证', 'Demo pass claimed'],
  ['merchant_visit', '查看商家预览', 'Merchant preview visit'],
];

// Deliberately synthetic, mutually exclusive user cohorts. No production data.
export const COHORTS = [
  { variant: 'A', entry: 'order', counts: [1000, 180, 126, 90, 72, 54], negative: 8 },
  { variant: 'B', entry: 'order', counts: [1000, 240, 180, 132, 108, 78], negative: 14 },
  { variant: 'A', entry: 'email', counts: [600, 72, 48, 30, 24, 18], negative: 9 },
  { variant: 'B', entry: 'email', counts: [600, 90, 60, 42, 30, 24], negative: 12 },
];

export const rate = (n, d) => n != null && d > 0 ? n / d : null;
export const percent = n => n == null ? '—' : `${(n * 100).toFixed(1)}%`;

export function sampleCohorts(entry = 'all') {
  return ['A', 'B'].map(variant => COHORTS
    .filter(row => row.variant === variant && (entry === 'all' || row.entry === entry))
    .reduce((total, row) => ({ variant, counts: total.counts.map((n, i) => n + row.counts[i]), negative: total.negative + row.negative }), { variant, counts: Array(6).fill(0), negative: 0 }));
}

export function sessionCohorts(events) {
  return ['A', 'B'].map(variant => ({
    variant,
    counts: FUNNEL.map(([event]) => new Set(events.filter(e => e.variant === variant && e.event === event).map(e => e.session_id)).size),
    negative: null,
  }));
}

export function createDeck(seed = 0) {
  const deck = [0, 1, 2, 0, 1, 2].map((pair, id) => ({ id, pair }));
  let state = seed + 17;
  for (let i = deck.length - 1; i > 0; i--) {
    state = (state * 16807) % 2147483647;
    const j = state % (i + 1);[deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function composePrompt(brief, lang) {
  const en = lang === 'en';
  return `${en ? 'ROLE: Growth creative partner' : '角色：增长创意协作者'}
${en ? 'Brand' : '品牌'}: ${brief.brand}
${en ? 'Audience' : '受众'}: ${brief.audience}
${en ? 'Objective' : '目标'}: ${brief.goal}
${en ? 'Channel' : '渠道'}: ${brief.channel}
${en ? 'Approved information' : '已确认的信息'}: ${brief.proof}
${en ? 'Constraints' : '使用边界'}: ${brief.constraints}

${en ? 'DELIVER' : '输出要求'}:
1. ${en ? 'Two opening hooks: a relevant question / a concrete everyday moment.' : '两种开场：相关提问 / 具体生活场景。'}
2. ${brief.channel === 'TikTok / Reels' ? (en ? 'A 15-second storyboard: 0–3s hook, 3–9s mechanism, 9–12s conditions, 12–15s CTA.' : '15 秒分镜：0–3 秒开场、3–9 秒玩法、9–12 秒条件、12–15 秒行动。') : (en ? 'Four panels or message blocks: opening, approved information, conditions, one CTA.' : '四个图文面板或消息区块：开场、已确认信息、使用条件、单一行动。')}
3. ${en ? 'Adapt framing and captions to the selected channel; keep a single destination.' : '按渠道调整画幅与字幕，保留同一个承接入口。'}
4. ${en ? 'Tag every product claim with its source. Mark missing facts as unknown.' : '每项产品主张标出来源；缺少资料时标记待确认。'}
5. ${en ? 'No invented discounts, endorsements, health claims or performance metrics.' : '不编造折扣、代言、健康功效或投放成绩。'}
6. ${en ? 'Return draft assets, evidence references and open questions for human review.' : '返回草稿素材、依据和待确认问题，交由人工审核。'}

${en ? 'EVALUATE: eligible hub visits and qualified merchant visits per 1,000 exposures; monitor negative feedback. Human approval before publishing.' : '评估：每千次曝光的有效权益访问和商家访问，同时观察负反馈。发布前由人审核。'}`;
}

export function csvCell(value) {
  let s = String(value ?? '');
  if (/^[=+@-]/.test(s)) s = `'${s}`;
  return `"${s.replaceAll('"', '""')}"`;
}
export function cohortCsv(rows, source) {
  return '\ufeff' + [
    ['data_source', 'variant', 'entry_exposure_uv', 'hub_visit_uv', 'activity_start_uv', 'activity_complete_uv', 'demo_pass_claim_uv', 'merchant_preview_uv', 'negative_feedback_uv'],
    ...rows.map(row => [source, row.variant, ...row.counts, row.negative]),
  ].map(row => row.map(csvCell).join(',')).join('\r\n');
}

export const EXPERIMENT_SQL = `-- PostgreSQL example. Illustrative schema; not connected to production.
-- events(user_id, event_time, event_name, experiment_id, variant, entry)
-- Assignment must be stable at USER level. Use the first exposure as cohort entry.
WITH exposure AS (
  SELECT user_id, MIN(event_time) AS exposed_at
  FROM events
  WHERE experiment_id = 'benefits_entry_v1' AND event_name = 'entry_view'
  GROUP BY user_id
), cohort AS (
  SELECT DISTINCT ON (e.user_id) e.user_id, e.variant, e.entry, x.exposed_at
  FROM exposure x JOIN events e ON e.user_id = x.user_id
    AND e.event_time = x.exposed_at AND e.event_name = 'entry_view'
    AND e.experiment_id = 'benefits_entry_v1'
  ORDER BY e.user_id, e.variant
), outcomes AS (
  SELECT c.user_id, c.variant, c.entry,
    BOOL_OR(e.event_name = 'hub_view') AS hub_visit,
    BOOL_OR(e.event_name = 'merchant_visit') AS merchant_visit
  FROM cohort c LEFT JOIN events e ON e.user_id = c.user_id
    AND e.experiment_id = 'benefits_entry_v1'
    AND e.event_time >= c.exposed_at
    AND e.event_time < c.exposed_at + INTERVAL '7 days'
  GROUP BY c.user_id, c.variant, c.entry
)
SELECT variant, entry, COUNT(*) AS exposed_users,
  COUNT(*) FILTER (WHERE hub_visit) AS hub_users,
  COUNT(*) FILTER (WHERE merchant_visit) AS merchant_users,
  1000.0 * COUNT(*) FILTER (WHERE merchant_visit) / NULLIF(COUNT(*), 0)
    AS merchant_visits_per_1000_exposed_users
FROM outcomes GROUP BY variant, entry;
-- Production: reconcile assignment consistency, eligibility, bot filtering,
-- attribution windows and sample-ratio mismatch before interpreting results.
-- Prototype events use session_id; production user_id requires authentication.
`;
