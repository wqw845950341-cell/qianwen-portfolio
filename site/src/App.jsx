import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowSquareOut,
  Bell,
  Briefcase,
  Camera,
  ChartDonut,
  ChartLine,
  CheckCircle,
  Circle,
  Command,
  Compass,
  Copy,
  CursorClick,
  Database,
  Diamond,
  DotsSixVertical,
  DownloadSimple,
  EnvelopeSimple,
  GlobeHemisphereWest,
  Hand,
  Lightning,
  Lightbulb,
  List,
  MagnifyingGlass,
  MapTrifold,
  Moon,
  Quotes,
  Scan,
  ShieldCheck,
  Sparkle,
  SpeakerHigh,
  SpeakerSlash,
  SquaresFour,
  Sun,
  Timer,
  TrendUp,
  TreeStructure,
  UsersThree,
  Warning,
  X,
} from "@phosphor-icons/react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ParticleField } from "./ParticleField.jsx";
import {
  AICapabilityField,
  CapabilityField,
  ContactOrbit,
  HomeArtifact,
  JourneyOrbit,
  NotesField,
  ProjectArtifact,
  StreetProgressField,
} from "./VisualSystems.jsx";
import { capabilities, journey, notes, projects } from "./data.js";

const EMAIL = "845950341@qq.com";

const FIELD_NOTES = {
  1: {
    problem: {
      zh: "经营数据、知识与任务分散，团队很难从异常快速走到可执行动作。",
      en: "Operating data, knowledge, and tasks were fragmented, slowing the path from anomaly to action.",
    },
    decision: {
      zh: "用证据检索、置信度与人工确认串起诊断—建议—任务协同。",
      en: "Connect diagnosis, recommendations, and task coordination through evidence, confidence, and human review.",
    },
    learned: {
      zh: "AI 输出越接近决策，越需要展示来源、边界与可编辑空间。",
      en: "The closer AI gets to a decision, the more it must expose sources, boundaries, and room to edit.",
    },
    impact: "5-step",
    impactZh: "可追溯协作链路",
    impactEn: "Traceable workflow",
    evidence: "05 signals",
  },
  2: {
    problem: {
      zh: "不良坐姿通常在不适后才被发现，固定提醒又会频繁打断专注。",
      en: "Poor posture is noticed too late, while fixed reminders interrupt focus without understanding context.",
    },
    decision: {
      zh: "以关键点、时间窗口与状态机判断持续性，再按程度分级提醒。",
      en: "Use landmarks, temporal windows, and state machines before escalating a graded intervention.",
    },
    learned: {
      zh: "低干扰不等于少提醒，而是让每次提醒都拥有足够证据。",
      en: "Quiet intervention is not fewer nudges; it is making every nudge evidence-based.",
    },
    impact: "4 states",
    impactZh: "姿态问题识别",
    impactEn: "Posture conditions",
    evidence: "32 min",
  },
  3: {
    problem: {
      zh: "城市级绿量能描述差异，却很难直接回答下一条街该采取什么行动。",
      en: "City-scale canopy data describes difference, but rarely tells teams what to do on the next street.",
    },
    decision: {
      zh: "把分析下沉到街段，以 A–E 分级、类型诊断与情景比较连接策略。",
      en: "Move analysis to street segments and connect A–E grades, typologies, and scenarios to strategy.",
    },
    learned: {
      zh: "可视化的终点不是看见，而是形成可解释、可执行的下一步。",
      en: "The endpoint of visualization is not seeing, but an explainable and actionable next step.",
    },
    impact: "8,915",
    impactZh: "统一街道分析单元",
    impactEn: "Street units",
    evidence: "A–E system",
  },
};

const JOURNEY_CAPABILITY_AXES = [
  { key: "governance", zh: "数据治理", en: "Data governance" },
  { key: "systems", zh: "系统思维", en: "Systems thinking" },
  { key: "visual", zh: "空间与可视化", en: "Spatial & visual" },
  { key: "collaboration", zh: "沟通与协作", en: "Collaboration" },
];

const JOURNEY_CAPABILITY_GROWTH = {
  nfu: {
    scores: [[34, 58], [43, 72], [48, 88], [46, 69]],
    metrics: [{ value: "3.94", zh: "GPA", en: "GPA" }, { value: "Top 5%", zh: "专业排名", en: "Cohort rank" }],
  },
  ec: {
    scores: [[53, 74], [55, 76], [61, 68], [57, 82]],
    metrics: [{ value: "20+", zh: "核心 SKU", en: "Core SKUs" }, { value: "120+", zh: "关键词", en: "Keywords" }],
  },
  nus: {
    scores: [[61, 73], [69, 89], [81, 93], [67, 88]],
    metrics: [{ value: "4.40", zh: "GPA", en: "GPA" }, { value: "2 yrs", zh: "跨文化研究", en: "Cross-cultural study" }],
  },
  wuxi: {
    scores: [[48, 88], [55, 84], [62, 86], [58, 80]],
    metrics: [{ value: "900+", zh: "治理记录", en: "Governed records" }, { value: "8", zh: "Power BI 看板", en: "Power BI dashboards" }, { value: "−30%", zh: "重复汇总", en: "Repeat consolidation" }],
  },
  experiments: {
    scores: [[71, 86], [77, 94], [79, 91], [75, 89]],
    metrics: [{ value: "3", zh: "可运行原型", en: "Working prototypes" }, { value: "3", zh: "跨领域场景", en: "Cross-domain contexts" }, { value: "E2E", zh: "规则到交互", en: "Rules to interaction" }],
  },
};

const AI_CAPABILITIES = [
  {
    id: "workflow",
    zh: "AI 产品与工作流设计",
    en: "AI Product & Workflow Design",
    summaryZh: "把模糊需求拆成可验证的 AI 任务、人工判断节点、异常兜底与反馈闭环。",
    summaryEn: "Turn ambiguous needs into testable AI tasks, human checkpoints, fallbacks, and feedback loops.",
    signal: "0.90",
    signalLabelZh: "端到端设计成熟度",
    signalLabelEn: "End-to-end design maturity",
    methods: ["Problem framing", "Human-in-the-loop", "Evaluation metrics", "Fallback design"],
    proofZh: "AI 电商诊断助手：证据检索—建议生成—人工确认—任务协同",
    proofEn: "AI commerce assistant: evidence retrieval → recommendation → human review → task coordination",
    color: "#9c79ff",
  },
  {
    id: "agents",
    zh: "RAG、智能体与可追溯回答",
    en: "RAG, Agents & Traceable Answers",
    summaryZh: "设计检索、上下文编排、置信度和引用机制，让模型输出可核验、可修正。",
    summaryEn: "Design retrieval, context orchestration, confidence, and citations so model output stays verifiable.",
    signal: "4",
    signalLabelZh: "关键链路层",
    signalLabelEn: "Traceable pipeline layers",
    methods: ["Retrieval", "Context orchestration", "Confidence", "Tool calling"],
    proofZh: "以经营数据、知识库和任务上下文为输入，输出带证据与下一步动作的建议。",
    proofEn: "Use operating data, knowledge, and task context to produce evidence-backed next actions.",
    color: "#6f8cff",
  },
  {
    id: "vision",
    zh: "计算机视觉与端侧判断",
    en: "Computer Vision & Edge Reasoning",
    summaryZh: "使用 MediaPipe 关键点、时间窗口与状态机，将连续视觉信号转成低干扰判断。",
    summaryEn: "Use MediaPipe landmarks, temporal windows, and state machines to turn live vision into quiet intervention.",
    signal: "4",
    signalLabelZh: "典型姿态问题",
    signalLabelEn: "Posture conditions",
    methods: ["MediaPipe Pose", "Temporal filtering", "State machines", "On-device privacy"],
    proofZh: "PosturePal：低头、歪头、含胸与身体倾斜的实时识别和分级提醒。",
    proofEn: "PosturePal: live detection and graded nudges for head, shoulder, chest, and body alignment.",
    color: "#e7a34c",
  },
  {
    id: "prototype",
    zh: "AI 原型工程与验证",
    en: "AI Prototyping & Validation",
    summaryZh: "用 React、Electron 与 API 快速完成可运行原型，并把效果、体验和风险变成验证指标。",
    summaryEn: "Build working React/Electron/API prototypes and turn effectiveness, experience, and risk into metrics.",
    signal: "3",
    signalLabelZh: "可运行独立原型",
    signalLabelEn: "Working independent prototypes",
    methods: ["React", "Electron", "API integration", "Vercel delivery"],
    proofZh: "覆盖 AI 运营、健康陪伴与空间决策三类场景，均形成可运行交互。",
    proofEn: "Working interactions across AI operations, health companionship, and spatial decisions.",
    color: "#40d5a5",
  },
];

function JourneyRadarTooltip({ active, payload, lang }) {
  if (!active || !payload?.length) return null;
  const datum = payload[0].payload;
  return (
    <div className="journey-radar-tooltip">
      <strong>{datum.axis}</strong>
      <span>{datum.before} → {datum.after}</span>
      <small>+{datum.after - datum.before} {lang === "zh" ? "能力点" : "points"}</small>
    </div>
  );
}

function JourneyCapabilityRadar({ item, lang, reducedMotion }) {
  const growth = JOURNEY_CAPABILITY_GROWTH[item.id] || JOURNEY_CAPABILITY_GROWTH.experiments;
  const data = JOURNEY_CAPABILITY_AXES.map((axis, index) => ({
    axis: axis[lang],
    before: growth.scores[index][0],
    after: growth.scores[index][1],
  }));
  return (
    <section className="journey-radar" aria-label={lang === "zh" ? "能力提升雷达图" : "Capability growth radar"}>
      <header>
        <span>{lang === "zh" ? "能力复盘指数" : "Capability reflection index"}</span>
        <small>{lang === "zh" ? "进入前 → 里程碑后 · 0–100" : "Before → after milestone · 0–100"}</small>
      </header>
      <div className="journey-radar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="66%">
            <PolarGrid stroke="rgba(166,174,191,.2)" radialLines />
            <PolarAngleAxis dataKey="axis" tick={{ fill: "#a6aebf", fontSize: 8 }} tickLine={false} />
            <Tooltip cursor={false} content={<JourneyRadarTooltip lang={lang} />} />
            <Radar name="Before" dataKey="before" stroke="rgba(166,174,191,.52)" fill="rgba(166,174,191,.08)" strokeDasharray="3 4" isAnimationActive={false} />
            <Radar name="After" dataKey="after" stroke={item.color} fill={item.color} fillOpacity={0.2} strokeWidth={1.6} dot={{ r: 2.2, fill: item.color, strokeWidth: 0 }} isAnimationActive={!reducedMotion} animationDuration={760} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="journey-radar-scores">
        {data.map((datum) => <span key={datum.axis}><small>{datum.axis}</small><strong>{datum.after}</strong><em>+{datum.after - datum.before}</em></span>)}
      </div>
      <div className="journey-radar-evidence">
        {growth.metrics.map((metric) => <span key={`${metric.value}-${metric.en}`}><strong>{metric.value}</strong><small>{metric[lang]}</small></span>)}
      </div>
    </section>
  );
}

function useViewport() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 760);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 760);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

function Header({ view, navigate, lang, setLang, theme, setTheme, openCommand, menuOpen, setMenuOpen }) {
  const nav = [
    ["journey", "Journey"],
    ["home", "Work"],
    ["ai", "AI"],
    ["notes", "Notes"],
    ["about", "About"],
    ["about", "Contact"],
  ];
  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate("home")} aria-label="Go home">
        <span className="brand-long">王芊文 / QIANWEN WANG</span>
        <span className="brand-short">王芊文 / QW</span>
        <Sparkle className="brand-star" size={12} weight="fill" />
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map(([target, label], index) => (
          <button
            key={`${target}-${label}`}
            className={((view === target) || (view === "project" && target === "home")) && label !== "Contact" ? "active" : ""}
            onClick={() => navigate(target, label === "Contact" ? "contact" : undefined)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="lang-toggle" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
          <span className={lang === "zh" ? "active" : ""}>中文</span><i>/</i><span className={lang === "en" ? "active" : ""}>EN</span>
        </button>
        <button className="icon-button theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="command-key" onClick={openCommand} aria-label="Open command palette"><Command size={17} />K</button>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {nav.slice(0, 5).map(([target, label]) => (
            <button key={label} onClick={() => { navigate(target); setMenuOpen(false); }}>{label}<ArrowRight size={18} /></button>
          ))}
          <button onClick={() => { openCommand(); setMenuOpen(false); }}>Command menu<Command size={18} /></button>
        </div>
      )}
    </header>
  );
}

function ProjectNode({ project, active, onSelect, onOpen, onEvidence, lang }) {
  return (
    <div
      className={`project-node project-node-${project.id} ${active ? "active" : ""}`}
      style={{ "--accent": project.color }}
      onMouseEnter={() => onSelect(project.id)}
    >
      <button className="node-main" onFocus={() => onSelect(project.id)} onClick={() => onSelect(project.id)} aria-pressed={active}>
        <span className="node-index">0{project.id}</span>
        <span className="node-copy">
          <strong>{project.id === 2 ? "PosturePal" : project.title[lang]}</strong>
          <small>{project.short[lang]}</small>
        </span>
        <span className="node-target" aria-hidden="true" />
      </button>
      {active && (
        <span className="node-signal">
          {project.signal.slice(0, 2).map((item) => <span key={item.zh}><b>{item.value}</b><small>{item[lang]}</small></span>)}
        </span>
      )}
      {active && (
        <span className="node-actions">
          <button className="node-evidence" onClick={() => onEvidence(project.id)}>{lang === "zh" ? "查看证据" : "View evidence"}<ArrowSquareOut size={13} /></button>
          <button className="node-open" onClick={() => onOpen(project.id)}>{lang === "zh" ? "完整案例" : "Full case"}<ArrowRight size={15} /></button>
        </span>
      )}
    </div>
  );
}

function EvidenceCard({ project, lang, onClose, onOpenProject, position, onDragStart }) {
  const note = FIELD_NOTES[project.id];
  return (
    <article
      className="field-note-card"
      style={{ "--accent": project.color, transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${project.id === 2 ? "-2.4deg" : "-1deg"})` }}
      aria-label={`${project.title[lang]} evidence note`}
    >
      <header className="field-note-header" onPointerDown={onDragStart}>
        <span><DotsSixVertical size={16} />0{project.id}</span>
        <strong>{project.id === 2 ? "PosturePal" : project.title[lang]}</strong>
        <button onClick={onClose} aria-label={lang === "zh" ? "关闭证据卡" : "Close evidence note"}><X size={16} /></button>
      </header>
      <div className="field-note-sections">
        {["problem", "decision", "learned"].map((key) => (
          <section key={key}>
            <span>{key}</span>
            <p>{note[key][lang]}</p>
          </section>
        ))}
      </div>
      <footer className="field-note-impact">
        <span><small>IMPACT</small><strong>{note.impact}</strong></span>
        <span><small>{note.evidence}</small><p>{lang === "zh" ? note.impactZh : note.impactEn}</p></span>
        <button onClick={() => onOpenProject(project.id)}>{lang === "zh" ? "进入完整案例" : "Open full case"}<ArrowRight size={15} /></button>
      </footer>
    </article>
  );
}

function EvidenceTag({ project, lang, active, onClick }) {
  const note = FIELD_NOTES[project.id];
  return (
    <button className={`evidence-tag evidence-tag-${project.id} ${active ? "active" : ""}`} style={{ "--accent": project.color }} onClick={onClick}>
      <span>evidence_0{project.id}</span>
      <strong>{note.evidence}</strong>
      <small>{lang === "zh" ? "点击展开" : "Click to unfold"}</small>
    </button>
  );
}

function BottomDock({ sound, setSound, theme, setTheme, reducedMotion, setReducedMotion, openCommand }) {
  return (
    <div className="bottom-dock">
      <div className="live-canvas-label"><span className="pulse-ring" /><span><strong>实时生成画布</strong><small>每次访问，图谱都会变化</small></span></div>
      <div className="dock-actions">
        <button className={sound ? "sound-active" : ""} onClick={() => setSound(!sound)} title="Time Machine · BGM"><span className="sound-icon">{sound ? <SpeakerHigh size={18} /> : <SpeakerSlash size={18} />}</span><span><strong>Time Machine</strong><small>声音 {sound ? "ON" : "OFF"}</small></span></button>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}<span>日 / 夜</span></button>
        <button onClick={openCommand}><Command size={17} /><span>命令面板</span></button>
        <button onClick={() => setReducedMotion(!reducedMotion)}><Compass size={18} /><span>{reducedMotion ? "恢复动效" : "减少动效"}</span></button>
      </div>
    </div>
  );
}

function Home({ lang, activeProject, setActiveProject, openProject, navigate, controls, mobile }) {
  const active = projects[activeProject - 1];
  const [evidenceOpen, setEvidenceOpen] = useState(() => !mobile);
  const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  useEffect(() => {
    if (mobile) setEvidenceOpen(false);
  }, [mobile]);

  const revealEvidence = useCallback((projectId) => {
    setActiveProject(projectId);
    setNotePosition({ x: 0, y: 0 });
    setEvidenceOpen(true);
  }, [setActiveProject]);

  const beginNoteDrag = useCallback((event) => {
    if (event.target.closest(".field-note-header button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, origin: notePosition };
  }, [notePosition]);

  const moveNote = useCallback((event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setNotePosition({
      x: Math.max(-210, Math.min(240, drag.origin.x + event.clientX - drag.x)),
      y: Math.max(-180, Math.min(170, drag.origin.y + event.clientY - drag.y)),
    });
  }, []);

  const endNoteDrag = useCallback((event) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  }, []);

  return (
    <main className={`screen home-screen ${evidenceOpen ? "evidence-open" : ""}`} onPointerMove={moveNote} onPointerUp={endNoteDrag} onPointerCancel={endNoteDrag}>
      <ParticleField
        variant="home"
        activeProject={activeProject}
        reducedMotion={controls.reducedMotion}
        light={controls.theme === "light"}
        onSelectProject={setActiveProject}
      />
      <nav className="home-signal-rail" aria-label="Project signals">
        <span>LIVE INDEX</span>
        {projects.map((project) => (
          <button key={project.id} className={activeProject === project.id ? "active" : ""} style={{ "--accent": project.color }} onClick={() => setActiveProject(project.id)}>
            <i />0{project.id}<strong>{project.id === 2 ? "PosturePal" : project.title[lang]}</strong><small>{project.signal[0].value}</small>
          </button>
        ))}
      </nav>
      <section className="home-hero">
        <h1>{lang === "zh" ? <>让线索彼此连接，<br />让想法逐渐成形。</> : <>Connecting signals,<br />shaping ideas.</>}</h1>
        <p>{lang === "zh" ? "一个关于工作、学习与实验的动态场域。" : "A living field of work, learning, and experiments."}</p>
        <button className="outline-cta" onClick={() => openProject(activeProject)}><Compass size={19} />{lang === "zh" ? "开始探索" : "Start exploring"}<ArrowRight size={20} /></button>
        <button className="unfold-hint" onClick={() => revealEvidence(activeProject)}><Sparkle size={13} />HOLD TO UNFOLD</button>
      </section>

      <div className="project-nodes" aria-label="Selected work">
        {projects.map((project) => <ProjectNode key={project.id} project={project} lang={lang} active={activeProject === project.id} onSelect={setActiveProject} onOpen={openProject} onEvidence={revealEvidence} />)}
      </div>

      <div className="evidence-tags" aria-label={lang === "zh" ? "项目证据入口" : "Project evidence entries"}>
        {projects.map((project) => <EvidenceTag key={project.id} project={project} lang={lang} active={evidenceOpen && activeProject === project.id} onClick={() => revealEvidence(project.id)} />)}
      </div>

      {evidenceOpen && (
        <EvidenceCard
          project={active}
          lang={lang}
          onClose={() => setEvidenceOpen(false)}
          onOpenProject={openProject}
          position={notePosition}
          onDragStart={beginNoteDrag}
        />
      )}

      <button className="drag-note-chip" onPointerDown={beginNoteDrag} aria-label={lang === "zh" ? "拖动证据卡" : "Drag evidence note"}><DotsSixVertical size={15} />DRAG NOTE</button>

      <nav className="evidence-progress" aria-label={lang === "zh" ? "项目证据索引" : "Project evidence index"}>
        {projects.map((project) => <button key={project.id} className={activeProject === project.id ? "active" : ""} style={{ "--accent": project.color }} onClick={() => revealEvidence(project.id)}><span>0{project.id}</span><i /></button>)}
        <small>TOP</small>
      </nav>

      {projects.map((project) => <HomeArtifact key={project.id} projectId={project.id} lang={lang} active={activeProject === project.id} />)}

      <div className="home-anchors">
        <button className="anchor journey-anchor" onClick={() => navigate("journey")}><span />Journey<ArrowRight size={15} /></button>
        <button className="anchor notes-anchor" onClick={() => navigate("notes")}><span />Notes<ArrowRight size={15} /></button>
        <button className="anchor experiments-anchor" onClick={() => navigate("ai")}><span />AI Capability<ArrowRight size={15} /></button>
        <button className="anchor contact-anchor" onClick={() => navigate("about", "contact")}><span />Contact<ArrowRight size={15} /></button>
      </div>

      <aside className="interaction-legend" aria-label="Interaction hints">
        <p><Hand size={19} /><span>拖拽<br /><small>探索画布</small></span></p>
        <p><Compass size={19} /><span>滚轮<br /><small>切换景深</small></span></p>
        <p><SquaresFour size={19} /><span>1 / 2 / 3<br /><small>快速切换项目</small></span></p>
        <p><Command size={18} /><span>⌘K<br /><small>打开命令面板</small></span></p>
      </aside>

      <aside className="home-status" style={{ "--accent": active.color }}>
        <span><i />SELECTED SIGNAL · 0{active.id}</span>
        <strong>{active.role[lang]}</strong>
        <button onClick={() => openProject(active.id)}>{lang === "zh" ? "进入完整案例" : "Open full case"}<ArrowRight size={16} /></button>
      </aside>

      <div className="mobile-project-sheet" style={{ "--accent": active.color }}>
        <span className="sheet-handle" />
        <div className="sheet-title"><span>0{active.id}</span><strong>{active.id === 2 ? "PosturePal" : active.title[lang]}</strong></div>
        <p>{active.short[lang]}</p>
        <div className="tag-row">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="mobile-sheet-actions">
          <button onClick={() => revealEvidence(active.id)}>{lang === "zh" ? "项目证据" : "Evidence"}<ArrowSquareOut size={17} /></button>
          <button onClick={() => openProject(active.id)}>{lang === "zh" ? "查看项目" : "View project"}<ArrowRight size={18} /></button>
        </div>
        <div className="swipe-index">{projects.map((project) => <button key={project.id} className={project.id === active.id ? "active" : ""} onClick={() => setActiveProject(project.id)}>0{project.id}</button>)}</div>
      </div>

      <BottomDock {...controls} />
    </main>
  );
}

const FLOW_ICONS = [Database, ChartLine, MagnifyingGlass, Lightbulb, UsersThree, ChartDonut];
const POSTURE_ICONS = [Camera, Scan, Timer, Bell, ChartDonut, ChartLine];
const STREET_ICONS = [Database, MapTrifold, TreeStructure, Compass, Briefcase];

function CaseStudy({ project, lang, setProject, navigate, reducedMotion, theme }) {
  const [selectedStage, setSelectedStage] = useState(() => project.id === 3 ? 1 : 0);
  const [activeProgress, setActiveProgress] = useState(() => [2, 3].includes(project.id) ? 1 : 0);
  const icons = project.id === 1 ? FLOW_ICONS : project.id === 2 ? POSTURE_ICONS : STREET_ICONS;
  const nextProject = projects[project.id % projects.length];
  const activeStage = project.stageDetails[selectedStage];
  const liveProjectUrl = project.id === 1
    ? "https://www.coze.cn/store/agent/7674848296376221738?bot_id=true"
    : project.id === 3
      ? "https://streetgreening-dashboard-site.vercel.app/"
      : project.url;
  const postureProgress = [
    { en: "Context", zh: "问题洞察" },
    { en: "Detection", zh: "姿态识别" },
    { en: "Intervention", zh: "智能干预" },
    { en: "Growth", zh: "成长反馈" },
  ];
  const streetProgress = [
    { en: "Context", zh: "项目背景" },
    { en: "Classification", zh: "街道分级" },
    { en: "Comparison", zh: "情景比较" },
    { en: "Strategy", zh: "策略制定" },
  ];
  const streetStageMeta = [
    { en: "Urban Data", zh: "多源数据融合与清洗" },
    { en: "Street Grading A–E", zh: "从宏观到微观的分级体系" },
    { en: "Success / Crisis Typologies", zh: "识别关键类型与风险热点" },
    { en: "360° Scenario Comparison", zh: "前后对比与多情景评估" },
    { en: "Policy Toolkit", zh: "策略工具包与行动建议" },
  ];
  const streetStageTitles = ["城市数据", "街道分级 A–E", "成功 / 危机类型诊断", "360° 场景比较", "Policy Toolkit"];

  useEffect(() => {
    setSelectedStage(project.id === 3 ? 1 : 0);
    setActiveProgress([2, 3].includes(project.id) ? 1 : 0);
  }, [project.id]);

  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-case-chapter]")];
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveProgress(Number(visible.target.dataset.caseChapter));
    }, { rootMargin: "-24% 0px -55%", threshold: [0.08, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [project.id]);

  const scrollToChapter = (index) => {
    document.getElementById(`chapter-${project.id}-${project.chapters[index].id}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <main className={`screen case-screen case-${project.accent} ${project.id === 2 ? "case-posturepal" : project.id === 3 ? "case-streetgreening" : ""}`} style={{ "--accent": project.color }}>
      <section className="case-hero">
        <div className="case-atmosphere" aria-hidden="true" />
        <aside className="case-index">
          {projects.map((item) => (
            <button key={item.id} className={project.id === item.id ? "active" : ""} onClick={() => setProject(item.id)}><span>0{item.id}</span><small>{project.id === item.id ? item.id === 2 ? "PosturePal" : item.id === 3 ? "HCMC Street Greening" : item.title.zh.slice(0, 10) : ""}</small></button>
          ))}
        </aside>
        <section className="case-copy">
          <span className="eyebrow">{project.id === 2 ? "02　Project" : project.id === 3 ? "03　 Work Case Study" : `0${project.id} / Work Case Study`}</span>
          <h1>{project.id === 2 ? "PosturePal —" : project.title[lang]}</h1>
          {project.subtitle && <h2>{project.subtitle[lang]}</h2>}
          {project.id === 3 && <h2>HCMC Street Greening Dashboard</h2>}
          <p>{project.id === 2 && lang === "zh" ? "PosturePal 通过端侧 AI 实时识别坐姿与专注状态，结合轻提醒与正向反馈，帮助用户在学习与工作中建立更舒适、可持续的专注节律。" : project.summary[lang]}</p>
          {project.id === 3 && <p className="street-english-summary">A decision-support platform for street-level greening in Ho Chi Minh City, combining street grading, success/crisis diagnostics, and scenario comparison to guide targeted greening strategies.</p>}
          <div className="case-meta"><span>{project.year}</span><span>{project.tags.join(" / ")}</span></div>
          <div className="case-role"><span>{lang === "zh" ? "我的角色" : "My role"}</span><p>{project.role[lang]}</p></div>
          {liveProjectUrl ? (
            <a className="outline-cta small case-live-link" href={liveProjectUrl} target="_blank" rel="noreferrer">{project.id === 1 ? (lang === "zh" ? "打开 Coze 工作流" : "Open Coze workflow") : (lang === "zh" ? "打开在线项目" : "Open live project")}<ArrowSquareOut size={17} /></a>
          ) : (
            <button className="outline-cta small" onClick={() => navigate("notes")}>{lang === "zh" ? "查看项目思考" : "Read project notes"}<ArrowRight size={17} /></button>
          )}
        </section>

        <section className="case-visual">
          <ProjectArtifact projectId={project.id} lang={lang} selectedStage={selectedStage} reducedMotion={reducedMotion} onSelectStage={setSelectedStage} />
          <div className="system-flow">
            {project.stages[lang].map((stage, index) => {
              const Icon = icons[index] || Compass;
              return (
                <button key={stage} aria-pressed={selectedStage === index} className={`flow-node ${selectedStage === index ? "active" : ""}`} style={{ "--delay": `${index * 80}ms` }} onClick={() => setSelectedStage(index)}>
                  {project.id === 3 && <b className="street-stage-index">{index + 1}</b>}
                  <span><Icon size={22} weight="thin" /></span>
                  <strong>{project.id === 3 ? streetStageTitles[index] : stage}</strong>
                  {project.id === 3 && <><small>{streetStageMeta[index].en}</small><em>{streetStageMeta[index].zh}</em></>}
                </button>
              );
            })}
          </div>
          <div className="case-stage-insight" key={`${project.id}-${selectedStage}`}>
            <span>0{selectedStage + 1}</span><div><small>{activeStage[lang === "zh" ? "metaZh" : "metaEn"]}</small><p>{activeStage[lang]}</p></div><CursorClick size={18} />
          </div>
        </section>

        <aside className="case-metrics">
          <span className="eyebrow">{project.id === 3 ? <>{lang === "zh" ? "关键事实" : "Key facts"}<small>Key Facts</small></> : "Project signals"}</span>
          {project.metrics.map((metric, index) => <div key={metric.zh}>
            {project.id === 3 && <span className="street-metric-icon">{index === 0 ? <SquaresFour size={20} /> : index === 1 ? <Warning size={21} /> : <b>A–E</b>}</span>}
            <strong>{metric.value}</strong><span>{metric[lang]}{project.id === 3 && <small>{metric.en}</small>}</span>
          </div>)}
          {project.id === 3 && <>
            <section className="street-typologies">
              <header><strong>{lang === "zh" ? "成功 / 危机类型举例" : "Typology examples"}</strong><small>Typology Examples</small></header>
              <p><Circle size={14} weight="fill" />AB-1　Heritage Canopy</p>
              <p><Circle size={14} weight="fill" />AB-2　Vertical Oasis</p>
              <p className="crisis"><Diamond size={13} weight="fill" />E-1　 Exposed Desert</p>
              <p className="crisis"><Diamond size={13} weight="fill" />E-2　 Deep Canyon</p>
            </section>
            <small className="street-live-subtitle">查看实时平台　·　Explore the live dashboard</small>
          </>}
        </aside>

        <div className="case-progress">
          {project.id === 3 && <StreetProgressField active={activeProgress} reducedMotion={reducedMotion} />}
          {project.chapters.map((chapter, index) => <button key={chapter.id} onClick={() => scrollToChapter(index)} className={index === activeProgress ? "active" : ""}><span>{project.id === 2 ? <><strong>{postureProgress[index]?.en}</strong><small>{postureProgress[index]?.zh}</small></> : project.id === 3 ? <><strong>{streetProgress[index]?.en}</strong><small>{streetProgress[index]?.zh}</small></> : chapter.label[lang]}</span><i /></button>)}
        </div>
        <div className="case-hints"><span><CursorClick size={17} />{project.id === 1 ? (lang === "zh" ? "点击流程查看诊断逻辑" : "Inspect the diagnostic flow") : project.id === 2 ? (lang === "zh" ? "姿态关键点显示实时判断" : "Landmarks expose live reasoning") : (lang === "zh" ? "切换 Before / Strategy 情景" : "Toggle Before / Strategy")}</span><span><SquaresFour size={17} />1 / 2 / 3 {lang === "zh" ? "切换项目" : "switch projects"}</span><button onClick={() => scrollToChapter(0)}><ArrowDown size={17} />{lang === "zh" ? "滚动深入案例" : "Scroll into the case"}</button></div>
      </section>

      <section className="case-depth">
        <nav className="case-depth-nav" aria-label="Case study chapters">
          <span>0{project.id} · {project.id === 2 ? "PosturePal" : project.title[lang]}</span>
          <div>{project.chapters.map((chapter, index) => <button key={chapter.id} onClick={() => scrollToChapter(index)} className={activeProgress === index ? "active" : ""}>0{index + 1} {chapter.label[lang]}</button>)}</div>
        </nav>
        {project.chapters.map((chapter, index) => (
          <section key={chapter.id} id={`chapter-${project.id}-${chapter.id}`} data-case-chapter={index} className="case-chapter" data-reveal>
            <aside><span>0{index + 1}</span><small>{chapter.label[lang]}</small></aside>
            <div className="chapter-copy"><span className="eyebrow">{chapter.label.en}</span><h2>{chapter.title[lang]}</h2><p>{chapter.intro[lang]}</p></div>
            <div className="chapter-cards">
              {chapter.cards.map((card, cardIndex) => <article key={card.value}><span>0{cardIndex + 1}</span><strong>{card.value}</strong><p>{card[lang]}</p></article>)}
            </div>
          </section>
        ))}
        <section className="case-delivery" data-reveal>
          <div><span className="eyebrow">{lang === "zh" ? "项目交付" : "What was delivered"}</span><h2>{lang === "zh" ? "从问题框架到可运行体验，形成完整的验证载体。" : "From problem framing to a working experience built for validation."}</h2></div>
          <div className="delivery-signals">{project.signal.map((signal) => <article key={signal.zh}><strong>{signal.value}</strong><span>{signal[lang]}</span></article>)}</div>
          <p>{project.role[lang]}</p>
        </section>
        <section className="case-next" style={{ "--next": nextProject.color }} data-reveal>
          <span>{lang === "zh" ? "下一个案例" : "Next case"} · 0{nextProject.id}</span>
          <button onClick={() => setProject(nextProject.id)}><strong>{nextProject.id === 2 ? "PosturePal" : nextProject.title[lang]}</strong><ArrowRight size={28} /></button>
        </section>
      </section>
    </main>
  );
}

function Journey({ lang, reducedMotion, theme }) {
  const [selected, setSelected] = useState(3);
  const [filter, setFilter] = useState("All");
  const item = journey[selected];
  const filters = ["All", "Learning", "Practice", "Experiments"];
  const visibleJourney = filter === "All" ? journey : journey.filter((entry) => entry.type === filter);
  const changeFilter = (next) => {
    setFilter(next);
    const first = next === "All" ? 0 : journey.findIndex((entry) => entry.type === next);
    if (first >= 0) setSelected(first);
  };
  useEffect(() => {
    const onKey = (event) => {
      if (event.key.toLowerCase() === "j") setSelected((value) => Math.max(0, value - 1));
      if (event.key.toLowerCase() === "k") setSelected((value) => Math.min(journey.length - 1, value + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <main className="screen journey-screen">
      <JourneyOrbit items={journey} selected={selected} onSelect={setSelected} reducedMotion={reducedMotion} light={theme === "light"} />
      <section className="page-intro">
        <h1>{lang === "zh" ? <>经历不是一条直线，<br />而是一组相互牵引的轨道。</> : <>A journey shaped by<br />systems, places, and experiments.</>}</h1>
        <p>{lang === "zh" ? "A journey shaped by systems, places, and experiments." : "Not a straight line, but a set of connected trajectories."}</p>
      </section>
      <aside className="journey-instructions"><span><Hand size={17} />{lang === "zh" ? "拖拽穿越时间" : "Drag through time"}</span><span><SquaresFour size={17} />J / K {lang === "zh" ? "切换里程碑" : "move between milestones"}</span></aside>
      <div className="journey-filters">{filters.map((itemFilter) => <button key={itemFilter} className={filter === itemFilter ? "active" : ""} onClick={() => changeFilter(itemFilter)}>{itemFilter === "All" && lang === "zh" ? "全部" : itemFilter}</button>)}</div>
      <section className={`timeline ${filter !== "All" ? "filtered" : ""}`} aria-label="Career and education timeline">
        {visibleJourney.map((entry) => {
          const index = journey.indexOf(entry);
          return (
          <button key={entry.id} className={`timeline-item item-${index + 1} ${selected === index ? "active" : ""} ${filter !== "All" ? "filtered" : ""}`} style={{ "--entry": entry.color }} onClick={() => setSelected(index)}>
            <span className="timeline-dot" /><small>{entry.range}</small><strong>{entry[lang]}</strong><p>{entry[lang === "zh" ? "detailZh" : "detailEn"]}</p>
          </button>
        );})}
      </section>
      <aside className="journey-detail" style={{ "--entry": item.color }}>
        <span className="eyebrow">{lang === "zh" ? "当前里程碑" : "Selected milestone"} · {item.type}</span>
        <strong>{item.range}</strong><h2>{item[lang]}</h2><h3>{lang === "zh" ? "这段经历改变了什么" : "What changed"}</h3><p>{item[lang === "zh" ? "learningZh" : "learningEn"]}</p>
        <div className="journey-proof"><TrendUp size={18} /><span><small>{lang === "zh" ? "可见证据" : "Visible evidence"}</small><strong>{item[lang === "zh" ? "proofZh" : "proofEn"]}</strong></span></div>
        <JourneyCapabilityRadar item={item} lang={lang} reducedMotion={reducedMotion} />
      </aside>
      <div className="year-ruler"><span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
    </main>
  );
}

function AICapabilities({ lang, reducedMotion, theme, openProject }) {
  const [selected, setSelected] = useState(0);
  const capability = AI_CAPABILITIES[selected];
  const projectEvidence = [
    { id: 1, number: "01", zh: "AI 电商经营诊断", en: "AI Commerce Diagnosis", detailZh: "RAG · 证据链 · 人工确认", detailEn: "RAG · evidence · human review", color: "#776bff" },
    { id: 2, number: "02", zh: "PosturePal 姿态判断", en: "PosturePal Vision", detailZh: "MediaPipe · 时序过滤 · 端侧隐私", detailEn: "MediaPipe · temporal filtering · edge privacy", color: "#e7a34c" },
    { id: 3, number: "03", zh: "街道绿化决策支持", en: "Street Greening Decisions", detailZh: "分类规则 · 情景比较 · 行动建议", detailEn: "classification · scenarios · actions", color: "#40d5a5" },
  ];
  return (
    <main className="screen ai-screen">
      <AICapabilityField selected={selected} reducedMotion={reducedMotion} light={theme === "light"} />
      <section className="ai-intro">
        <span className="eyebrow">AI CAPABILITY / 04 LAYERS</span>
        <h1>{lang === "zh" ? <>不是把 AI 当作功能，<br />而是把它设计成可验证的系统。</> : <>AI is not a feature.<br />It is a system to validate.</>}</h1>
        <p>{lang === "zh" ? "从问题定义、模型链路到交互原型与评估指标，连接技术能力和真实使用场景。" : "From problem framing and model pipelines to interactive prototypes and evaluation metrics."}</p>
      </section>
      <section className="ai-capability-nav" aria-label="AI capability layers">
        {AI_CAPABILITIES.map((item, index) => (
          <button key={item.id} className={selected === index ? "active" : ""} style={{ "--entry": item.color }} onClick={() => setSelected(index)} aria-pressed={selected === index}>
            <span>0{index + 1}</span><div><strong>{item[lang]}</strong><small>{item.en}</small></div><em>{item.signal}</em>
          </button>
        ))}
      </section>
      <section className="ai-live-core" style={{ "--entry": capability.color }}>
        <Sparkle size={24} weight="fill" /><span><small>LIVE REASONING CORE</small><strong>{capability.signal}</strong><em>{capability[lang === "zh" ? "signalLabelZh" : "signalLabelEn"]}</em></span>
      </section>
      <aside className="ai-inspector" style={{ "--entry": capability.color }}>
        <header><span>0{selected + 1}</span><small>{capability.en}</small></header>
        <h2>{capability[lang]}</h2>
        <p>{capability[lang === "zh" ? "summaryZh" : "summaryEn"]}</p>
        <div className="ai-methods">{capability.methods.map((method) => <span key={method}><i />{method}</span>)}</div>
        <blockquote><CheckCircle size={18} weight="fill" /><span><small>{lang === "zh" ? "项目证据" : "Project evidence"}</small><strong>{capability[lang === "zh" ? "proofZh" : "proofEn"]}</strong></span></blockquote>
      </aside>
      <section className="ai-project-evidence">
        <header><span>{lang === "zh" ? "能力落点" : "Applied evidence"}</span><small>3 WORKING SYSTEMS</small></header>
        <div>{projectEvidence.map((project) => <button key={project.id} style={{ "--entry": project.color }} onClick={() => openProject(project.id)}><span>{project.number}</span><strong>{project[lang === "zh" ? "zh" : "en"]}</strong><small>{project[lang === "zh" ? "detailZh" : "detailEn"]}</small><ArrowRight size={18} /></button>)}</div>
      </section>
    </main>
  );
}

function Notes({ lang, reducedMotion, theme }) {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [reading, setReading] = useState(null);
  const filtered = notes.filter((note) => (topic === "All" || note.topic === topic) && `${note.zh} ${note.en} ${note.topic}`.toLowerCase().includes(query.toLowerCase()));
  const featured = notes[selected] || notes[0];
  const topics = ["AI & Systems", "Health & Focus", "Cities & Landscape", "Process & Reflection"];
  const selectedTopicIndex = topic === "All" ? Math.max(0, topics.indexOf(featured.topic)) : topics.indexOf(topic);
  return (
    <main className="screen notes-screen">
      <NotesField selectedTopic={Math.max(0, selectedTopicIndex)} reducedMotion={reducedMotion} light={theme === "light"} />
      <section className="notes-intro">
        <span className="eyebrow">{lang === "zh" ? "思考与记录" : "Notes & reflections"}</span>
        <h1>{lang === "zh" ? <>把过程写下来，<br />让未完成的想法继续生长。</> : <>Writing the process down,<br />so unfinished ideas can grow.</>}</h1>
        <p>Notes on systems, places, tools, and the act of making.</p>
      </section>
      <section className="featured-note">
        <span className="eyebrow">{lang === "zh" ? "精选文章" : "Featured note"}</span>
        <h2>{featured[lang]}</h2><small>{featured.date}</small><p>{featured[lang === "zh" ? "abstractZh" : "abstractEn"]}</p>
        <button onClick={() => setReading(featured)}>{featured.minutes} {lang === "zh" ? "分钟阅读" : "min read"}<ArrowRight size={18} /></button>
      </section>
      <section className="topic-cloud" aria-label="Topic constellation">
        {topics.map((topicName) => {
          const count = notes.filter((note) => note.topic === topicName).length;
          return <button key={topicName} className={topic === topicName ? "active" : ""} onClick={() => setTopic(topic === topicName ? "All" : topicName)}><span /><strong>{topicName}</strong><small>{count} note{count !== 1 ? "s" : ""}</small></button>;
        })}
      </section>
      <section className="notes-list">
        {filtered.map((note) => (
          <button key={note.id} onClick={() => { setSelected(notes.indexOf(note)); setReading(note); }} style={{ "--entry": note.color }}>
            <span className="note-dot" /><strong>{note[lang]}</strong><p>{note[lang === "zh" ? "abstractZh" : "abstractEn"]}</p><small>{note.date} · {note.minutes} min</small><ArrowRight size={17} />
          </button>
        ))}
        {!filtered.length && <div className="notes-empty"><MagnifyingGlass size={24} /><strong>{lang === "zh" ? "没有找到相关笔记" : "No notes found"}</strong><button onClick={() => { setQuery(""); setTopic("All"); }}>{lang === "zh" ? "清除筛选" : "Clear filters"}</button></div>}
      </section>
      <div className="notes-search">
        <MagnifyingGlass size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes / 搜索笔记" aria-label="Search notes" />{(query || topic !== "All") && <button onClick={() => { setQuery(""); setTopic("All"); }}><X size={15} /></button>}
      </div>
      {query && <section className="notes-search-results" aria-live="polite"><span>{filtered.length} {lang === "zh" ? "篇匹配的笔记" : "matching notes"}</span>{filtered.slice(0, 3).map((note) => <button key={note.id} onClick={() => setReading(note)}><strong>{note[lang]}</strong><small>{note.date} · {note.minutes} min</small><ArrowRight size={15} /></button>)}</section>}
      {reading && <ReadingSheet note={reading} lang={lang} onClose={() => setReading(null)} />}
    </main>
  );
}

function ReadingSheet({ note, lang, onClose }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  const body = note[lang === "zh" ? "bodyZh" : "bodyEn"];
  return (
    <div className="reading-overlay" role="dialog" aria-modal="true" aria-label={note[lang]} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="reading-sheet" style={{ "--entry": note.color }} onScroll={(event) => {
        const target = event.currentTarget;
        const range = target.scrollHeight - target.clientHeight;
        setProgress(range > 0 ? target.scrollTop / range : 1);
      }}>
        <div className="reading-progress"><i style={{ transform: `scaleX(${progress})` }} /></div>
        <header><span>{note.topic} · {note.date}</span><button onClick={onClose} aria-label="Close note"><X size={22} /></button></header>
        <div className="reading-title"><small>{note.minutes} MIN READ</small><h2>{note[lang]}</h2><p>{note[lang === "zh" ? "abstractZh" : "abstractEn"]}</p></div>
        <div className="reading-body">
          {body.map((paragraph, index) => <section key={paragraph}><span>0{index + 1}</span><p>{paragraph}</p></section>)}
          <blockquote><Quotes size={28} weight="thin" /><p>{note.takeaway[lang]}</p></blockquote>
        </div>
        <footer><span>{lang === "zh" ? "未完成的想法，继续生长。" : "Unfinished ideas, still growing."}</span><button onClick={onClose}>{lang === "zh" ? "返回笔记" : "Back to notes"}<ArrowRight size={17} /></button></footer>
      </article>
    </div>
  );
}

function About({ lang, reducedMotion, theme, copyEmail, toast }) {
  const [selectedCapability, setSelectedCapability] = useState(0);
  const selected = capabilities[selectedCapability];
  return (
    <main className="screen about-screen" id="contact">
      <CapabilityField selected={selectedCapability} reducedMotion={reducedMotion} light={theme === "light"} />
      <section className="about-copy">
        <h1>{lang === "zh" ? <>我喜欢把复杂的问题，<br />变成可以看见、理解和<br />使用的系统。</> : <>I turn complex questions<br />into systems people can see,<br />understand, and use.</>}</h1>
        <p className="about-en">I turn complex questions into systems people can see, understand, and use.</p>
        <p>{lang === "zh" ? "我连接数据、技术、空间观察与人的真实经验，在不确定中寻找结构与关系。通过实验、迭代与可视化，把想法落地成能够被使用、被验证、并持续进化的系统。" : "I connect data, technology, spatial observation, and lived experience—using experiments, iteration, and visualization to make ideas testable and useful."}</p>
      </section>
      <section className="capability-field">
        {capabilities.map((item, index) => (
          <button key={item.en} aria-pressed={selectedCapability === index} onClick={() => setSelectedCapability(index)} className={`capability capability-${index + 1} ${selectedCapability === index ? "active" : ""}`} style={{ "--entry": item.color }}>
            <span /><strong>{item[lang]}</strong><small>{item.en}</small><p>{item[lang === "zh" ? "detailZh" : "detailEn"]}</p>
          </button>
        ))}
      </section>
      <aside className="capability-inspector" style={{ "--entry": selected.color }}>
        <span>0{selectedCapability + 1} · {lang === "zh" ? "方法与工具" : "Methods & tools"}</span>
        <h2>{selected[lang]}</h2>
        <div>{selected[lang === "zh" ? "methodsZh" : "methodsEn"].map((method) => <button key={method}><i />{method}</button>)}</div>
      </aside>
      <section className="about-facts">
        <div><GlobeHemisphereWest size={27} weight="thin" /><span><strong>新加坡国立大学</strong><small>景观建筑硕士 · 2024.08—2026.06</small></span></div>
        <div><TreeStructure size={27} weight="thin" /><span><strong>南京林业大学</strong><small>风景园林本科 · 2020.09—2024.06</small></span></div>
        <div><Compass size={27} weight="thin" /><span><strong>中文 / English</strong><small>双语工作与沟通</small></span></div>
        <a className="resume-button" href="/assets/Wang-Qianwen-Resume-CN.pdf" download><DownloadSimple size={20} />下载简历 <small>R</small></a>
        <button className="copy-button" onClick={copyEmail}><Copy size={20} />复制邮箱 <small>C</small></button>
      </section>
      <section className="about-principles">
        <article><Compass size={22} weight="thin" /><span><strong>{lang === "zh" ? "先理解系统" : "Understand the system"}</strong><small>{lang === "zh" ? "在设计界面之前，先找到关系、约束与反馈。" : "Find relationships, constraints, and feedback before shaping UI."}</small></span></article>
        <article><Lightning size={22} weight="thin" /><span><strong>{lang === "zh" ? "用原型制造证据" : "Prototype to create evidence"}</strong><small>{lang === "zh" ? "让想法尽快进入真实交互，而不是停留在描述里。" : "Move ideas into real interaction before they remain only descriptions."}</small></span></article>
        <article><CheckCircle size={22} weight="thin" /><span><strong>{lang === "zh" ? "把复盘带回下一轮" : "Carry learning forward"}</strong><small>{lang === "zh" ? "将结果转化为下一次可以验证的新假设。" : "Turn outcomes into the next testable hypothesis."}</small></span></article>
      </section>
      <section className="contact-field">
        <ContactOrbit reducedMotion={reducedMotion} light={theme === "light"} />
        <span>Open to thoughtful collaborations.</span><h2>Contact</h2><p>联系我们 / Let&apos;s connect</p>
        <div><a href={`mailto:${EMAIL}`}><EnvelopeSimple size={21} />Email</a><button onClick={copyEmail}><Copy size={21} />{EMAIL}</button></div>
      </section>
      {toast && <div className="inline-toast"><CheckCircle size={18} weight="fill" />邮箱已复制 / Email copied</div>}
    </main>
  );
}

function CommandPalette({ lang, close, navigate, openProject, setLang, toggleTheme, toggleMotion, toggleSound, copyEmail }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => inputRef.current?.focus(), []);
  const rows = useMemo(() => [
    { group: "NAVIGATE", label: "Journey", key: "J", action: () => navigate("journey") },
    { group: "NAVIGATE", label: "Work", key: "W", action: () => navigate("home") },
    { group: "NAVIGATE", label: "AI Capabilities", key: "I", action: () => navigate("ai") },
    { group: "NAVIGATE", label: "Notes", key: "N", action: () => navigate("notes") },
    { group: "NAVIGATE", label: "About / Contact", key: "A", action: () => navigate("about") },
    ...projects.map((project) => ({ group: "PROJECTS", label: `0${project.id}  ${project.id === 2 ? "PosturePal" : project.title.zh}`, key: String(project.id), color: project.color, action: () => openProject(project.id) })),
    { group: "ACTIONS", label: `Switch language  ${lang === "zh" ? "中文 → EN" : "EN → 中文"}`, key: "L", action: () => setLang(lang === "zh" ? "en" : "zh") },
    { group: "ACTIONS", label: "Toggle day / night", key: "D", action: toggleTheme },
    { group: "ACTIONS", label: "Reduce motion", key: "M", action: toggleMotion },
    { group: "ACTIONS", label: "Sound on / off", key: "S", action: toggleSound },
    { group: "ACTIONS", label: "Download resume", key: "R", action: () => { window.location.href = "/assets/Wang-Qianwen-Resume-CN.pdf"; } },
    { group: "ACTIONS", label: "Copy email", key: "C", action: copyEmail },
  ].filter((row) => row.label.toLowerCase().includes(query.toLowerCase())), [query, lang, navigate, openProject, setLang, toggleTheme, toggleMotion, toggleSound, copyEmail]);
  const [selected, setSelected] = useState(0);
  const groups = ["NAVIGATE", "PROJECTS", "ACTIONS"];
  const execute = (row) => { row.action(); close(); };
  return (
    <div className="command-overlay" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="command-palette">
        <div className="command-search"><MagnifyingGlass size={20} /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={(event) => {
          if (event.key === "ArrowDown") { event.preventDefault(); setSelected((value) => Math.min(rows.length - 1, value + 1)); }
          if (event.key === "ArrowUp") { event.preventDefault(); setSelected((value) => Math.max(0, value - 1)); }
          if (event.key === "Enter" && rows[selected]) execute(rows[selected]);
          if (event.key === "Escape") close();
        }} placeholder="跳转、搜索或执行命令… / Jump, search, or run a command" /><span><Command size={14} />K</span></div>
        <div className="command-body">
          <div className="command-list">
            {groups.map((group) => {
              const groupRows = rows.filter((row) => row.group === group);
              if (!groupRows.length) return null;
              return <section key={group}><h3>{group}</h3>{groupRows.map((row) => {
                const index = rows.indexOf(row);
                return <button key={row.label} className={selected === index ? "active" : ""} onMouseEnter={() => setSelected(index)} onClick={() => execute(row)}>{row.color ? <i style={{ background: row.color }} /> : <span className="command-circle" />}<strong>{row.label}</strong><kbd>{row.key}</kbd></button>;
              })}</section>;
            })}
          </div>
          <aside className="command-preview">
            <span className="preview-number">{rows[selected]?.group === "PROJECTS" ? rows[selected]?.label.slice(0, 2) : "⌘"}</span>
            <h3>{rows[selected]?.label || "No results"}</h3>
            <div className="mini-particle-mark"><Scan size={60} weight="thin" /></div>
            <button disabled={!rows[selected]} onClick={() => rows[selected] && execute(rows[selected])}>Open <ArrowRight size={17} /></button>
          </aside>
        </div>
        <footer><span>↑ ↓ navigate</span><span>Enter open</span><span>Esc close</span></footer>
      </div>
    </div>
  );
}

function MobileBottomNav({ view, navigate, openCommand }) {
  const items = [
    ["journey", Compass, "Journey"],
    ["home", Briefcase, "Work"],
    ["ai", Sparkle, "AI"],
  ];
  return <nav className="mobile-bottom-nav">{items.map(([target, Icon, label]) => <button key={target} className={view === target ? "active" : ""} onClick={() => navigate(target)}><Icon size={24} /><span>{label}</span></button>)}<button onClick={openCommand}><SquaresFour size={24} /><span>Menu</span></button></nav>;
}

export function App() {
  const mobile = useViewport();
  const [view, setView] = useState("home");
  const [activeProject, setActiveProject] = useState(2);
  const [lang, setLang] = useState("zh");
  const [theme, setTheme] = useState("dark");
  const [sound, setSound] = useState(false);
  const audioRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const navigate = useCallback((target, anchor) => {
    setView(target);
    setCommandOpen(false);
    setMenuOpen(false);
    window.location.hash = target === "home" ? "" : target;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    if (anchor) window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), 80);
  }, [reducedMotion]);
  const openProject = useCallback((id) => {
    setActiveProject(id);
    setView("project");
    setCommandOpen(false);
    window.location.hash = `work-${id}`;
    window.scrollTo({ top: 0 });
  }, []);
  const copyEmail = useCallback(async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* clipboard may require HTTPS */ }
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("work-")) { setActiveProject(Number(hash.split("-")[1]) || 1); setView("project"); }
      else if (["journey", "ai", "notes", "about"].includes(hash)) setView(hash);
      else setView("home");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.28;
    if (sound) audio.play().catch(() => setSound(false));
    else audio.pause();
  }, [sound]);

  useEffect(() => {
    const handler = (event) => {
      const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen((value) => !value); return; }
      if (event.key === "Escape") { setCommandOpen(false); setMenuOpen(false); return; }
      if (typing || commandOpen) return;
      if (["1", "2", "3"].includes(event.key)) { const id = Number(event.key); setActiveProject(id); if (view === "project") openProject(id); }
      if (event.key.toLowerCase() === "l") setLang((value) => value === "zh" ? "en" : "zh");
      if (event.key.toLowerCase() === "d") setTheme((value) => value === "dark" ? "light" : "dark");
      if (event.key.toLowerCase() === "m") setReducedMotion((value) => !value);
      if (event.key.toLowerCase() === "s") setSound((value) => !value);
      if (event.key.toLowerCase() === "c" && view === "about") copyEmail();
      if (event.key.toLowerCase() === "r" && view === "about") window.location.href = "/assets/Wang-Qianwen-Resume-CN.pdf";
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandOpen, copyEmail, openProject, view]);

  const controls = {
    sound,
    setSound,
    theme,
    setTheme,
    reducedMotion,
    setReducedMotion,
    openCommand: () => setCommandOpen(true),
  };

  return (
    <div className={`app theme-${theme} ${reducedMotion ? "reduced-motion" : ""}`}>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/time-machine.mp3`} loop preload="none" />
      <Header view={view} navigate={navigate} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} openCommand={() => setCommandOpen(true)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {view === "home" && <Home lang={lang} activeProject={activeProject} setActiveProject={setActiveProject} openProject={openProject} navigate={navigate} controls={controls} mobile={mobile} />}
      {view === "project" && <CaseStudy project={projects[activeProject - 1]} lang={lang} setProject={openProject} navigate={navigate} reducedMotion={reducedMotion} theme={theme} />}
      {view === "journey" && <Journey lang={lang} reducedMotion={reducedMotion} theme={theme} />}
      {view === "ai" && <AICapabilities lang={lang} reducedMotion={reducedMotion} theme={theme} openProject={openProject} />}
      {view === "notes" && <Notes lang={lang} reducedMotion={reducedMotion} theme={theme} />}
      {view === "about" && <About lang={lang} reducedMotion={reducedMotion} theme={theme} copyEmail={copyEmail} toast={toast} />}
      {commandOpen && <CommandPalette lang={lang} close={() => setCommandOpen(false)} navigate={navigate} openProject={openProject} setLang={setLang} toggleTheme={() => setTheme((value) => value === "dark" ? "light" : "dark")} toggleMotion={() => setReducedMotion((value) => !value)} toggleSound={() => setSound((value) => !value)} copyEmail={copyEmail} />}
      {mobile && <MobileBottomNav view={view} navigate={navigate} openCommand={() => setCommandOpen(true)} />}
      {toast && view !== "about" && <div className="global-toast"><CheckCircle size={18} weight="fill" />邮箱已复制 / Email copied</div>}
    </div>
  );
}
