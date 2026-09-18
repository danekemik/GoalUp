function LaptopArt() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="drop-shadow-[0_18px_30px_rgba(49,46,129,.45)]"
      style={{ width: "min(252px, 82%)", height: "auto" }}
      role="presentation"
    >
      <defs>
        <linearGradient id="mb-scr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="55%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="mb-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3efff" />
          <stop offset="100%" stopColor="#cfc5f2" />
        </linearGradient>
        <linearGradient id="mb-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <ellipse cx="170" cy="192" rx="118" ry="12" fill="url(#mb-glow)" opacity="0.4" />

      <g>
        <rect x="44" y="28" width="252" height="140" rx="16" fill="url(#mb-scr)" />
        <rect x="54" y="38" width="232" height="112" rx="10" fill="#1e1b4b" opacity="0.96" />

        {[0.22, 0.5, 0.78].map((t) => (
          <line
            key={t}
            x1="66"
            x2="274"
            y1={38 + 112 * t}
            y2={38 + 112 * t}
            stroke="#818cf8"
            strokeOpacity="0.14"
            strokeDasharray="3 7"
          />
        ))}

        <rect x="70" y="122" width="22" height="22" rx="5" fill="#a78bfa" />
        <rect x="100" y="110" width="22" height="34" rx="5" fill="#818cf8" />
        <rect x="130" y="94" width="22" height="50" rx="5" fill="#c084fc" />
        <rect x="160" y="101" width="22" height="43" rx="5" fill="#818cf8" />
        <rect x="190" y="74" width="22" height="70" rx="5" fill="#f472b6" />
        <rect x="220" y="52" width="22" height="92" rx="5" fill="#f0abfc" />

        <path
          d="M70 122 L100 110 L130 96 L160 101 L190 78 L220 56"
          fill="none"
          stroke="#fde68a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="220" cy="56" r="4.5" fill="#fde68a" />

        <rect x="155" y="20" width="30" height="8" rx="4" fill="#312e81" />
      </g>

      <rect x="40" y="160" width="260" height="26" rx="13" fill="url(#mb-base)" />
      <rect x="66" y="171" width="208" height="5" rx="2.5" fill="#8b7fb9" opacity="0.7" />

      <path d="M84 24 l5 10 -5 10 -5 -10 z" fill="#f9a8d4" opacity="0.85" />
      <circle cx="276" cy="40" r="4" fill="#c4b5fd" opacity="0.9" />
      <path d="M264 60 l4 7 -4 7 -4 -7 z" fill="#f0abfc" opacity="0.7" />
    </svg>
  );
}

function JapanArt() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="drop-shadow-[0_18px_30px_rgba(13,148,136,.35)]"
      style={{ width: "min(272px, 86%)", height: "auto" }}
      role="presentation"
    >
      <defs>
        <linearGradient id="jp-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
        <linearGradient id="jp-fuji" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="jp-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="jp-torii" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>

      <circle cx="252" cy="76" r="44" fill="url(#jp-sun)" opacity="0.95" />
      <circle
        cx="252"
        cy="76"
        r="56"
        fill="none"
        stroke="#fde047"
        strokeOpacity="0.4"
        strokeWidth="7"
        strokeDasharray="2 12"
        strokeLinecap="round"
      />

      <g opacity="0.75">
        <path d="M40 34 q9 -8 18 0 q-9 8 -18 0z" fill="#fff" />
        <path d="M64 26 q8 -7 16 0 q-8 7 -16 0z" fill="#fff" />
        <ellipse cx="96" cy="34" rx="26" ry="9" fill="#fff" />
        <ellipse cx="188" cy="58" rx="22" ry="8" fill="#fff" />
      </g>

      <path d="M42 160 L150 44 L258 160 Z" fill="url(#jp-fuji)" />
      <path d="M150 44 L124 82 L136 88 L150 104 L164 88 L176 82 Z" fill="#f0fdfa" opacity="0.96" />
      <path d="M150 44 L150 104 L138 88 L124 82 Z" fill="#5eead4" opacity="0.35" />

      <rect x="0" y="160" width="340" height="60" fill="url(#jp-sea)" />
      <path
        d="M0 160 q14 6 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.5"
        strokeWidth="3"
      />
      <ellipse cx="252" cy="182" rx="18" ry="26" fill="#fde047" opacity="0.3" />

      <g>
        <rect x="70" y="142" width="80" height="9" rx="4.5" fill="url(#jp-torii)" />
        <rect x="80" y="126" width="60" height="6" rx="3" fill="url(#jp-torii)" />
        <rect x="80" y="136" width="7" height="42" fill="url(#jp-torii)" />
        <rect x="133" y="136" width="7" height="42" fill="url(#jp-torii)" />
      </g>

      <g fill="#1e1b4b" opacity="0.65">
        <path d="M204 96 q7 -5 3 4 q-6 2 -9 -1z" />
        <path d="M284 104 q6 -4 3 3 q-6 2 -9 -1z" />
      </g>

      <g fill="#fb7185" opacity="0.8">
        <circle cx="74" cy="96" r="3" />
        <circle cx="90" cy="112" r="2.2" />
        <circle cx="60" cy="124" r="2.6" />
      </g>
    </svg>
  );
}

function CarArt() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="drop-shadow-[0_20px_32px_rgba(30,58,138,.5)]"
      style={{ width: "min(292px, 86%)", height: "auto" }}
      role="presentation"
    >
      <defs>
        <linearGradient id="cr-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="cr-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <radialGradient id="cr-hl" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="176" cy="170" rx="150" ry="9" fill="#020617" opacity="0.18" />

      <g opacity="0.55">
        <rect x="16" y="96" width="26" height="5" rx="2.5" fill="#38bdf8" />
        <rect x="30" y="112" width="18" height="5" rx="2.5" fill="#38bdf8" />
        <rect x="10" y="124" width="24" height="5" rx="2.5" fill="#a3e635" />
      </g>

      <g>
        <circle cx="118" cy="148" r="24" fill="#0b1220" />
        <circle cx="118" cy="148" r="11" fill="#cbd5e1" />
        <circle cx="118" cy="148" r="4" fill="#0f172a" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line
            key={a}
            x1="118"
            y1="148"
            x2={118 + 10 * Math.cos((a * Math.PI) / 180)}
            y2={148 + 10 * Math.sin((a * Math.PI) / 180)}
            stroke="#0f172a"
            strokeWidth="2"
          />
        ))}
      </g>
      <g>
        <circle cx="242" cy="148" r="24" fill="#0b1220" />
        <circle cx="242" cy="148" r="11" fill="#cbd5e1" />
        <circle cx="242" cy="148" r="4" fill="#0f172a" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line
            key={a}
            x1="242"
            y1="148"
            x2={242 + 10 * Math.cos((a * Math.PI) / 180)}
            y2={148 + 10 * Math.sin((a * Math.PI) / 180)}
            stroke="#0f172a"
            strokeWidth="2"
          />
        ))}
      </g>

      <rect x="44" y="98" width="248" height="56" rx="16" fill="url(#cr-body)" />
      <path d="M108 98 L132 56 Q136 50 146 50 L206 50 Q216 50 220 56 L240 98 Z" fill="url(#cr-cab)" />
      <path d="M164 50 L164 98" stroke="#0369a1" strokeWidth="3" opacity="0.6" />

      <circle cx="118" cy="156" r="32" fill="url(#cr-body)" />
      <circle cx="242" cy="156" r="32" fill="url(#cr-body)" />

      <rect x="48" y="116" width="7" height="15" rx="3.5" fill="#fb7185" />
      <circle cx="292" cy="122" r="22" fill="url(#cr-hl)" />
      <circle cx="292" cy="122" r="6" fill="#bef264" />

      <rect x="160" y="122" width="22" height="6" rx="3" fill="#93c5fd" opacity="0.85" />
      <path d="M104 128 l70 0" stroke="#93c5fd" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function GuitarArt() {
  return (
    <svg
      viewBox="0 0 200 264"
      className="drop-shadow-[0_18px_30px_rgba(190,18,60,.4)]"
      style={{ width: "min(150px, 72%)", height: "auto" }}
      role="presentation"
    >
      <defs>
        <linearGradient id="gt-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="gt-neck" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e3c2" />
          <stop offset="100%" stopColor="#e8c188" />
        </linearGradient>
        <linearGradient id="gt-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="gt-pg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id="gt-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="204" rx="86" ry="74" fill="url(#gt-glow)" />

      <rect x="90" y="24" width="20" height="158" rx="8" fill="url(#gt-neck)" />
      {[42, 64, 86, 108, 130, 150].map((y) => (
        <line
          key={y}
          x1="92"
          x2="108"
          y1={y}
          y2={y}
          stroke="#b6753a"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
      ))}
      <circle cx="100" cy="54" r="2.6" fill="#7c4a21" />
      <circle cx="100" cy="98" r="2.6" fill="#7c4a21" />

      <rect x="88" y="6" width="24" height="18" rx="7" fill="url(#gt-head)" />
      {[91, 95, 99, 103, 107, 111].map((x) => (
        <circle key={x} cx={x} cy="9" r="2" fill="#312e81" />
      ))}
      <rect x="88" y="22" width="24" height="3.5" rx="1.75" fill="#e7c98f" />

      <path d="M100 182 C84 182 74 172 74 156 C74 147 79 141 86 141 C94 141 99 152 100 162 Z" fill="url(#gt-body)" />
      <path d="M100 182 C116 182 126 172 126 156 C126 147 121 141 114 141 C106 141 101 152 100 162 Z" fill="url(#gt-body)" />
      <ellipse cx="100" cy="224" rx="46" ry="32" fill="url(#gt-body)" />

      <path
        d="M98 182 C70 182 52 206 58 226 C62 241 78 250 100 252 C122 250 138 241 142 226 C148 206 130 182 102 182 Z"
        fill="none"
        stroke="#fff7ed"
        strokeOpacity="0.35"
        strokeWidth="3"
      />
      <ellipse cx="100" cy="210" rx="23" ry="16" fill="url(#gt-pg)" opacity="0.85" />
      <circle cx="100" cy="196" r="2.4" fill="#1f1440" opacity="0.85" />
      <circle cx="108" cy="206" r="2.4" fill="#1f1440" opacity="0.85" />
      <circle cx="92" cy="206" r="2.4" fill="#1f1440" opacity="0.85" />

      <rect x="94" y="222" width="12" height="13" rx="4" fill="#e5e7eb" />
      {[96, 98.5, 101, 103.5].map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={222}
          y2={236}
          stroke="#4c1d95"
          strokeWidth="0.8"
        />
      ))}
      {[96, 98.5, 101, 103.5].map((x) => (
        <line
          key={`s${x}`}
          x1={x}
          x2={x}
          y1={182}
          y2={186}
          stroke="#fff7ed"
          strokeOpacity="0.6"
          strokeWidth="0.8"
        />
      ))}

      <g fill="#fff7ed" opacity="0.85">
        <path d="M42 150 l6 0 -3 12 z" />
        <circle cx="41" cy="163" r="4.5" />
        <path d="M156 100 l6 0 -3 12 z" transform="rotate(8 159 106)" />
        <circle cx="155" cy="115" r="4" />
      </g>
      <circle cx="36" cy="122" r="2.6" fill="#a855f7" opacity="0.9" />
      <circle cx="164" cy="146" r="2.2" fill="#a855f7" opacity="0.9" />
    </svg>
  );
}

export function GoalArt({ id }: { id: string }) {
  switch (id) {
    case "macbook":
      return <LaptopArt />;
    case "japan":
      return <JapanArt />;
    case "car":
      return <CarArt />;
    case "fender":
      return <GuitarArt />;
    default:
      return null;
  }
}