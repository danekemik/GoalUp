const mockBalance = [
  8.4, 12.0, 10.5, 14.2, 13.0, 17.6, 16.2, 20.4, 21.0, 19.2, 24.8, 23.0,
  27.5, 26.0, 30.1, 29.0, 33.7, 32.4, 36.8, 38.2, 37.0, 40.6, 41.2, 39.5,
  43.4, 45.1, 44.2, 47.8, 48.0, 49.6,
];

const W = 600;
const H = 200;
const PAD = 8;

export function BalanceChart() {
  const max = Math.max(...mockBalance);
  const min = Math.min(...mockBalance);
  const range = max - min || 1;

  const points = mockBalance.map((v, i) => {
    const x = (i / (mockBalance.length - 1)) * (W - PAD * 2) + PAD;
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(1)},${H} L${points[0][0].toFixed(1)},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-48 w-full" role="img" aria-label="Динамика баланса за 30 дней">
      <defs>
        <linearGradient id="goalup-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#goalup-area)" />
      <path d={line} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}