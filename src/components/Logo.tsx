import { COLORS, LOGO_MARK } from "@/lib/brand";

/**
 * The SubDrip logo — a teal rounded square holding the drip mark:
 * an open inverted-droplet stroke in cream with a mint drop above it.
 * Pure SVG, no image asset; per-size box/radius match the old design slots
 * (header 32 / footer 30 / download 64).
 */
const SIZES = {
  32: { box: 32, radius: 10 },
  30: { box: 30, radius: 9 },
  64: { box: 64, radius: 20 },
} as const;

export default function Logo({ size = 32 }: { size?: keyof typeof SIZES }) {
  const s = SIZES[size];
  return (
    <div
      aria-hidden
      style={{
        width: s.box,
        height: s.box,
        borderRadius: s.radius,
        background: COLORS.teal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={s.box}
        height={s.box}
        viewBox="0 0 100 100"
        fill="none"
        style={{ display: "block" }}
      >
        <circle cx="50" cy="23" r="11" fill={LOGO_MARK.dot} />
        <path
          d="M38.5 33 C 27 47.5, 21.5 60, 27.5 70.5 C 33 80, 43 84.5, 50 84.5 C 57 84.5, 67 80, 72.5 70.5 C 78.5 60, 73 47.5, 61.5 33"
          stroke={LOGO_MARK.drop}
          strokeWidth="13"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
