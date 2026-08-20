import { useEffect, useRef } from "react";

const PALETTES = {
  violet: [119, 107, 255],
  amber: [231, 163, 76],
  emerald: [64, 213, 165],
  white: [228, 232, 242],
};

function centersFor(variant, width, height, activeProject) {
  if (variant === "home") {
    if (width < 760) {
      return [
        { x: width * 0.28, y: height * 0.44, color: PALETTES.violet, key: 1 },
        { x: width * 0.72, y: height * 0.48, color: PALETTES.amber, key: 2 },
        { x: width * 0.32, y: height * 0.62, color: PALETTES.emerald, key: 3 },
      ];
    }
    return [
      { x: width * 0.32, y: height * 0.61, color: PALETTES.violet, key: 1 },
      { x: width * 0.68, y: height * 0.29, color: PALETTES.amber, key: 2 },
      { x: width * 0.68, y: height * 0.69, color: PALETTES.emerald, key: 3 },
    ];
  }
  if (variant === "journey") {
    return [
      { x: width * 0.17, y: height * 0.6, color: PALETTES.violet, key: 1 },
      { x: width * 0.39, y: height * 0.46, color: PALETTES.violet, key: 2 },
      { x: width * 0.57, y: height * 0.61, color: PALETTES.amber, key: 3 },
      { x: width * 0.76, y: height * 0.7, color: PALETTES.emerald, key: 4 },
    ];
  }
  if (variant === "notes") {
    return [
      { x: width * 0.58, y: height * 0.25, color: PALETTES.amber, key: 1 },
      { x: width * 0.73, y: height * 0.39, color: PALETTES.violet, key: 2 },
      { x: width * 0.58, y: height * 0.55, color: PALETTES.emerald, key: 3 },
      { x: width * 0.75, y: height * 0.63, color: PALETTES.violet, key: 4 },
    ];
  }
  if (variant === "about") {
    return [
      { x: width * 0.59, y: height * 0.38, color: PALETTES.violet, key: 1 },
      { x: width * 0.76, y: height * 0.25, color: PALETTES.amber, key: 2 },
      { x: width * 0.75, y: height * 0.53, color: PALETTES.emerald, key: 3 },
      { x: width * 0.48, y: height * 0.53, color: PALETTES.violet, key: 4 },
    ];
  }
  const colors = [PALETTES.violet, PALETTES.amber, PALETTES.emerald];
  return [{ x: width * 0.61, y: height * 0.52, color: colors[activeProject - 1] || PALETTES.violet, key: activeProject }];
}

function rgba(color, alpha) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

export function ParticleField({
  variant = "home",
  activeProject = 1,
  reducedMotion = false,
  light = false,
  onSelectProject,
}) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -1000, y: -1000, down: false, px: 0, py: 0 });
  const pan = useRef({ x: 0, y: 0 });
  const depth = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    let frame = 0;
    let particles = [];
    let centers = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let mounted = true;

    const createParticles = () => {
      const mobile = width < 760;
      const count = reducedMotion ? (mobile ? 520 : 1000) : (mobile ? 1800 : 5200);
      centers = centersFor(variant, width, height, activeProject);
      particles = Array.from({ length: count }, (_, i) => {
        const c = centers[i % centers.length];
        const seed = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
        const seed2 = Math.abs(Math.sin((i + 1) * 78.233) * 12345.6789) % 1;
        const seed3 = Math.abs(Math.sin((i + 1) * 39.425) * 96321.421) % 1;
        const radius = (12 + Math.pow(seed2, 0.72) * Math.min(width, height) * (mobile ? 0.21 : 0.31));
        const arms = variant === "home" ? 10 : 8;
        const angle = Math.floor(seed * arms) * (Math.PI * 2 / arms) + radius * 0.017 + (seed3 - 0.5) * 0.26;
        const stretch = variant === "home" ? 1.35 : variant === "journey" ? 1.6 : 1.15;
        const bridge = variant === "home" && seed3 < 0.2;
        const nexus = { x: width * 0.53, y: height * 0.53 };
        const t = seed2;
        const controlX = (nexus.x + c.x) * 0.5 + (c.y - nexus.y) * 0.32;
        const controlY = (nexus.y + c.y) * 0.5 - (c.x - nexus.x) * 0.22;
        const tx = bridge
          ? (1 - t) * (1 - t) * nexus.x + 2 * (1 - t) * t * controlX + t * t * c.x
          : c.x + Math.cos(angle) * radius * stretch;
        const ty = bridge
          ? (1 - t) * (1 - t) * nexus.y + 2 * (1 - t) * t * controlY + t * t * c.y
          : c.y + Math.sin(angle) * radius * 0.62;
        return {
          x: tx + (seed2 - 0.5) * 40,
          y: ty + (seed - 0.5) * 40,
          tx,
          ty,
          angle,
          radius,
          speed: 0.0008 + seed * 0.002,
          size: 0.75 + seed2 * 1.9,
          alpha: 0.42 + seed * 0.58,
          color: c.color,
          center: i % centers.length,
          seed,
          seed2,
          seed3,
          bridge,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = (time = 0) => {
      if (!mounted) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = light ? "multiply" : "lighter";
      const buckets = centers.map(() => new Path2D());

      const centerGlow = centersFor(variant, width, height, activeProject);
      for (const c of centerGlow) {
        ctx.beginPath();
        ctx.arc(c.x + pan.current.x, c.y + pan.current.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c.color, light ? 0.5 : 0.92);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const c = centers[p.center];
        const speedScale = reducedMotion ? 0 : 1;
        p.angle += p.speed * speedScale * (1 + depth.current * 0.22);
        const drift = Math.sin(time * 0.00026 + p.seed * 15) * 15;
        const stretch = variant === "home" ? 1.35 : variant === "journey" ? 1.62 : 1.14;
        if (p.bridge) {
          const nexus = { x: width * 0.53, y: height * 0.53 };
          const t = p.seed2;
          const controlX = (nexus.x + c.x) * 0.5 + (c.y - nexus.y) * 0.32;
          const controlY = (nexus.y + c.y) * 0.5 - (c.x - nexus.x) * 0.22;
          const wave = Math.sin(time * 0.001 + p.seed * 18) * 7;
          p.tx = (1 - t) * (1 - t) * nexus.x + 2 * (1 - t) * t * controlX + t * t * c.x + wave + pan.current.x;
          p.ty = (1 - t) * (1 - t) * nexus.y + 2 * (1 - t) * t * controlY + t * t * c.y + wave * 0.55 + pan.current.y;
        } else {
          p.tx = c.x + Math.cos(p.angle) * (p.radius + drift) * stretch + pan.current.x;
          p.ty = c.y + Math.sin(p.angle * 1.04) * (p.radius + drift) * 0.62 + pan.current.y;
        }

        const dx = pointer.current.x - p.x;
        const dy = pointer.current.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 30000 && distSq > 10 && !reducedMotion) {
          const dist = Math.sqrt(distSq);
          const pull = (1 - dist / 174) * 0.014;
          p.x += dx * pull - dy * pull * 0.24;
          p.y += dy * pull + dx * pull * 0.24;
        }

        p.x += (p.tx - p.x) * (reducedMotion ? 0.24 : 0.016);
        p.y += (p.ty - p.y) * (reducedMotion ? 0.24 : 0.016);

        const selected = variant !== "home" || c.key === activeProject;
        const size = p.size * (p.bridge ? 0.76 : 1) * (selected ? 1.14 : 0.9) * depth.current;
        buckets[p.center].rect(p.x, p.y, size, size);
      }

      buckets.forEach((bucket, index) => {
        const center = centers[index];
        const selected = variant !== "home" || center.key === activeProject;
        ctx.fillStyle = rgba(center.color, (selected ? 0.82 : 0.42) * (light ? 0.68 : 1));
        ctx.fill(bucket);
      });

      ctx.globalCompositeOperation = "source-over";
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (pointer.current.down) {
        pan.current.x += (x - pointer.current.px) * 0.28;
        pan.current.y += (y - pointer.current.py) * 0.28;
      }
      pointer.current = { ...pointer.current, x, y, px: x, py: y };
    };
    const leave = () => { pointer.current.x = -1000; pointer.current.y = -1000; };
    const down = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.current = { ...pointer.current, down: true, x, y, px: x, py: y };
      canvas.setPointerCapture?.(event.pointerId);
    };
    const up = (event) => {
      pointer.current.down = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };
    const click = (event) => {
      if (variant !== "home" || !onSelectProject) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let nearest = null;
      let min = Infinity;
      centers.forEach((c) => {
        const d = Math.hypot(x - c.x, y - c.y);
        if (d < min) { min = d; nearest = c; }
      });
      if (nearest && min < Math.min(width, height) * 0.23) onSelectProject(nearest.key);
    };
    const wheel = (event) => {
      depth.current = Math.max(0.72, Math.min(1.45, depth.current + Math.sign(event.deltaY) * -0.035));
    };

    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("click", click);
    canvas.addEventListener("wheel", wheel, { passive: true });

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("click", click);
      canvas.removeEventListener("wheel", wheel);
    };
  }, [variant, activeProject, reducedMotion, light, onSelectProject]);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
