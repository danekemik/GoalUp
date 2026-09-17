const mock = [4, 9, 12, 18, 22, 27, 31, 38, 44, 51, 59, 66, 74, 81, 90, 96];

const W = 640;
const H = 180;
const PAD = 10;

export function MiniProgressChart() {
  const max = Math.max(...mock);
  const min = Math.min(...mock);
  const range = max - min || 1;

  const pts = mock.map((v, i) => {
    const x = PAD + (i / (mock.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
    return [x, y] as const;
  });

  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H} L${pts[0][0].toFixed(1)},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-36 w-full" role="img" aria-label="Мини-график прогресса накоплений">
      <defs>
        <linearGradient id="mini-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={PAD}
          x2={W - PAD}
          y1={H * t}
          y2={H * t}
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.7"
        />
      ))}
      <path d={area} fill="url(#mini-area)" />
      <path
        d={line}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="5"
        fill="var(--primary)"
        className="animate-pulse-dot"
        style={{ transformOrigin: `${pts[pts.length - 1][0]}px ${pts[pts.length - 1][1]}px` }}
      />
    </svg>
  );
}