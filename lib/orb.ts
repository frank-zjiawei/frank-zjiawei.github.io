/**
 * Canvas renderer for the site-map orb: a small ink planet with a point-cloud
 * surface, a constellation of linked nodes (echoing the navigation graph),
 * and a thin orbit ring with a satellite. Everything is projected from real
 * 3D coordinates, so depth, occlusion, and parallax are physically consistent.
 *
 * No dependencies. All sizes scale from a 104px design size.
 */

type Vec3 = [number, number, number];
type RGB = [number, number, number];

export type OrbTheme = 'light' | 'dark';

interface Palette {
  /** radial body gradient: lit side → mid → limb */
  body: [string, string, string];
  dot: RGB;
  gold: RGB;
  ring: RGB;
  rim: RGB;
  haloAlpha: number;
  dotAlpha: number;
  shade: string;
  specular: number;
  rimAlpha: number;
}

// Light pages get an ink planet; dark pages get a pearl one. Same rule the
// rest of the site uses for its accent (`bg-fg text-surface`).
const PALETTES: Record<OrbTheme, Palette> = {
  light: {
    body: ['#57504a', '#25211e', '#0c0b0a'],
    dot: [250, 244, 232],
    gold: [214, 168, 92],
    ring: [184, 137, 62],
    rim: [255, 250, 240],
    haloAlpha: 0.04,
    dotAlpha: 1,
    shade: 'rgba(0,0,0,0.42)',
    specular: 0.3,
    rimAlpha: 0.6,
  },
  dark: {
    body: ['#fffaf0', '#ddd3c2', '#9a8f7e'],
    dot: [30, 27, 23],
    gold: [150, 104, 36],
    ring: [212, 164, 87],
    rim: [255, 255, 255],
    haloAlpha: 0.07,
    dotAlpha: 0.9,
    shade: 'rgba(60,48,30,0.30)',
    specular: 0.75,
    rimAlpha: 0.9,
  },
};

const TAU = Math.PI * 2;
const DESIGN_SIZE = 104;
const RING_STEPS = 96;

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (x: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, x));

function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  return pts;
}

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1);
  const om = Math.acos(dot);
  if (om < 1e-4) return a;
  const so = Math.sin(om);
  const ka = Math.sin((1 - t) * om) / so;
  const kb = Math.sin(t * om) / so;
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
}

/** latitude / longitude in degrees → unit vector */
function latLon(lat: number, lon: number): Vec3 {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
}

function smoothstep(a: number, b: number, x: number) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export interface Orb {
  start(): void;
  stop(): void;
  setHover(on: boolean): void;
  /** pointer offset from the orb centre, each axis in [-1, 1] */
  setPointer(x: number, y: number): void;
  setTheme(theme: OrbTheme): void;
  /** add spin momentum (e.g. from a drag), in rad/s */
  kick(velocity: number): void;
  setSize(size: number): void;
  /** draw one frame without advancing time (reduced motion, theme change) */
  renderStatic(): void;
  destroy(): void;
}

export function createOrb(
  canvas: HTMLCanvasElement,
  options: { size?: number; theme?: OrbTheme } = {},
): Orb | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // ---- static geometry ----------------------------------------------------
  const lattice = fibonacciSphere(560);
  // Per-point brightness: organic "continents" plus a few twinkling stars, so
  // the surface reads as a planet rather than an evenly dimpled ball.
  const weights = lattice.map((p, i) => {
    const n =
      Math.sin(p[0] * 3.1 + 1.3) * Math.sin(p[1] * 2.7 + 0.5) +
      0.7 * Math.sin(p[2] * 3.7 + p[0] * 1.9 + 2.1) +
      0.45 * Math.sin(p[1] * 6.3 + p[2] * 4.1);
    const s = Math.sin(i * 12.9898) * 43758.5453;
    const rnd = s - Math.floor(s);
    return {
      alpha: 0.16 + 0.84 * smoothstep(-0.35, 0.75, n),
      star: rnd > 0.94,
      phase: rnd * TAU,
    };
  });

  const nodes: Vec3[] = [
    latLon(34, -62),
    latLon(52, 18),
    latLon(8, 64),
    latLon(-30, 12),
    latLon(-14, -96),
    latLon(28, 152),
    latLon(-44, -168),
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [2, 5],
    [5, 6],
  ];
  // Links are great-circle arcs lifted off the surface, like flight paths.
  const arcs = links.map(([a, b], i) => {
    const steps = 28;
    const pts: Vec3[] = [];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const p = normalize(slerp(nodes[a], nodes[b], t));
      const lift = 1 + 0.26 * Math.sin(Math.PI * t);
      pts.push([p[0] * lift, p[1] * lift, p[2] * lift]);
    }
    return { pts, offset: (i * 0.37) % 1 };
  });

  // ---- mutable state --------------------------------------------------------
  const state = {
    size: options.size ?? DESIGN_SIZE,
    dpr: 1,
    theme: options.theme ?? ('light' as OrbTheme),
    hover: 0,
    hoverTarget: 0,
    px: 0,
    py: 0,
    pxTarget: 0,
    pyTarget: 0,
    spin: 0.6,
    kick: 0,
    time: 0,
    satAngle: 0.6,
    pulse: 0,
    raf: 0,
    last: 0,
    running: false,
  };

  function resize() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(state.size * state.dpr);
    canvas.height = Math.round(state.size * state.dpr);
    canvas.style.width = `${state.size}px`;
    canvas.style.height = `${state.size}px`;
  }

  function draw() {
    if (!ctx) return;
    const S = state.size;
    const k = S / DESIGN_SIZE;
    const pal = PALETTES[state.theme];
    const h = state.hover;
    const c = S / 2;
    const R = S * 0.335;

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.clearRect(0, 0, S, S);

    // ---- rotations ----------------------------------------------------------
    const tiltX = 0.42 + state.py * 0.22;
    const tiltZ = -0.3 + state.px * 0.12;
    const cs = Math.cos(state.spin);
    const sn = Math.sin(state.spin);
    const cx = Math.cos(tiltX);
    const sx = Math.sin(tiltX);
    const cz = Math.cos(tiltZ);
    const sz = Math.sin(tiltZ);

    // globe frame: spin about Y → tilt about X → roll about Z. Z > 0 faces us.
    const rot = (p: Vec3): Vec3 => {
      const x1 = p[0] * cs + p[2] * sn;
      const z1 = -p[0] * sn + p[2] * cs;
      const y2 = p[1] * cx - z1 * sx;
      const z2 = p[1] * sx + z1 * cx;
      return [x1 * cz - y2 * sz, x1 * sz + y2 * cz, z2];
    };

    const px = (v: Vec3) => c + v[0] * R;
    const py = (v: Vec3) => c - v[1] * R;
    // Anything behind the planet's disc is hidden; anything outside it shows.
    const occluded = (v: Vec3) => v[2] < 0 && v[0] * v[0] + v[1] * v[1] < 1;

    // ---- orbit ring (fixed frame: does not spin with the globe) -------------
    const ringR = 1.4 + 0.03 * h;
    const ringTx = 0.3 + state.py * 0.12;
    const ringTz = -0.36 + state.px * 0.08;
    const rcx = Math.cos(ringTx);
    const rsx = Math.sin(ringTx);
    const rcz = Math.cos(ringTz);
    const rsz = Math.sin(ringTz);
    const onRing = (angle: number, radius: number): Vec3 => {
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y2 = -z * rsx;
      const z2 = z * rcx;
      return [x * rcz - y2 * rsz, x * rsz + y2 * rcz, z2];
    };
    const ring: Vec3[] = [];
    const ringInner: Vec3[] = [];
    for (let i = 0; i <= RING_STEPS; i++) {
      const a = (i / RING_STEPS) * TAU;
      ring.push(onRing(a, ringR));
      ringInner.push(onRing(a, ringR * 0.87));
    }
    const sat = onRing(state.satAngle, ringR);

    const strokeRing = (
      front: boolean,
      pts: Vec3[],
      width: number,
      gain: number,
    ) => {
      ctx.lineWidth = width * k;
      ctx.lineCap = 'butt';
      for (let i = 0; i < RING_STEPS; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const zf = (a[2] + b[2]) / 2 / ringR; // -1 back … 1 front
        if (front ? zf < 0 : zf >= 0) continue;
        if (!front && (occluded(a) || occluded(b))) continue;
        const alpha =
          (front ? 0.5 + 0.42 * zf : 0.16 + 0.3 * (1 + zf)) *
          (0.82 + 0.18 * h) *
          gain;
        ctx.strokeStyle = rgba(pal.ring, alpha);
        ctx.beginPath();
        // overlap neighbours by a hair so butt caps leave no seams
        ctx.moveTo(px(a) - (px(b) - px(a)) * 0.08, py(a) - (py(b) - py(a)) * 0.08);
        ctx.lineTo(px(b), py(b));
        ctx.stroke();
      }
    };

    const drawSatellite = () => {
      const x = px(sat);
      const y = py(sat);
      const r = (1.9 + 0.5 * (sat[2] / ringR)) * k;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2);
      glow.addColorStop(0, rgba(pal.ring, 0.45));
      glow.addColorStop(1, rgba(pal.ring, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 3.2, 0, TAU);
      ctx.fill();
      ctx.fillStyle = rgba(pal.ring, 1);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.38, 0, TAU);
      ctx.fill();
    };

    // ---- 0. faint halo --------------------------------------------------------
    {
      const g = ctx.createRadialGradient(c, c, R * 0.9, c, c, R * 1.4);
      g.addColorStop(0, rgba(pal.ring, pal.haloAlpha * (1 + 1.2 * h)));
      g.addColorStop(1, rgba(pal.ring, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.4, 0, TAU);
      ctx.fill();
    }

    // ---- 1. far side of the ring ----------------------------------------------
    strokeRing(false, ringInner, 0.6, 0.45);
    strokeRing(false, ring, 0.95, 1);
    if (sat[2] < 0 && !occluded(sat)) drawSatellite();

    // ---- 2. planet body ---------------------------------------------------------
    {
      const g = ctx.createRadialGradient(
        c - R * 0.38,
        c - R * 0.46,
        R * 0.05,
        c,
        c,
        R * 1.02,
      );
      g.addColorStop(0, pal.body[0]);
      g.addColorStop(0.55, pal.body[1]);
      g.addColorStop(1, pal.body[2]);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, TAU);
      ctx.fill();
    }

    // ---- 3. surface point cloud (near hemisphere, fading at the limb) ----------
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R, 0, TAU);
    ctx.clip();
    for (let i = 0; i < lattice.length; i++) {
      const v = rot(lattice[i]);
      const z = v[2];
      if (z <= 0.02) continue;
      const w = weights[i];
      const twinkle = w.star
        ? 0.75 + 0.25 * Math.sin(state.time * 2.2 + w.phase)
        : 1;
      const alpha =
        Math.min(
          1,
          (0.06 + 0.8 * Math.pow(z, 1.15)) *
            w.alpha *
            twinkle *
            (w.star ? 1.5 : 1),
        ) * pal.dotAlpha;
      const r = (0.3 + 0.36 * z) * (w.star ? 1.55 : 1) * k;
      ctx.fillStyle = rgba(pal.dot, alpha);
      ctx.beginPath();
      ctx.arc(px(v), py(v), r, 0, TAU);
      ctx.fill();
    }
    ctx.restore();

    // ---- 4. constellation: arcs, travelling pulses, nodes -----------------------
    ctx.lineCap = 'round';
    for (const arc of arcs) {
      const P = arc.pts.map(rot);
      ctx.lineWidth = 0.7 * k;
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i];
        const b = P[i + 1];
        if (occluded(a) || occluded(b)) continue;
        const z = (a[2] + b[2]) / 2;
        const alpha = clamp(0.16 + 0.5 * z, 0, 1) * (0.75 + 0.25 * h);
        if (alpha <= 0.02) continue;
        ctx.strokeStyle = rgba(pal.gold, alpha);
        ctx.beginPath();
        ctx.moveTo(px(a), py(a));
        ctx.lineTo(px(b), py(b));
        ctx.stroke();
      }

      const cycle = (state.pulse + arc.offset) % 1.6;
      if (cycle < 1) {
        const f = cycle * (P.length - 1);
        const i = Math.floor(f);
        const t = f - i;
        const a = P[i];
        const b = P[Math.min(i + 1, P.length - 1)];
        const v: Vec3 = [
          a[0] + (b[0] - a[0]) * t,
          a[1] + (b[1] - a[1]) * t,
          a[2] + (b[2] - a[2]) * t,
        ];
        if (!occluded(v) && v[2] > -0.2) {
          const x = px(v);
          const y = py(v);
          const fade = Math.sin(Math.PI * cycle);
          const g = ctx.createRadialGradient(x, y, 0, x, y, 3.4 * k);
          g.addColorStop(0, rgba([255, 244, 214], 0.95 * fade));
          g.addColorStop(0.35, rgba(pal.gold, 0.55 * fade));
          g.addColorStop(1, rgba(pal.gold, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 3.4 * k, 0, TAU);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const v = rot(nodes[i]);
      const z = v[2];
      if (z <= 0.05) continue;
      const x = px(v);
      const y = py(v);
      const breathe = 0.5 + 0.5 * Math.sin(state.time * 1.6 + i * 1.3);
      const haloR = (3.6 + 1.4 * breathe + 1.2 * h) * k * (0.6 + 0.4 * z);
      const g = ctx.createRadialGradient(x, y, 0, x, y, haloR);
      g.addColorStop(0, rgba(pal.gold, 0.5 * z));
      g.addColorStop(1, rgba(pal.gold, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, haloR, 0, TAU);
      ctx.fill();
      ctx.fillStyle = rgba(pal.gold, 0.35 + 0.65 * z);
      ctx.beginPath();
      ctx.arc(x, y, (i === 2 ? 1.7 : 1.25) * k * (0.7 + 0.3 * z), 0, TAU);
      ctx.fill();
    }

    // ---- 5. glass: terminator shade, specular bloom, rim light -----------------
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R, 0, TAU);
    ctx.clip();
    {
      const shade = ctx.createRadialGradient(
        c - R * 0.3,
        c - R * 0.35,
        R * 0.55,
        c,
        c,
        R * 1.05,
      );
      shade.addColorStop(0, 'rgba(0,0,0,0)');
      shade.addColorStop(1, pal.shade);
      ctx.fillStyle = shade;
      ctx.fillRect(c - R, c - R, R * 2, R * 2);

      const spec = ctx.createRadialGradient(
        c - R * 0.42,
        c - R * 0.5,
        0,
        c - R * 0.42,
        c - R * 0.5,
        R * 0.62,
      );
      spec.addColorStop(0, rgba(pal.rim, pal.specular));
      spec.addColorStop(1, rgba(pal.rim, 0));
      ctx.fillStyle = spec;
      ctx.fillRect(c - R, c - R, R * 2, R * 2);
    }
    ctx.restore();
    {
      const g = ctx.createLinearGradient(c - R, c - R, c + R, c + R);
      g.addColorStop(0, rgba(pal.rim, pal.rimAlpha));
      g.addColorStop(0.5, rgba(pal.rim, 0.12));
      g.addColorStop(1, rgba(pal.ring, 0.35));
      ctx.strokeStyle = g;
      ctx.lineWidth = 0.9 * k;
      ctx.beginPath();
      ctx.arc(c, c, R - 0.45 * k, 0, TAU);
      ctx.stroke();
    }

    // ---- 6. near side of the ring -------------------------------------------------
    strokeRing(true, ringInner, 0.6, 0.45);
    strokeRing(true, ring, 0.95, 1);
    if (sat[2] >= 0) drawSatellite();
  }

  function advance(dt: number) {
    const follow = 1 - Math.pow(0.001, dt);
    state.hover += (state.hoverTarget - state.hover) * Math.min(1, follow * 0.9);
    state.px += (state.pxTarget - state.px) * Math.min(1, follow * 0.6);
    state.py += (state.pyTarget - state.py) * Math.min(1, follow * 0.6);
    state.kick *= Math.pow(0.08, dt);
    state.spin += (0.22 + 0.5 * state.hover + state.kick) * dt;
    state.satAngle += (0.5 + 0.5 * state.hover) * dt;
    state.pulse += (0.22 + 0.18 * state.hover) * dt;
    state.time += dt;
  }

  function frame(now: number) {
    if (!state.running) return;
    const dt = Math.min(0.05, Math.max(0, (now - state.last) / 1000));
    state.last = now;
    advance(dt);
    draw();
    state.raf = requestAnimationFrame(frame);
  }

  resize();
  draw();

  return {
    start() {
      if (state.running) return;
      state.running = true;
      state.last = performance.now();
      state.raf = requestAnimationFrame(frame);
    },
    stop() {
      state.running = false;
      cancelAnimationFrame(state.raf);
    },
    setHover(on) {
      state.hoverTarget = on ? 1 : 0;
      if (!state.running) {
        state.hover = state.hoverTarget;
        draw();
      }
    },
    setPointer(x, y) {
      state.pxTarget = clamp(x, -1, 1);
      state.pyTarget = clamp(y, -1, 1);
    },
    setTheme(theme) {
      if (state.theme === theme) return;
      state.theme = theme;
      // Repaint right away rather than on the next frame, so the orb never
      // lags behind the page when the theme flips.
      draw();
    },
    kick(velocity) {
      state.kick = clamp(state.kick + velocity, -6, 6);
    },
    setSize(size) {
      if (size === state.size) return;
      state.size = size;
      resize();
      if (!state.running) draw();
    },
    renderStatic() {
      draw();
    },
    destroy() {
      state.running = false;
      cancelAnimationFrame(state.raf);
    },
  };
}
