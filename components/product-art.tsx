import type { Product } from "@/data/products";

/**
 * Stand-in product artwork.
 *
 * There is no photography yet, so each product renders a deterministic bottle
 * drawn from its own swatch colours. It reads as a considered placeholder
 * rather than a broken image, and swapping in real photos later means
 * replacing this one component.
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
  const tall = product.step === 3 || product.step === 4; // serums are slimmer

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
          <stop offset="100%" stopColor={light} stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${id}-bottle`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={deep} stopOpacity="0.92" />
          <stop offset="55%" stopColor={deep} stopOpacity="0.72" />
          <stop offset="100%" stopColor={deep} stopOpacity="0.88" />
        </linearGradient>
      </defs>

      <rect width="320" height="400" fill={`url(#${id}-bg)`} />

      {/* soft ground shadow */}
      <ellipse cx="160" cy="330" rx="74" ry="9" fill={deep} opacity="0.13" />

      <g transform={tall ? "translate(0, 18)" : undefined}>
        {/* cap */}
        <rect
          x={tall ? 138 : 132}
          y={tall ? 92 : 78}
          width={tall ? 44 : 56}
          height={tall ? 34 : 28}
          rx="4"
          fill={deep}
          opacity="0.95"
        />
        {/* neck */}
        <rect
          x={tall ? 146 : 142}
          y={tall ? 124 : 104}
          width={tall ? 28 : 36}
          height="14"
          fill={deep}
          opacity="0.8"
        />
        {/* body */}
        <rect
          x={tall ? 122 : 106}
          y={tall ? 136 : 116}
          width={tall ? 76 : 108}
          height={tall ? 186 : 206}
          rx={tall ? 10 : 14}
          fill={`url(#${id}-bottle)`}
        />
        {/* highlight down the left edge */}
        <rect
          x={tall ? 132 : 118}
          y={tall ? 150 : 132}
          width="8"
          height={tall ? 150 : 168}
          rx="4"
          fill="#ffffff"
          opacity="0.22"
        />
        {/* label band */}
        <rect
          x={tall ? 122 : 106}
          y={tall ? 206 : 196}
          width={tall ? 76 : 108}
          height={tall ? 62 : 68}
          fill={light}
          opacity="0.93"
        />
        <text
          x="160"
          y={tall ? 232 : 224}
          textAnchor="middle"
          fontFamily="var(--font-blackletter), UnifrakturMaguntia, serif"
          fontSize="19"
          letterSpacing="1"
          fill={deep}
        >
          SIX
        </text>
        <text
          x="160"
          y={tall ? 252 : 244}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="10"
          letterSpacing="1.5"
          fill={deep}
          opacity="0.75"
        >
          {String(product.step).padStart(2, "0")} · {product.size}
        </text>
      </g>
    </svg>
  );
}
