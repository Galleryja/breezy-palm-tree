import type { Product } from "@/data/products";

/**
 * Stand-in product artwork.
 *
 * There is no photography yet, so each product renders a deterministic vessel
 * drawn from its own swatch colours — a squat jar for the balms, a slim
 * bottle for the rollers. It reads as a considered placeholder rather than a
 * broken image, and swapping in real photos later means replacing this one
 * component.
 */
export function ProductArt({
  product,
  className = "",
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const [light, deep] = product.swatch;
  const id = `art-${product.slug}`;
  const isRoller = product.format === "roller";

  return (
    <svg
      viewBox="0 0 320 400"
      className={className}
      role="img"
      aria-label={`${product.name}, ${product.size}`}
      // The hero image should not be lazy-decoded; the rest can be.
      {...(priority ? {} : { loading: "lazy" as const })}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={light} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={deep} stopOpacity="0.9" />
          <stop offset="42%" stopColor={deep} stopOpacity="0.62" />
          <stop offset="100%" stopColor={deep} stopOpacity="0.88" />
        </linearGradient>
      </defs>

      <rect width="320" height="400" fill={`url(#${id}-bg)`} />

      {/* soft ground shadow */}
      <ellipse
        cx="160"
        cy={isRoller ? 330 : 328}
        rx={isRoller ? 46 : 84}
        ry="8"
        fill={deep}
        opacity="0.14"
      />

      {isRoller ? (
        <g>
          {/* cap */}
          <rect x="136" y="84" width="48" height="52" rx="5" fill={deep} opacity="0.95" />
          {/* collar */}
          <rect x="142" y="134" width="36" height="12" fill={deep} opacity="0.75" />
          {/* body */}
          <rect x="130" y="146" width="60" height="176" rx="8" fill={`url(#${id}-glass)`} />
          {/* oil fill line */}
          <rect x="130" y="176" width="60" height="146" rx="8" fill={deep} opacity="0.22" />
          {/* highlight */}
          <rect x="139" y="160" width="7" height="140" rx="3.5" fill="#ffffff" opacity="0.26" />
          {/* label */}
          <rect x="130" y="212" width="60" height="62" fill={light} opacity="0.95" />
          <text
            x="160"
            y="240"
            textAnchor="middle"
            fontFamily="'Cloister Black', var(--font-blackletter), serif"
            fontSize="21"
            fill={deep}
          >
            SIX
          </text>
          <text
            x="160"
            y="260"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="9"
            letterSpacing="1.2"
            fill={deep}
            opacity="0.8"
          >
            {product.size}
          </text>
        </g>
      ) : (
        <g>
          {/* lid */}
          <rect x="74" y="136" width="172" height="46" rx="7" fill={deep} opacity="0.95" />
          {/* lid highlight */}
          <rect x="86" y="146" width="148" height="7" rx="3.5" fill="#ffffff" opacity="0.18" />
          {/* jar body */}
          <rect x="82" y="182" width="156" height="142" rx="12" fill={`url(#${id}-glass)`} />
          {/* side highlight */}
          <rect x="94" y="196" width="9" height="112" rx="4.5" fill="#ffffff" opacity="0.24" />
          {/* label */}
          <rect x="82" y="222" width="156" height="72" fill={light} opacity="0.95" />
          <text
            x="160"
            y="254"
            textAnchor="middle"
            fontFamily="'Cloister Black', var(--font-blackletter), serif"
            fontSize="26"
            fill={deep}
          >
            SIX
          </text>
          <text
            x="160"
            y="277"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="10"
            letterSpacing="1.6"
            fill={deep}
            opacity="0.8"
          >
            {product.size.toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  );
}
