// orb.jsx — animated 5-orb cluster for the hero
// Canvas-based; subtle organic motion + mouse reactivity.

const ORB_COLORS = ['#F6BEC9', '#7ECADF', '#BFDEA3', '#F9C84A', '#93ADBF'];
// Base pentagon positions (radius 50 from center), angles starting at -90deg
const BASE_ANGLES = [-90, -90 + 72, -90 + 144, -90 + 216, -90 + 288];

function OrbCluster({ size = 600, theme = 'light' }) {
  const canvasRef = React.useRef(null);
  const mouseRef = React.useRef({ x: 0, y: 0, active: false });
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    function setSize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseRef.current.y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRef.current.active = true;
    }
    function onLeave() {mouseRef.current.active = false;}
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let t0 = performance.now();
    // smoothed mouse
    const m = { x: 0, y: 0 };

    function frame(now) {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width,h = rect.height;
      const cx = w / 2,cy = h / 2;
      const t = (now - t0) / 1000;

      // smoothing
      const tx = mouseRef.current.active ? mouseRef.current.x : 0;
      const ty = mouseRef.current.active ? mouseRef.current.y : 0;
      m.x += (tx - m.x) * 0.06;
      m.y += (ty - m.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const R = Math.min(w, h) * 0.18; // orbit radius
      const orbR = Math.min(w, h) * 0.16; // orb radius

      // Per-orb computed positions
      const pts = BASE_ANGLES.map((a, i) => {
        const rad = a * Math.PI / 180;
        // base position
        let px = cx + R * Math.cos(rad);
        let py = cy + R * Math.sin(rad);
        // gentle oscillation per orb
        const wob = Math.sin(t * 0.6 + i * 1.3) * (orbR * 0.08);
        const wob2 = Math.cos(t * 0.5 + i * 0.7) * (orbR * 0.10);
        px += Math.cos(rad) * wob + wob2 * 0.3;
        py += Math.sin(rad) * wob + wob2 * 0.4;
        // mouse repulsion (each orb pushes away from cursor slightly differently)
        const repel = orbR * 0.55;
        px += -m.x * repel * (0.55 + i % 3 * 0.15);
        py += -m.y * repel * (0.55 + (i + 1) % 3 * 0.18);
        return { x: px, y: py, color: ORB_COLORS[i], i };
      });

      // Sort by Y so bottom orbs render on top (subtle depth)
      const sorted = [...pts].sort((a, b) => a.y - b.y);

      for (const p of sorted) {
        // soft glow underneath
        const g = ctx.createRadialGradient(p.x, p.y, orbR * 0.2, p.x, p.y, orbR * 1.5);
        g.addColorStop(0, hexAlpha(p.color, 0.55));
        g.addColorStop(1, hexAlpha(p.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, orbR * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // main orb
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, orbR, 0, Math.PI * 2);
        ctx.fill();

        // inner highlight
        const hg = ctx.createRadialGradient(p.x - orbR * 0.35, p.y - orbR * 0.4, 0, p.x, p.y, orbR);
        hg.addColorStop(0, 'rgba(255,255,255,0.55)');
        hg.addColorStop(0.4, 'rgba(255,255,255,0.08)');
        hg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, orbR, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <div className="orb-stage" aria-hidden="true">
      <div className="pulse" />
      <canvas ref={canvasRef} />
    </div>);

}

function hexAlpha(hex, a) {
  // #RRGGBB → rgba()
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// Static small orb cluster used in nav + accents
function MiniCluster({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="-7 -20 114 114" aria-hidden="true" style={{ display: 'block' }}>
      <circle cx="50.00" cy="10.00" r="18.6" fill="#F6BEC9" />
      <circle cx="78.53" cy="30.73" r="18.6" fill="#7ECADF" />
      <circle cx="67.63" cy="64.27" r="18.6" fill="#BFDEA3" />
      <circle cx="32.37" cy="64.27" r="18.6" fill="#F9C84A" />
      <circle cx="21.47" cy="30.73" r="18.6" fill="#93ADBF" />
    </svg>);

}

window.OrbCluster = OrbCluster;
window.MiniCluster = MiniCluster;
window.ORB_COLORS = ORB_COLORS;