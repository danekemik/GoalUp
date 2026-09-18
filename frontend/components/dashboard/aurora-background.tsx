export interface AuroraTheme {
  blob1: string;
  blob2: string;
  blob3: string;
  blob4: string;
  halo: string;
}

export const AURORA_DEFAULT: AuroraTheme = {
  blob1: "rgba(139, 92, 246, 0.32)",
  blob2: "rgba(79, 70, 229, 0.28)",
  blob3: "rgba(244, 114, 182, 0.22)",
  blob4: "rgba(253, 186, 116, 0.2)",
  halo: "rgba(139, 92, 246, 0.5)",
};

const rings: React.CSSProperties[] = [
  { width: 420, height: 420, left: "-4%", top: "16%" },
  { width: 260, height: 260, right: "6%", top: "9%" },
  { width: 340, height: 340, right: "-4%", bottom: "5%" },
  { width: 200, height: 200, left: "12%", bottom: "14%" },
];

const orbs: React.CSSProperties[] = [
  { width: 26, height: 26, left: "14%", top: "22%", opacity: 0.6 },
  { width: 14, height: 14, left: "24%", top: "11%", opacity: 0.5 },
  { width: 34, height: 34, right: "18%", top: "17%", opacity: 0.5 },
  { width: 16, height: 16, right: "26%", bottom: "15%", opacity: 0.6 },
];

export function AuroraBackground({ aurora }: { aurora: AuroraTheme }) {
  return (
    <div
      className="goalup-theme goalup-aurora"
      style={
        {
          "--aurora-1": aurora.blob1,
          "--aurora-2": aurora.blob2,
          "--aurora-3": aurora.blob3,
          "--aurora-4": aurora.blob4,
          "--aurora-halo": aurora.halo,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="goalup-halo" />

      <span
        className="goalup-splotch"
        style={{ width: 560, height: 560, left: "-8%", top: "-6%" }}
      />
      <span
        className="goalup-splotch goalup-splotch--b"
        style={{ width: 640, height: 640, right: "-12%", top: "-4%" }}
      />
      <span
        className="goalup-splotch goalup-splotch--c"
        style={{ width: 520, height: 520, left: "-6%", top: "32%" }}
      />
      <span
        className="goalup-splotch goalup-splotch--d"
        style={{ width: 620, height: 620, right: "-10%", top: "40%" }}
      />

      <div className="goalup-rings">
        {rings.map((s, i) => (
          <span key={i} className="goalup-ring" style={s} />
        ))}
        {orbs.map((s, i) => (
          <span
            key={`orb-${i}`}
            className={`goalup-orb ${i % 2 === 0 ? "goalup-float-slow" : ""}`}
            style={s}
          />
        ))}
      </div>

      <div className="goalup-noise" />
    </div>
  );
}