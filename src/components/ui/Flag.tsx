/**
 * Inline SVG flags. Renders correctly on every platform (Windows desktop
 * does not render emoji flags, which is why we ship our own).
 *
 * All flags use a uniform 24x18 (4:3) box with rounded corners and a thin
 * border so they look consistent next to each other.
 */
type Code = "en" | "it" | "zh" | "es";

interface FlagProps {
  code: Code;
  size?: number;
  className?: string;
}

const Flag = ({ code, size = 24, className = "" }: FlagProps) => {
  const w = size;
  const h = Math.round((size * 3) / 4);
  return (
    <svg
      role="img"
      aria-hidden="true"
      width={w}
      height={h}
      viewBox="0 0 24 18"
      className={`inline-block rounded-[2px] shadow-sm ring-1 ring-black/10 ${className}`}
    >
      {code === "en" && (
        // Simplified US: 13 stripes + blue canton (stars represented as dots)
        <g>
          <rect width="24" height="18" fill="#B22234" />
          {[1, 3, 5, 7, 9, 11].map((i) => (
            <rect key={i} y={i * (18 / 13)} width="24" height={18 / 13} fill="#fff" />
          ))}
          <rect width="10" height={18 * (7 / 13)} fill="#3C3B6E" />
          <g fill="#fff">
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={1 + c * 2} cy={1 + r * 2} r="0.55" />
              ))
            )}
          </g>
        </g>
      )}
      {code === "it" && (
        <g>
          <rect width="8" height="18" fill="#009246" />
          <rect x="8" width="8" height="18" fill="#fff" />
          <rect x="16" width="8" height="18" fill="#CE2B37" />
        </g>
      )}
      {code === "zh" && (
        // Simplified PRC: red field with one large star (skip the 4 small stars
        // for visual clarity at this size)
        <g>
          <rect width="24" height="18" fill="#EE1C25" />
          <polygon
            fill="#FFFF00"
            points="6,3 6.95,5.85 9.85,5.85 7.45,7.65 8.4,10.5 6,8.7 3.6,10.5 4.55,7.65 2.15,5.85 5.05,5.85"
          />
        </g>
      )}
      {code === "es" && (
        // Simplified Spain: 1:2:1 red/yellow/red horizontal stripes
        <g>
          <rect width="24" height="4.5" fill="#AA151B" />
          <rect y="4.5" width="24" height="9" fill="#F1BF00" />
          <rect y="13.5" width="24" height="4.5" fill="#AA151B" />
        </g>
      )}
    </svg>
  );
};

export default Flag;
