import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowSquareOut, ArrowsCounterClockwise, Check, CheckCircle, ChartBar, Coffee, Copy, DownloadSimple, FlowerLotus, GameController, Headphones, ShieldCheck, Sparkle, Storefront, Ticket } from '@phosphor-icons/react';
import { ParticleField } from './ParticleField';
import { FUNNEL, sampleCohorts, sessionCohorts, createDeck, rate, percent, composePrompt, cohortCsv, EXPERIMENT_SQL } from './growth-lab-model';

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
const choose = (lang, zh, en) => lang === 'zh' ? zh : en;
function saveFile(name, value, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([value], { type }));
  const a = document.createElement('a');a.href = url;a.download = name;a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const tabs = [
  { id: 'playground', Icon: GameController, zh: '互动实验', en: 'Playground', number: '01' },
  { id: 'workflow', Icon: Sparkle, zh: 'AI 工作流', en: 'AI workflow', number: '02' },
  { id: 'experiments', Icon: ChartBar, zh: '指标与实验', en: 'Measurement', number: '03' },
];

export function GrowthLab({ tab = 'playground', lang, navigate, openProject, reducedMotion, theme }) {
  const [events, setEvents] = useState([]);
  const t = (zh, en) => choose(lang, zh, en);
  return <main className="screen growth-lab" style={{ '--accent': '#a79aff' }}>
    <div className="lab-atmosphere"><ParticleField variant="project" activeProject={1} reducedMotion={reducedMotion} light={theme === 'light'} /></div>
    <header className="lab-intro">
      <div><span className="eyebrow">FIELD LAB / AI × GROWTH OPERATIONS</span>
        <h1>{t(<>让创意发生。<br />让下一步可被验证。</>, <>Make something engaging.<br />Make the next step measurable.</>)}</h1>
        <p>{t('从一场小互动，到内容工作包，再到可复盘的漏斗。把增长想法做成可以亲手检验的系统。', 'A small interaction, a reusable creative brief, and a measurable funnel. Growth ideas made tangible enough to test.')}</p>
      </div>
      <aside><span className="lab-live-dot" />{t('独立运营实验 · 可操作原型', 'Independent operations lab · Working prototypes')}<small>{t('玩法可试玩；内容由本地模板编排；未接入真实奖励或投放系统。', 'Playable mechanics and local content templates. No live rewards or ad platform connection.')}</small></aside>
    </header>
    <nav className="lab-tabs" role="tablist" aria-label={t('运营实验模块', 'Operations lab modules')}>
      {tabs.map(({ id, Icon, zh, en, number }) => <button role="tab" id={`lab-tab-${id}`} aria-selected={tab === id} aria-controls={`lab-panel-${id}`} key={id} onClick={() => navigate(id)}><span>{number}</span><Icon size={18} /><strong>{t(zh, en)}</strong><ArrowRight size={16} /></button>)}
    </nav>
    <div role="tabpanel" id="lab-panel-playground" aria-labelledby="lab-tab-playground" hidden={tab !== 'playground'}><BenefitsPlayground lang={lang} onEvents={setEvents} navigate={navigate} /></div>
    <div role="tabpanel" id="lab-panel-workflow" aria-labelledby="lab-tab-workflow" hidden={tab !== 'workflow'}><CreativeWorkflow lang={lang} /></div>
    <div role="tabpanel" id="lab-panel-experiments" aria-labelledby="lab-tab-experiments" hidden={tab !== 'experiments'}><ExperimentDesk lang={lang} events={events} navigate={navigate} /></div>
    <section className="lab-evidence">
      <header><span className="eyebrow">CONNECTED WORK</span><h2>{t('把方法放回真实的项目语境。', 'Methods, grounded in project work.')}</h2></header>
      <div className="lab-evidence-grid">
        <button onClick={() => openProject(4)}><img src={asset('teddi-rollout.webp')} alt="Teddi Lab complete campaign rollout" /><span>04 / TEDDI LAB</span><h3>{t('AI 创意与传播编排', 'AI creative & campaign operations')}</h3><p>{t('四周发布矩阵、平台素材与开场测试计划。独立提案，尚未执行。', 'Four-week rollout, platform assets and a hook-test plan. Independent, unexecuted proposal.')}</p><ArrowRight size={18} /></button>
        <button onClick={() => openProject(5)}><img src={asset('redlens-preview.webp')} alt="RedLens search advertising prototype" /><span>05 / REDLENS</span><h3>{t('商业化与证据判断', 'Commercial relevance & evidence')}</h3><p>{t('意图诊断、商家补证、广告预览与实验导出。可操作原型。', 'Intent diagnosis, merchant evidence, ad previews and experiment export. Working prototype.')}</p><ArrowRight size={18} /></button>
        <button onClick={() => openProject(1)}><div className="lab-evidence-diagram"><span>Signals</span><i /><span>Evidence</span><i /><span>Action</span><i /><span>Review</span></div><span>01 / AI COMMERCE</span><h3>{t('经营诊断与任务闭环', 'Diagnostics & operational handoff')}</h3><p>{t('让数据、建议、负责人和验收口径形成一条可检查的链路。', 'Connect operating signals, recommendations, ownership and acceptance criteria.')}</p><ArrowRight size={18} /></button>
      </div>
    </section>
  </main>;
}

function BenefitsPlayground({ lang, onEvents, navigate }) {
  const t = (zh, en) => choose(lang, zh, en);
  const [variant, setVariant] = useState('B');
  const [stage, setStage] = useState('entry');
  const [round, setRound] = useState(0);
  const [deck, setDeck] = useState(() => createDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [visited, setVisited] = useState(false);
  const [session, setSession] = useState(() => `local-${Date.now()}`);
  const [events, setEvents] = useState(() => [{ event: 'entry_view', variant: 'B', session_id: session, at: new Date().toISOString() }]);
  const [announcement, setAnnouncement] = useState('');
  const timer = useRef(null);
  const icons = [Coffee, FlowerLotus, Headphones];
  const names = [t('一杯咖啡', 'Coffee break'), t('散步一下', 'A little walk'), t('听一首歌', 'One good song')];
  const complete = matched.length === 3;
  const emit = event => setEvents(rows => [...rows, { event, variant, session_id: session, at: new Date().toISOString() }]);
  useEffect(() => { onEvents(events); }, [events, onEvents]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const reset = (nextVariant = variant) => {
    clearTimeout(timer.current);const id = `local-${Date.now()}`;
    setVariant(nextVariant);setStage('entry');setRound(n => n + 1);setDeck(createDeck(round + 1));setFlipped([]);setMatched([]);setMoves(0);setClaimed(false);setVisited(false);setSession(id);setAnnouncement('');
    setEvents([{ event: 'entry_view', variant: nextVariant, session_id: id, at: new Date().toISOString() }]);
  };
  const flip = card => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pair)) return;
    emit('card_flip');const next = [...flipped, card.id];setFlipped(next);
    if (next.length !== 2) return;
    setMoves(n => n + 1);
    const first = deck.find(c => c.id === next[0]);
    if (first.pair === card.pair) {
      const pairs = [...matched, card.pair];setMatched(pairs);setFlipped([]);setAnnouncement(t('配对成功。', 'A match.'));
      if (pairs.length === 3) { emit('activity_complete');setAnnouncement(t('全部配对完成，可以领取演示通行证。', 'All pairs found. Your demo pass is ready.')); }
    } else {setAnnouncement(t('这两张不同，再试一次。', 'Different cards. Try another pair.'));timer.current = setTimeout(() => setFlipped([]), 850);}
  };
  return <section className="lab-module">
    <header className="lab-module-heading"><div><span className="eyebrow">01 / PLAYABLE BENEFITS LOOP</span><h2>{t('把一次浏览，变成一个有理由的下一步。', 'Give a visit a reason to become a next step.')}</h2><p>{t('目标假设：情境化入口与低门槛互动，能否带来更多有效权益访问和商家访问？', 'Hypothesis: can a contextual entry and a small interaction improve qualified benefits and merchant visits?')}</p></div><span className="lab-badge">{t('自主概念 · 无真实优惠', 'Independent concept · No real offer')}</span></header>
    <div className="lab-play-grid">
      <div className="lab-product">
        <header><span><Ticket size={17} />EVERYDAY / BENEFITS</span><div className="lab-switch" aria-label={t('入口版本', 'Entry variant')}>{['A', 'B'].map(v => <button key={v} aria-pressed={variant === v} onClick={() => reset(v)}>{v}</button>)}</div></header>
        <div className="lab-product-body">
          {stage === 'entry' && <div className={`lab-entry variant-${variant}`}>
            <span className="eyebrow">{t('订单已完成 · 接下来做什么？', 'ORDER COMPLETE · WHAT NEXT?')}</span>
            <div className="lab-order-line"><CheckCircle size={28} /><div><strong>{t('收好这一单，也留点时间给自己。', 'Order sorted. A moment for you, next.')}</strong><small>{t('虚构订单，仅展示权益入口位置。', 'Fictional order, illustrating benefit-entry placement.')}</small></div></div>
            <div className="lab-entry-invite"><Sparkle size={24} /><h3>{variant === 'A' ? t('查看会员权益', 'Explore your benefits') : t('周末，找回你的小片刻。', 'Find your little weekend moment.')}</h3><p>{variant === 'A' ? t('查看可参与的活动。', 'See available activities.') : t('配对三组生活片刻，解锁一张合作店铺演示通行证。', 'Match three everyday moments to unlock a demo partner pass.')}</p><button className="lab-primary" onClick={() => { emit('hub_view');setStage('hub'); }}>{variant === 'A' ? t('进入权益中心', 'Open benefits hub') : t('看看我的周末灵感', 'Find my weekend inspiration')}<ArrowRight size={16} /></button></div>
          </div>}
          {stage === 'hub' && <div className="lab-hub"><span className="eyebrow">BENEFITS / WEEKEND EDIT</span><h3>{t('小片刻配对', 'Little moments, paired.')}</h3><div className="lab-moment-icons"><Coffee /><FlowerLotus /><Headphones /></div><p>{t('六张卡片，三组配对。不计时，也不会催促你。', 'Six cards. Three pairs. No timer and no rush.')}</p><button className="lab-primary" onClick={() => { emit('activity_start');setStage('game'); }}>{t('开始配对', 'Start matching')}<ArrowRight size={16} /></button><small>{t('完成后可领取演示通行证，查看虚构商家页。', 'Complete the activity for a demo pass and a fictional merchant preview.')}</small></div>}
          {stage === 'game' && <div className="lab-game"><div className="lab-game-status"><strong>{t('找到你的生活片刻', 'Find your everyday moments')}</strong><span>{matched.length} / 3 · {moves} {t('次尝试', 'moves')}</span></div><div className="lab-card-grid">{deck.map((card, index) => { const shown = flipped.includes(card.id) || matched.includes(card.pair);const Icon = icons[card.pair];return <button data-card-id={card.id} key={card.id} className={`${shown ? 'revealed' : ''} ${matched.includes(card.pair) ? 'matched' : ''}`} aria-label={shown ? `${names[card.pair]}${matched.includes(card.pair) ? t('，已配对', ', matched') : ''}` : t(`翻开第 ${index + 1} 张卡片`, `Reveal card ${index + 1}`)} disabled={matched.includes(card.pair) || flipped.includes(card.id) || flipped.length === 2} onClick={() => flip(card)}>{shown ? <><Icon size={30} /><span>{names[card.pair]}</span>{matched.includes(card.pair) && <Check size={13} />}</> : <><Sparkle size={24} /><small>EVERYDAY</small></>}</button>; })}</div><div className="lab-game-message" role="status" aria-live="polite">{announcement || t('翻开两张，找到相同的生活片刻。', 'Reveal two cards and find a matching moment.')}</div><button className="lab-primary" disabled={!complete} onClick={() => { if (!claimed) {emit('benefit_claim');setClaimed(true);}setStage('pass'); }}>{complete ? t('领取演示通行证', 'Claim demo pass') : t('完成 3 组后领取', 'Find 3 pairs to claim')}<Ticket size={16} /></button></div>}
          {stage === 'pass' && <div className="lab-pass"><Ticket size={35} /><span className="eyebrow">DEMO PASS / {variant}</span><h3>{t('把这个片刻，留给自己。', 'Keep a little moment for you.')}</h3><p>{t('Studio Pause · 虚构合作店铺', 'Studio Pause · Fictional partner')}</p><div className="lab-pass-conditions">{t('仅演示领取与商家承接流程；不具备优惠、支付或核销效力。', 'Illustrates claiming and merchant handoff. No discount, payment or redemption value.')}</div><button className="lab-primary" onClick={() => { if (!visited) {emit('merchant_visit');setVisited(true);}setStage('merchant'); }}>{t('查看商家预览', 'View merchant preview')}<Storefront size={16} /></button></div>}
          {stage === 'merchant' && <div className="lab-merchant"><Coffee size={40} /><span className="eyebrow">STUDIO PAUSE / PREVIEW</span><h3>{t('从互动，走到一个清楚的去处。', 'From an interaction to a clear destination.')}</h3><p>{t('这里模拟合作店铺的介绍与活动说明。真正上线时，还需要确认库存、适用范围、有效期和核销接口。', 'A fictional partner page. A real launch needs confirmed availability, eligibility, validity and redemption integration.')}</p><div className="lab-merchant-checks"><span><CheckCircle />{t('入口、玩法、商家一一对应', 'Entry, activity and partner stay aligned')}</span><span><CheckCircle />{t('演示事件已记录，可在指标页查看', 'Local events recorded for the measurement tab')}</span></div><button className="lab-primary" onClick={() => navigate('experiments')}>{t('查看这次体验的数据', 'Inspect this session')}<ChartBar size={16} /></button></div>}
        </div>
        <footer><span>LOCAL PROTOTYPE / NO LIVE REWARDS</span><button onClick={() => reset()}><ArrowsCounterClockwise size={15} />{t('重新开始', 'Restart')}</button></footer>
      </div>
      <aside className="lab-event-inspector"><header><span className="lab-live-dot" />{t('事件观察台', 'Event inspector')}<small>{events.length} EVENTS</small></header><div className="lab-event-list" aria-label={t('本次会话事件', 'Current session events')}>{events.map((event, i) => <div key={`${event.session_id}-${i}`}><span>{String(i + 1).padStart(2, '0')}</span><code>{event.event}</code><small>{event.variant}</small></div>)}</div><p>{t('当前会话记录保留在页面内，不发送到服务器；用来检查流程与事件触发，不能当成用户增长结果。', 'Session events stay in this page. They verify triggers and flow, and are not evidence of audience growth.')}</p><button className="lab-secondary" onClick={() => saveFile('benefits-local-session.json', JSON.stringify({ source: 'local_prototype', events }, null, 2), 'application/json')}><DownloadSimple size={16} />{t('导出事件 JSON', 'Export event JSON')}</button></aside>
    </div>
    <div className="lab-decision-row"><article><span>01 / ENTRY</span><h3>{t('只改变入口表达', 'Change the entry, not everything.')}</h3><p>{t('A 用通用入口，B 用订单后的生活场景。玩法与演示奖励相同，方便讨论差异来自哪里。', 'A uses a general invitation; B adds post-order context. Both share the same activity and demo pass.')}</p></article><article><span>02 / VALUE</span><h3>{t('参与之后，有明确承接', 'Give participation a destination.')}</h3><p>{t('完成配对才可领取，领取后进入对应商家。用事件链检查掉点，而不把小游戏完成率等同于商业价值。', 'Match, claim, then visit the partner preview. Completion alone is not a commercial outcome.')}</p></article><article><span>03 / VALIDATE</span><h3>{t('先验证可用，再验证增长', 'Usability before growth claims.')}</h3><p>{t('先观察能否独立完成、是否理解限制，再设计用户级随机实验。试玩不会替代真实 A/B 测试。', 'First test comprehension and completion; then plan user-level randomization. This demo is not an A/B result.')}</p></article></div>
    <BenchmarkNotes lang={lang} />
  </section>;
}

function CreativeWorkflow({ lang }) {
  const t = (zh, en) => choose(lang, zh, en);
  const [brief, setBrief] = useState({ brand: 'Everyday Benefits', audience: 'People checking a completed order', goal: 'Qualified benefits and partner visits', channel: 'TikTok / Reels', proof: 'A six-card matching activity with a demo partner preview.', constraints: 'Fictional partner. No live reward, discount or endorsement. No health claims.' });
  const [snapshot, setSnapshot] = useState(null);
  const [checks, setChecks] = useState([false, false, false, false]);
  const [message, setMessage] = useState('');
  const dirty = snapshot && JSON.stringify(brief) !== JSON.stringify(snapshot);
  const valid = Object.values(brief).every(value => value.trim());
  const approved = snapshot && !dirty && checks.every(Boolean);
  const prompt = snapshot ? composePrompt(snapshot, lang) : '';
  const generate = () => {setSnapshot({ ...brief });setChecks([false, false, false, false]);setMessage('');};
  const review = [t('产品信息与使用条件逐项核实', 'Product facts and conditions checked'), t('素材使用权、人物与代言关系核实', 'Asset rights and creator relationships checked'), t('中英文表达、字幕和目标入口一致', 'Language, captions and destination aligned'), t('事件、审核人及发布验收口径明确', 'Events, reviewer and launch criteria agreed')];
  const scenes = [
    ['00–03', t('相关问题开场', 'A relevant opening'), t(`${snapshot?.brand || ''}，为 ${snapshot?.audience || ''} 留一个有用的下一步。`, `${snapshot?.brand || ''}: a useful next step for ${snapshot?.audience || ''}.`)],
    ['03–09', t('展示已确认信息', 'Show approved information'), snapshot?.proof || ''],
    ['09–12', t('说明条件与边界', 'Make conditions clear'), snapshot?.constraints || ''],
    ['12–15', t('一个明确行动', 'One clear next step'), t(`目标：${snapshot?.goal || ''}。发布前确认唯一承接入口。`, `Goal: ${snapshot?.goal || ''}. Confirm a single destination before publishing.`)],
  ];
  const hooks = [t(`给 ${snapshot?.audience || ''}：${snapshot?.brand || ''} 能为你的下一步提供什么？`, `For ${snapshot?.audience || ''}: what could ${snapshot?.brand || ''} make easier next?`), t(`从一个具体操作开始：${snapshot?.proof || ''}`, `Start with a concrete action: ${snapshot?.proof || ''}`)];
  return <section className="lab-module">
    <header className="lab-module-heading"><div><span className="eyebrow">02 / REUSABLE CREATIVE OPERATIONS</span><h2>{t('把一次创意，变成下一次可以复用的工作包。', 'Turn one creative idea into a repeatable workflow.')}</h2><p>{t('Brief → Prompt → 分镜 → 人工审核。修改输入、组装草稿、核对条件，再导出交付。', 'Brief → prompt → storyboard → human review. Edit inputs, assemble drafts, verify conditions and export the handoff.')}</p></div><span className="lab-badge">{t('本地模板编排 · 未调用模型', 'Local template assembly · No model call')}</span></header>
    <div className="lab-workflow-pipeline">{['BRIEF', 'PROMPT', 'STORYBOARD', 'REVIEW'].map((name, i) => <div key={name} className={snapshot && !dirty ? 'ready' : ''}><span>0{i + 1}</span><strong>{name}</strong>{i === 3 && approved ? <CheckCircle size={18} /> : <ArrowRight size={18} />}</div>)}</div>
    <div className="lab-workflow-grid">
      <form className="lab-panel lab-brief" onSubmit={e => {e.preventDefault();generate();}}><header><span>INPUT / CREATIVE BRIEF</span><small>v1.0</small></header>{[
        ['brand', t('品牌 / 活动名称', 'Brand / campaign')], ['audience', t('目标受众', 'Audience')], ['goal', t('业务目标', 'Business objective')],
      ].map(([key, label]) => <label key={key}>{label}<input required maxLength={200} value={brief[key]} onChange={e => setBrief({ ...brief, [key]: e.target.value })} /></label>)}
        <label>{t('渠道', 'Channel')}<select value={brief.channel} onChange={e => setBrief({ ...brief, channel: e.target.value })}><option>TikTok / Reels</option><option>Instagram carousel</option><option>Email / order hub</option></select></label>
        <label>{t('已确认的产品信息', 'Approved product information')}<textarea required maxLength={1000} value={brief.proof} onChange={e => setBrief({ ...brief, proof: e.target.value })} /></label>
        <label>{t('限制与禁用表述', 'Conditions and excluded claims')}<textarea required maxLength={1000} value={brief.constraints} onChange={e => setBrief({ ...brief, constraints: e.target.value })} /></label>
        <button type="submit" className="lab-primary" disabled={!valid}><Sparkle size={17} />{t('组装创意工作包', 'Assemble creative pack')}</button><p>{t('这里演示可复用的输入和审核机制。Prompt 可复制到 AI 工具，素材生成需另行执行。', 'A reusable input and review system. Copy the prompt into an AI tool; asset generation is a separate step.')}</p>
      </form>
      <div className="lab-output">
        {!snapshot ? <div className="lab-output-empty"><Sparkle size={30} /><h3>{t('先把问题说清，再让工具开始。', 'Frame the task before asking the tool.')}</h3><p>{t('完善左侧 Brief，组装一份可修改、可审核的创意工作包。', 'Complete the brief to assemble an editable, reviewable creative pack.')}</p><div><span>2 HOOKS</span><span>15s STRUCTURE</span><span>4 REVIEW GATES</span></div></div> : <>
          <div className={`lab-output-status ${dirty ? 'stale' : ''}`} role="status"><ShieldCheck size={16} />{dirty ? t('输入已修改，请重新组装后审核。', 'Inputs changed. Reassemble before review.') : approved ? t('已完成本地审核清单；尚未发布。', 'Local review complete. Not published.') : t('待人工审核的模板草稿。', 'Template draft awaiting human review.')}</div>
          <article className="lab-panel lab-prompt"><header><span>PROMPT / {snapshot.channel.toUpperCase()}</span><button disabled={dirty} onClick={async () => {try {await navigator.clipboard.writeText(prompt);setMessage(t('Prompt 已复制', 'Prompt copied'));}catch {setMessage(t('复制失败，可手动选择下方文本。', 'Copy unavailable. Select the prompt text below.'));}}}><Copy size={15} />{t('复制', 'Copy')}</button></header><pre>{prompt}</pre></article>
          <article className="lab-panel lab-hooks"><header><span>HOOKS / TWO DIRECTIONS</span><small>{t('模板草稿', 'Template draft')}</small></header>{hooks.map((hook, i) => <p key={i}><strong>{i ? 'B / ' : 'A / '}</strong>{hook}</p>)}</article>
          <article className="lab-panel lab-storyboard"><header><span>{snapshot.channel === 'Instagram carousel' ? 'CAROUSEL / FOUR PANELS' : snapshot.channel === 'Email / order hub' ? 'MESSAGE / FOUR BLOCKS' : 'STORYBOARD / 15 SECONDS'}</span><small>{t('结构草稿', 'Structure draft')}</small></header>{scenes.map(([time, title, text], i) => <div key={time}><span>{snapshot.channel === 'TikTok / Reels' ? time : `0${i + 1}`}</span><section><strong>{title}</strong><p>{text}</p></section></div>)}</article>
          <article className="lab-panel lab-review"><header><span>HUMAN REVIEW</span><small>{checks.filter(Boolean).length} / 04</small></header>{review.map((text, i) => <label key={i}><input type="checkbox" checked={checks[i]} disabled={dirty} onChange={e => setChecks(checks.map((v, n) => n === i ? e.target.checked : v))} /><span>{text}</span></label>)}<button className="lab-primary" disabled={!approved} onClick={() => saveFile('creative-operations-pack.md', `# ${snapshot.brand}\n\nStatus: local review complete; not published.\nSource: locally assembled template, not model-generated.\n\n${prompt}\n\n## Hooks\n${hooks.map((hook, i) => `${i ? "B" : "A"} | ${hook}`).join("\n")}\n\n## Structure\n${scenes.map(row => row.join(' | ')).join('\n')}\n\n## Review\n${review.map(text => '- [x] ' + text).join('\n')}`, 'text/markdown')}><DownloadSimple size={17} />{t('导出已审核工作包', 'Export reviewed pack')}</button><p role="status">{message}</p></article>
        </>}
      </div>
    </div>
    <section className="lab-handoff"><header><span className="eyebrow">LAUNCH HANDOFF</span><h3>{t('从“做好了”，到“可以一起上线”。', 'From a finished asset to a shared launch plan.')}</h3><p>{t('建议协作清单，展示我会如何组织交付；并非已发生的团队合作记录。', 'A proposed handoff plan, illustrating how I would organize delivery.')}</p></header><div>{[
      [t('商家 / 业务', 'Merchant / business'), t('确认权益范围、库存、有效期与承接页。', 'Confirm offer scope, availability, validity and destination.')],
      [t('内容 / 设计', 'Content / design'), t('提供画幅、字幕、素材来源与双语版本。', 'Provide formats, captions, asset provenance and language variants.')],
      [t('产品 / 工程', 'Product / engineering'), t('验收状态流转、领取幂等、失败与回退。', 'Verify state changes, idempotent claiming, failure and fallback.')],
      [t('数据 / 运营', 'Data / operations'), t('对齐事件、分组、口径和停止条件，安排复盘。', 'Align events, assignment, definitions and stopping rules; schedule review.')],
    ].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h4>{title}</h4><p>{text}</p></article>)}</div></section>
  </section>;
}

function ExperimentDesk({ lang, events, navigate }) {
  const t = (zh, en) => choose(lang, zh, en);
  const [source, setSource] = useState('sample');
  const [entry, setEntry] = useState('all');
  const [variant, setVariant] = useState('B');
  const rows = source === 'sample' ? sampleCohorts(entry) : sessionCohorts(events);
  const row = rows.find(r => r.variant === variant);
  const difference = rate(rows[1].counts[5], rows[1].counts[0]) != null && rate(rows[0].counts[5], rows[0].counts[0]) != null ? (rate(rows[1].counts[5], rows[1].counts[0]) - rate(rows[0].counts[5], rows[0].counts[0])) * 100 : null;
  return <section className="lab-module">
    <header className="lab-module-heading"><div><span className="eyebrow">03 / MEASUREMENT & EXPERIMENT DESIGN</span><h2>{t('看见参与，也看清参与之后。', 'Measure participation. Then look beyond it.')}</h2><p>{t('主指标：每千名入口曝光用户中的商家访问人数。结合漏斗、负反馈与实验条件判断下一步。', 'Primary metric: merchant visitors per 1,000 exposed users. Review the funnel, negative feedback and experiment conditions together.')}</p></div><span className="lab-badge">{source === 'sample' ? t('合成样例 · 非真实业绩', 'Synthetic fixture · Not real results') : t('当前页面会话 · 非用户实验', 'Current local session · Not a user study')}</span></header>
    <div className="lab-desk-controls"><div className="lab-switch">{[['sample', t('样例队列', 'Sample cohorts')], ['session', t('本次试玩', 'This session')]].map(([id, title]) => <button key={id} aria-pressed={source === id} onClick={() => setSource(id)}>{title}</button>)}</div><label>{t('入口渠道', 'Entry channel')}<select value={entry} disabled={source !== 'sample'} onChange={e => setEntry(e.target.value)}><option value="all">{t('全部', 'All')}</option><option value="order">{t('订单中心', 'Order hub')}</option><option value="email">Email</option></select></label><button className="lab-secondary" onClick={() => saveFile('benefits-funnel.csv', cohortCsv(rows, source === 'sample' ? `synthetic_${entry}` : 'local_session'), 'text/csv')}><DownloadSimple size={16} />CSV / Excel</button></div>
    <div className="lab-metrics-grid">{[
      [source === 'session' ? t('商家预览 / 千次会话', 'Merchant previews / 1,000 sessions') : t('商家访问 / 千人曝光', 'Merchant visits / 1,000 exposed'), rate(row.counts[5], row.counts[0]) == null ? '—' : (rate(row.counts[5], row.counts[0]) * 1000).toFixed(1), source === 'session' ? t('本地会话去重', 'Deduplicated local sessions') : t('主指标 · 人数去重', 'Primary · deduplicated users')],
      [t('权益中心访问率', 'Hub visit rate'), percent(rate(row.counts[1], row.counts[0])), t('进入权益中心 / 入口曝光', 'Hub visitors / exposed users')],
      [t('互动完成率', 'Activity completion rate'), percent(rate(row.counts[3], row.counts[2])), t('完成互动 / 开始互动', 'Completed / started')],
      [t('负反馈率', 'Negative feedback rate'), percent(rate(row.negative, row.counts[0])), t('护栏 · 本地试玩不采集此项', 'Guardrail · not collected in local play')],
    ].map(([title, value, detail]) => <article key={title}><span>{title}</span><strong>{value}</strong><small>{detail} · {variant}</small></article>)}</div>
    <div className="lab-measure-grid"><article className="lab-panel lab-funnel"><header><span>CONVERSION PATH</span><div className="lab-switch">{['A', 'B'].map(v => <button key={v} aria-pressed={variant === v} onClick={() => setVariant(v)}>{v}</button>)}</div></header>{FUNNEL.map(([name, zh, en], i) => <div key={name}><div><span>0{i + 1} / {t(zh, en)}</span><strong>{row.counts[i].toLocaleString()}</strong></div><div className="lab-funnel-track"><i style={{ width: `${(rate(row.counts[i], row.counts[0]) || 0) * 100}%` }} /></div><small>{i ? `${percent(rate(row.counts[i], row.counts[i - 1]))} ${t('来自上一步', 'of previous step')}` : source === 'session' ? t('本地曝光会话数', 'Local exposed sessions') : t('去重曝光人数', 'Deduplicated exposed users')}</small></div>)}</article>
      <article className="lab-panel lab-ab"><header><span>A / B COMPARISON</span><small>{t('描述性比较', 'Descriptive only')}</small></header><h3>{t('入口表达，有没有改变后续行为？', 'Does the entry change what happens next?')}</h3>{rows.map(item => <div className="lab-ab-row" key={item.variant}><strong>{item.variant}</strong><span>{percent(rate(item.counts[5], item.counts[0]))}</span><small>{item.counts[5]} / {item.counts[0]} {source === 'session' ? t('预览会话 / 曝光会话', 'preview sessions / exposed sessions') : t('商家访问 / 曝光', 'merchant visits / exposed')}</small></div>)}<div className="lab-ab-delta"><span>B − A</span><strong>{difference == null ? '—' : `${difference > 0 ? '+' : ''}${difference.toFixed(2)} pp`}</strong></div><p>{t('这里的差值不是显著性或增量收益结论。正式实验需固定用户分组、统一 7 天归因窗口，检查分流比例、样本量与负反馈，再解释结果。', 'This difference is not a significance or incremental-revenue finding. A real test needs stable user assignment, a common seven-day window, traffic checks, adequate sample size and negative-feedback review.')}</p>{source === 'session' && <button className="lab-secondary" onClick={() => navigate('playground')}>{t('回去试玩并记录事件', 'Play and record events')}<ArrowRight size={16} /></button>}</article></div>
    <section className="lab-event-spec"><header><div><span className="eyebrow">METRIC CONTRACT / SQL</span><h3>{t('先统一口径，再讨论增长。', 'Agree on definitions before debating growth.')}</h3></div><button className="lab-secondary" onClick={() => saveFile('benefits-cohort-query.sql', EXPERIMENT_SQL)}><DownloadSimple size={16} />{t('下载 SQL 示例', 'Download SQL example')}</button></header><div className="lab-spec-scroll"><table><thead><tr><th>EVENT</th><th>{t('触发条件', 'Trigger')}</th><th>{t('去重与用途', 'Deduplication / purpose')}</th></tr></thead><tbody>{FUNNEL.map(([name, zh, en], i) => <tr key={name}><td><code>{name}</code></td><td>{t(zh, en)}</td><td>{t('线上按 user_id × 实验 × 事件去重；本地按 session_id 去重。', 'Production: user × experiment × event. Local demo: session-level deduplication.')} {i === 5 ? t('预览访问不等于成交。', 'A preview visit is not a sale.') : ''}</td></tr>)}</tbody></table></div><p>{t('建议正式事件字段：user_id、experiment_id、variant、entry、event_time、event_name。当前原型只有本地 session_id，不采集身份。SQL 为 PostgreSQL 示例，未连接数据库。', 'Proposed production fields: user_id, experiment_id, variant, entry, event_time and event_name. The prototype uses local session_id without identity collection. PostgreSQL example; no live database.')}</p></section>
    <div className="lab-decision-row"><article><span>BEFORE</span><h3>{t('预先约定实验', 'Pre-register the test.')}</h3><p>{t('假设、主指标、护栏、目标样本与停止条件先写清。以用户为单位固定分组，排除内部和异常流量。', 'Define hypothesis, primary metric, guardrails, sample plan and stopping rules. Use stable user assignment and exclude internal or invalid traffic.')}</p></article><article><span>DURING</span><h3>{t('监测质量与伤害', 'Watch data quality and harm.')}</h3><p>{t('检查分流比例、事件丢失、领取失败、延迟和负反馈。出现体验问题先停止排查，不等到周期结束。', 'Check traffic balance, event loss, claim errors, latency and complaints. Stop to investigate material experience failures.')}</p></article><article><span>AFTER</span><h3>{t('把结论送回下一轮', 'Carry findings into the next brief.')}</h3><p>{t('区分指标变化与因果结论。若参与高但商家访问低，先检查奖励关联性和承接页，而不是扩大投放。', 'Separate metric movement from causal evidence. High activity with low partner visits calls for a reward and landing-page review before scaling.')}</p></article></div>
  </section>;
}

function BenchmarkNotes({ lang }) {
  const t = (zh, en) => choose(lang, zh, en);
  const sources = [
    { name: 'GRAB / GRABCOINS', url: 'https://www.grab.com/inside-grab/stories/grabrewards-grabcoins-earn-savings-redeem/', observation: t('官方介绍把获取与使用路径放在权益中心，并连接到订单结算。', 'The official explanation connects earning and redemption through a benefits hub and checkout.'), implication: t('迁移：入口解释“为何值得点”；避免：活动与商家任务脱节。', 'Apply: explain the value at entry. Avoid disconnecting an activity from the merchant task.') },
    { name: 'UBER ONE / SAVINGS', url: 'https://help.uber.com/riders/article/i-want-to-know-how-much-i%E2%80%99ve-saved-through-my-uber-one-membership--where-can-i-find-this?nodeId=6472825b-302d-4955-98c5-1c595233484b', observation: t('帮助页给出累计节省金额及明细的查看路径。', 'The help page explains where members can find total savings and their breakdown.'), implication: t('迁移：让权益价值可解释；避免：用总量数字替代当前可用条件。', 'Apply: make value inspectable. Avoid replacing eligibility information with a large aggregate.') },
    { name: 'SHOPBACK / STATUS', url: 'https://support.shopback.com/hc/en-us/articles/34642746566163-I-m-having-issues-with-the-Cashback-status', observation: t('官方帮助区分计算中、待确认与过期，并提供明细排查路径。', 'Official help distinguishes calculating, pending and expired states with a path to inspect details.'), implication: t('迁移：领取后仍需状态反馈；避免：把“已领取”误写成“已到账”。', 'Apply: show state after claiming. Avoid presenting a claim as a settled benefit.') },
  ];
  return <section className="lab-benchmark"><header><span className="eyebrow">PATTERN RESEARCH / 2026.11.06</span><h3>{t('参考机制，也保留自己的判断。', 'Study the mechanism. Keep the judgment.')}</h3><p>{t('以下观察来自官方说明；迁移与取舍是我对本原型的设计判断，不代表竞品效果或 Seelie 现有功能。', 'Observations use official sources. Implications are design inferences for this prototype, not performance claims or descriptions of Seelie features.')}</p></header><div>{sources.map(source => <article key={source.name}><a href={source.url} target="_blank" rel="noreferrer">{source.name}<ArrowSquareOut size={15} /></a><p>{source.observation}</p><small>{source.implication}</small></article>)}</div></section>;
}
