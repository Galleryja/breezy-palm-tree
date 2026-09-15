/**
 * The Six wordmark: "SIX" set on a shallow arc.
 *
 * Text is curved with an SVG <textPath>, because CSS cannot bend a baseline.
 * The arc is deliberately gentle — "slightly curved", not a semicircle.
 *
 * FONT: the real mark is Cloister Black, which is a licensed typeface and is
 * not bundled here. What renders today is UnifrakturMaguntia, an open-licence
 * blackletter standing in for it. To swap in the real thing, see the note in
 * app/layout.tsx — it is a one-line change and nothing else needs to move.
 */
export function Wordmark({
  className = "",
  title = "Six",
}: {
  className?: string;
  /** Accessible name. Pass null-ish only when a neighbouring label exists. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 56"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        {/* A shallow upward arc. Raise the control point's y to flatten it. */}
        <path id="six-arc" d="M 14 44 Q 80 20 146 44" fill="none" />
      </defs>

      <text
        style={{
          // Falls back through other blackletters before hitting a serif, so
          // the mark never renders in a plain sans if the font fails to load.
          fontFamily:
            "var(--font-blackletter), 'Cloister Black', UnifrakturMaguntia, serif",
          fontSize: "34px",
          letterSpacing: "1px",
        }}
        fill="currentColor"
      >
        <textPath href="#six-arc" startOffset="50%" textAnchor="middle">
          SIX
        </textPath>
      </text>
    </svg>
  );
}
