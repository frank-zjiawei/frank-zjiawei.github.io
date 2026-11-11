/**
 * Canvas renderer for the site-map orb: a clear glass sphere with a small
 * celestial instrument inside it — an equator ring with tick marks, a
 * meridian, an ecliptic, a polar axis — and a star map with constellation
 * lines floating through the volume around a central node.
 *
 * Everything is projected from real 3D coordinates and nothing is occluded,
 * so the far side stays visible through the glass, only fainter and finer.
 * That depth falloff is what makes the sphere read as transparent rather
 * than flat. Monochrome: ink on light pages, white on dark ones.
 *
 * No dependencies. All sizes scale from a 104px design size.
 */

type Vec3 = [number, number, number];
type RGB = [number, number, number];

export type OrbTheme = 'light' | 'dark';

interface Palette {
  /** colour of the structure inside the glass */
  ink: RGB;
  /** how strongly the far / near side of the structure shows */
  farAlpha: number;
  nearAlpha: number;
  /** glass darkening (or lightening) toward the rim */
  edge: RGB;
  edgeAlpha: number;
  /** outer hairline of the sphere */
  rimAlpha: number;
  /** highlights */
  gloss: RGB;
  glossAlpha: number;
  /** light gathering on the inner edge opposite the highlight */
  bounceAlpha: number;
  /** soft shading on the side away from the light, for volume */
  shadeAlpha: number;
}

const PALETTES: Record<OrbTheme, Palette> = {
  light: {
    ink: [17, 17, 17],
    farAlpha: 0.18,
    nearAlpha: 0.74,
    edge: [17, 17, 17],
    edgeAlpha: 0.26,
    rimAlpha: 0.5,
    gloss: [255, 255, 255],
    glossAlpha: 0.95,
    bounceAlpha: 0.45,
    shadeAlpha: 0.07,
  },
  dark: {
    ink: [245, 245, 245],
    farAlpha: 0.22,
    nearAlpha: 0.9,
    edge: [255, 255, 255],
    edgeAlpha: 0.17,
    rimAlpha: 0.5,
    gloss: [255, 255, 255],
    glossAlpha: 0.42,
    bounceAlpha: 0.12,
    shadeAlpha: 0,
  },
};

const TAU = Math.PI * 2;
const DESIGN_SIZE = 104;
/** sphere radius as a fraction of the canvas size (kept in sync with CSS) */
export const ORB_RADIUS = 0.4;
const RING_RADIUS = 0.955;
const RING_STEPS = 72;

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (x: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, x));

/** small seeded PRNG so the star map is the same on every visit */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dist = (a: Vec3, b: Vec3) =>
  Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

interface Star {
  p: Vec3;
  /** 0 (faint) … 1 (bright) */
  mag: number;
  phase: number;
}

function buildStarMap() {
  const rand = mulberry32(20261111);
  const stars: Star[] = [];
  for (let i = 0; i < 58; i++) {
    // uniform direction, radius kept off the centre and inside the glass
    const u = rand() * 2 - 1;
    const th = rand() * TAU;
    const s = Math.sqrt(1 - u * u);
    const r = 0.42 + 0.46 * Math.sqrt(rand());
    const m = rand();
    stars.push({
      p: [Math.cos(th) * s * r, u * r, Math.sin(th) * s * r],
      mag: m * m,
      phase: rand() * TAU,
    });
  }

  // Constellations: from a few bright stars, walk to the nearest unused
  // neighbours. Short hops only, so the figures stay compact.
  const links: [number, number][] = [];
  const used = new Set<number>();
  const seeds = stars
    .map((s, i) => ({ i, mag: s.mag }))
    .sort((a, b) => b.mag - a.mag)
    .map((s) => s.i);
  let figures = 0;
  for (const seed of seeds) {
    if (figures >= 4) break;
    if (used.has(seed)) continue;
    let current = seed;
    const chain = [current];
    used.add(current);
    while (chain.length < 5) {
      let best = -1;
      let bestD = 0.62;
      for (let j = 0; j < stars.length; j++) {
        if (used.has(j)) continue;
        const d = dist(stars[current].p, stars[j].p);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      if (best < 0) break;
      links.push([current, best]);
      used.add(best);
      chain.push(best);
      current = best;
    }
    if (chain.length >= 3) figures++;
  }
  // stars that anchor a figure read better slightly brighter
  for (const [a, b] of links) {
    stars[a].mag = Math.max(stars[a].mag, 0.55);
    stars[b].mag = Math.max(stars[b].mag, 0.45);
  }
  return { stars, links };
}

/** a circle of points in the plane spanned by unit vectors u and v */
function circle(u: Vec3, v: Vec3, radius: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= RING_STEPS; i++) {
    const a = (i / RING_STEPS) * TAU;
    const ca = Math.cos(a) * radius;
    const sa = Math.sin(a) * radius;
    pts.push([u[0] * ca + v[0] * sa, u[1] * ca + v[1] * sa, u[2] * ca + v[2] * sa]);
  }
  return pts;
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
  /** draw one frame without advancing time */
  renderStatic(): void;
  destroy(): void;
}

export function createOrb(
  canvas: HTMLCanvasElement,
  options: { size?: number; theme?: OrbTheme } = {},
): Orb | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // ---- static geometry (unit sphere, Y is the polar axis) -------------------
  const { stars, links } = buildStarMap();

  const ECLIPTIC_TILT = 0.409; // 23.4°, the real angle between the two
  const equator = circle([1, 0, 0], [0, 0, 1], RING_RADIUS);
  const meridian = circle([1, 0, 0], [0, 1, 0], RING_RADIUS);
  const ecliptic = circle(
    [1, 0, 0],
    [0, Math.sin(ECLIPTIC_TILT), Math.cos(ECLIPTIC_TILT)],
    RING_RADIUS,
  );
  // tick marks around the equator; every sixth is longer, like an instrument
  const ticks: [Vec3, Vec3][] = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * TAU;
    const inner = RING_RADIUS - (i % 6 === 0 ? 0.11 : 0.055);
    ticks.push([
      [Math.cos(a) * RING_RADIUS, 0, Math.sin(a) * RING_RADIUS],
      [Math.cos(a) * inner, 0, Math.sin(a) * inner],
    ]);
  }
  const poleN: Vec3 = [0, RING_RADIUS, 0];
  const poleS: Vec3 = [0, -RING_RADIUS, 0];

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
    spin: 0.9,
    kick: 0,
    time: 0,
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
    const R = S * ORB_RADIUS;

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.clearRect(0, 0, S, S);

    // ---- rotation: spin about the polar axis, then lean the whole globe -----
    const tiltX = 0.4 + state.py * 0.26;
    const tiltZ = -0.3 + state.px * 0.16;
    const cs = Math.cos(state.spin);
    const sn = Math.sin(state.spin);
    const cx = Math.cos(tiltX);
    const sx = Math.sin(tiltX);
    const cz = Math.cos(tiltZ);
    const sz = Math.sin(tiltZ);
    // returns [X, Y, Z] with Z > 0 toward the viewer
    const rot = (p: Vec3): Vec3 => {
      const x1 = p[0] * cs + p[2] * sn;
      const z1 = -p[0] * sn + p[2] * cs;
      const y2 = p[1] * cx - z1 * sx;
      const z2 = p[1] * sx + z1 * cx;
      return [x1 * cz - y2 * sz, x1 * sz + y2 * cz, z2];
    };
    // slight perspective: nearer points sit a little further from the centre
    const persp = (v: Vec3) => 1 + 0.1 * v[2];
    const px = (v: Vec3) => c + v[0] * R * persp(v);
    const py = (v: Vec3) => c - v[1] * R * persp(v);
    /** 0 at the far side … 1 at the near side */
    const nearness = (z: number) => clamp((z + 1) / 2, 0, 1);
    /** opacity for a point at depth z: faint when far, firm when near */
    const depthAlpha = (z: number, gain = 1) =>
      clamp(
        (pal.farAlpha +
          (pal.nearAlpha - pal.farAlpha) * Math.pow(nearness(z), 1.35)) *
          gain *
          (1 + 0.18 * h),
        0,
        1,
      );

    // ---- 1. glass body: darkens toward the rim, as real glass does ----------
    {
      const g = ctx.createRadialGradient(c, c, R * 0.5, c, c, R);
      g.addColorStop(0, rgba(pal.edge, 0));
      g.addColorStop(0.62, rgba(pal.edge, pal.edgeAlpha * 0.16));
      g.addColorStop(0.86, rgba(pal.edge, pal.edgeAlpha * 0.5));
      g.addColorStop(1, rgba(pal.edge, pal.edgeAlpha));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, TAU);
      ctx.fill();

      if (pal.shadeAlpha > 0) {
        const shade = ctx.createLinearGradient(c - R, c - R, c + R, c + R);
        shade.addColorStop(0.35, rgba(pal.edge, 0));
        shade.addColorStop(1, rgba(pal.edge, pal.shadeAlpha));
        ctx.fillStyle = shade;
        ctx.fill();
      }
    }

    // Everything inside is drawn twice — far half first, near half last — so
    // near lines cross over far ones the way they would in a real object.
    const rings = [
      { pts: equator.map(rot), gain: 0.92 },
      { pts: ecliptic.map(rot), gain: 0.7 },
      { pts: meridian.map(rot), gain: 0.62 },
    ];
    const tickSegs = ticks.map(([a, b]) => [rot(a), rot(b)] as [Vec3, Vec3]);
    const starPts = stars.map((s) => rot(s.p));
    const n = rot(poleN);
    const s = rot(poleS);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawHalf = (near: boolean) => {
      const inHalf = (z: number) => (near ? z >= 0 : z < 0);

      // rings
      for (const ring of rings) {
        for (let i = 0; i < RING_STEPS; i++) {
          const a = ring.pts[i];
          const b = ring.pts[i + 1];
          const z = (a[2] + b[2]) / 2;
          if (!inHalf(z)) continue;
          ctx.strokeStyle = rgba(pal.ink, depthAlpha(z, ring.gain));
          ctx.lineWidth = (0.5 + 0.38 * nearness(z)) * k;
          ctx.beginPath();
          ctx.moveTo(px(a), py(a));
          ctx.lineTo(px(b), py(b));
          ctx.stroke();
        }
      }

      // equator tick marks
      for (const [a, b] of tickSegs) {
        const z = (a[2] + b[2]) / 2;
        if (!inHalf(z)) continue;
        ctx.strokeStyle = rgba(pal.ink, depthAlpha(z, 0.7));
        ctx.lineWidth = (0.45 + 0.3 * nearness(z)) * k;
        ctx.beginPath();
        ctx.moveTo(px(a), py(a));
        ctx.lineTo(px(b), py(b));
        ctx.stroke();
      }

      // constellation lines
      for (const [ia, ib] of links) {
        const a = starPts[ia];
        const b = starPts[ib];
        const z = (a[2] + b[2]) / 2;
        if (!inHalf(z)) continue;
        ctx.strokeStyle = rgba(pal.ink, depthAlpha(z, 0.7));
        ctx.lineWidth = (0.45 + 0.35 * nearness(z)) * k;
        ctx.beginPath();
        ctx.moveTo(px(a), py(a));
        ctx.lineTo(px(b), py(b));
        ctx.stroke();
      }

      // stars
      for (let i = 0; i < stars.length; i++) {
        const v = starPts[i];
        if (!inHalf(v[2])) continue;
        const star = stars[i];
        const twinkle =
          star.mag > 0.5
            ? 0.82 + 0.18 * Math.sin(state.time * 2.1 + star.phase)
            : 1;
        const near01 = nearness(v[2]);
        ctx.fillStyle = rgba(
          pal.ink,
          depthAlpha(v[2], (0.62 + 0.5 * star.mag) * twinkle),
        );
        ctx.beginPath();
        ctx.arc(
          px(v),
          py(v),
          (0.55 + 1.05 * star.mag) * (0.7 + 0.45 * near01) * k,
          0,
          TAU,
        );
        ctx.fill();
      }
    };

    // ---- 2. far half ---------------------------------------------------------
    drawHalf(false);

    // ---- 3. polar axis and central node (mid-depth) -----------------------------
    {
      ctx.strokeStyle = rgba(pal.ink, depthAlpha(0, 0.5));
      ctx.lineWidth = 0.6 * k;
      ctx.beginPath();
      ctx.moveTo(px(n), py(n));
      ctx.lineTo(px(s), py(s));
      ctx.stroke();
      for (const pole of [n, s]) {
        ctx.fillStyle = rgba(pal.ink, depthAlpha(pole[2], 1));
        ctx.beginPath();
        ctx.arc(px(pole), py(pole), 1.15 * k, 0, TAU);
        ctx.fill();
      }

      const breathe = 0.5 + 0.5 * Math.sin(state.time * 1.5);
      const haloR = (6 + 1.4 * breathe + 1.2 * h) * k;
      const halo = ctx.createRadialGradient(c, c, 0, c, c, haloR);
      halo.addColorStop(0, rgba(pal.ink, 0.15 + 0.04 * h));
      halo.addColorStop(1, rgba(pal.ink, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(c, c, haloR, 0, TAU);
      ctx.fill();
      ctx.fillStyle = rgba(pal.ink, 0.92);
      ctx.beginPath();
      ctx.arc(c, c, 2.2 * k, 0, TAU);
      ctx.fill();
    }

    // ---- 4. near half -----------------------------------------------------------
    drawHalf(true);

    // ---- 5. glass surface: highlights over the contents, then the rim ----------
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R, 0, TAU);
    ctx.clip();
    {
      // soft "window" reflection, upper left; drifts a little with the pointer
      const gx = c - R * (0.4 + 0.06 * state.px);
      const gy = c - R * (0.46 + 0.06 * state.py);
      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(-0.72);
      ctx.scale(1, 0.56);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.42);
      g.addColorStop(0, rgba(pal.gloss, pal.glossAlpha * 0.9));
      g.addColorStop(0.55, rgba(pal.gloss, pal.glossAlpha * 0.35));
      g.addColorStop(1, rgba(pal.gloss, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.42, 0, TAU);
      ctx.fill();
      ctx.restore();

      // light gathering along the lower-right inner edge
      ctx.strokeStyle = rgba(pal.gloss, pal.bounceAlpha);
      ctx.lineWidth = 1.7 * k;
      ctx.shadowColor = rgba(pal.gloss, pal.bounceAlpha);
      ctx.shadowBlur = 3 * k;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.9, 0.18, 1.2);
      ctx.stroke();
      // thin bright crescent just inside the upper-left rim
      ctx.strokeStyle = rgba(pal.gloss, pal.glossAlpha * 0.75);
      ctx.shadowColor = rgba(pal.gloss, pal.glossAlpha * 0.6);
      ctx.lineWidth = 1.2 * k;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.94, Math.PI + 0.45, Math.PI + 1.55);
      ctx.stroke();
    }
    ctx.restore();

    ctx.strokeStyle = rgba(pal.ink, pal.rimAlpha);
    ctx.lineWidth = 1 * k;
    ctx.beginPath();
    ctx.arc(c, c, R - 0.5 * k, 0, TAU);
    ctx.stroke();
  }

  function advance(dt: number) {
    const follow = 1 - Math.pow(0.001, dt);
    state.hover += (state.hoverTarget - state.hover) * Math.min(1, follow * 0.9);
    state.px += (state.pxTarget - state.px) * Math.min(1, follow * 0.6);
    state.py += (state.pyTarget - state.py) * Math.min(1, follow * 0.6);
    state.kick *= Math.pow(0.08, dt);
    state.spin += (0.2 + 0.5 * state.hover + state.kick) * dt;
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
