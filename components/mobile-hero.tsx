import Link from "next/link";

/**
 * The mobile hero: wordmark, then a full-bleed media panel with one button
 * centred in it. Mobile only — `md:hidden` on the section — so the desktop
 * two-column hero is untouched.
 *
 * Drop a file at one of these paths in /public and it is used automatically.
 * Video wins over image; with neither, the panel renders as a warm dark
 * field that picks up the amber of the real jars, which is a deliberate
 * placeholder rather than an accident.
 *
 *     public/hero.mp4     silent, looping, ~6-10 seconds, under about 4 MB
 *     public/hero.jpg     at least 1200 x 1600, portrait
 *
 * A hero video must be muted to autoplay on iOS, and `playsInline` stops it
 * hijacking the screen into fullscreen. Both are set below.
 */

const HERO_VIDEO: string | null = null; // e.g. "/hero.mp4"
const HERO_IMAGE: string | null = null; // e.g. "/hero.jpg"

export function MobileHero() {
  return (
    <section className="md:hidden">
      {/* Full-bleed: breaks out of the page gutter to meet both edges. */}
      <div className="relative h-[38vh] min-h-[250px] w-full overflow-hidden bg-ink">
        {HERO_VIDEO ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : HERO_IMAGE ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_IMAGE}
            alt=""
          />
        ) : (
          // Placeholder: the amber of the jars against near-black, so the
          // slot reads as considered until real footage lands.
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 18%, #6b4a2a 0%, #2a1c12 46%, #14100c 100%)",
            }}
          />
        )}

        {/* Scrim: keeps the button legible over whatever ends up behind it. */}
        <div
          className="absolute inset-0 bg-black/25"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href="/products"
            className="rounded-full border border-white/70 bg-white/10 px-9 py-4 text-sm font-medium tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-colors active:bg-white active:text-ink"
          >
            Shop the Range
          </Link>
        </div>
      </div>

      <div className="wrap py-10">
        <h1 className="font-serif text-3xl leading-[1.15] text-ink">
          Elevated Skincare.
        </h1>
        {/* The tallow line is dropped on mobile: it wraps to three lines on a
            phone, which breaks the rhythm of the three that follow. Those
            three each fit on one line, so the hard breaks still read as
            deliberate. Desktop keeps all four. */}
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          Natural ingredients, chosen for what they do.
          <br />
          No fillers. No synthetic bulk. No cutting corners. Clean. Made
          properly.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block text-sm text-ink-soft underline underline-offset-4"
        >
          Why tallow?
        </Link>
      </div>
    </section>
  );
}
