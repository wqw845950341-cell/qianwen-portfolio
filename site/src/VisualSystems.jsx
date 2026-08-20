import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowsLeftRight,
  Bell,
  Camera,
  ChartBar,
  ChartLine,
  CheckCircle,
  Clock,
  Cube,
  CursorClick,
  Headset,
  MapPin,
  Scan,
  ShieldCheck,
  Sparkle,
  Storefront,
  Timer,
  TrendUp,
  UserCircle,
  Warning,
} from "@phosphor-icons/react";

const TAU = Math.PI * 2;

function fitCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }
  const context = canvas.getContext("2d");
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { context, width, height };
}

function useAnimatedCanvas(draw, reducedMotion) {
  const ref = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    let frame = 0;
    let animation = 0;
    const render = (time = 0) => {
      const size = fitCanvas(canvas);
      drawRef.current({ ...size, time, frame });
      frame += 1;
      if (!reducedMotion) animation = requestAnimationFrame(render);
    };
    render(0);
    const resize = () => render(performance.now());
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);
  useEffect(() => {
    if (!reducedMotion || !ref.current) return;
    const size = fitCanvas(ref.current);
    drawRef.current({ ...size, time: 0, frame: 0 });
  }, [draw, reducedMotion]);
  return ref;
}

export function CommerceNetwork({ lang, selectedStage }) {
  const roles = [
    { icon: Storefront, zh: "店铺运营", en: "Operator" },
    { icon: ChartBar, zh: "数据分析", en: "Analyst" },
    { icon: Headset, zh: "客服支持", en: "Customer support" },
    { icon: Cube, zh: "仓储供应链", en: "Supply chain" },
    { icon: UserCircle, zh: "管理决策", en: "Manager" },
  ];
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const core = { x: width * 0.5, y: height * 0.64 };
    const roleY = height * 0.22;
    const palette = ["#776bff", "#8b7dff", "#6e8cff", "#57b6ff", "#42d4cf"];
    context.globalCompositeOperation = "lighter";
    roles.forEach((_, index) => {
      const x = width * (0.12 + index * 0.19);
      const color = palette[index];
      context.strokeStyle = `${color}70`;
      context.lineWidth = index === selectedStage % roles.length ? 1.4 : 0.7;
      context.setLineDash([2, 6]);
      context.beginPath();
      context.moveTo(x, roleY + 25);
      context.bezierCurveTo(x, height * 0.48, core.x + (x - core.x) * 0.2, height * 0.51, core.x, core.y);
      context.stroke();
      context.setLineDash([]);
      for (let dot = 0; dot < 14; dot += 1) {
        const progress = (dot / 14 + time * 0.000045 * (index + 1)) % 1;
        const one = 1 - progress;
        const cx = one ** 3 * x + 3 * one ** 2 * progress * x + 3 * one * progress ** 2 * (core.x + (x - core.x) * 0.2) + progress ** 3 * core.x;
        const cy = one ** 3 * (roleY + 25) + 3 * one ** 2 * progress * height * 0.48 + 3 * one * progress ** 2 * height * 0.51 + progress ** 3 * core.y;
        context.fillStyle = color;
        context.globalAlpha = 0.2 + progress * 0.7;
        context.fillRect(cx, cy, dot % 4 === 0 ? 2 : 1, dot % 4 === 0 ? 2 : 1);
      }
    });
    context.globalAlpha = 1;
    const glow = context.createRadialGradient(core.x, core.y, 0, core.x, core.y, width * 0.18);
    glow.addColorStop(0, "rgba(119,107,255,.35)");
    glow.addColorStop(1, "rgba(119,107,255,0)");
    context.fillStyle = glow;
    context.beginPath();
    context.arc(core.x, core.y, width * 0.18, 0, TAU);
    context.fill();
    context.globalCompositeOperation = "source-over";
  }, false);
  return (
    <div className="commerce-network">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="commerce-roles">
        {roles.map(({ icon: Icon, zh, en }, index) => (
          <div key={en} className={index === selectedStage % roles.length ? "active" : ""}>
            <span><Icon size={24} weight="thin" /></span><strong>{lang === "zh" ? zh : en}</strong><small>{en}</small>
          </div>
        ))}
      </div>
      <div className="commerce-core"><span><Sparkle size={24} weight="fill" /></span><strong>AI 引擎</strong><small>Evidence · Confidence · Action</small></div>
      <div className="commerce-proof"><CheckCircle size={15} weight="fill" /><span>{lang === "zh" ? "保留人工确认节点，所有建议可追溯" : "Human review stays visible; every recommendation is traceable"}</span></div>
    </div>
  );
}

const POSTURE_PHASES = [
  { icon: Camera, zh: "视角校准", en: "Calibration", subZh: "光线与角度自适应", subEn: "Adaptive light and angle" },
  { icon: Scan, zh: "姿态识别", en: "Detection", subZh: "关键点检测与跟踪", subEn: "Landmark tracking" },
  { icon: ChartLine, zh: "持续性判断", en: "Persistence", subZh: "姿势稳定性评估", subEn: "Stability evaluation" },
  { icon: Bell, zh: "分级提醒", en: "Intervention", subZh: "低干扰分级提示", subEn: "Low-friction nudges" },
  { icon: Timer, zh: "专注结算", en: "Focus review", subZh: "专注时长与质量统计", subEn: "Focus quality review" },
  { icon: TrendUp, zh: "成长反馈", en: "Growth", subZh: "趋势洞察与激励", subEn: "Trends and rewards" },
];

const POSE_VARIANTS = [
  { head: [0.42, 0.2], neck: [0.43, 0.31], shoulder: [0.44, 0.36], backShoulder: [0.36, 0.36], elbow: [0.54, 0.45], wrist: [0.67, 0.45], hip: [0.44, 0.59], knee: [0.62, 0.68], ankle: [0.57, 0.89], foot: [0.69, 0.91] },
  { head: [0.44, 0.21], neck: [0.44, 0.32], shoulder: [0.45, 0.37], backShoulder: [0.37, 0.37], elbow: [0.55, 0.46], wrist: [0.68, 0.46], hip: [0.45, 0.59], knee: [0.63, 0.68], ankle: [0.58, 0.89], foot: [0.7, 0.91] },
  { head: [0.48, 0.25], neck: [0.46, 0.34], shoulder: [0.46, 0.39], backShoulder: [0.38, 0.38], elbow: [0.57, 0.47], wrist: [0.69, 0.46], hip: [0.45, 0.6], knee: [0.63, 0.69], ankle: [0.58, 0.89], foot: [0.7, 0.91] },
  { head: [0.45, 0.22], neck: [0.44, 0.32], shoulder: [0.45, 0.37], backShoulder: [0.37, 0.37], elbow: [0.55, 0.45], wrist: [0.68, 0.45], hip: [0.44, 0.59], knee: [0.62, 0.68], ankle: [0.57, 0.89], foot: [0.69, 0.91] },
  { head: [0.42, 0.2], neck: [0.43, 0.31], shoulder: [0.44, 0.36], backShoulder: [0.36, 0.36], elbow: [0.54, 0.45], wrist: [0.67, 0.45], hip: [0.44, 0.59], knee: [0.62, 0.68], ankle: [0.57, 0.89], foot: [0.69, 0.91] },
  { head: [0.41, 0.19], neck: [0.42, 0.3], shoulder: [0.43, 0.35], backShoulder: [0.35, 0.35], elbow: [0.53, 0.44], wrist: [0.66, 0.44], hip: [0.43, 0.58], knee: [0.61, 0.67], ankle: [0.56, 0.88], foot: [0.68, 0.9] },
];

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ result >>> 15, result | 1);
    result ^= result + Math.imul(result ^ result >>> 7, result | 61);
    return ((result ^ result >>> 14) >>> 0) / 4294967296;
  };
}

function addCapsule(targets, random, start, end, radius, count) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  for (let index = 0; index < count; index += 1) {
    const along = random();
    const spread = (random() - 0.5) * 2 * radius * Math.sqrt(random());
    targets.push({ x: start[0] + dx * along + nx * spread, y: start[1] + dy * along + ny * spread, size: random() > 0.91 ? 1.9 : 0.85 + random() * 0.8, phase: random() * TAU });
  }
}

function createPoseTargets(stage) {
  const pose = POSE_VARIANTS[stage % POSE_VARIANTS.length];
  const random = seededRandom(8241);
  const targets = [];
  for (let index = 0; index < 420; index += 1) {
    const angle = random() * TAU;
    const radius = Math.sqrt(random());
    targets.push({ x: pose.head[0] + Math.cos(angle) * 0.058 * radius, y: pose.head[1] + Math.sin(angle) * 0.075 * radius, size: random() > 0.92 ? 2 : 0.8 + random() * 0.8, phase: random() * TAU });
  }
  addCapsule(targets, random, pose.neck, pose.shoulder, 0.035, 180);
  addCapsule(targets, random, pose.backShoulder, pose.shoulder, 0.05, 260);
  addCapsule(targets, random, pose.backShoulder, pose.hip, 0.065, 690);
  addCapsule(targets, random, pose.shoulder, pose.elbow, 0.032, 280);
  addCapsule(targets, random, pose.elbow, pose.wrist, 0.027, 250);
  addCapsule(targets, random, pose.hip, pose.knee, 0.06, 520);
  addCapsule(targets, random, pose.knee, pose.ankle, 0.043, 460);
  addCapsule(targets, random, pose.ankle, pose.foot, 0.025, 210);
  return { targets, pose };
}

function PoseParticleField({ selectedStage, reducedMotion, onSelectStage, lang }) {
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const bodyParticles = useRef([]);
  const flowParticles = useRef([]);
  const lastSize = useRef("");
  const targetModel = useMemo(() => createPoseTargets(selectedStage), [selectedStage]);
  const targetRef = useRef(targetModel);
  targetRef.current = targetModel;

  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const sizeKey = `${Math.round(width)}-${Math.round(height)}`;
    const model = targetRef.current;
    if (lastSize.current !== sizeKey || bodyParticles.current.length !== model.targets.length) {
      const random = seededRandom(2907);
      bodyParticles.current = model.targets.map((target) => ({
        x: width * (target.x + (random() - 0.5) * 0.16),
        y: height * (0.25 + target.y * 0.72 + (random() - 0.5) * 0.12),
        vx: 0,
        vy: 0,
      }));
      flowParticles.current = Array.from({ length: 4200 }, () => {
        const phase = random() * TAU;
        const radius = Math.sqrt(random()) * Math.min(width, height) * 0.53;
        return {
          x: width * 0.44 + Math.cos(phase + radius * 0.005) * radius * 1.08,
          y: height * 0.45 + Math.sin(phase) * radius * 0.86,
          speed: 0.16 + random() * 0.48,
          phase,
          size: random() > 0.94 ? 2 : 1.1,
        };
      });
      lastSize.current = sizeKey;
    }

    const pulse = reducedMotion ? 0 : Math.sin(time * 0.00135) * 1.8;
    const cursor = pointer.current;
    context.globalCompositeOperation = "lighter";

    const glow = context.createRadialGradient(width * 0.45, height * 0.46, 0, width * 0.45, height * 0.46, width * 0.44);
    glow.addColorStop(0, "rgba(231,163,76,.115)");
    glow.addColorStop(0.46, "rgba(231,163,76,.035)");
    glow.addColorStop(1, "rgba(231,163,76,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    flowParticles.current.forEach((particle, index) => {
      const dx = particle.x - width * 0.44;
      const dy = particle.y - height * 0.45;
      const radius = Math.hypot(dx, dy) + 1;
      const curl = Math.atan2(dy, dx) + Math.PI / 2 + Math.sin(time * 0.00032 + particle.phase) * 0.22;
      const pull = Math.min(0.28, 110 / radius) * particle.speed;
      particle.x += Math.cos(curl) * particle.speed - dx / radius * pull;
      particle.y += Math.sin(curl) * particle.speed * 0.72 - dy / radius * pull * 0.72;
      if (cursor.active) {
        const mx = particle.x - cursor.x;
        const my = particle.y - cursor.y;
        const md = Math.hypot(mx, my) || 1;
        if (md < 92) {
          const force = (1 - md / 92) * 2.8;
          particle.x += mx / md * force;
          particle.y += my / md * force;
        }
      }
      if (particle.x < -20 || particle.x > width + 20 || particle.y < -20 || particle.y > height + 20) {
        const resetRadius = ((index * 47.17) % 1) * Math.min(width, height) * 0.49;
        particle.x = width * 0.44 + Math.cos(particle.phase + time * 0.0001) * resetRadius * 1.08;
        particle.y = height * 0.45 + Math.sin(particle.phase + time * 0.0001) * resetRadius * 0.86;
      }
      context.globalAlpha = 0.35 + (index % 29 === 0 ? 0.4 : 0.2);
      context.fillStyle = index % 7 === 0 ? "#ffd49b" : "#e7a34c";
      context.fillRect(particle.x, particle.y, particle.size, particle.size);
    });

    bodyParticles.current.forEach((particle, index) => {
      const target = model.targets[index];
      const breathing = Math.sin(time * 0.0016 + target.phase) * (reducedMotion ? 0 : 1.2);
      const tx = target.x * width + Math.sin(time * 0.00045 + target.phase) * (reducedMotion ? 0 : 0.8);
      const ty = (0.25 + target.y * 0.72) * height + breathing;
      particle.vx += (tx - particle.x) * 0.026;
      particle.vy += (ty - particle.y) * 0.026;
      if (cursor.active) {
        const dx = particle.x - cursor.x;
        const dy = particle.y - cursor.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < 108) {
          const force = (1 - distance / 108) * 1.85;
          particle.vx += dx / distance * force;
          particle.vy += dy / distance * force;
        }
      }
      particle.vx *= 0.86;
      particle.vy *= 0.86;
      particle.x += particle.vx;
      particle.y += particle.vy;
      context.globalAlpha = 0.16 + (index % 17 === 0 ? 0.62 : 0.16);
      context.fillStyle = index % 23 === 0 ? "#ffe3b7" : "#e8a54e";
      context.beginPath();
      context.arc(particle.x, particle.y, target.size, 0, TAU);
      context.fill();
    });

    const pose = model.pose;
    const points = Object.fromEntries(Object.entries(pose).map(([key, [x, y]]) => [key, [x * width, (0.25 + y * 0.72) * height + pulse * 0.18]]));
    const segments = [["head", "neck"], ["neck", "shoulder"], ["neck", "backShoulder"], ["backShoulder", "hip"], ["shoulder", "elbow"], ["elbow", "wrist"], ["hip", "knee"], ["knee", "ankle"], ["ankle", "foot"]];
    context.globalAlpha = 0.74;
    context.strokeStyle = "#f3b760";
    context.lineWidth = 1.45;
    context.beginPath();
    segments.forEach(([from, to]) => {
      context.moveTo(points[from][0], points[from][1]);
      context.lineTo(points[to][0], points[to][1]);
    });
    context.stroke();
    Object.values(points).forEach(([x, y], index) => {
      context.fillStyle = index % 3 === 0 ? "#fff0d1" : "#f1ab4c";
      context.shadowColor = "#e7a34c";
      context.shadowBlur = 13;
      context.beginPath();
      context.arc(x, y, index % 3 === 0 ? 5.2 : 3.7, 0, TAU);
      context.fill();
    });
    context.shadowBlur = 0;
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
  }, reducedMotion);

  const updatePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
  };

  return (
    <div className="pose-particle-field">
      <canvas
        ref={canvasRef}
        role="button"
        tabIndex="0"
        aria-label={lang === "zh" ? "可交互的人体姿态粒子场，移动鼠标扰动粒子，点击切换姿态" : "Interactive posture particle field. Move to disturb particles and click to change pose."}
        onPointerMove={updatePointer}
        onPointerLeave={() => { pointer.current.active = false; }}
        onPointerDown={updatePointer}
        onClick={() => onSelectStage?.((selectedStage + 1) % POSTURE_PHASES.length)}
        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelectStage?.((selectedStage + 1) % POSTURE_PHASES.length); }}
      />
      <div className="pose-field-hint"><CursorClick size={15} />{lang === "zh" ? "移动鼠标扰动粒子 · 点击切换姿态" : "Move to disturb · click to change pose"}</div>
    </div>
  );
}

export function PostureProduct({ lang, selectedStage = 0, reducedMotion = false, onSelectStage }) {
  const current = POSTURE_PHASES[selectedStage % POSTURE_PHASES.length];
  return (
    <div className="posture-product">
      <PoseParticleField selectedStage={selectedStage} reducedMotion={reducedMotion} onSelectStage={onSelectStage} lang={lang} />

      <section className="posture-app-window" aria-label="PosturePal live session preview">
        <header><i /><strong>PosturePal</strong><small>v1.0.0</small><span>×</span></header>
        <div className="posture-window-body">
          <div className="posture-login-panel"><strong>PosturePal</strong><small>Sit straight, grow together!</small><button type="button">LOGIN WITH GOOGLE</button></div>
          <div className="posture-live-panel">
            <div className="posture-live-head"><span>{lang === "zh" ? "实时监测" : "Live monitor"}</span><small>● 1:1</small></div>
            <div className="posture-mini-monitor"><span /><i /><b /></div>
            <footer><span>PS&nbsp; 32.1</span><span>FPS&nbsp; 28</span></footer>
          </div>
          <div className="posture-status-panel">
            <span>{lang === "zh" ? "姿态状态" : "Posture"}</span>
            <strong><CheckCircle size={16} weight="fill" />{lang === "zh" ? "姿态良好" : "Aligned"}</strong>
            <small>{lang === "zh" ? "专注时长" : "Focus time"}</small><b>32<em> min</em></b>
            <div><span><Timer size={14} />2 h 14 min</span><span><Bell size={14} />2 {lang === "zh" ? "次" : "nudges"}</span><span><TrendUp size={14} />7 {lang === "zh" ? "天" : "days"}</span></div>
          </div>
        </div>
        <footer className="posture-privacy"><ShieldCheck size={14} />{lang === "zh" ? "端侧实时推理 · 原始画面默认不上传" : "On-device inference · raw video stays local"}</footer>
      </section>

      <section className="posture-loop" aria-label="PosturePal product loop">
        <div className="posture-loop-center"><strong>{lang === "zh" ? "产品闭环" : "Product loop"}</strong><small>{lang === "zh" ? "轻干预 · 强反馈 · 可持续" : "Light touch · clear feedback"}</small></div>
        {POSTURE_PHASES.map(({ icon: Icon, zh, en, subZh, subEn }, index) => (
          <button key={en} className={selectedStage === index ? "active" : ""} aria-pressed={selectedStage === index} onClick={() => onSelectStage?.(index)}>
            <span><Icon size={22} weight="thin" /></span><strong>{lang === "zh" ? zh : en}</strong><small>{lang === "zh" ? subZh : subEn}</small>
          </button>
        ))}
      </section>

      <aside className="posture-rule-card">
        <strong>{lang === "zh" ? "分级提醒" : "Graded reminders"}<small>{lang === "zh" ? "规则" : "Rules"}</small></strong>
        <p>{lang === "zh" ? "基于姿势偏离角度与持续时长，分为轻柔提醒与强提醒两级，逐步介入，避免打断专注。" : "Escalate by deviation angle and duration, preserving focus before stronger intervention."}</p>
      </aside>

      <section className="posture-validation">
        <header><strong>{lang === "zh" ? "V1 指标" : "V1 metrics"}</strong><span>{lang === "zh" ? "（验证中）" : "(validating)"}</span><small>Validation Metrics</small></header>
        <div>{[[Scan, "不良姿态识别率", "Recognition"], [Bell, "低干扰提醒率", "Low-friction"], [Clock, "连续使用天数", "Retention"]].map(([Icon, zh, en]) => <span key={en}><Icon size={21} weight="thin" /><strong>{lang === "zh" ? zh : en}</strong><small>— —</small></span>)}</div>
        <p>{lang === "zh" ? "以上为 V1 阶段内部验证指标，数据随版本迭代持续更新。" : "V1 validation metrics will be updated as the prototype evolves."}</p>
      </section>

      <div className="posture-live-signal"><i /><span><strong>{current[lang === "zh" ? "zh" : "en"]}</strong><small>{current[lang === "zh" ? "subZh" : "subEn"]}</small></span></div>
    </div>
  );
}

function cubicPoint(start, controlA, controlB, end, progress) {
  const remaining = 1 - progress;
  return {
    x: remaining ** 3 * start.x + 3 * remaining ** 2 * progress * controlA.x + 3 * remaining * progress ** 2 * controlB.x + progress ** 3 * end.x,
    y: remaining ** 3 * start.y + 3 * remaining ** 2 * progress * controlA.y + 3 * remaining * progress ** 2 * controlB.y + progress ** 3 * end.y,
  };
}

function repelPoint(point, cursor) {
  if (!cursor.active) return point;
  const dx = point.x - cursor.x;
  const dy = point.y - cursor.y;
  const distance = Math.hypot(dx, dy) || 1;
  if (distance > 118) return point;
  const force = (1 - distance / 118) * 27;
  return { x: point.x + dx / distance * force, y: point.y + dy / distance * force };
}

function StreetFlowField({ reducedMotion, strategy, selectedStage }) {
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const cursor = pointer.current;
    const motionTime = reducedMotion ? 0 : time;
    const coreX = width * (0.455 + selectedStage * 0.0025);
    const coreY = height * (0.515 + (selectedStage - 2) * 0.006);
    const intensity = strategy ? 1 : 0.62;
    const palette = strategy ? ["#8affdd", "#47e8bd", "#1fc79f", "#72d977"] : ["#96b9ae", "#5c9484", "#467a6c", "#769882"];

    context.save();
    context.lineWidth = 0.45;
    for (let x = 0; x < width; x += 34) {
      context.strokeStyle = `rgba(71,232,189,${x % 68 === 0 ? 0.032 : 0.017})`;
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
    }
    for (let y = 0; y < height; y += 34) {
      context.strokeStyle = `rgba(71,232,189,${y % 68 === 0 ? 0.028 : 0.014})`;
      context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
    }
    const scanX = (motionTime * 0.045) % Math.max(width, 1);
    const scan = context.createLinearGradient(scanX - 42, 0, scanX + 42, 0);
    scan.addColorStop(0, "rgba(64,213,165,0)");
    scan.addColorStop(.5, `rgba(64,213,165,${0.055 * intensity})`);
    scan.addColorStop(1, "rgba(64,213,165,0)");
    context.fillStyle = scan;
    context.fillRect(scanX - 42, 0, 84, height);
    context.restore();

    context.globalCompositeOperation = "lighter";
    const streamCount = 38;
    for (let stream = 0; stream < streamCount; stream += 1) {
      const upper = stream < streamCount / 2;
      const lane = upper ? stream : stream - streamCount / 2;
      const laneRatio = lane / (streamCount / 2 - 1);
      const wave = Math.sin(motionTime * 0.00031 + stream * 0.73) * height * 0.012;
      const start = {
        x: width * (-0.08 + (stream % 4) * 0.018),
        y: upper ? height * (0.035 + laneRatio * 0.34) : height * (0.985 - laneRatio * 0.37),
      };
      const controlA = {
        x: width * (0.13 + (stream % 5) * 0.013),
        y: upper ? height * (0.005 + laneRatio * 0.18) + wave : height * (0.98 - laneRatio * 0.2) + wave,
      };
      const controlB = {
        x: width * (0.28 + (stream % 3) * 0.012),
        y: upper ? height * (0.23 + laneRatio * 0.24) - wave : height * (0.75 - laneRatio * 0.22) - wave,
      };
      const end = { x: coreX, y: coreY + (laneRatio - 0.5) * height * 0.055 };
      const color = palette[stream % palette.length];

      context.beginPath();
      for (let sample = 0; sample <= 74; sample += 1) {
        const progress = sample / 74;
        const point = repelPoint(cubicPoint(start, controlA, controlB, end, progress), cursor);
        if (sample === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.globalAlpha = (0.055 + (stream % 6) * 0.008) * intensity;
      context.strokeStyle = color;
      context.lineWidth = stream % 7 === 0 ? 0.95 : 0.48;
      context.stroke();

      for (let packet = 0; packet < 7; packet += 1) {
        const progress = (packet / 7 + motionTime * (0.000045 + (stream % 5) * 0.000004) + stream * 0.017) % 1;
        const point = repelPoint(cubicPoint(start, controlA, controlB, end, progress), cursor);
        const packetSize = packet % 3 === 0 ? 2.15 : 1.05;
        context.globalAlpha = (0.24 + progress * 0.7) * intensity;
        context.fillStyle = color;
        context.fillRect(point.x, point.y, packetSize, packetSize);
      }
    }

    for (let mote = 0; mote < 520; mote += 1) {
      const seed = (mote * 0.61803398875) % 1;
      const angle = seed * TAU * 3.4 + motionTime * 0.000035 * (mote % 5 + 1);
      const radius = width * (0.04 + ((mote * 37) % 100) / 100 * 0.36);
      const point = repelPoint({
        x: coreX + Math.cos(angle) * radius * 1.24 - radius * 0.27,
        y: coreY + Math.sin(angle) * radius * 0.53,
      }, cursor);
      context.globalAlpha = (0.05 + (mote % 13 === 0 ? 0.34 : 0.09)) * intensity;
      context.fillStyle = palette[mote % palette.length];
      context.fillRect(point.x, point.y, mote % 13 === 0 ? 1.8 : 0.8, mote % 13 === 0 ? 1.8 : 0.8);
    }

    const pulse = 0.75 + Math.sin(motionTime * 0.003) * 0.18;
    const halo = context.createRadialGradient(coreX, coreY, 0, coreX, coreY, width * 0.16);
    halo.addColorStop(0, `rgba(94,255,208,${0.42 * intensity * pulse})`);
    halo.addColorStop(0.18, `rgba(64,213,165,${0.16 * intensity})`);
    halo.addColorStop(1, "rgba(64,213,165,0)");
    context.globalAlpha = 1;
    context.fillStyle = halo;
    context.beginPath(); context.arc(coreX, coreY, width * 0.16, 0, TAU); context.fill();
    context.strokeStyle = `rgba(126,255,217,${0.33 * intensity})`;
    context.lineWidth = 0.8;
    context.beginPath(); context.arc(coreX, coreY, 9 + pulse * 4, 0, TAU); context.stroke();
    context.beginPath(); context.arc(coreX, coreY, 22 + pulse * 9, 0, TAU); context.stroke();
    context.fillStyle = "#a4ffe4";
    context.fillRect(coreX - 1.5, coreY - 1.5, 3, 3);
    context.globalCompositeOperation = "source-over";
  }, reducedMotion);

  return (
    <canvas
      className="street-flow-canvas"
      ref={canvasRef}
      aria-label="Interactive emerald decision flow field"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      }}
      onPointerLeave={() => { pointer.current.active = false; }}
    />
  );
}

function StreetDigitalMap({ reducedMotion, strategy }) {
  const pointer = useRef({ x: 0, y: 0, active: false });
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#02090a";
    context.fillRect(0, 0, width, height);
    const motionTime = reducedMotion ? 0 : time;
    const intensity = strategy ? 1 : 0.52;
    const cursor = pointer.current;
    const parallaxX = cursor.active ? cursor.x * width * -0.035 : 0;
    const parallaxY = cursor.active ? cursor.y * height * -0.026 : 0;
    const random = seededRandom(8915);

    // A live vector map, rather than a screenshot: roads, river and 8,915
    // representative street datapoints are recomposed every frame.
    context.save();
    context.translate(parallaxX, parallaxY);
    context.globalCompositeOperation = "lighter";
    for (let road = 0; road < 42; road += 1) {
      const startY = random() * height;
      const bend = (random() - .5) * height * .34;
      context.strokeStyle = `rgba(48,113,110,${0.10 + (road % 5) * .018})`;
      context.lineWidth = road % 8 === 0 ? 1.45 : .48;
      context.beginPath();
      context.moveTo(-width * .08, startY);
      context.bezierCurveTo(width * .26, startY + bend, width * .58, startY - bend * .75, width * 1.08, startY + bend * .23);
      context.stroke();
    }
    for (let road = 0; road < 28; road += 1) {
      const startX = random() * width;
      context.strokeStyle = `rgba(35,100,98,${.07 + (road % 4) * .02})`;
      context.lineWidth = road % 7 === 0 ? 1.1 : .4;
      context.beginPath();
      context.moveTo(startX, -height * .06);
      context.bezierCurveTo(startX + width * (.08 + random() * .12), height * .30, startX - width * (.15 + random() * .12), height * .63, startX + width * (.02 + random() * .16), height * 1.06);
      context.stroke();
    }

    // Fine-grained urban fabric fills the whole map: blocks align to several
    // street directions and drift subtly so the surface reads as a living city.
    for (let parcel = 0; parcel < 1450; parcel += 1) {
      const gx = random();
      const gy = random();
      const riverX = .82 + Math.sin(gy * 9.2) * .055;
      if (Math.abs(gx - riverX) < .035) continue;
      const laneWave = Math.sin(gx * 34 + gy * 13) * .006;
      const px = gx * width + laneWave * width + Math.sin(motionTime * .00022 + parcel * .31) * .55;
      const py = gy * height + Math.cos(motionTime * .00018 + parcel * .19) * .45;
      const district = Math.floor(gx * 6) + Math.floor(gy * 8);
      context.globalAlpha = strategy ? .09 + (parcel % 13 === 0 ? .16 : 0) : .055;
      context.fillStyle = district % 5 === 0 ? "#50d2a7" : district % 3 === 0 ? "#2f8f7d" : "#1d615e";
      const parcelSize = parcel % 17 === 0 ? 1.45 : .65;
      context.fillRect(px, py, parcelSize, parcelSize);
    }

    context.strokeStyle = `rgba(57,161,151,${.25 * intensity})`;
    context.lineWidth = Math.max(4, width * .026);
    context.beginPath();
    context.moveTo(width * .86, -height * .08);
    context.bezierCurveTo(width * .69, height * .18, width * .98, height * .40, width * .79, height * .64);
    context.bezierCurveTo(width * .62, height * .82, width * .92, height * .91, width * .76, height * 1.08);
    context.stroke();

    for (let point = 0; point < 1900; point += 1) {
      const angle = random() * TAU;
      const branch = point % 3;
      const yBase = branch === 0 ? .30 : branch === 1 ? .52 : .72;
      const xBase = branch === 0 ? .64 : branch === 1 ? .60 : .69;
      const spread = .08 + random() * .18;
      const x = xBase + Math.cos(angle) * spread * (branch === 2 ? 1.05 : .75) + (random() - .5) * .13;
      const y = yBase + Math.sin(angle) * spread * (branch === 0 ? .55 : .82) + (random() - .5) * .10;
      if (Math.abs(x - .66) + Math.abs(y - .54) * .78 > .36 + (branch === 2 ? .08 : 0)) continue;
      const px = x * width + Math.sin(motionTime * .00035 + point) * (strategy ? 1.6 : .45);
      const py = y * height + Math.cos(motionTime * .00029 + point * .7) * (strategy ? 1.3 : .35);
      const dx = px - (cursor.x + .5) * width;
      const dy = py - (cursor.y + .5) * height;
      const near = cursor.active ? Math.max(0, 1 - Math.hypot(dx, dy) / 110) : 0;
      const size = point % 19 === 0 ? 2.1 + near * 1.4 : point % 5 === 0 ? 1.2 : .66;
      context.globalAlpha = (strategy ? .22 : .11) + near * .36;
      context.fillStyle = point % 17 === 0 ? "#ef4d75" : point % 7 === 0 ? "#d7d14c" : point % 3 === 0 ? "#55d89b" : "#169c79";
      context.fillRect(px + dx * near * .05, py + dy * near * .05, size, size);
    }
    context.restore();

    const scanY = (motionTime * 0.032) % Math.max(height, 1);
    const scan = context.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    scan.addColorStop(0, "rgba(64,213,165,0)");
    scan.addColorStop(.5, `rgba(64,213,165,${0.1 * intensity})`);
    scan.addColorStop(1, "rgba(64,213,165,0)");
    context.fillStyle = scan;
    context.fillRect(0, scanY - 40, width, 80);

    const hotspots = [[.55,.34],[.64,.46],[.62,.58],[.72,.66],[.78,.51],[.69,.76],[.48,.43]];
    context.globalCompositeOperation = "lighter";
    hotspots.forEach(([xRatio, yRatio], index) => {
      const x = width * xRatio;
      const y = height * yRatio;
      const phase = (motionTime * 0.00042 + index * 0.17) % 1;
      context.strokeStyle = `rgba(90,255,206,${(1 - phase) * 0.48 * intensity})`;
      context.lineWidth = 0.8;
      context.beginPath(); context.arc(x, y, 5 + phase * 24, 0, TAU); context.stroke();
      context.fillStyle = `rgba(136,255,220,${0.5 * intensity})`;
      context.fillRect(x - 1, y - 1, 2, 2);
    });
    context.globalCompositeOperation = "source-over";

    context.fillStyle = `rgba(104,239,196,${0.52 * intensity})`;
    context.font = "8px Inter, sans-serif";
    context.fillText(strategy ? "LIVE STRATEGY LAYER" : "BASELINE LAYER", 14, 18);
    context.fillStyle = "rgba(157,177,170,.55)";
    context.fillText("VECTOR SCAN · 8,915 SEGMENTS", 14, 31);
  }, reducedMotion);
  return (
    <canvas
      ref={canvasRef}
      className="street-digital-map"
      aria-label="Interactive live HCMC street grading map"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5, active: true };
      }}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0, active: false }; }}
    />
  );
}

export function StreetProgressField({ active = 1, reducedMotion = false }) {
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const motionTime = reducedMotion ? 0 : time;
    const baseline = height * 0.29;
    const nodes = [width * 0.185, width * 0.395, width * 0.605, width * 0.815];
    const activeX = nodes[active] || nodes[1];
    context.globalCompositeOperation = "lighter";
    for (let line = 0; line < 7; line += 1) {
      context.beginPath();
      for (let x = 0; x <= width; x += 5) {
        const distance = Math.abs(x - activeX) / width;
        const envelope = Math.exp(-distance * 4.2);
        const wave = Math.sin(x * (0.017 + line * 0.0017) + motionTime * (0.001 + line * 0.00009)) * (8 + line * 2.45) * envelope;
        const secondary = Math.sin(x * 0.006 - motionTime * 0.0007 + line) * 4;
        const y = baseline + wave + secondary;
        if (x === 0) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.strokeStyle = line % 3 === 0 ? "rgba(111,255,210,.42)" : line % 3 === 1 ? "rgba(39,216,172,.3)" : "rgba(118,215,89,.24)";
      context.lineWidth = line === 0 ? 1.2 : 0.6;
      context.stroke();
    }
    for (let packet = 0; packet < 72; packet += 1) {
      const x = (packet / 72 * width + motionTime * (0.012 + packet % 5 * 0.001)) % width;
      const distance = Math.abs(x - activeX) / width;
      const envelope = Math.exp(-distance * 4.6);
      const y = baseline + Math.sin(x * 0.019 + motionTime * 0.0012 + packet) * 28 * envelope;
      context.fillStyle = packet % 5 === 0 ? "#91ffdc" : "#36d9ad";
      context.globalAlpha = 0.18 + envelope * 0.62;
      context.fillRect(x, y, packet % 5 === 0 ? 2 : 1, packet % 5 === 0 ? 2 : 1);
    }
    context.globalAlpha = 1;
    nodes.forEach((x, index) => {
      const selected = index === active;
      const pulse = selected ? 7 + Math.sin(motionTime * 0.003) * 2 : 3.5;
      context.strokeStyle = selected ? "rgba(126,255,217,.88)" : "rgba(111,132,126,.55)";
      context.lineWidth = selected ? 1.4 : 0.7;
      context.beginPath(); context.arc(x, baseline, pulse, 0, TAU); context.stroke();
      context.fillStyle = selected ? "#61e9be" : "#344a44";
      context.beginPath(); context.arc(x, baseline, selected ? 3.2 : 1.8, 0, TAU); context.fill();
    });
    context.globalCompositeOperation = "source-over";
  }, reducedMotion);
  return <canvas ref={canvasRef} className="street-progress-field" aria-hidden="true" />;
}

export function AICapabilityField({ selected = 0, reducedMotion = false, light = false }) {
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const motionTime = reducedMotion ? 0 : time;
    const center = { x: width * 0.52, y: height * 0.48 };
    const nodes = [
      { x: width * 0.18, y: height * 0.2, color: "#9c79ff" },
      { x: width * 0.82, y: height * 0.2, color: "#6f8cff" },
      { x: width * 0.19, y: height * 0.8, color: "#e7a34c" },
      { x: width * 0.82, y: height * 0.79, color: "#40d5a5" },
    ];
    const cursor = pointer.current;
    const background = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, width * 0.52);
    background.addColorStop(0, light ? "rgba(112,95,220,.07)" : "rgba(96,78,220,.11)");
    background.addColorStop(1, "rgba(3,5,11,0)");
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "lighter";
    nodes.forEach((node, index) => {
      const active = index === selected;
      const controlA = { x: node.x + (center.x - node.x) * 0.24, y: node.y };
      const controlB = { x: center.x + (node.x - center.x) * 0.2, y: center.y };
      context.beginPath();
      for (let sample = 0; sample <= 70; sample += 1) {
        const progress = sample / 70;
        let point = cubicPoint(node, controlA, controlB, center, progress);
        if (cursor.active) point = repelPoint(point, cursor);
        if (sample === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
      }
      context.strokeStyle = `${node.color}${active ? "b8" : "3f"}`;
      context.lineWidth = active ? 1.5 : 0.65;
      context.setLineDash(active ? [2, 5] : [1, 8]);
      context.stroke();
      context.setLineDash([]);

      for (let packet = 0; packet < (active ? 18 : 9); packet += 1) {
        const progress = (packet / (active ? 18 : 9) + motionTime * (0.000055 + index * 0.000007)) % 1;
        const point = repelPoint(cubicPoint(node, controlA, controlB, center, progress), cursor);
        context.fillStyle = node.color;
        context.globalAlpha = active ? 0.35 + progress * 0.65 : 0.12 + progress * 0.28;
        context.fillRect(point.x, point.y, packet % 4 === 0 ? 2.2 : 1, packet % 4 === 0 ? 2.2 : 1);
      }

      const nodePulse = active ? 13 + Math.sin(motionTime * 0.003 + index) * 3 : 8;
      context.globalAlpha = 1;
      context.strokeStyle = `${node.color}${active ? "e8" : "72"}`;
      context.lineWidth = active ? 1.4 : 0.8;
      context.beginPath(); context.arc(node.x, node.y, nodePulse, 0, TAU); context.stroke();
      context.fillStyle = node.color;
      context.globalAlpha = active ? 0.9 : 0.38;
      context.beginPath(); context.arc(node.x, node.y, active ? 3.4 : 2, 0, TAU); context.fill();
    });

    for (let orbit = 0; orbit < 5; orbit += 1) {
      const radius = 32 + orbit * 18;
      context.globalAlpha = 0.08 + orbit * 0.022;
      context.strokeStyle = orbit % 2 === 0 ? "#9c79ff" : "#40d5a5";
      context.setLineDash([2, 7]);
      context.beginPath(); context.arc(center.x, center.y, radius, motionTime * 0.00012 * (orbit % 2 ? -1 : 1), TAU + motionTime * 0.00012); context.stroke();
      context.setLineDash([]);
    }
    const coreGlow = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, 92);
    coreGlow.addColorStop(0, "rgba(174,151,255,.34)");
    coreGlow.addColorStop(.35, "rgba(90,226,196,.08)");
    coreGlow.addColorStop(1, "rgba(3,5,11,0)");
    context.globalAlpha = 1;
    context.fillStyle = coreGlow;
    context.beginPath(); context.arc(center.x, center.y, 92, 0, TAU); context.fill();
    context.globalCompositeOperation = "source-over";
  }, reducedMotion);
  return (
    <canvas
      ref={canvasRef}
      className="ai-capability-canvas"
      aria-label="Interactive AI capability network"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
      }}
      onPointerLeave={() => { pointer.current.active = false; }}
    />
  );
}

export function StreetMapProduct({ lang, selectedStage = 1, reducedMotion = false, onSelectStage }) {
  const [strategy, setStrategy] = useState(true);
  return (
    <div className={`street-map-product ${strategy ? "strategy" : "before"}`}>
      <StreetFlowField reducedMotion={reducedMotion} strategy={strategy} selectedStage={selectedStage} />
      <figure>
        <StreetDigitalMap reducedMotion={reducedMotion} strategy={strategy} />
        <div className="street-pin"><span><i />Grade B</span><strong>AB-2 Vertical Oasis</strong><small>Phan Đình Phùng St.<br />Canopy Cover 42% · Health Good</small></div>
        <figcaption><span><i />Live strategy layer</span><strong>{strategy ? "Strategy scenario" : "Current condition"}</strong></figcaption>
      </figure>
      <div className="street-map-controls">
        <button className={!strategy ? "active" : ""} onClick={() => setStrategy(false)}>Before</button>
        <button aria-label="Toggle map scenario" onClick={() => { setStrategy(!strategy); onSelectStage?.(strategy ? 2 : 1); }}><ArrowsLeftRight size={17} /></button>
        <button className={strategy ? "active" : ""} onClick={() => setStrategy(true)}>Strategy</button>
      </div>
      <div className="street-map-hint">{lang === "zh" ? "点击切换情景 · 滚轮缩放场景深度" : "Click to switch view · wheel to zoom"}</div>
    </div>
  );
}

export function ProjectArtifact({ projectId, lang, selectedStage, reducedMotion, onSelectStage }) {
  if (projectId === 1) return <CommerceNetwork lang={lang} selectedStage={selectedStage} />;
  if (projectId === 2) return <PostureProduct lang={lang} selectedStage={selectedStage} reducedMotion={reducedMotion} onSelectStage={onSelectStage} />;
  return <StreetMapProduct lang={lang} selectedStage={selectedStage} reducedMotion={reducedMotion} onSelectStage={onSelectStage} />;
}

export function HomeArtifact({ projectId, lang, active }) {
  return (
    <div className={`home-artifact home-artifact-${projectId} ${active ? "active" : ""}`}>
      {projectId === 1 && <><div className="home-ai-grid"><ChartBar size={24} /><span /><Sparkle size={20} weight="fill" /><span /><CheckCircle size={24} /></div><small>{lang === "zh" ? "诊断 → 建议 → 协同" : "Diagnose → recommend → coordinate"}</small></>}
      {projectId === 2 && <><img src="/assets/posture-pose-amber.png" alt="PosturePal pose visualization" /><span>32 min · aligned</span></>}
      {projectId === 3 && <><img src="/assets/street-greening-dashboard.png" alt="HCMC street greening dashboard" /><span>8,915 segments · A—E</span></>}
    </div>
  );
}

export function JourneyOrbit({ items, selected, onSelect, reducedMotion, light }) {
  const drag = useRef(null);
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const cx = width * 0.46;
    const cy = height * 0.52;
    context.globalCompositeOperation = "lighter";
    items.forEach((item, index) => {
      const rx = width * (0.28 + index * 0.035);
      const ry = height * (0.19 + (index % 3) * 0.045);
      const phase = -2.72 + index * 0.58;
      context.save();
      context.translate(cx, cy);
      context.rotate(-0.13 + index * 0.045);
      context.strokeStyle = `${item.color}${selected === index ? "d2" : "72"}`;
      context.lineWidth = selected === index ? 1.4 : 0.65;
      context.setLineDash(selected === index ? [2, 5] : [1, 7]);
      context.beginPath();
      context.ellipse(0, 0, rx, ry, 0, 0, TAU);
      context.stroke();
      for (let dot = 0; dot < 150; dot += 1) {
        const angle = phase + dot / 150 * TAU + (reducedMotion ? 0 : time * 0.00005 * (index + 1));
        const jitter = Math.sin(dot * 12.9898 + index * 17.31) * 11;
        context.fillStyle = item.color;
        context.globalAlpha = selected === index ? 0.58 : 0.2;
        context.fillRect(Math.cos(angle) * (rx + jitter), Math.sin(angle) * (ry + jitter * 0.34), selected === index && dot % 13 === 0 ? 2.2 : 1.15, selected === index && dot % 13 === 0 ? 1.7 : 1);
      }
      context.restore();
    });
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
    if (!light) {
      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, width * 0.32);
      glow.addColorStop(0, "rgba(119,107,255,.09)");
      glow.addColorStop(1, "rgba(3,5,11,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    }
  }, reducedMotion);
  const selectFromPointer = (event) => {
    if (!drag.current) return;
    const delta = event.clientX - drag.current.x;
    const step = Math.round(delta / 80);
    if (step) onSelect(Math.max(0, Math.min(items.length - 1, drag.current.selected + step)));
  };
  return <canvas className="journey-orbit-canvas" ref={canvasRef} aria-label="Interactive orbital timeline" onPointerDown={(event) => { drag.current = { x: event.clientX, selected }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={selectFromPointer} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} />;
}

function FieldCanvas({ mode, selected = 0, reducedMotion, light }) {
  const colors = mode === "notes" ? ["#e7a34c", "#6f8cff", "#40d5a5", "#b48cff"] : ["#9c79ff", "#e7a34c", "#776bff", "#40d5a5"];
  const pointer = useRef({ x: -1000, y: -1000, active: false });
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const motionTime = reducedMotion ? 0 : time;
    const cursor = pointer.current;
    const centers = mode === "notes"
      ? [[0.67, 0.22], [0.82, 0.43], [0.56, 0.55], [0.75, 0.68]]
      : [[0.57, 0.18], [0.80, 0.17], [0.50, 0.44], [0.80, 0.46]];
    const root = mode === "notes" ? { x: width * 0.71, y: height * 0.43 } : { x: width * 0.665, y: height * 0.35 };

    const drawGlow = (x, y, radius, color, alpha) => {
      const glow = context.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`);
      glow.addColorStop(0.38, `${color}${Math.round(alpha * 0.34 * 255).toString(16).padStart(2, "0")}`);
      glow.addColorStop(1, `${color}00`);
      context.globalAlpha = 1;
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, radius, 0, TAU);
      context.fill();
    };

    context.globalCompositeOperation = "lighter";

    if (mode === "notes") {
      // A drifting editorial nebula: background dust, braided topic routes, and pulsing vortices.
      for (let dust = 0; dust < 620; dust += 1) {
        const seedX = (Math.sin(dust * 91.733) * 43758.5453) % 1;
        const seedY = (Math.sin(dust * 47.217 + 1.8) * 24634.6345) % 1;
        const x = width * (0.39 + Math.abs(seedX) * 0.61);
        const drift = reducedMotion ? 0 : (motionTime * (0.002 + dust % 5 * 0.00055)) % (height * 0.13);
        const y = (Math.abs(seedY) * height + drift) % height;
        const point = repelPoint({ x, y }, cursor);
        const twinkle = 0.52 + Math.sin(motionTime * 0.0013 + dust * 0.71) * 0.48;
        context.fillStyle = colors[dust % colors.length];
        context.globalAlpha = 0.08 + twinkle * (dust % 17 === 0 ? 0.48 : 0.22);
        const size = dust % 31 === 0 ? 2.5 : dust % 7 === 0 ? 1.5 : 0.85;
        context.fillRect(point.x, point.y, size, size);
      }

      centers.forEach(([nx, ny], group) => {
        const center = { x: width * nx, y: height * ny };
        const color = colors[group];
        const active = selected === group;
        const controlA = { x: root.x + (center.x - root.x) * 0.22, y: root.y + (group - 1.5) * height * 0.075 };
        const controlB = { x: center.x - (center.x - root.x) * 0.24, y: center.y + (1.5 - group) * height * 0.055 };

        for (let ribbon = -2; ribbon <= 2; ribbon += 1) {
          context.strokeStyle = color;
          context.globalAlpha = active ? 0.2 - Math.abs(ribbon) * 0.025 : 0.075;
          context.lineWidth = ribbon === 0 ? (active ? 1.05 : 0.58) : 0.4;
          context.beginPath();
          context.moveTo(root.x, root.y + ribbon * 4);
          context.bezierCurveTo(controlA.x, controlA.y + ribbon * 9, controlB.x, controlB.y + ribbon * 7, center.x, center.y + ribbon * 3);
          context.stroke();
        }

        const packetCount = active ? 12 : 6;
        for (let packet = 0; packet < packetCount; packet += 1) {
          const progress = (packet / packetCount + motionTime * (0.000055 + group * 0.000006)) % 1;
          const point = repelPoint(cubicPoint(root, controlA, controlB, center, progress), cursor);
          context.fillStyle = color;
          context.globalAlpha = active ? 0.68 : 0.28;
          context.beginPath();
          context.arc(point.x, point.y, packet % 4 === 0 ? 2.5 : 1.25, 0, TAU);
          context.fill();
        }

        if (active) {
          drawGlow(center.x, center.y, Math.min(width, height) * 0.18, color, 0.16);
          for (let ring = 0; ring < 4; ring += 1) {
            const pulse = (motionTime * 0.00012 + ring * 0.23) % 1;
            context.strokeStyle = color;
            context.globalAlpha = (1 - pulse) * 0.27;
            context.lineWidth = 0.7;
            context.beginPath();
            context.ellipse(center.x, center.y, 22 + pulse * width * 0.12, 9 + pulse * height * 0.075, group * 0.18, 0, TAU);
            context.stroke();
          }
        }

        const count = active ? 640 : 300;
        const clusterRadius = Math.min(width, height) * (active ? 0.19 : 0.135);
        for (let dot = 0; dot < count; dot += 1) {
          const fraction = dot / count;
          const arm = dot % 4;
          const angle = dot * 2.399 + arm * 0.72 + group * 0.83 + motionTime * 0.000045 * (group % 2 ? -1 : 1);
          const radius = Math.sqrt(fraction) * clusterRadius * (0.74 + arm * 0.08);
          const wave = Math.sin(angle * 3 + motionTime * 0.0004) * (active ? 9 : 5);
          let point = {
            x: center.x + Math.cos(angle) * (radius + wave) * 1.62,
            y: center.y + Math.sin(angle) * (radius + wave) * 0.6,
          };
          point = repelPoint(point, cursor);
          context.fillStyle = color;
          context.globalAlpha = (active ? 0.22 : 0.1) + fraction * (active ? 0.7 : 0.4);
          const size = dot % 23 === 0 ? 2.8 : dot % 7 === 0 ? 1.6 : 1;
          context.fillRect(point.x, point.y, size, dot % 23 === 0 ? 2.1 : 1);
        }
      });

      const rootPulse = 8 + (Math.sin(motionTime * 0.002) + 1) * 3;
      drawGlow(root.x, root.y, 62, colors[selected], 0.13);
      context.strokeStyle = colors[selected];
      context.globalAlpha = 0.54;
      context.lineWidth = 1;
      context.beginPath(); context.arc(root.x, root.y, rootPulse, 0, TAU); context.stroke();
    } else {
      // A capability system: orbital clusters feed animated evidence streams into a shared nexus.
      for (let dust = 0; dust < 500; dust += 1) {
        const seedX = Math.abs((Math.sin(dust * 73.17 + 0.4) * 37589.43) % 1);
        const seedY = Math.abs((Math.sin(dust * 39.71 + 2.2) * 17653.91) % 1);
        let point = {
          x: width * (0.35 + seedX * 0.65),
          y: height * (0.04 + seedY * 0.66),
        };
        point = repelPoint(point, cursor);
        context.fillStyle = colors[dust % colors.length];
        context.globalAlpha = 0.08 + (dust % 19 === 0 ? 0.42 : 0.12) * (0.7 + Math.sin(motionTime * 0.001 + dust) * 0.3);
        const size = dust % 37 === 0 ? 2.4 : dust % 9 === 0 ? 1.4 : 0.8;
        context.fillRect(point.x, point.y, size, size);
      }

      centers.forEach(([nx, ny], group) => {
        const center = { x: width * nx, y: height * ny };
        const color = colors[group];
        const active = selected === group;
        const controlA = { x: root.x + (center.x - root.x) * 0.28, y: root.y + (group - 1.5) * height * 0.065 };
        const controlB = { x: center.x - (center.x - root.x) * 0.31, y: center.y + (1.5 - group) * height * 0.055 };

        for (let stream = -3; stream <= 3; stream += 1) {
          context.strokeStyle = color;
          context.globalAlpha = active ? 0.19 - Math.abs(stream) * 0.018 : 0.058;
          context.lineWidth = stream === 0 ? (active ? 1.1 : 0.55) : 0.36;
          context.beginPath();
          context.moveTo(center.x, center.y + stream * 3);
          context.bezierCurveTo(controlB.x, controlB.y + stream * 8, controlA.x, controlA.y + stream * 7, root.x, root.y + stream * 2);
          context.stroke();
        }

        const packets = active ? 15 : 7;
        for (let packet = 0; packet < packets; packet += 1) {
          const progress = (packet / packets + motionTime * (0.00007 + group * 0.000007)) % 1;
          let point = cubicPoint(center, controlB, controlA, root, progress);
          point = repelPoint(point, cursor);
          context.fillStyle = color;
          context.globalAlpha = active ? 0.74 : 0.25;
          context.beginPath(); context.arc(point.x, point.y, packet % 5 === 0 ? 2.35 : 1.1, 0, TAU); context.fill();
        }

        if (active) drawGlow(center.x, center.y, Math.min(width, height) * 0.17, color, 0.17);

        context.save();
        context.translate(center.x, center.y);
        for (let orbit = 0; orbit < 4; orbit += 1) {
          const rotation = group * 0.26 + orbit * 0.43 + motionTime * 0.000018 * (orbit % 2 ? -1 : 1);
          const rx = Math.min(width, height) * (0.052 + orbit * 0.025) * (active ? 1.25 : 1);
          const ry = rx * (0.38 + orbit * 0.035);
          context.save();
          context.rotate(rotation);
          context.strokeStyle = color;
          context.globalAlpha = active ? 0.2 - orbit * 0.025 : 0.065;
          context.lineWidth = orbit === 0 ? 0.9 : 0.45;
          context.beginPath(); context.ellipse(0, 0, rx, ry, 0, 0, TAU); context.stroke();
          const orbitDots = active ? 88 : 44;
          for (let dot = 0; dot < orbitDots; dot += 1) {
            const angle = dot / orbitDots * TAU + motionTime * 0.000035 * (orbit % 2 ? -1 : 1);
            let point = { x: Math.cos(angle) * rx, y: Math.sin(angle) * ry };
            point = repelPoint({ x: point.x + center.x, y: point.y + center.y }, cursor);
            context.fillStyle = color;
            context.globalAlpha = active ? 0.28 + (dot % 13 === 0 ? 0.56 : 0.18) : 0.14;
            const size = dot % 13 === 0 ? 2.2 : 0.95;
            context.fillRect(point.x - center.x, point.y - center.y, size, size);
          }
          context.restore();
        }

        const satellites = active ? 9 : 6;
        context.strokeStyle = color;
        context.globalAlpha = active ? 0.18 : 0.07;
        context.lineWidth = 0.5;
        context.beginPath();
        for (let satellite = 0; satellite < satellites; satellite += 1) {
          const angle = satellite / satellites * TAU + group * 0.5;
          const radius = Math.min(width, height) * (active ? 0.135 : 0.095) * (0.78 + (satellite % 3) * 0.11);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.48;
          if (satellite === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.closePath(); context.stroke();
        context.restore();

        context.fillStyle = color;
        context.globalAlpha = active ? 0.9 : 0.42;
        context.beginPath(); context.arc(center.x, center.y, active ? 4.8 : 2.7, 0, TAU); context.fill();
      });

      drawGlow(root.x, root.y, 82, colors[selected], 0.16);
      for (let ring = 0; ring < 3; ring += 1) {
        const pulse = (motionTime * 0.0001 + ring * 0.31) % 1;
        context.strokeStyle = colors[selected];
        context.globalAlpha = (1 - pulse) * 0.28;
        context.lineWidth = 0.75;
        context.beginPath(); context.ellipse(root.x, root.y, 11 + pulse * 62, 7 + pulse * 28, -0.18, 0, TAU); context.stroke();
      }
    }

    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
    if (light) {
      context.fillStyle = "rgba(242,240,233,.12)";
      context.fillRect(0, 0, width, height);
    }
  }, reducedMotion);
  return <canvas
    className={`${mode}-field-canvas`}
    ref={canvasRef}
    aria-hidden="true"
    onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    }}
    onPointerLeave={() => { pointer.current.active = false; }}
  />;
}

export function NotesField({ selectedTopic, reducedMotion, light }) {
  return <FieldCanvas mode="notes" selected={selectedTopic} reducedMotion={reducedMotion} light={light} />;
}

export function CapabilityField({ selected, reducedMotion, light }) {
  return <FieldCanvas mode="capability" selected={selected} reducedMotion={reducedMotion} light={light} />;
}

export function ContactOrbit({ reducedMotion, light }) {
  const canvasRef = useAnimatedCanvas(({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height);
    const colors = ["#776bff", "#40d5a5"];
    context.globalCompositeOperation = "lighter";
    colors.forEach((color, orbit) => {
      const rx = width * (0.28 + orbit * 0.08);
      const ry = height * (0.18 + orbit * 0.04);
      for (let dot = 0; dot < 300; dot += 1) {
        const angle = dot / 300 * TAU + (reducedMotion ? 0 : time * 0.000018 * (orbit ? -1 : 1));
        const noise = Math.sin(dot * 1.79) * 10;
        context.fillStyle = color;
        context.globalAlpha = 0.08 + (dot % 23 === 0 ? 0.46 : 0.12);
        context.fillRect(width / 2 + Math.cos(angle) * (rx + noise), height / 2 + Math.sin(angle) * (ry + noise * 0.25), dot % 23 === 0 ? 2 : 1, 1);
      }
    });
    context.globalAlpha = 1;
    context.globalCompositeOperation = "source-over";
    if (light) {
      context.fillStyle = "rgba(242,240,233,.2)";
      context.fillRect(0, 0, width, height);
    }
  }, reducedMotion);
  return <canvas className="contact-orbit-canvas" ref={canvasRef} aria-hidden="true" />;
}
