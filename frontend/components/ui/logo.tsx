export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        className="flex-none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          fill={dark ? "rgba(255,255,255,.12)" : "var(--card)"}
          stroke={dark ? "rgba(255,255,255,.25)" : "var(--border)"}
        />
        <ellipse
          cx="12"
          cy="5"
          rx="4.2"
          ry="7.4"
          fill={dark ? "#a78bfa" : "var(--primary)"}
          transform="rotate(-24 12 12)"
        />
        <ellipse
          cx="12"
          cy="5"
          rx="4.2"
          ry="7.4"
          fill={dark ? "#6d8df2" : "var(--primary-2)"}
          transform="rotate(96 12 12)"
        />
        <ellipse
          cx="12"
          cy="5"
          rx="4.2"
          ry="7.4"
          fill={dark ? "#f0a6c4" : "var(--ring)"}
          transform="rotate(216 12 12)"
        />
      </svg>
      <span
        className={`text-lg font-bold tracking-tight ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        Goal<span className="text-primary">Up</span>
      </span>
    </span>
  );
}