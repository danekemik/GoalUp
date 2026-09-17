export function WalletSummary({
  label,
  value,
  delta,
  note,
}: {
  label: string;
  value: string;
  delta: string;
  note: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-grad-primary p-4 text-primary-foreground">
      <p className="text-xs opacity-90">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-1 text-xs font-bold opacity-95">{delta}</p>
      <p className="mt-0.5 text-[11px] opacity-75">{note}</p>
      <svg viewBox="0 0 240 54" className="mt-2 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wl-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M2 42 L28 36 L52 40 L78 30 L104 32 L130 22 L156 26 L184 14 L210 16 L238 8 L238 54 L2 54 Z"
          fill="url(#wl-fill)"
        />
        <path
          d="M2 42 L28 36 L52 40 L78 30 L104 32 L130 22 L156 26 L184 14 L210 16 L238 8"
          fill="none"
          stroke="rgba(255,255,255,.9)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}